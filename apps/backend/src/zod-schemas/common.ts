import { z } from "zod";

export const apiResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
  requestId: z.string().optional(),
});
