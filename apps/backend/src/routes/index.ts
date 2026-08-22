/**
 * this is the base route of the app
 */
import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "@/lib/create-app";

// create the base route "/"
const router = createRouter().openapi(
  createRoute({
    tags: ["index"],
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
              success: z.boolean(),
            }),
          },
        },
        description: "base route success response",
      },
    },
  }),
  (c) => {
    return c.json(
      {
        message: "welcome to sound stash backend api",
        success: true,
      },
      200,
    );
  },
);

export default router;
