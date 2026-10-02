import type { ErrorHandler } from "hono";

import { INTERNAL_SERVER_ERROR } from "shared/constants";

// handles the api zod validation errors this will be used as the default hook for zod open api
const errorHandler: ErrorHandler = (err, c) => {
  console.error(`${err}`);
  return c.json(
    {
      message: "Internal server error",
      success: false,
      errorInfo:
        c.env?.ENVIRONMENT === "development"
          ? `${err instanceof Error ? err.message : String(err)}`
          : undefined,
    },
    INTERNAL_SERVER_ERROR,
  );
};

export default errorHandler;
