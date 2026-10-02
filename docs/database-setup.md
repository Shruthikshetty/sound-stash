# Sound Stash: Database Setup (Cloudflare D1 + Drizzle)

A quick guide on how Cloudflare D1 and Drizzle ORM were configured in `apps/backend`.

---

## 1. Installed Dependencies

Installed inside `apps/backend/package.json`:

```bash
# Core ORM and D1 driver
bun add drizzle-orm drizzle-zod

# CLI and migration tools
bun add -D drizzle-kit
```

---

## 2. Cloudflare D1 Binding

Configured in [apps/backend/wrangler.jsonc](../apps/backend/wrangler.jsonc):

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "sound-stash-db",
    "database_id": "local-dev-db-id"
  }
]
```
* In local development (`wrangler dev`), Wrangler emulates D1 automatically using SQLite in `.wrangler/state/`.

---

## 3. Drizzle Kit Configuration

Configured in [apps/backend/drizzle.config.ts](../apps/backend/drizzle.config.ts):

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "sqlite",
});
```

---

## 4. Drizzle Client Setup

Configured in [apps/backend/src/db/index.ts](../apps/backend/src/db/index.ts). 

Because `c.env.DB` is provided per-request in Cloudflare Workers, we export a factory function rather than a static client:

```typescript
import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema/index";

// In Drizzle v1, defineRelations prepares relational queries (RQB v2)
const relations = defineRelations(schema);

export function createDB(d1: D1Database) {
  return drizzle(d1, {
    relations,
  });
}

export type AppDB = ReturnType<typeof createDB>;
```

---

## 5. Essential Commands

| Task | Command |
| :--- | :--- |
| **Generate TypeScript types** for bindings (`c.env.DB`) | `bun cf-typegen:backend` |
| **Generate SQL migrations** from schemas | `bun --filter backend drizzle-kit generate` |
| **Apply migrations to local D1** | `bun --filter backend wrangler d1 migrations apply sound-stash-db --local` |
| **Apply migrations to production D1** | `bun --filter backend wrangler d1 migrations apply sound-stash-db --remote` |

---

## 6. Production Deployment Steps

Follow these steps when you are ready to deploy your database and backend to Cloudflare:

### Step 1: Log in to Cloudflare
```bash
bun --filter backend wrangler login
```

### Step 2: Create the Remote D1 Database
Create the production database in your Cloudflare account:
```bash
bun --filter backend wrangler d1 create sound-stash-db
```
Wrangler will output your database configuration:
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "sound-stash-db",
    "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }
]
```

### Step 3: Update `wrangler.jsonc`
Open [apps/backend/wrangler.jsonc](../apps/backend/wrangler.jsonc) and replace the placeholder `"local-dev-db-id"` with your real `database_id` UUID from Step 2:
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "sound-stash-db",
    "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" // <-- Paste real UUID here
  }
]
```

### Step 4: Apply Migrations to Remote D1
Run your schema migrations against the live Cloudflare database:
```bash
bun --filter backend wrangler d1 migrations apply sound-stash-db --remote
```

### Step 5: Upload Production Secrets
Cloudflare Workers cannot read local `.dev.vars` in production. Add your production secrets securely:
```bash
bun --filter backend wrangler secret put JWT_SECRET
bun --filter backend wrangler secret put GOOGLE_CLIENT_ID
bun --filter backend wrangler secret put GOOGLE_SECRET
```

### Step 6: Deploy the Backend Worker
Deploy your backend worker to Cloudflare:
```bash
bun run deploy:backend
```

