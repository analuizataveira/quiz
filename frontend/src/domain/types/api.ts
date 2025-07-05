// Tipos baseados na API do backend

export interface ApiQuestion {
  id: string
  description: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: string // "A", "B", "C" ou "D"
  explanation: string
  difficulty?: "EASY" | "MEDIUM" | "HARD"
  category?: string
  season?: number
  episode?: number
  createdAt: string
  updatedAt: string
}

export interface ApiUser {
  id: string
  name: string
  score: number
  character: string
  createdAt: string
  updatedAt: string
}

export interface ApiQuizAttempt {
  id: string
  score: number
  totalQuestions: number
  correctAnswers: number
  completedAt?: string
  timeSpent?: number
  userId: string
  createdAt: string
  updatedAt: string
}

export interface ApiUserAnswer {
  id: string
  selectedAnswer: string
  isCorrect: boolean
  timeSpent?: number
  answeredAt: string
  userId: string
  questionId: string
  quizAttemptId: string
}

// Request/Response tipos
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface StartQuizRequest {
  userId: string
}

export interface AnswerQuestionRequest {
  userId: string
  questionId: string
  selectedAnswer: string // "A", "B", "C" ou "D"
  quizAttemptId: string
  timeSpent?: number
}

export interface FinishQuizRequest {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent?: number
}

export interface CreateUserRequest {
  name: string
  character: string
}

// Filtros para listagem de perguntas
export interface QuestionFilters {
  difficulty?: string
  category?: string
  season?: number
  limit?: number
  offset?: number
  includeCorrectAnswers?: boolean
}
