/**
 * handler to get the user profile data
 */

import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "shared/constants";

import type { AppRouteHandler } from "@/types";

import { createDB } from "@/db";

import type { GetUserProfileRoute } from "./profile.route";

export const getUserProfile: AppRouteHandler<GetUserProfileRoute> = async (
  c,
) => {
  try {
    const userId = c.get("userId");
    // get the user profile by userId
    if (!userId) {
      return c.json(
        {
          message: "unauthorized",
          success: false,
        },
        UNAUTHORIZED,
      );
    }
    const db = createDB(c.env.DB);
    // get the user data
    const user = await db.query.users.findFirst({
      where: {
        id: userId,
      },
    });
    // id no user found
    if (!user) {
      return c.json(
        {
          message: "user data not found",
          success: false,
        },
        NOT_FOUND,
      );
    }
    // send user data
    return c.json(
      {
        message: "success",
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      OK,
    );
  } catch {
    // unknown error or uncaught error
    return c.json(
      {
        message: "something went wrong please try again",
        success: false,
      },
      INTERNAL_SERVER_ERROR,
    );
  }
};
