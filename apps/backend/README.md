# Sound Stash Backend API

The backend API for **Sound Stash**, a full-stack music application suite. This service runs on [Cloudflare Workers](https://workers.cloudflare.com/) and is built using [Hono](https://hono.dev/) with full [zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi) integration.

---

## 🚀 Features

- **High-Performance Runtime**: Deployable to Cloudflare Workers for ultra-low latency.
- **Type-Safe & Validated Routes**: Uses `@hono/zod-openapi` for runtime validation and automatic TypeScript typings.
- **Interactive Documentation**: Auto-generated interactive API reference UI using Scalar.
- **Structured Logging**: Built-in request/response logging using `pino` and `hono-pino`.
- **Database Ready**: Includes `drizzle-orm` for database interactions.

---

## 📖 API Documentation & Reference

This application automatically generates and exposes OpenAPI specifications and interactive docs:

- **Interactive API Reference**: [http://127.0.0.1:8787/reference](http://127.0.0.1:8787/reference) (via Scalar UI)
- **OpenAPI JSON Spec**: [http://127.0.0.1:8787/doc](http://127.0.0.1:8787/doc)

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh) (recommended for the workspace) or Node.js/NPM installed.

### Installation

From the monorepo root directory, install all dependencies:

```bash
bun install
```

### Running Locally

You can start the development server in two ways:

#### Option A: From the Monorepo Root (Recommended)

Use the workspace command:

```bash
bun dev:backend
```

#### Option B: From the Backend Directory (`apps/backend`)

Change directory to the backend and run wrangler:

```bash
cd apps/backend
npm run dev
# or
bun run dev
```

Once started, the API server will run at `http://127.0.0.1:8787`.

---

## 🧰 Development Commands

- **Local Dev Server**: `npm run dev` / `wrangler dev` (starts the local wrangler server)
- **Type Generation**: `npm run cf-typegen` (generates the `CloudflareBindings` types based on local worker configurations)
- **Deploying**: `npm run deploy` (deploys your worker and minifies the build)

---

## 📂 Project Structure

```text
apps/backend/
├── src/
│   ├── index.ts              # Entry point & route orchestration
│   ├── types.ts              # Common typescript types & bindings
│   ├── lib/
│   │   ├── create-app.ts     # App/Router instantiation & configuration
│   │   └── open-api-config.ts# OpenAPI & Scalar reference configuration
│   ├── middleware/           # Custom middleware (logging, error handling, etc.)
│   └── routes/               # API routes & route-specific schema validation
├── wrangler.jsonc            # Cloudflare Wrangler configuration
└── package.json              # Local dependencies and scripts
```
