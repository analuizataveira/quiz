import { GetQuestionRepository } from "@repositories/question/GetQuestionRepository";

export class GetQuestionService {
  private getQuestionRepository: GetQuestionRepository;

  constructor(getQuestionRepository: GetQuestionRepository) {
    this.getQuestionRepository = getQuestionRepository;
  }

  async execute(id: string, includeCorrectAnswers: boolean = true) {
    const question = await this.getQuestionRepository.execute(id);

    if (!question) {
      return null;
    }

    // Always return all fields including correctAnswer
    return question;
  }
}
