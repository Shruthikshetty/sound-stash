import { appClient } from "@/lib/api-client";
import { OK } from "shared/constants";
import { type InferRequestType, type InferResponseType } from "hono/client";

// auth post response only
export type AuthPostSuccessResponse = InferResponseType<
  typeof appClient.auth.$post,
  typeof OK
>;

// auth post request body
export type AuthPostRequest = InferRequestType<typeof appClient.auth.$post>;
