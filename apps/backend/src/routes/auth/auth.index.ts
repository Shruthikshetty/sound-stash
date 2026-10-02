import { createRouter } from "@/lib/create-app.js";

import * as handlers from "./auth.handler.js";
import * as routes from "./auth.route.js";

// aggregate all handlers and routes
const router = createRouter().openapi(
  routes.authenticateUser,
  handlers.authenticateUser,
);

export default router;
