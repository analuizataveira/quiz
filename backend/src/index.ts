import { fastify, FastifyInstance } from "fastify";
import { router } from "./routes";
import fastifyCors from "@fastify/cors";
import prismaPlugin from "./config/prisma";
import { errorHandler } from "@middlewares/ErrorHandler";

const server: FastifyInstance = fastify({
  logger: true,
});

server.register(prismaPlugin);

server.register(fastifyCors, {
  origin: ["*"],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD"],
});

server.register(router);

server.setErrorHandler(errorHandler);

const serverOptions: { host: string; port?: number } = {
  host: "0.0.0.0",
  port: 3000,
};

server.listen(serverOptions, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
