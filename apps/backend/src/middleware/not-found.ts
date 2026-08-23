// middle ware to handle not found routes

import { NotFoundHandler } from "hono";
import { UNPROCESSABLE_ENTITY } from "shared/constants";

const handleNotFound: NotFoundHandler = (c) => {
  return c.json(
    {
      success: false,
      message: "route not found",
    },
    UNPROCESSABLE_ENTITY,
  );
};

export default handleNotFound;
