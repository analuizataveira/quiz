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

    // If not including correct answers (for quiz mode), hide the correct answer
    if (!filters?.includeCorrectAnswers) {
      return questions.map(question => {
        const { correctAnswer, ...questionWithoutAnswer } = question;
        return questionWithoutAnswer;
      });
    }

    return questions;
  }
}
