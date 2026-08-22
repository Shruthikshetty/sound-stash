import errorHandler from "@/middleware/error-handler";
import { AppBindings } from "@/types";
import { OpenAPIHono } from "@hono/zod-openapi";

export function createRouter() {
  // Zod OpenAPI Hono is an extended Hono class that supports OpenAPI. With it, you can validate values and types using Zod and generate OpenAPI Swagger documentation.
  const router = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: errorHandler,
  });

  return router;
}
export function createApp() {
  const app = createRouter();

  // all added middle wares go here

  // return the app
  return app;
}

export default createApp;
