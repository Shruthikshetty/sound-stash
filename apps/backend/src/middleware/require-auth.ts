import { createMiddleware } from "hono/factory";
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "shared/constants";

import type { AppBindings } from "@/types";

import { verifyToken } from "@/lib/token";
/**
 * middle ware to only allow logged in user and
 */
export const requireAuth = createMiddleware<AppBindings>(async (c, next) => {
  // get the token
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : undefined;

  // send response with unauthorize if no token is provided
  if (!token) {
    return c.json(
      {
        message: "unauthorized please login ",
        success: false,
      },
      UNAUTHORIZED,
    );
  }
  try {
    // verify jwt token
    const decodedToken = await verifyToken(token, c.env.JWT_SECRET);

    // check for valid data and user id
    if (!decodedToken || !decodedToken.sub) {
      return c.json(
        {
          message: "authorization expired",
          success: false,
        },
        UNAUTHORIZED,
      );
    }
    // set user id
    const userId = Number(decodedToken.sub);
    c.set("userId", userId);
    // move to next handler
    await next();
  } catch {
    return c.json(
      {
        message: "something went wrong while authorization",
        success: false,
      },
      INTERNAL_SERVER_ERROR,
    );
  }
});
