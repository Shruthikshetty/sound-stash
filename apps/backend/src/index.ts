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

export default app;
