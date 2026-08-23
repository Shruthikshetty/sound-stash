// middle ware to handle not found routes

import { NotFoundHandler } from "hono";
import { NOT_FOUND } from "shared/constants";

const handleNotFound: NotFoundHandler = (c) => {
  return c.json(
    {
      success: false,
      message: "route not found",
    },
    NOT_FOUND,
  );
};

export default handleNotFound;
