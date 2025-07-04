import { PrismaClient } from "@prisma/client";
import { FinishQuizAttemptData } from "@interfaces/quiz/IQuizAttempt";

export class FinishQuizAttemptRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(quizAttemptId: string, finishData: FinishQuizAttemptData) {
    const { score, timeSpent } = finishData;

    return this.prisma.quizAttempt.update({
      where: {
        id: quizAttemptId,
      },
      data: {
        score,
        timeSpent,
        completedAt: new Date(),
      },
    });
  }
}
