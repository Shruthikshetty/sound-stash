// This file contains all the handlers related to the auth routes

import { AppRouteHandler } from "@/types";
import { AuthenticationUserRoute } from "./auth.route";
import { OK } from "shared/constants";

export const authenticateUser: AppRouteHandler<
  AuthenticationUserRoute
> = async (c) => {
  const { googleId } = c.req.valid("json");
  // verify the token received from client

  // get the response from google

  // check if the user exist inn our app create or login

  // issue our backend jwt token

  return c.json(
    {
      message: "auth success",
      success: true,
    },
    OK,
  );
};
