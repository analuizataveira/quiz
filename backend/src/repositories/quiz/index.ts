import prisma from "@config/postgres";
import { CreateQuizAttemptRepository } from "./CreateQuizAttemptRepository";
import { AnswerQuestionRepository } from "./AnswerQuestionRepository";
import { FinishQuizAttemptRepository } from "./FinishQuizAttemptRepository";

export const createQuizAttemptRepository = new CreateQuizAttemptRepository(prisma);
export const answerQuestionRepository = new AnswerQuestionRepository(prisma);
export const finishQuizAttemptRepository = new FinishQuizAttemptRepository(prisma);
