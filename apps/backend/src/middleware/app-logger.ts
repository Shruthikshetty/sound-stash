import { pinoLogger } from "hono-pino";

// config for pino logger
export const appLogger = pinoLogger({
  pino: (c) => ({
    enabled: c.env?.ENVIRONMENT === "development", // enable only in development
    level: "debug",
    ...(c.env?.ENVIRONMENT === "development"
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:standard",
              singleLine: true,
              ignore: "pid,hostname",
            },
          },
        }
      : {}),
  }),
  http: {
    reqId: () => crypto.randomUUID(),
    onReqBindings: (c) => ({
      req: {
        url: c.req.url,
      },
    }),
    onResBindings: (c) => ({
      res: {
        status: c.res.status,
      },
    }),
  },
});
