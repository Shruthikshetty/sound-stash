import { z } from "zod";

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
