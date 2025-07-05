import { ListQuestionRepository } from "@repositories/question/ListQuestionRepository";

export class ListQuestionService {
  private listQuestionRepository: ListQuestionRepository;

  constructor(listQuestionRepository: ListQuestionRepository) {
    this.listQuestionRepository = listQuestionRepository;
  }

  async execute(filters?: {
    difficulty?: string;
    category?: string;
    season?: number;
    limit?: number;
    offset?: number;
    includeCorrectAnswers?: boolean;
  }) {
    const questions = await this.listQuestionRepository.execute(filters);

    // Always return all fields including correctAnswer
    return questions;
  }
}
