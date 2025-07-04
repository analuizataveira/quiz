import { PrismaClient } from "@prisma/client";
import { CreateQuizAttemptData } from "@interfaces/quiz/IQuizAttempt";

export class CreateQuizAttemptRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(createQuizAttemptData: CreateQuizAttemptData) {
    const { userId, totalQuestions } = createQuizAttemptData;

    return this.prisma.quizAttempt.create({
      data: {
        userId,
        totalQuestions,
      },
    });
  }
}
