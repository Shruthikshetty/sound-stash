import { hc } from "hono/client";

import type { AppType } from "backend";

// @TODO build custom client that handles auth and errors

export const appClient = hc<AppType>(
  process.env?.NEXT_PUBLIC_API_URL || "http://localhost:8787",
  {
    init: {
      credentials: "include",
    },
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await fetch(input, init);

      // handle error
      if (!response.ok) {
        const errorBody = (await response
          .clone()
          .json()
          .catch(() => null)) as {
          message?: string;
          error?: string;
        };

        // error message
        const errorMessage =
          errorBody?.message ||
          errorBody?.error ||
          `Request failed with status ${response.status}`;

        throw new Error(errorMessage);
      }

      return response;
    },
  },
);
