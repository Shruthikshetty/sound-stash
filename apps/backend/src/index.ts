import createApp from "./lib/create-app";
import base from "./routes/index";

// create app
const app = createApp();

// all routes go here
const routes = [base];

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
