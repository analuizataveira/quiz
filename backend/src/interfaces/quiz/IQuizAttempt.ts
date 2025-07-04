export interface CreateQuizAttemptData {
  userId: string;
  totalQuestions: number;
}

export interface FinishQuizAttemptData {
  score: number;
  timeSpent?: number;
}

export interface ICreateQuizAttempt {
  execute(createQuizAttemptData: CreateQuizAttemptData): Promise<any>;
}

export interface IFinishQuizAttempt {
  execute(quizAttemptId: string, finishData: FinishQuizAttemptData): Promise<any>;
}
