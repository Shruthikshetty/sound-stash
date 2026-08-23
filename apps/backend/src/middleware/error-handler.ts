import { INTERNAL_SERVER_ERROR } from "shared/constants";
import { ErrorHandler } from "hono";

// handles the api zod validation errors this will be used as the default hook for zod open api
const errorHandler: ErrorHandler = (err, c) => {
  console.error(`${err}`);
  return c.json(
    {
      message: "Internal server error",
      success: false,
      errorInfo:
        process.env.NODE_ENV === "development"
          ? `${err instanceof Error ? err.message : String(err)}`
          : undefined,
    },
    INTERNAL_SERVER_ERROR,
  );
};

export default errorHandler;
