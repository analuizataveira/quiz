import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { skinRouter } from "./skin.routes";
import { userRouter } from "./user.routes";

export const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(skinRouter, { prefix: "/skin" });
  fastify.register(userRouter, { prefix: "/user" });
};
