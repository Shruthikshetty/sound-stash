import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

// binds addition properties
export interface AppBindings {
  Bindings: CloudflareBindings & {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_SECRET: string;
    AUTH_REDIRECT: string;
    JWT_SECRET: string;
    ENVIRONMENT?: string;
  };
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenApi = OpenAPIHono<AppBindings>;

export type AppRouteHandler<T extends RouteConfig> = RouteHandler<
  T,
  AppBindings
>;
