"use client"

import { useCallback } from "react"
import { useQuizStore } from "../data/stores/quiz.store"
import { quizRepository } from "../data/repositories/quiz.repository"
import { useToast } from "./use-toast"

export const useQuiz = () => {
  const store = useQuizStore()
  const { toast } = useToast()

  const handleStartQuiz = useCallback(() => {
    if (!store.playerName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite seu nome para começar o quiz!",
        variant: "destructive",
      })
      return
    }
    store.startQuiz()
  }, [store, toast])

  const handleAnswerSelect = useCallback(
    (answerIndex: number) => {
      if (store.showFeedback) return
      store.selectAnswer(answerIndex)
    },
    [store],
  )

  const handleNextQuestion = useCallback(() => {
    store.nextQuestion()
  }, [store])

  const handleSaveResult = useCallback(async () => {
    const result = store.result
    if (!result) return

    try {
      await quizRepository.saveResult(result)
      toast({
        title: "Resultado salvo!",
        description: "Seu resultado foi salvo com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar seu resultado, mas você pode tentar novamente.",
        variant: "destructive",
      })
    }
  }, [store.result, toast])

  const handleResetQuiz = useCallback(() => {
    store.resetQuiz()
  }, [store])

  return {
    // State
    gameState: store.gameState,
    currentQuestion: store.getCurrentQuestion(),
    currentQuestionIndex: store.currentQuestion,
    totalQuestions: store.questions.length,
    selectedAnswer: store.selectedAnswer,
    showFeedback: store.showFeedback,
    isCorrect: store.isCorrect,
    score: store.score,
    correctAnswers: store.correctAnswers,
    playerName: store.playerName,
    result: store.result,
    progress: store.getProgress(),

    // Actions
    setGameState: store.setGameState,
    setPlayerName: store.setPlayerName,
    startQuiz: handleStartQuiz,
    selectAnswer: handleAnswerSelect,
    nextQuestion: handleNextQuestion,
    resetQuiz: handleResetQuiz,
    saveResult: handleSaveResult,
  }
}
