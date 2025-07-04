import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { questionRouter } from "./question.routes";
import { quizRouter } from "./quiz.routes";
import { userRouter } from "./user.routes";

export const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(questionRouter, { prefix: "/questions" });
  fastify.register(quizRouter, { prefix: "/quiz" });
  fastify.register(userRouter, { prefix: "/user" });
};
