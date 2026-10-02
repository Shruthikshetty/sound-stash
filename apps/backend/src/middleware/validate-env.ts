import { createMiddleware } from "hono/factory";
import { INTERNAL_SERVER_ERROR } from "shared/constants";
import { flattenError } from "zod";

import type { AppBindings } from "@/types";

import { envSchema } from "@/zod-schemas/env";

// local variable to prevent recheck
let isEnvValidated = false;

/**
 * Validates required environment variables once per worker lifecycle.
 * Fails fast on the first incoming request if configuration is missing.
 */
export const validateEnv = createMiddleware<AppBindings>(async (c, next) => {
  if (!isEnvValidated) {
    const result = envSchema.safeParse(c.env);
    if (!result.success) {
      const errors = flattenError(result.error);

      console.error("Environment Variables Misconfigured:", errors);

      return c.json(
        {
          success: false,
          message: "Server environment variables are misconfigured",
          errors,
        },
        INTERNAL_SERVER_ERROR,
      );
    }

    // set local variable to prevent recheck
    isEnvValidated = true;
  }

  // pass the request to the next middleware
  await next();
});

export default validateEnv;
