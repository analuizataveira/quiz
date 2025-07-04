import { PrismaClient } from "@prisma/client";
import { AnswerQuestionData } from "@interfaces/quiz/IAnswerQuestion";

export class AnswerQuestionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(answerData: AnswerQuestionData) {
    const { userId, questionId, selectedAnswer, quizAttemptId, timeSpent } = answerData;

    // Get the question to check the correct answer
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === question.correctAnswer;

    return this.prisma.userAnswer.create({
      data: {
        userId,
        questionId,
        selectedAnswer,
        quizAttemptId,
        timeSpent,
        isCorrect,
      },
    });
  }
}
