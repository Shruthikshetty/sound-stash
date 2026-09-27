import { createRoute, z } from "@hono/zod-openapi";
import { OK } from "shared/constants";
/*
 * this is used for both login and sign up app only supports oauth
 */
export const authenticateUser = createRoute({
  tags: ["auth"],
  path: "/auth",
  method: "post",
  responses: {
    [OK]: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            success: z.boolean(),
          }),
        },
      },
      description: "auth success response",
    },
  },
  requestBody: {
    content: {
      "application/json": {
        schema: z.object({}),
      },
    },
  },
});

export type AuthenticationUserRoute = typeof authenticateUser;
