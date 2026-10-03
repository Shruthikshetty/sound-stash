import { hc } from "hono/client";

import createApp from "./lib/create-app";
import configureOpenApi from "./lib/open-api-config";
import auth from "./routes/auth/auth.index";
import base from "./routes/index";

// create app
const app = createApp();

//configure open api
configureOpenApi(app);

//Chain routes so TypeScript preserves the exact schema types
const _routes = app.route("/", base).route("/", auth);

export type AppType = typeof _routes;

//The exact trick from the Hono docs:
const _client = hc<AppType>(""); // hono client alt to axios or fetch
export type Client = typeof _client;
export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args);

export default app;
