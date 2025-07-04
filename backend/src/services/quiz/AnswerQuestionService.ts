import { HTTPError } from "@config/errors";
import { AnswerQuestionData } from "@interfaces/quiz/IAnswerQuestion";
import { AnswerQuestionRepository } from "@repositories/quiz/AnswerQuestionRepository";

export class AnswerQuestionService {
  private answerQuestionRepository: AnswerQuestionRepository;

  constructor(answerQuestionRepository: AnswerQuestionRepository) {
    this.answerQuestionRepository = answerQuestionRepository;
  }

  async execute(answerData: AnswerQuestionData) {
    try {
      return await this.answerQuestionRepository.execute(answerData);
    } catch (error: any) {
      if (error.message === "Question not found") {
        throw new HTTPError(404, "Question not found");
      }
      throw error;
    }
  }
}
