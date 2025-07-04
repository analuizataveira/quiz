import { GetQuestionRepository } from "@repositories/question/GetQuestionRepository";

export class GetQuestionService {
  private getQuestionRepository: GetQuestionRepository;

  constructor(getQuestionRepository: GetQuestionRepository) {
    this.getQuestionRepository = getQuestionRepository;
  }

  async execute(id: string, includeCorrectAnswers: boolean = false) {
    const question = await this.getQuestionRepository.execute(id);

    if (!question) {
      return null;
    }

    // If not including correct answers (for quiz mode), hide the correct answer
    if (!includeCorrectAnswers) {
      const { correctAnswer, ...questionWithoutAnswer } = question;
      return questionWithoutAnswer;
    }

    return question;
  }
}
