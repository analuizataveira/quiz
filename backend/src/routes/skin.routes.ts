import { SkinController } from "@controllers/SkinController";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

export const skinRouter: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  const skinController = new SkinController();

  fastify.post("/", skinController.create);
  fastify.get("/", skinController.list);
  fastify.get("/:id", skinController.get);
};
