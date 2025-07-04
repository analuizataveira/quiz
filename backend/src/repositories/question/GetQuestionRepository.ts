import { PrismaClient } from "@prisma/client";

export class GetQuestionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(id: string) {
    return this.prisma.question.findUnique({
      where: {
        id,
      },
    });
  }
}
