import { HTTPError } from "@config/errors";
import { CreateQuestionData } from "@interfaces/question/ICreateQuestion";
import { CreateQuestionRepository } from "@repositories/question/CreateQuestionRepository";

export class CreateQuestionService {
  private createQuestionRepository: CreateQuestionRepository;

  constructor(createQuestionRepository: CreateQuestionRepository) {
    this.createQuestionRepository = createQuestionRepository;
  }

  async execute(createQuestionData: CreateQuestionData) {
    const { description, optionA, optionB, optionC, optionD, correctAnswer } = createQuestionData;

    // Validate that correctAnswer is valid (A, B, C, or D)
    if (!["A", "B", "C", "D"].includes(correctAnswer)) {
      throw new HTTPError(400, "Correct answer must be A, B, C, or D");
    }

    // Validate that all options are provided
    if (!optionA || !optionB || !optionC || !optionD) {
      throw new HTTPError(400, "All answer options (A, B, C, D) must be provided");
    }

    // Validate that description is provided
    if (!description || description.trim().length === 0) {
      throw new HTTPError(400, "Question description is required");
    }

    return this.createQuestionRepository.execute(createQuestionData);
  }
}
