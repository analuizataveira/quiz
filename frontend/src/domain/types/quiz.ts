export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  characterImage: string
  emoji: string
  gif?: string
  difficulty?: "easy" | "medium" | "hard"
  season?: number
}

export interface Character {
  name: string
  description: string
  image: string
  minScore: number
  color: string
  quote: string
  emoji: string
}

export interface QuizAnswer {
  questionId: number
  selectedOption: number
  isCorrect: boolean
  timeSpent?: number
}

export interface QuizResult {
  playerName: string
  score: number
  character: Character
  answers: QuizAnswer[]
  totalQuestions: number
  correctAnswers: number
  completedAt: Date
}

export interface RankingEntry {
  id: string
  name: string
  score: number
  character: string
  date: string
  totalQuestions: number
  correctAnswers: number
}

export type GameState = "landing" | "quiz" | "feedback" | "result" | "ranking"

export interface QuizState {
  gameState: GameState
  currentQuestion: number
  questions: Question[]
  answers: QuizAnswer[]
  selectedAnswer: number | null
  showFeedback: boolean
  isCorrect: boolean
  score: number
  correctAnswers: number
  playerName: string
  result: QuizResult | null
}
