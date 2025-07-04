import { StartQuizService } from "./StartQuizService";
import { AnswerQuestionService } from "./AnswerQuestionService";
import { FinishQuizService } from "./FinishQuizService";
import {
  createQuizAttemptRepository,
  answerQuestionRepository,
  finishQuizAttemptRepository,
} from "@repositories/quiz";
import { getUserRepository } from "@repositories/user";

export const startQuizService = new StartQuizService(
  createQuizAttemptRepository,
  getUserRepository
);
export const answerQuestionService = new AnswerQuestionService(answerQuestionRepository);
export const finishQuizService = new FinishQuizService(finishQuizAttemptRepository);
