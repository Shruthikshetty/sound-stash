/**
 * route to get user profile data
 */

import { createRoute } from "@hono/zod-openapi";
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "shared/constants";

import {
  internalServerErrorDocObject,
  unauthorizeErrorDocObject,
  zodNotFoundDocObject,
} from "@/constants/doc.constants";
import { getUserProfileData } from "@/zod-schemas/auth";

export const getUserProfile = createRoute({
  tags: ["profile"],
  path: "/profile",
  method: "post",
  description: "get user profile",
  responses: {
    [OK]: {
      content: {
        "application/json": {
          schema: getUserProfileData,
        },
      },
      description: "user profile",
    },
    [NOT_FOUND]: zodNotFoundDocObject,
    [INTERNAL_SERVER_ERROR]: internalServerErrorDocObject,
    [UNAUTHORIZED]: unauthorizeErrorDocObject,
  },
});

export type GetUserProfileRoute = typeof getUserProfile;
