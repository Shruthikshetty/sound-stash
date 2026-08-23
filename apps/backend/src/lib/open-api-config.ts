import { AppOpenApi } from "@/types";
import packageJson from "../../package.json" with { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";

const configureOpenApi = (app: AppOpenApi) => {
  // this creates open api doc in json format
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "sound stash backend api",
      description: "api back for the music app sound stash ",
    },
  });

  // using scalar to have a proper display of the doc
  app.get(
    "/reference",
    Scalar({
      url: "/doc",
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        clientKey: "fetch",
        targetKey: "js",
      },
    }),
  );
};

export default configureOpenApi;
