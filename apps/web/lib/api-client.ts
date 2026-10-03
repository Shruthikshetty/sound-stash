import { hc } from "hono/client";

import type { AppType } from "backend";

export const appClient = hc<AppType>(
  process.env?.NEXT_PUBLIC_API_URL || "http://localhost:8787",
  {
    init: {
      credentials: "include",
    },
  },
);
