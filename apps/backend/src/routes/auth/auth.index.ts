// This file contains all the handlers related to the auth routes

import { AppRouteHandler } from "@/types";
import { AuthenticationUserRoute } from "./auth.route";
import { OK } from "shared/constants";

export const authenticateUser: AppRouteHandler<
  AuthenticationUserRoute
> = async (c) => {
  return c.json(
    {
      message: "auth success",
      success: true,
    },
    OK,
  );
};
