import { QuizController } from "@controllers/QuizController";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

export const quizRouter: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  const quizController = new QuizController();

  fastify.post("/start", quizController.startQuiz);
  fastify.post("/answer", quizController.answerQuestion);
  fastify.put("/:quizAttemptId/finish", quizController.finishQuiz);
};
