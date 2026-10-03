import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "@/types";

import appCors from "@/middleware/app-cors";
import { appLogger } from "@/middleware/app-logger";
import errorHandler from "@/middleware/error-handler";
import handleNotFound from "@/middleware/not-found";
import validateEnv from "@/middleware/validate-env";
import validationErrorHandler from "@/middleware/validate-error";

export function createRouter() {
  // Zod OpenAPI Hono is an extended Hono class that supports OpenAPI. With it, you can validate values and types using Zod and generate OpenAPI Swagger documentation.
  const router = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: validationErrorHandler,
  });

  return router;
}
export function createApp() {
  const app = createRouter();

  // all added middlewares go here
  app.use(appCors);
  app.use(validateEnv);
  app.use(appLogger);
  app.notFound(handleNotFound);
  app.onError(errorHandler);

  // return the app
  return app;
}

export default createApp;
