# Tastoria Restaurant Backend (Yuwantha Setup)

Node.js + Express + Prisma 6 + MySQL backend starter.

See [AIVEN_SETUP_SINHALA.md](./AIVEN_SETUP_SINHALA.md) for step-by-step Aiven cloud MySQL connection instructions.

## Scripts
- `npm install` – install dependencies
- `npm run db:validate` – Prisma schema validation
- `npm run prisma:generate` – generate Prisma client
- `npm run check` – JS syntax checks
- `npm run dev` – development API on port 5000
- `npm run db:migrate -- --name initial_setup` – create migration in *isolated development database* (schema maintainer only)
- `npm run db:deploy` – apply approved migrations to cloud database
- `npm run db:seed` – upsert starter menu categories and menu items

## Database models
- Admin users with role and active-state fields; create users through a future authenticated admin workflow rather than seeding a shared password.
- Menu categories and menu items, including availability, display order, and decimal prices.
- Orders and order items, with order-item name and price snapshots so menu edits do not rewrite order history.
- Reservations with requested date/time, party size, and workflow status.
- Guest inquiries with topic, preferred date, reply, and workflow status.

The initial MySQL migration is in `prisma/migrations/`. For a disposable local development database, run `npm run db:migrate -- --name initial_restaurant_schema`, then `npm run db:seed`. For a configured deployment database, use `npm run db:deploy` to apply reviewed migrations; do not run the development migration command against production.

## Routes
- `GET /api/health` – express health
- `GET /api/health/db` – checks live database query

`src/app.js` contains commented extension points for the team modules. UI and frontend project are not modified.
