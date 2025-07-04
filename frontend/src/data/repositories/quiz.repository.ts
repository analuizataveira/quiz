import type { IQuizRepository } from "../../domain/interfaces/repositories"
import type { RankingEntry, QuizResult } from "../../domain/types/quiz"
import { STORAGE_KEYS, API_ENDPOINTS } from "../../domain/constants/storage"
import { httpClient } from "./base/httpClient"

export class QuizRepository implements IQuizRepository {
  async saveResult(result: QuizResult): Promise<void> {
    try {
      // Save locally first
      const existingRanking = this.getLocalRanking()
      const newEntry: RankingEntry = {
        id: crypto.randomUUID(),
        name: result.playerName,
        score: result.score,
        character: result.character.name,
        date: result.completedAt.toISOString(),
        totalQuestions: result.totalQuestions,
        correctAnswers: result.correctAnswers,
      }

      const updatedRanking = [...existingRanking, newEntry].sort((a, b) => b.score - a.score).slice(0, 50) // Keep top 50

      localStorage.setItem(STORAGE_KEYS.QUIZ_RANKING, JSON.stringify(updatedRanking))

      // Try to submit to API (mock for now)
      await this.submitScore(newEntry)
    } catch (error) {
      console.error("Error saving result:", error)
      // Fallback to local storage only
    }
  }

  async getRanking(): Promise<RankingEntry[]> {
    try {
      // Try to get from API first
      const response = await httpClient.get(API_ENDPOINTS.GET_RANKING)
      return response.data
    } catch (error) {
      console.warn("API unavailable, using local ranking:", error)
      // Fallback to local storage
      return this.getLocalRanking()
    }
  }

  async submitScore(entry: RankingEntry): Promise<void> {
    try {
      // Mock API call - simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would be:
      // await httpClient.post(API_ENDPOINTS.SUBMIT_SCORE, entry)

      console.log("Score submitted successfully:", entry)
    } catch (error) {
      console.error("Error submitting score:", error)
      throw error
    }
  }

  private getLocalRanking(): RankingEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_RANKING)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error reading local ranking:", error)
      return []
    }
  }
}

export const quizRepository = new QuizRepository()
