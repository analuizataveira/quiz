import { CreateQuestionService } from "./CreateQuestionService";
import {
  createQuestionRepository,
  getQuestionRepository,
  listQuestionRepository,
} from "@repositories/question";
import { ListQuestionService } from "./ListQuestionService";
import { GetQuestionService } from "./GetQuestionService";

export const createQuestionService = new CreateQuestionService(
  createQuestionRepository
);
export const listQuestionService = new ListQuestionService(listQuestionRepository);
export const getQuestionService = new GetQuestionService(getQuestionRepository);
