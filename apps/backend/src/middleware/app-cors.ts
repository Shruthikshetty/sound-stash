import { cors } from "hono/cors";

import { LOCALHOST_ORIGIN_REGEX } from "@/constants/regex.constants";

/**
 * app cors middleware
 * containing all the cors configs
 */
const appCors = cors({
  origin: (origin, c) => {
    const isDev =
      (c.env as { ENVIRONMENT?: string } | undefined)?.ENVIRONMENT ===
      "development";
    // in dev allow 3000 port
    if (isDev && origin && LOCALHOST_ORIGIN_REGEX.test(origin)) {
      return origin;
    }

    // in dev allow required domains only
    const allowedOrigins: string[] = []; // will be added when is ready to deploy in production

    if (origin && allowedOrigins.includes(origin)) {
      return origin;
    }
    return null;
  },
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true, // includes cookies , http auth headers , tls certificates
});

export default appCors;
