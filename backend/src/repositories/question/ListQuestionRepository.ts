import { PrismaClient } from "@prisma/client";

export class ListQuestionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(filters?: {
    difficulty?: string;
    category?: string;
    season?: number;
    limit?: number;
    offset?: number;
  }) {
    const where: any = {};
    
    if (filters?.difficulty) {
      where.difficulty = filters.difficulty;
    }
    
    if (filters?.category) {
      where.category = filters.category;
    }
    
    if (filters?.season) {
      where.season = filters.season;
    }

    return this.prisma.question.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: filters?.limit || 10,
      skip: filters?.offset || 0,
    });
  }
}
