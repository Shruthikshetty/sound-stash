# Sound Stash: Monorepo Setup

This document details the setup of the `sound-stash` monorepo using Bun Workspaces, a Cloudflare Workers Hono backend, and a Next.js web application.

---

## Workspace Structure

The workspace is organized as a monorepo under `apps/` and `packages/`:

- `apps/backend/` - Hono REST/OpenAPI service running on Cloudflare Workers (Port `8787`).
- `apps/web/` - Next.js 16 (App Router) web application with React 19 & Tailwind CSS v4 (Port `3000`).
- `apps/mobile/` - React Native mobile player (planned).
- `packages/shared/` - Shared constants, endpoints, and utility functions across apps.

---

## Configuration Details

### 1. Monorepo Root Configuration

The root [package.json](../package.json) manages all applications and packages using workspaces:

```json
"workspaces": [
  "apps/*",
  "packages/*"
]
```

### 2. Cloudflare Workers Hono Backend (`apps/backend`)

- Initialized inside `apps/backend/` using the Hono Cloudflare Workers template.
- Integrated with `@hono/zod-openapi` for typed routes and automatic Swagger/Scalar documentation.
- Database powered by Cloudflare D1 with Drizzle ORM v1 (see [Database Setup Guide](./database-setup.md)).
- Runs locally via Wrangler on `http://localhost:8787`.

### 3. Next.js Web Frontend (`apps/web`)

- Built with **Next.js 16** (App Router), **React 19**, and **Tailwind CSS v4**.
- UI components built with **Base UI / Shadcn** and **Lucide Icons**.
- Authentication integrated with Google Identity Services via `@react-oauth/google`.
- Communicates with the backend on `http://localhost:8787` using Axios with `withCredentials: true` to support HTTP-only session cookies.
- Environment variables (`apps/web/.env`):
  ```env
  NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
  ```

---

## Running the Applications Locally

You can launch apps individually or start the full stack together with a single command from the monorepo root:

### 1. Run Full Stack (Frontend + Backend Concurrently)

```bash
bun dev
```

*Runs both the backend API and the web frontend concurrently using Bun's workspace filter.*

### 2. Run Individual Applications

| Application | Command | Local URL |
| :--- | :--- | :--- |
| **Full Stack** (Both) | `bun dev` | `http://localhost:3000` & `http://localhost:8787` |
| **Web Frontend Only** | `bun dev:web` | [http://localhost:3000](http://localhost:3000) |
| **Backend API Only** | `bun dev:backend` | [http://localhost:8787](http://localhost:8787) |
| **API Interactive Docs** | (When backend is running) | [http://localhost:8787/reference](http://localhost:8787/reference) |

---

## Database Documentation

For detailed instructions on Cloudflare D1 bindings, Drizzle ORM v1 configuration, schemas, and running local/production migrations, refer to the [Database Setup Guide](./database-setup.md).


