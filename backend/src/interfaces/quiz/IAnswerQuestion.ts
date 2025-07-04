export interface AnswerQuestionData {
  userId: string;
  questionId: string;
  selectedAnswer: string; // "A", "B", "C" ou "D"
  quizAttemptId: string;
  timeSpent?: number;
}

export interface IAnswerQuestion {
  execute(answerData: AnswerQuestionData): Promise<any>;
}
