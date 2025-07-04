import prisma from "@config/postgres";
import { CreateQuestionRepository } from "./CreateQuestionRepository";
import { ListQuestionRepository } from "./ListQuestionRepository";
import { GetQuestionRepository } from "./GetQuestionRepository";

export const createQuestionRepository = new CreateQuestionRepository(prisma);
export const listQuestionRepository = new ListQuestionRepository(prisma);
export const getQuestionRepository = new GetQuestionRepository(prisma);
