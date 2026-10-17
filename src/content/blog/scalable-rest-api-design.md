Most APIs don't fail because the code is bad. They fail because of assumptions: that traffic will be steady, that clients will behave, that the database will always answer quickly, and that a request will only ever be sent once. Launch day breaks every one of those assumptions at the same time.

This guide covers the design decisions that keep a REST API standing when real users arrive. The examples use Node.js and NestJS, but the ideas apply to Express, FastAPI or any other backend framework.

## Design for the traffic you will have, not the traffic you have today

During development an API serves one person: you. In production it serves hundreds of clients at once, some of them on slow mobile networks, some of them retrying aggressively, and some of them scripts you never planned for. Before writing endpoints, answer three questions:

- **Which endpoints are hot?** The home feed, search and login usually take most of the traffic. They deserve caching, tight queries and load tests. An admin report used twice a week does not.
- **What is the slowest dependency?** Usually the database or a third-party API (payments, email, SMS). Every request that touches it inherits its worst-case latency.
- **What happens when that dependency is down?** "The whole API returns 500" is an answer, but rarely the one you want.

## Never return unbounded lists

The most common way an API falls over is an endpoint like `GET /orders` that returns every row. It works with 50 test records and times out with 500,000 real ones. Every list endpoint should be paginated from day one, with a maximum page size enforced by the server.

Offset pagination (`?page=3&limit=20`) is simple, but it gets slower as the offset grows, because the database still has to walk past every skipped row. It also shows duplicates or skips items when new rows are inserted while someone is paging. For feeds and large tables, use **cursor (keyset) pagination** instead:

```js
// GET /orders?limit=20&cursor=2026-10-01T09:30:00.000Z_8f1c
const [createdAt, id] = decodeCursor(req.query.cursor);
const limit = Math.min(Number(req.query.limit) || 20, 100);

const rows = await db.query(
  `SELECT * FROM orders
   WHERE (created_at, id) < ($1, $2)
   ORDER BY created_at DESC, id DESC
   LIMIT $3`,
  [createdAt, id, limit + 1],
);

const hasMore = rows.length > limit;
const items = rows.slice(0, limit);
res.json({ items, nextCursor: hasMore ? encodeCursor(items.at(-1)) : null });
```

With an index on `(created_at, id)`, page 1,000 is as fast as page 1. Fetching `limit + 1` rows tells you whether there is a next page without a separate `COUNT(*)` query, which is expensive on big tables.

## Kill the N+1 query before it kills you

An N+1 query happens when you load a list and then run one extra query per item: fetch 50 orders, then fetch the customer for each order one by one. That is 51 round trips to the database for one request. Under load, this pattern turns a 40 ms endpoint into a 2-second one.

Fix it by loading related data in one go: a SQL `JOIN`, an `IN (...)` query, your ORM's eager loading, MongoDB's `$lookup`, or a batching layer such as DataLoader for GraphQL. Turn on query logging in development and look at how many queries a single request runs. If the number grows with the size of the response, you have an N+1.

## Put timeouts on everything

A request with no timeout can hang forever, and every hanging request holds a connection, memory and often a database connection from the pool. When a downstream service slows down, these pile up until your own API stops responding. That is how one slow payment provider takes down an entire app.

- Set a timeout on every outgoing HTTP call. With `fetch`, use `AbortSignal.timeout(5000)`.
- Set a statement timeout on the database (in PostgreSQL, `statement_timeout`) so one runaway query can't hold a connection for minutes.
- Size your connection pool deliberately. More connections is not always faster; the database has its own limit, and every instance of your API shares it.

When a dependency keeps failing, stop calling it for a short while instead of queuing more requests behind it. This is the **circuit breaker** pattern, and libraries such as `opossum` for Node.js implement it in a few lines.

## Make retries safe with idempotency keys

Mobile networks drop responses. The client sent `POST /payments`, your server charged the card, and the response never arrived. The app retries, and now the customer has paid twice.

The fix is an **idempotency key**: the client generates a unique ID for each logical operation and sends it in a header. The server stores the key with the result and, if the same key arrives again, returns the stored result instead of repeating the work.

```js
// Client sends: Idempotency-Key: 5f0c2a0e-1d2b-4c1a-9e8f-2b7d3c4a5e6f
const key = req.get("Idempotency-Key");
const previous = await idempotency.find(key, req.user.id);
if (previous) return res.status(previous.status).json(previous.body);

const result = await payments.charge(req.body);
await idempotency.save(key, req.user.id, 201, result);
res.status(201).json(result);
```

Use a unique constraint on the key column so that two identical requests arriving at the same moment can't both slip through. `GET`, `PUT` and `DELETE` are idempotent by definition; it is `POST` that needs this protection, especially for anything involving money, orders or messages.

## Rate-limit before someone else does it for you

Without rate limiting, one buggy client in a retry loop, or one person scraping your API, can use up the capacity meant for everyone. Limit requests per user or API key (and per IP for unauthenticated routes such as login and sign-up), and respond with `429 Too Many Requests` and a `Retry-After` header so well-behaved clients know when to come back.

In NestJS, `@nestjs/throttler` handles this. In Express, `express-rate-limit` does. If you run more than one instance of the API, keep the counters in a shared store such as Redis; otherwise each instance enforces its own separate limit.

## Cache what is read often and changes rarely

The fastest request is the one that never reaches your database. Good candidates for caching are product catalogues, configuration, public profiles and anything computed from data that changes slowly.

- **HTTP caching:** send `Cache-Control` and `ETag` headers on public, read-only endpoints so browsers and CDNs can reuse responses.
- **Application caching:** keep expensive query results in Redis with a short TTL, and clear the key when the underlying data changes.

Decide up front how stale each piece of data is allowed to be. A product price can usually be a minute old; an account balance cannot.

## Move slow work out of the request

Sending emails, generating PDFs, resizing images and calling webhooks do not need to happen before the user gets a response. Put them on a queue (BullMQ with Redis is a common choice in Node.js) and return immediately. The request stays fast, and if the email provider is down, the job retries later instead of failing the user's action.

## Return errors clients can act on

Under load, things will fail. Make failures predictable: use the right status codes (`400` for bad input, `401` and `403` for auth, `404`, `409` for conflicts, `429` for rate limits, `503` when a dependency is down) and one consistent error shape. RFC 9457 ("Problem Details for HTTP APIs") defines a standard JSON format for this, so you don't have to invent one. Never leak stack traces or SQL errors to clients; log them on the server with a request ID that you also return in the response.

## Version the API from the start

Mobile apps stay installed for months after you ship a new version. If you change a response shape, old app versions break. Put a version in the path (`/v1/orders`) or a header, add fields rather than renaming or removing them, and keep the old version running until its traffic has dropped.

## Load test before launch, not after

You don't know where an API breaks until you push it. Tools such as k6, Artillery or autocannon can simulate hundreds of concurrent users against a staging environment with production-like data. Watch three numbers: the p95 response time, the error rate, and the database's CPU and connection count. The first one to hit its limit is your bottleneck, and it is almost never the one you expected.

## A launch-day checklist

- Every list endpoint is paginated with a maximum page size.
- No endpoint runs a number of queries that grows with the size of its response.
- Every outgoing call and database query has a timeout.
- `POST` endpoints that create money, orders or messages accept an idempotency key.
- Login, sign-up and public endpoints are rate-limited.
- Slow side effects run on a queue.
- Errors use proper status codes and one consistent shape.
- The API is versioned.
- It has been load-tested against realistic data.

None of this is exotic. It is a set of habits, and each one is far cheaper to build in on day one than to retrofit while production is on fire. If you are planning an API and want it built this way from the start, [get in touch](/#contact).
