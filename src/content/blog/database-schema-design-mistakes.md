Early schema decisions feel harmless. You need to ship, the table has twelve rows, and anything works. Then the product succeeds, the table has twelve million rows, and the "quick" decisions from month one become migrations that need a maintenance window, a rollback plan and a very nervous team.

This post covers the schema mistakes that cost startups the most later on, and the cheap choices that avoid them. Most examples use PostgreSQL, with a section on MongoDB at the end.

## Mistake 1: storing money as a floating-point number

Floating-point numbers can't represent most decimal fractions exactly. In JavaScript, `0.1 + 0.2` is `0.30000000000000004`. Add up a few thousand transactions stored as `float` or `double precision` and the totals stop matching your payment provider's.

Store money as an integer number of the smallest unit (kobo, cents) in a `bigint` column, or as `numeric(14, 2)` if you need decimals in the database. Always store the currency next to the amount:

```sql
CREATE TABLE payments (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  amount_minor  bigint      NOT NULL CHECK (amount_minor >= 0),
  currency      char(3)     NOT NULL,          -- ISO 4217, e.g. 'NGN', 'USD'
  created_at    timestamptz NOT NULL DEFAULT now()
);
```

## Mistake 2: timestamps without time zones

PostgreSQL's `timestamp` type (without time zone) stores a date and time but not which time zone it was in. Once you have users, servers or scheduled jobs in more than one time zone, you can no longer tell when something actually happened.

Use `timestamptz` for every point in time. Despite the name, it doesn't store a time zone; it stores an absolute moment (in UTC) and converts to the session's time zone when you read it. Convert to the user's local time in the app, not in the database. If you need a user's time zone for scheduling (for example, "send at 9am local time"), store it separately as an IANA name such as `Africa/Lagos`.

## Mistake 3: no constraints, because "the app validates it"

Application validation has gaps. A background job skips it, a script written at 2am skips it, a second service written by another team skips it. The database is the only layer every write goes through, so it is the right place for the rules that must never be broken:

- `NOT NULL` on every column that must have a value. Nullable should be a decision, not a default.
- `UNIQUE` on things that must be unique, such as emails (consider a unique index on `lower(email)`) and external IDs.
- `FOREIGN KEY` constraints so you can't have orders pointing at deleted customers.
- `CHECK` constraints for simple rules: amounts that can't be negative, statuses from a known list.

Constraints also document the data model for the next developer, which matters more than it sounds.

## Mistake 4: missing indexes on foreign keys and filters

PostgreSQL automatically indexes primary keys and unique constraints. It does **not** automatically index foreign key columns. So `orders.customer_id` has no index unless you create one, and every "orders for this customer" query, and every delete on `customers`, scans the whole `orders` table.

Index the columns you filter, join and sort by. For queries that filter on one column and sort by another, a composite index in that order is usually what you want:

```sql
-- "this customer's orders, newest first"
CREATE INDEX CONCURRENTLY orders_customer_created_idx
  ON orders (customer_id, created_at DESC);
```

`CONCURRENTLY` builds the index without blocking writes, which is what you want on a live table. Then check that your queries actually use it with `EXPLAIN ANALYZE`. Don't index everything, though: every index slows down writes and takes disk space.

## Mistake 5: choosing IDs without thinking

Sequential integer IDs are compact and fast, but they leak information (anyone can see you have 312 orders) and make it easy to guess other records' URLs. Random UUIDs (v4) fix that but scatter inserts across the index, which hurts write performance on large tables.

A good middle ground for most new projects is a **time-ordered UUID (UUIDv7)**: unique, not guessable from one another in practice, and roughly sequential, so indexes stay efficient. PostgreSQL 18 has a built-in `uuidv7()` function; on older versions, generate them in the application. Whatever you pick, use it consistently, and never expose internal IDs as the only authorization check: always verify the user is allowed to see the record.

## Mistake 6: storing everything in one JSON column

`jsonb` in PostgreSQL is excellent for data whose shape really varies, such as webhook payloads or per-integration settings. It is a trap for core data. Fields inside a JSON blob have no types, no constraints and no foreign keys, they are awkward to index, and every developer has to remember the shape.

A useful rule: if you filter, join, sort or report on a field, it should be a real column. Keep JSON for the parts you only ever read back whole.

## Mistake 7: deleting data you will need later

Hard-deleting rows looks clean until a customer disputes a charge from an account that no longer exists, or someone deletes a product that appears on a thousand past invoices. Decide early which entities can be deleted and which should be archived.

Soft deletes (a `deleted_at timestamptz` column) are one option, but they need discipline: every query must filter them out, and unique constraints should usually ignore deleted rows (a partial index with `WHERE deleted_at IS NULL`). For financial records, a better pattern is to never delete at all and record changes as new rows, so you always have a history.

## Mistake 8: migrations that lock production

Some schema changes are instant, others rewrite the whole table and block reads and writes while they run. Know which is which before you run them on a big table:

- Adding a nullable column, or (since PostgreSQL 11) a column with a constant default, is fast.
- Changing a column's type usually rewrites the table.
- Adding a `NOT NULL` constraint or a foreign key checks every existing row. Add the constraint as `NOT VALID` first, then `VALIDATE` it separately, which takes a weaker lock.
- Creating an index without `CONCURRENTLY` blocks writes until it finishes.

Run every schema change as a versioned migration file in the repository (with tools like Prisma Migrate, TypeORM migrations, Knex, Alembic or plain SQL files), never by hand in a production console. And set a `lock_timeout` in migrations so that a change waiting for a lock fails fast instead of queuing every other query behind it.

## If you are on MongoDB

"Schemaless" doesn't mean there is no schema; it means the schema lives in your code, where nothing enforces it. The same principles apply, with a few MongoDB-specific ones:

- **Embed what you read together, reference what grows.** Embedding an order's line items in the order document is great. Embedding every comment a post will ever receive is not: arrays that grow without limit make documents huge, and a single document can't exceed 16 MB.
- **Validate on the server.** MongoDB supports `$jsonSchema` validation on collections. Use it for required fields and types, on top of Mongoose or Zod validation in the app.
- **Index your queries.** The same rules as SQL apply. Check slow queries with `explain()` and look out for collection scans (`COLLSCAN`).
- **Use transactions where money moves.** Multi-document transactions are available on replica sets. Use them when two documents must change together.

## A schema review checklist

- Money is an integer in minor units (or `numeric`), with a currency column.
- Every point in time is `timestamptz`.
- Required columns are `NOT NULL`, and uniqueness and relations are enforced with constraints.
- Foreign keys and frequent filters are indexed, and the indexes are confirmed with `EXPLAIN ANALYZE`.
- The ID strategy is deliberate and consistent.
- Core fields are columns, not keys inside a JSON blob.
- There is a clear rule for what gets deleted and what gets archived.
- Every change is a versioned migration that has been checked for locking.

A schema is the one part of an application that is genuinely hard to change later, because the data outlives the code. An hour spent on it at the start saves weeks of migrations later. If you would like a second pair of eyes on yours, [get in touch](/#contact).
