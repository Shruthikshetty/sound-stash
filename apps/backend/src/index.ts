import createApp from "./lib/create-app";
import configureOpenApi from "./lib/open-api-config";
import base from "./routes/index";

// create app
const app = createApp();

//configure open api
configureOpenApi(app);

// all routes go here
const routes = [base];

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
