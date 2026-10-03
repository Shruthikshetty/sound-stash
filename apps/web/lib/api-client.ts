import { hc } from "hono/client";

import type { AppType } from "backend";

// @TODO build custom client that handles auth and errors

export const appClient = hc<AppType>(
  process.env?.NEXT_PUBLIC_API_URL || "http://localhost:8787",
  {
    init: {
      credentials: "include",
    },
  },
);
