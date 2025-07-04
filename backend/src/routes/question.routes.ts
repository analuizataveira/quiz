import { QuestionController } from "@controllers/QuestionController";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

export const questionRouter: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  const questionController = new QuestionController();

  fastify.post("/", questionController.create);
  fastify.get("/", questionController.list);
  fastify.get("/:id", questionController.get);
};
