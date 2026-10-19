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

## Routes
- `GET /api/health` – express health
- `GET /api/health/db` – checks live database query

`src/app.js` contains commented extension points for the team modules. UI and frontend project are not modified.
