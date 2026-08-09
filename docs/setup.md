# Sound Stash: Monorepo Setup

This document details the initial setup of the `sound-stash` monorepo using Bun Workspaces and a Cloudflare Workers Hono backend.

---

## Workspace Structure

The workspace is organized as a monorepo under `apps/`:
- `apps/backend/` - Hono API running on Cloudflare Workers.
- `apps/web/` - React Admin Web UI (to be created).
- `apps/mobile/` - React Native Mobile Player (to be created).

---

## Configuration Details

### 1. Monorepo Root Configuration
The root [package.json](../package.json) maps all projects inside the `apps/` directory using workspaces:
```json
"workspaces": [
  "apps/*"
]
```

### 2. Cloudflare Workers Hono Backend
- The Hono project was initialized inside `apps/backend/` using the `cloudflare-workers` template.
- The `compatibility_date` in [apps/backend/wrangler.jsonc](../apps/backend/wrangler.jsonc) is set to `"2026-08-08"` to match local Wrangler CLI environment limits.
- Dependencies are managed and hoisted to the root level.

---

## Running the Application Locally

To start the Hono backend local development server (runs via Cloudflare Wrangler) from the root:

```bash
bun dev:backend
```

Once started, the server runs at:
- **API Server**: http://127.0.0.1:8787/

You can verify it is running by visiting the root URL, which should respond with `Hello Hono!`.
