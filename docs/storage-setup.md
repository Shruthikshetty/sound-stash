# Cloudflare R2 Storage Setup

This document explains how Cloudflare R2 object storage is configured and used for storing audio files (music) and images (album art, thumbnails, avatars) in **Sound Stash**.

---

## 1. Wrangler R2 Binding Configuration

Configured in [apps/backend/wrangler.jsonc](../apps/backend/wrangler.jsonc):

```jsonc
"r2_buckets": [
  {
    "binding": "STORAGE",
    "bucket_name": "sound-stash-storage"
  }
]
```

- **`binding`**: The variable exposed inside Hono route handlers on `c.env.STORAGE`.
- **`bucket_name`**: The name of the R2 bucket in your Cloudflare account.

---

## 2. Recommended Object Key Structure

Organize files within a single bucket using clean path prefixes:

```text
sound-stash-storage/
├── music/
│   └── {trackId}-{hash}.mp3        # Audio files
├── images/
│   ├── covers/
│   │   └── {trackId}-{hash}.webp   # Album / track cover artwork
│   └── avatars/
│       └── {userId}-{hash}.webp    # User profile photos
```

---

## 3. Update TypeScript Types

To get full TypeScript auto-completion for `c.env.STORAGE` (`R2Bucket`), run:

```bash
bun run cf-typegen:backend
```

---

## 4. Usage in Hono Backend Handlers

Inside any Hono route, access the bucket via `c.env.STORAGE`:

### Upload File (`PUT`)

> [!NOTE]
> **Stream Length Requirement:** Cloudflare R2 requires a known content length when uploading a `ReadableStream`. If a stream has an unknown or chunked length, `put()` will throw an error. Either buffer the file into memory or use `FixedLengthStream`.

#### Option A: Buffer into Memory (`ArrayBuffer`)
Ideal for images, metadata, and smaller audio files:
```typescript
const buffer = await c.req.raw.arrayBuffer();

await c.env.STORAGE.put(`music/${filename}`, buffer, {
  httpMetadata: {
    contentType: "audio/mpeg",
  },
});
```

#### Option B: Stream with Known Length (`FixedLengthStream`)
Recommended for large audio files to avoid Worker memory limits:
```typescript
const contentLength = Number(c.req.header("content-length"));

// R2 requires a known length for streams; FixedLengthStream enforces this
const { readable, writable } = new FixedLengthStream(contentLength);
c.req.raw.body?.pipeTo(writable);

await c.env.STORAGE.put(`music/${filename}`, readable, {
  httpMetadata: {
    contentType: "audio/mpeg",
  },
});
```

### Stream / Download File (`GET`)
```typescript
const object = await c.env.STORAGE.get(`music/${filename}`);
if (!object) {
  return c.text("File not found", 404);
}

const headers = new Headers();
object.writeHttpMetadata(headers);
headers.set("etag", object.httpEtag);

return new Response(object.body, { headers });
```

### Delete File (`DELETE`)
```typescript
await c.env.STORAGE.delete(`music/${filename}`);
```

---

## 5. Local Development vs Production

### Local Development:
- Wrangler emulates R2 automatically using local files stored in `.wrangler/state/v3/r2`.
- No Cloudflare account or internet connection is required during `bun dev:backend`.

### Production Deployment:
1. Log in to Cloudflare (if not logged in):
   ```bash
   cd apps/backend && bunx wrangler login
   ```
2. Create the production R2 bucket in Cloudflare:
   ```bash
   cd apps/backend && bunx wrangler r2 bucket create sound-stash-storage
   ```
3. Deploy your backend:
   ```bash
   bun run deploy:backend
   ```
