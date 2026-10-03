// This file contains all the handlers related to the auth routes

import axios from "axios";
import {
  BAD_REQUEST,
  endpoints,
  GENERAL_REQUEST_TIMEOUT,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "shared/constants";

import type { AppRouteHandler } from "@/types";

import { createDB } from "@/db";
import { users } from "@/db/schema";
import { genJwtToken } from "@/lib/token";

import type { AuthenticationUserRoute } from "./auth.route";

//https://developers.google.com/identity/openid-connect/openid-connect#obtainuserinfo
interface GoogleTokenInfo {
  sub: string; // permanent google user id
  email: string;
  name: string;
  picture?: string;
  aud: string; // Google Client ID
  email_verified?: boolean | string;
}

/**
 * handler to handle user authentication / login
 * authenticates using oauth and returns JWT token
 */
export const authenticateUser: AppRouteHandler<
  AuthenticationUserRoute
> = async (c) => {
  const { token } = c.req.valid("json");
  // verify the token received from client
  try {
    //@TODO move as separate util
    //@TODO Switch to standard OIDC JWT verification
    // Fetch Google user info using Axios
    const { data: googleUser } = await axios.get<GoogleTokenInfo>(
      endpoints.GOOGLE_TOKEN_INFO,
      {
        params: { id_token: token },
        timeout: GENERAL_REQUEST_TIMEOUT,
        fetchOptions: {
          cache: "no-store", // Prevents Cloudflare's "Unsupported cache mode: default" error
        },
      },
    );

    // check id client matches
    if (googleUser.aud !== c.env?.GOOGLE_CLIENT_ID) {
      return c.json(
        {
          message: "invalid token",
          success: false,
        },
        UNAUTHORIZED,
      );
    }

    // only allow verified google emails
    if (
      googleUser?.email_verified !== true &&
      googleUser?.email_verified !== "true"
    ) {
      return c.json(
        {
          message: "google email is not verified",
          success: false,
        },
        UNAUTHORIZED,
      );
    }

    // check if user exist
    const db = createDB(c.env.DB);
    let user;

    user = await db.query.users.findFirst({
      where: {
        googleId: googleUser.sub,
      },
    });

    if (!user) {
      // create a new user
      [user] = await db
        .insert(users)
        .values({
          email: googleUser.email,
          name: googleUser.name,
          googleId: googleUser.sub,
          avatar: googleUser.picture,
        })
        // edge case in case 2 simultaneous request go through
        .onConflictDoUpdate({
          target: users.email,
          set: {
            updatedAt: new Date(),
          },
        })
        .returning();
    }

    // issue our backend jwt token
    const jwt = await genJwtToken(user, c.env.JWT_SECRET);

    return c.json(
      {
        message: "auth success",
        success: true,
        data: {
          token: jwt,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        },
      },
      OK,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === BAD_REQUEST ||
        error.response?.status === UNAUTHORIZED
      ) {
        return c.json(
          {
            message: "invalid token or expired google token",
            success: false,
          },
          UNAUTHORIZED,
        );
      } else {
        return c.json(
          {
            message: "something went wrong wile authenticating with google",
            success: false,
          },
          INTERNAL_SERVER_ERROR,
        );
      }
    }
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
