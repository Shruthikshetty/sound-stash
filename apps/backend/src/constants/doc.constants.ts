import {
  AppBadRequestErrorSchema,
  AppInternalServerErrorSchema,
  AppNotFoundErrorSchema,
  AppUnauthorizedErrorSchema,
  AppValidationErrorSchema,
} from "@/zod-schemas/validation";

// defines a openapi doc object for zod not found error
export const zodNotFoundDocObject = {
  content: {
    "application/json": {
      schema: AppNotFoundErrorSchema.openapi({
        example: {
          message: "Not found (actual message will be different)",
          success: false,
        },
      }),
    },
  },
  description: "Not found error response",
};

// define validation error doc object
export const zodValidationErrorDocObject = {
  content: {
    "application/json": {
      schema: AppValidationErrorSchema,
    },
  },
  description: "Validation error response",
};

// internal server errors doc object
export const internalServerErrorDocObject = {
  content: {
    "application/json": {
      schema: AppInternalServerErrorSchema,
    },
  },
  description: "Internal server error response",
};

// bad request error doc object
export const badRequestDocObject = {
  content: {
    "application/json": {
      schema: AppBadRequestErrorSchema,
    },
  },
  description: "Bad request error response",
};

// unauthorize error doc object
export const unauthorizeErrorDocObject = {
  content: {
    "application/json": {
      schema: AppUnauthorizedErrorSchema,
    },
  },
  description: "User is not authorized for this action",
};
