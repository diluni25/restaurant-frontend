# Tastoria – Aiven Cloud MySQL backend connection

This starter implements **Yuwantha's three assigned tasks only**: Express setup, Prisma configuration, MySQL database connection. It does **not** implement login, menu/order CRUD or other team modules.

## Step 1 – Requirements
- Node.js 20.19+ and npm
- Working Aiven MySQL service (Running)
- MySQL database named `tastoria_db` created in Aiven, or change URL to the existing database name
- Cloud DB username and a **new rotated** password (the old password was shared in chat)
- CA certificate downloaded from Aiven's Connection information section

## Step 2 – Open in VS Code
Unzip, open `restaurant-backend-yuwantha` as the workspace, then in terminal:

```bash
npm install
```

## Step 3 – Add environment file
Copy `.env.example` to `.env`. Replace `DB_USER`, `URL_ENCODED_PASSWORD`, `DB_HOST`, `DB_PORT` with your actual Aiven values.

**Never commit `.env` to Git or send database credentials in chat.** URL-encode special characters in password (for example `@` as `%40`, `#` as `%23`). Use a separate DB account with least-required privileges for application queries.

## Step 4 – Add SSL CA certificate
Save downloaded Aiven CA certificate to `prisma/ca.pem` (exact filename). `.env` references this file via `sslcert=ca.pem&sslaccept=strict` for Prisma's MySQL connector. Do not put Windows backslash paths directly into the URL.

## Step 5 – Check Prisma
```bash
npm run db:validate
npm run prisma:generate
```

The `prisma/schema.prisma` has only a starter `SetupCheck` model (`setup_checks` table). Ask module owners to agree on models/ER diagram before expanding schema.

## Step 6 – Run backend
```bash
npm run check
npm run dev
```

Open:
- `http://localhost:5000/api/health` – Express server
- `http://localhost:5000/api/health/db` – live Prisma/Aiven connection

If server fails on startup, check host, port, fresh password, database name, CA path and network. No DB connection can be tested without live credentials and network access.

## Step 7 – Database migrations (coordinate as one team)
**Do not have all three members run `migrate dev` against the shared cloud DB.** On a separate *development* MySQL database, a designated schema maintainer creates/reviews migrations:
```bash
npm run db:migrate -- --name initial_setup
```
Commit generated `prisma/migrations` files to Git. When approved, apply once against the shared database:
```bash
npm run db:deploy
```

## Step 8 – Frontend
React typically runs at `http://localhost:5173`, Express at `http://localhost:5000`. Health endpoints only are implemented. The current frontend's demo login is not secure authentication and remains unchanged by this backend.

## Responsibility split
- Yuwantha: Express foundation, Prisma config, cloud MySQL connectivity
- Other members: Auth, Menu, Orders, Chefs, CMS, Images, Contact modules after interface agreement

> NOTE: A shared cloud MySQL database is internet reachable with credentials, but your Express API on `localhost:5000` is **not** publicly deployed.
