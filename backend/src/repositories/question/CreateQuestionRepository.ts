import { CreateQuestionData } from "@interfaces/question/ICreateQuestion";
import { PrismaClient } from "@prisma/client";

export class CreateQuestionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(createQuestionData: CreateQuestionData) {
    const { 
      description, 
      optionA, 
      optionB, 
      optionC, 
      optionD, 
      correctAnswer, 
      explanation, 
      difficulty, 
      category, 
      season, 
      episode 
    } = createQuestionData;

    return this.prisma.question.create({
      data: {
        description,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        explanation,
        difficulty,
        category,
        season,
        episode,
      },
    });
  }
}
