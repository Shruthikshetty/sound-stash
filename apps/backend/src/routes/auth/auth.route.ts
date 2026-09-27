import { addUserSchema } from "@/db/schema";
import { authUserResponseSchema } from "@/zod-schemas/auth";
import { createRoute, z } from "@hono/zod-openapi";
import { OK } from "shared/constants";
/*
 * this is used for both login and sign up app only supports oauth
 */
export const authenticateUser = createRoute({
  tags: ["auth"],
  path: "/auth",
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: addUserSchema,
        },
      },
      description: "add new or just auth a existing user",
    },
  },
  responses: {
    [OK]: {
      content: {
        "application/json": {
          schema: authUserResponseSchema,
        },
      },
      description: "auth success response",
    },
  },
});

export type AuthenticationUserRoute = typeof authenticateUser;
