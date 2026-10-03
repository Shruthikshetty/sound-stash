# Sound Stash Web

The frontend web application for **Sound Stash**, built with [Next.js](https://nextjs.org/) (App Router), [React 19](https://react.dev/), and [Tailwind CSS v4](https://tailwindcss.com/).

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19, Shadcn UI / Base UI, Lucide Icons
- **Styling**: Tailwind CSS v4
- **Auth**: Google OAuth via `@react-oauth/google`
- **HTTP Client**: Axios

---

## ⚙️ Environment Variables

Create an `.env` file inside `apps/web/`:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
From the monorepo root:

```bash
bun install
```

### 2. Run the Development Server

From the root directory:
```bash
bun dev:web
```

Or from `apps/web`:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔗 Backend Connection

This frontend connects to the **Sound Stash Backend API** running on `http://localhost:8787` (`apps/backend`).

To run both services together:
- **Frontend**: `bun dev:web` (runs on `http://localhost:3000`)
- **Backend**: `bun dev:backend` (runs on `http://localhost:8787`)

