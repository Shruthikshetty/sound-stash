import { createRouter } from "@/lib/create-app.js";
import { requireAuth } from "@/middleware/require-auth";

import * as handlers from "./profile.handler.js";
import * as routes from "./profile.route.js";

// aggregate all handlers and routes
const router = createRouter();
// apply middleware
router.use("*", requireAuth);
// apply openapi routes
router.openapi(routes.getUserProfile, handlers.getUserProfile);

export default router;
