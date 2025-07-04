export interface CreateQuestionData {
  description: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string; // "A", "B", "C" ou "D"
  explanation: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  category?: string;
  season?: number;
  episode?: number;
}

export interface ICreateQuestion {
  execute(createQuestionData: CreateQuestionData): Promise<any>;
}
