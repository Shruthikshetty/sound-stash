import { z } from "zod";

import { selectUserSchema } from "@/db/schema";

import { apiResponseSchema } from "./common";

// success response for authenticating user
export const authUserResponseSchema = apiResponseSchema.extend({
  data: z.object({
    token: z.string(),
    user: z.object({
      id: z.number(),
      name: z.string().nullish(),
      email: z.string(),
      role: z.string(),
    }),
  }),
});

// get user schema
export const getUserProfileData = apiResponseSchema.extend({
  data: selectUserSchema.pick({
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  }),
});
