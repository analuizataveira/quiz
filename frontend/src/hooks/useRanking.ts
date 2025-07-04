"use client"

import { useState, useEffect } from "react"
import type { RankingEntry } from "../domain/types/quiz"
import { quizRepository } from "../data/repositories/quiz.repository"
import { useToast } from "./use-toast"

export const useRanking = () => {
  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchRanking = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await quizRepository.getRanking()
      setRanking(data)
    } catch (err) {
      const errorMessage = "Erro ao carregar ranking"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRanking()
  }, [])

  return {
    ranking,
    loading,
    error,
    refetch: fetchRanking,
  }
}
