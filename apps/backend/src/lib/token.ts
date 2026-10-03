//https://hono.dev/docs/middleware/builtin/jwt
//https://hono.dev/docs/helpers/jwt#sign

import type { Context } from "hono";

import { setCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";

import type { UserType } from "@/db/schema";

import { JWT_ALGORITHM, JWT_EXPIRY } from "@/constants/config.constants";

export async function genJwtToken(
  user: Pick<UserType, "id" | "email" | "role">,
  secret: string,
) {
  return await sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + JWT_EXPIRY,
    },
    secret,
    JWT_ALGORITHM,
  );
}

export async function verifyToken(token: string, secret: string) {
  return await verify(token, secret, JWT_ALGORITHM);
}

//set cookies with the populated jwt
export function setAuthCookies(c: Context, token: string) {
  const isDev = c.env?.ENVIRONMENT === "development";
  setCookie(c, "auth_token", token, {
    httpOnly: true, // Prevents client-side JS from reading it (XSS protection)
    secure: !isDev, // Only send over HTTPS (important for Cloudflare) when true
    sameSite: "lax", // Protects against CSRF attacks
    maxAge: JWT_EXPIRY,
    path: "/", // Available for entire site
  });
}
