import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { QuizState, GameState, Question, QuizAnswer, QuizResult } from "../../domain/types/quiz"
import { QUIZ_QUESTIONS, CHARACTERS } from "../../domain/constants/quiz"
import { STORAGE_KEYS } from "../../domain/constants/storage"

interface QuizStore extends QuizState {
  // Actions
  setGameState: (state: GameState) => void
  setPlayerName: (name: string) => void
  startQuiz: () => void
  selectAnswer: (answerIndex: number) => void
  nextQuestion: () => void
  resetQuiz: () => void
  calculateResult: () => QuizResult | null

  // Computed
  getCurrentQuestion: () => Question | null
  getProgress: () => number
  getCharacterByScore: (score: number) => (typeof CHARACTERS)[0]
}

const initialState: QuizState = {
  gameState: "landing",
  currentQuestion: 0,
  questions: QUIZ_QUESTIONS,
  answers: [],
  selectedAnswer: null,
  showFeedback: false,
  isCorrect: false,
  score: 0,
  correctAnswers: 0,
  playerName: "",
  result: null,
}

export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setGameState: (gameState) => set({ gameState }),

        setPlayerName: (playerName) => set({ playerName }),

        startQuiz: () => {
          const shuffledQuestions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5)
          set({
            gameState: "quiz",
            currentQuestion: 0,
            questions: shuffledQuestions,
            answers: [],
            score: 0,
            correctAnswers: 0,
            selectedAnswer: null,
            showFeedback: false,
            result: null,
          })
        },

        selectAnswer: (answerIndex) => {
          const state = get()
          const currentQ = state.questions[state.currentQuestion]
          const isCorrect = answerIndex === currentQ.correct

          const newAnswer: QuizAnswer = {
            questionId: currentQ.id,
            selectedOption: answerIndex,
            isCorrect,
            timeSpent: 0, // Could be implemented with a timer
          }

          set({
            selectedAnswer: answerIndex,
            showFeedback: true,
            isCorrect,
            answers: [...state.answers, newAnswer],
            correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
          })
        },

        nextQuestion: () => {
          const state = get()

          if (state.currentQuestion < state.questions.length - 1) {
            set({
              currentQuestion: state.currentQuestion + 1,
              selectedAnswer: null,
              showFeedback: false,
            })
          } else {
            // Quiz completed
            const finalScore = Math.round((state.correctAnswers / state.questions.length) * 100)
            const character = get().getCharacterByScore(finalScore)

            const result: QuizResult = {
              playerName: state.playerName,
              score: finalScore,
              character,
              answers: state.answers,
              totalQuestions: state.questions.length,
              correctAnswers: state.correctAnswers,
              completedAt: new Date(),
            }

            set({
              score: finalScore,
              result,
              gameState: "result",
            })
          }
        },

        resetQuiz: () => set(initialState),

        calculateResult: () => {
          const state = get()
          if (!state.playerName) return null

          const finalScore = Math.round((state.correctAnswers / state.questions.length) * 100)
          const character = get().getCharacterByScore(finalScore)

          return {
            playerName: state.playerName,
            score: finalScore,
            character,
            answers: state.answers,
            totalQuestions: state.questions.length,
            correctAnswers: state.correctAnswers,
            completedAt: new Date(),
          }
        },

        getCurrentQuestion: () => {
          const state = get()
          return state.questions[state.currentQuestion] || null
        },

        getProgress: () => {
          const state = get()
          return ((state.currentQuestion + 1) / state.questions.length) * 100
        },

        getCharacterByScore: (score) => {
          return CHARACTERS.find((char) => score >= char.minScore) || CHARACTERS[CHARACTERS.length - 1]
        },
      }),
      {
        name: STORAGE_KEYS.QUIZ_PROGRESS,
        partialize: (state) => ({
          playerName: state.playerName,
          gameState: state.gameState === "quiz" ? "landing" : state.gameState, // Reset quiz state on reload
        }),
      },
    ),
    { name: "quiz-store" },
  ),
)
