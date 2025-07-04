import {
  startQuizService,
  answerQuestionService,
  finishQuizService,
} from "@services/quiz";
import { CreateQuizAttemptData } from "@interfaces/quiz/IQuizAttempt";
import { AnswerQuestionData } from "@interfaces/quiz/IAnswerQuestion";
import { FastifyReply, FastifyRequest } from "fastify";

export class QuizController {
  async startQuiz(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const createQuizAttemptData: CreateQuizAttemptData = request.body as CreateQuizAttemptData;

    const quizAttempt = await startQuizService.execute(createQuizAttemptData);

    reply.status(201).send({
      success: true,
      data: quizAttempt,
    });
  }

  async answerQuestion(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const answerData: AnswerQuestionData = request.body as AnswerQuestionData;

    const userAnswer = await answerQuestionService.execute(answerData);

    reply.status(201).send({
      success: true,
      data: userAnswer,
    });
  }

  async finishQuiz(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { quizAttemptId } = request.params as { quizAttemptId: string };
    const finishData = request.body as { score: number; timeSpent?: number };

    const finishedQuiz = await finishQuizService.execute(quizAttemptId, finishData);

    reply.status(200).send({
      success: true,
      data: finishedQuiz,
    });
  }
}
