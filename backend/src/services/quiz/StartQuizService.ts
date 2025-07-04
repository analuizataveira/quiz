import { HTTPError } from "@config/errors";
import { CreateQuizAttemptData } from "@interfaces/quiz/IQuizAttempt";
import { CreateQuizAttemptRepository } from "@repositories/quiz/CreateQuizAttemptRepository";
import { GetUserRepository } from "@repositories/user/GetUserRepository";

export class StartQuizService {
  private createQuizAttemptRepository: CreateQuizAttemptRepository;
  private getUserRepository: GetUserRepository;

  constructor(
    createQuizAttemptRepository: CreateQuizAttemptRepository,
    getUserRepository: GetUserRepository
  ) {
    this.createQuizAttemptRepository = createQuizAttemptRepository;
    this.getUserRepository = getUserRepository;
  }

  async execute(createQuizAttemptData: CreateQuizAttemptData) {
    const { userId } = createQuizAttemptData;

    const user = await this.getUserRepository.getById(userId);

    if (!user) {
      throw new HTTPError(404, "User not found");
    }

    return this.createQuizAttemptRepository.execute(createQuizAttemptData);
  }
}
