import {
  createQuestionService,
  getQuestionService,
  listQuestionService,
} from "@services/question";
import { CreateQuestionData } from "@interfaces/question/ICreateQuestion";
import { FastifyReply, FastifyRequest } from "fastify";

export class QuestionController {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const createQuestionData: CreateQuestionData = request.body as CreateQuestionData;

    const questionCreated = await createQuestionService.execute(createQuestionData);

    reply.status(201).send({
      success: true,
      data: questionCreated,
    });
  }

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { difficulty, category, season, limit, offset, includeCorrectAnswers } = request.query as {
      difficulty?: string;
      category?: string;
      season?: string;
      limit?: string;
      offset?: string;
      includeCorrectAnswers?: string;
    };

    const filters = {
      difficulty,
      category,
      season: season ? parseInt(season) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      includeCorrectAnswers: includeCorrectAnswers === 'true',
    };

    const questions = await listQuestionService.execute(filters);

    reply.status(200).send({
      success: true,
      data: questions,
    });
  }

  async get(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };
    const { includeCorrectAnswers } = request.query as { includeCorrectAnswers?: string };

    const question = await getQuestionService.execute(
      id, 
      includeCorrectAnswers === 'true'
    );

    if (!question) {
      reply.status(404).send({
        success: false,
        message: "Question not found",
      });
      return;
    }

    reply.status(200).send({
      success: true,
      data: question,
    });
  }
}
