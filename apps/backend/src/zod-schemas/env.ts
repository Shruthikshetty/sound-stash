import { z } from "zod";

export const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is missing or empty"),
  GOOGLE_SECRET: z.string().min(1, "GOOGLE_SECRET is missing or empty"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is missing or empty"),
  AUTH_REDIRECT: z
    .string()
    .min(1, "AUTH_REDIRECT is missing or empty")
    .optional(),
  ENVIRONMENT: z.string().optional(),
});
