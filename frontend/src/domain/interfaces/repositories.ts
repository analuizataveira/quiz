import type { RankingEntry, QuizResult } from "../types/quiz"

export interface IQuizRepository {
  saveResult(result: QuizResult): Promise<void>
  getRanking(): Promise<RankingEntry[]>
  submitScore(entry: RankingEntry): Promise<void>
}
