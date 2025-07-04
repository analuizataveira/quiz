import { UserController } from "@controllers/UserController";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

export const userRouter: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  const userController = new UserController();

  fastify.post("/", userController.create);
  fastify.get("/", userController.list);
  fastify.get("/:id", userController.get);
  fastify.put("/:id", userController.update);
  fastify.delete("/:id", userController.delete);
};
