import {
  badRequestDocObject,
  internalServerErrorDocObject,
  zodValidationErrorDocObject,
} from "@/constants/doc.constants";
import { addUserSchema } from "@/db/schema";
import { authUserResponseSchema } from "@/zod-schemas/auth";
import { AppNotFoundErrorSchema } from "@/zod-schemas/validation";
import { createRoute, z } from "@hono/zod-openapi";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "shared/constants";
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
          schema: z.object({
            token: z.string(),
          }),
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
    [BAD_REQUEST]: zodValidationErrorDocObject,
    [INTERNAL_SERVER_ERROR]: internalServerErrorDocObject,
    [NOT_FOUND]: AppNotFoundErrorSchema,
  },
});

export type AuthenticationUserRoute = typeof authenticateUser;
