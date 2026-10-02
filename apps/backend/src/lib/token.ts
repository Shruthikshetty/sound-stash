//https://hono.dev/docs/middleware/builtin/jwt
//https://hono.dev/docs/helpers/jwt#sign

import { JWT_ALGORITHM, JWT_EXPIRY } from "@/constants/config.constants";
import { UserType } from "@/db/schema";
import { sign, verify } from "hono/jwt";

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
