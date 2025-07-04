import { HTTPError } from "@config/errors";
import { FinishQuizAttemptData } from "@interfaces/quiz/IQuizAttempt";
import { FinishQuizAttemptRepository } from "@repositories/quiz/FinishQuizAttemptRepository";

export class FinishQuizService {
  private finishQuizAttemptRepository: FinishQuizAttemptRepository;

  constructor(finishQuizAttemptRepository: FinishQuizAttemptRepository) {
    this.finishQuizAttemptRepository = finishQuizAttemptRepository;
  }

  async execute(quizAttemptId: string, finishData: FinishQuizAttemptData) {
    try {
      return await this.finishQuizAttemptRepository.execute(quizAttemptId, finishData);
    } catch (error: any) {
      throw new HTTPError(500, "Failed to finish quiz attempt");
    }
  }
}
