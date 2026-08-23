/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Hook } from "@hono/zod-openapi";
import { BAD_REQUEST } from "shared/constants";
import { flattenError } from "zod";

// handles the api zod validation errors this will be used as the default hook for zod open api
const validationErrorHandler: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    console.error(flattenError(result.error));
    return c.json(
      {
        success: false,
        error: flattenError(result.error),
      },
      BAD_REQUEST,
    );
  }

  // if no error return null
  return null;
};

export default validationErrorHandler;
