import { useState, useEffect, useCallback } from "react"
import { apiRepository } from "../data/repositories/api.repository"
import { quizRepository } from "../data/repositories/quiz.repository"
import {
  apiQuestionToQuestion,
  apiUserToRankingEntry,
  frontendAnswerToApiAnswer,
  getCharacterByScore,
  characterToString,
} from "../utils/apiMappers"
import type { QuizState, RankingEntry, QuizResult } from "../domain/types/quiz"
import type { ApiQuizAttempt, ApiUser } from "../domain/types/api"

export function useQuizWithApi() {
  const [state, setState] = useState<QuizState>({
    gameState: "landing",
    currentQuestion: 0,
    questions: [],
    answers: [],
    selectedAnswer: null,
    showFeedback: false,
    isCorrect: false,
    score: 0,
    correctAnswers: 0,
    playerName: "",
    result: null,
  })

  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Estado da API
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null)
  const [currentQuizAttempt, setCurrentQuizAttempt] = useState<ApiQuizAttempt | null>(null)

  // Carregar ranking dos usuários
  const loadRanking = useCallback(async () => {
    try {
      setLoading(true)
      const users = await apiRepository.getUsers()
      const rankingEntries = users
        .map(apiUserToRankingEntry)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10) // Top 10
      setRanking(rankingEntries)
    } catch (error) {
      console.error("Error loading ranking:", error)
      // Fallback para ranking local
      const localRanking = await quizRepository.getRanking()
      setRanking(localRanking)
    } finally {
      setLoading(false)
    }
  }, [])

  // Carregar perguntas da API
  const loadQuestions = useCallback(async (limit: number = 10) => {
    try {
      setLoading(true)
      setError(null)
      
      const apiQuestions = await apiRepository.getQuestions({
        limit,
        includeCorrectAnswers: false, // Não incluir respostas durante o quiz
      })
      
      if (apiQuestions.length === 0) {
        throw new Error("Nenhuma pergunta encontrada")
      }
      
      const questions = apiQuestions.map(apiQuestionToQuestion)
      
      setState(prev => ({
        ...prev,
        questions,
      }))
      
      return questions
    } catch (error) {
      console.error("Error loading questions:", error)
      setError("Erro ao carregar perguntas. Verifique sua conexão.")
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Iniciar quiz
  const startQuiz = useCallback(async (playerName: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // Criar ou encontrar usuário
      let user = currentUser
      if (!user) {
        // Por simplicidade, vamos criar um novo usuário sempre
        user = await apiRepository.createUser({
          name: playerName,
          character: "Michael Scott", // Padrão inicial
        })
        setCurrentUser(user)
      }
      
      // Carregar perguntas
      await loadQuestions(10)
      
      // Iniciar tentativa de quiz na API
      const quizAttempt = await apiRepository.startQuiz({
        userId: user.id,
      })
      setCurrentQuizAttempt(quizAttempt)
      
      setState(prev => ({
        ...prev,
        gameState: "quiz",
        playerName,
        currentQuestion: 0,
        answers: [],
        selectedAnswer: null,
        showFeedback: false,
        score: 0,
        correctAnswers: 0,
      }))
    } catch (error) {
      console.error("Error starting quiz:", error)
      setError("Erro ao iniciar quiz. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }, [currentUser, loadQuestions])

  // Selecionar resposta
  const selectAnswer = useCallback((answerIndex: number) => {
    setState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
    }))
  }, [])

  // Próxima pergunta
  const nextQuestion = useCallback(async () => {
    if (state.selectedAnswer === null || !currentUser || !currentQuizAttempt) return

    try {
      setLoading(true)
      
      const currentQ = state.questions[state.currentQuestion]
      const isCorrect = state.selectedAnswer === currentQ.correct
      
      // Enviar resposta para API
      await apiRepository.answerQuestion({
        userId: currentUser.id,
        questionId: currentQ.id.toString(), // Convert to string
        selectedAnswer: frontendAnswerToApiAnswer(state.selectedAnswer),
        quizAttemptId: currentQuizAttempt.id,
      })

      const newAnswer = {
        questionId: currentQ.id,
        selectedOption: state.selectedAnswer,
        isCorrect,
      }

      setState(prev => ({
        ...prev,
        answers: [...prev.answers, newAnswer],
        isCorrect,
        showFeedback: true,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      }))

      // Mostrar feedback por 2 segundos, então ir para próxima pergunta
      setTimeout(() => {
        setState(prev => {
          const isLastQuestion = prev.currentQuestion === prev.questions.length - 1
          
          if (isLastQuestion) {
            finishQuiz()
            return prev
          }
          
          return {
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            selectedAnswer: null,
            showFeedback: false,
          }
        })
      }, 2000)
    } catch (error) {
      console.error("Error answering question:", error)
      setError("Erro ao enviar resposta. Tentando continuar...")
    } finally {
      setLoading(false)
    }
  }, [state.selectedAnswer, state.questions, state.currentQuestion, currentUser, currentQuizAttempt])

  // Finalizar quiz
  const finishQuiz = useCallback(async () => {
    if (!currentUser || !currentQuizAttempt) return

    try {
      setLoading(true)
      
      const finalScore = Math.round((state.correctAnswers / state.questions.length) * 100)
      const character = getCharacterByScore(finalScore)
      
      // Finalizar quiz na API
      await apiRepository.finishQuiz(currentQuizAttempt.id, {
        score: finalScore,
        totalQuestions: state.questions.length,
        correctAnswers: state.correctAnswers,
      })
      
      // Atualizar usuário com novo personagem e score
      await apiRepository.updateUser(currentUser.id, {
        character: characterToString(character),
        score: Math.max(currentUser.score, finalScore), // Manter melhor score
      })
      
      const result: QuizResult = {
        playerName: state.playerName,
        score: finalScore,
        character,
        answers: state.answers,
        totalQuestions: state.questions.length,
        correctAnswers: state.correctAnswers,
        completedAt: new Date(),
      }
      
      // Salvar resultado localmente também
      await quizRepository.saveResult(result)
      
      setState(prev => ({
        ...prev,
        score: finalScore,
        result,
        gameState: "result",
      }))
      
      // Recarregar ranking
      await loadRanking()
    } catch (error) {
      console.error("Error finishing quiz:", error)
      setError("Erro ao finalizar quiz. Resultado pode não ter sido salvo.")
    } finally {
      setLoading(false)
    }
  }, [currentUser, currentQuizAttempt, state, loadRanking])

  // Resetar quiz
  const resetQuiz = useCallback(() => {
    setState({
      gameState: "landing",
      currentQuestion: 0,
      questions: [],
      answers: [],
      selectedAnswer: null,
      showFeedback: false,
      isCorrect: false,
      score: 0,
      correctAnswers: 0,
      playerName: "",
      result: null,
    })
    setCurrentUser(null)
    setCurrentQuizAttempt(null)
    setError(null)
  }, [])

  // Mostrar ranking
  const showRanking = useCallback(() => {
    setState(prev => ({
      ...prev,
      gameState: "ranking",
    }))
  }, [])

  // Carregar ranking na inicialização
  useEffect(() => {
    loadRanking()
  }, [loadRanking])

  return {
    ...state,
    ranking,
    loading,
    error,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    showRanking,
  }
}
