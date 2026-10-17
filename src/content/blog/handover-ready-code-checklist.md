Many startups have lived this story: a developer builds the first version of the product, moves on, and the next developer opens the repository and finds no README, no list of environment variables, no idea how to run it locally and no record of why anything was built the way it was. The first month of the new contract goes on archaeology instead of features.

Handover-ready code is code that someone who has never seen it can run, understand, change and deploy without calling the person who wrote it. This checklist covers what that takes, and what founders should ask for from any developer they hire.

## 1. A README that gets someone running in 15 minutes

The README is the front door. At minimum it should answer:

- **What is this?** One paragraph on what the product does and who uses it.
- **How do I run it locally?** The exact commands, in order, from a fresh clone to a working app. Include required versions of Node.js, Python or the database.
- **How is it structured?** A short map of the main folders and where the important logic lives.
- **How do I deploy it?** Where it is hosted, how a deploy is triggered, and how to roll back.
- **Who do I ask?** Links to the issue tracker, design files and any other documentation.

The test is simple: give the README to someone new and watch them follow it. Every place they get stuck is a missing line.

## 2. Every environment variable documented

Configuration that only exists on one laptop or one hosting dashboard is lost the day that person leaves. Commit a `.env.example` file that lists every variable the app reads, with a comment explaining each one and a safe example value:

```bash
# PostgreSQL connection string for the main database
DATABASE_URL=postgresql://user:password@localhost:5432/app_dev

# Secret used to sign session tokens. Generate with: openssl rand -hex 32
SESSION_SECRET=change-me

# Paystack secret key (test key for local development)
PAYSTACK_SECRET_KEY=sk_test_xxx
```

Never commit real secrets. Keep production values in the hosting platform's secret manager or a password manager the client controls, and validate required variables when the app starts, so a missing one fails loudly instead of causing strange bugs later.

## 3. One command to set up, one command to run

New developers shouldn't have to piece together a setup from scattered notes. Provide scripts for the common tasks, through `package.json` scripts, a `Makefile` or a task runner:

- install dependencies
- start the app in development
- run database migrations and seed sample data
- run tests and linting
- build for production

If the app depends on services like PostgreSQL, Redis or a queue, a `docker-compose.yml` that starts them locally removes a whole category of "works on my machine" problems.

## 4. Database changes as migrations, with seed data

The database schema should be fully reproducible from the repository. Every change goes in a versioned migration file, applied in order, so anyone can rebuild the schema from scratch and every environment matches. A seed script that creates realistic sample data (a test admin, a few customers, some orders) lets the next developer see the app working within minutes instead of clicking through it to create data by hand.

## 5. Consistent, readable code

Readable code is mostly consistent code. Agree on conventions and let tools enforce them:

- A formatter (Prettier, Black) and a linter (ESLint, Ruff) with the configuration committed, run automatically in CI.
- TypeScript, or type hints in Python, so the shape of data is written down in the code.
- Clear names over clever ones. `calculateDeliveryFee` beats `calc2`.
- Comments that explain **why**, not what. The code already says what it does; the comment should say why it does it that way, especially when the reason isn't obvious ("Paystack sends this webhook twice, so we check the reference first").

## 6. Tests on the parts that matter most

Not every line needs a test, but the code that handles money, permissions and core business rules does. Tests are documentation that can't go out of date: they show the next developer how the system is supposed to behave and warn them when a change breaks something. A small number of meaningful tests is worth more than high coverage of trivial code.

## 7. Continuous integration and repeatable deploys

Deploying shouldn't depend on one person's laptop or memory. Set up a pipeline (GitHub Actions, GitLab CI or your host's built-in CI) that runs linting, tests and a build on every pull request, and deploys automatically from the main branch. Document how to roll back a bad deploy. When deployment is a button or a merge, the new developer can ship on day one.

## 8. A record of the important decisions

Six months later, nobody remembers why the app uses MongoDB for one service and PostgreSQL for another, or why the payment webhook is processed on a queue. Write it down. **Architecture Decision Records (ADRs)** are a lightweight way to do this: a short Markdown file per significant decision, covering the context, the decision and its consequences. Five ADRs can save weeks of second-guessing.

Also document the external services the app depends on (payments, email, SMS, storage, analytics), what each one is used for, and where its dashboard is.

## 9. API documentation

If the project has an API, especially one a mobile app or partner uses, document every endpoint: its parameters, request and response shapes, errors and authentication. An OpenAPI (Swagger) specification is the standard way to do this. Frameworks like NestJS and FastAPI can generate it from the code, so it stays accurate as the API changes.

## 10. Access and ownership transferred properly

Code is only part of a handover. The client should own, or be able to take over, every account the product runs on:

- the code repository
- hosting and the database
- the domain name and DNS
- app store accounts (Apple App Store, Google Play)
- third-party services (payments, email, analytics, error monitoring)

Make a list, transfer ownership or add the client as an owner, and rotate any secrets the outgoing developer had access to. A product whose domain is registered to a former freelancer's personal account is one expired card away from going offline.

## The handover checklist

- A README that takes a new developer from clone to running app.
- `.env.example` documents every variable, and no real secrets are in the repository.
- Scripts for setup, running, migrations, tests and builds.
- Versioned migrations and seed data.
- Formatter, linter and types configured and enforced.
- Tests on money, permissions and core rules.
- CI that tests every change, with documented deploys and rollbacks.
- ADRs for major decisions, plus a list of external services.
- API documentation, ideally OpenAPI.
- Every account owned by the client, and secrets rotated.

Handover-ready code is a sign of respect for whoever works on the product next, and that might be the original developer, a year later, having forgotten everything. If you want a product built this way, or need help getting an inherited codebase into this shape, [get in touch](/#contact).
