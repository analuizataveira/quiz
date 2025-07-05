import { httpClient } from "./base/httpClient"
import type {
  ApiQuestion,
  ApiUser,
  ApiQuizAttempt,
  ApiUserAnswer,
  ApiResponse,
  StartQuizRequest,
  AnswerQuestionRequest,
  FinishQuizRequest,
  CreateUserRequest,
  QuestionFilters,
} from "../../domain/types/api"

export class ApiRepository {
  // Question endpoints
  async getQuestions(filters?: QuestionFilters): Promise<ApiQuestion[]> {
    const params = new URLSearchParams()
    
    if (filters?.difficulty) params.append('difficulty', filters.difficulty)
    if (filters?.category) params.append('category', filters.category)
    if (filters?.season) params.append('season', filters.season.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())
    if (filters?.offset) params.append('offset', filters.offset.toString())
    if (filters?.includeCorrectAnswers !== undefined) {
      params.append('includeCorrectAnswers', filters.includeCorrectAnswers.toString())
    }

    const url = `/questions${params.toString() ? `?${params.toString()}` : ''}`
    const response = await httpClient.get<ApiResponse<ApiQuestion[]>>(url)
    return response.data.data
  }

  async getQuestion(id: string, includeCorrectAnswers: boolean = false): Promise<ApiQuestion> {
    const params = includeCorrectAnswers ? '?includeCorrectAnswers=true' : ''
    const response = await httpClient.get<ApiResponse<ApiQuestion>>(`/questions/${id}${params}`)
    return response.data.data
  }

  async createQuestion(questionData: Omit<ApiQuestion, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiQuestion> {
    const response = await httpClient.post<ApiResponse<ApiQuestion>>('/questions', questionData)
    return response.data.data
  }

  // Quiz endpoints
  async startQuiz(data: StartQuizRequest): Promise<ApiQuizAttempt> {
    const response = await httpClient.post<ApiResponse<ApiQuizAttempt>>('/quiz/start', data)
    return response.data.data
  }

  async answerQuestion(data: AnswerQuestionRequest): Promise<ApiUserAnswer> {
    const response = await httpClient.post<ApiResponse<ApiUserAnswer>>('/quiz/answer', data)
    return response.data.data
  }

  async finishQuiz(quizAttemptId: string, data: FinishQuizRequest): Promise<ApiQuizAttempt> {
    const response = await httpClient.put<ApiResponse<ApiQuizAttempt>>(`/quiz/${quizAttemptId}/finish`, data)
    return response.data.data
  }

  // User endpoints
  async getUsers(): Promise<ApiUser[]> {
    const response = await httpClient.get<ApiResponse<ApiUser[]>>('/user')
    return response.data.data
  }

  async getUser(id: string): Promise<ApiUser> {
    const response = await httpClient.get<ApiResponse<ApiUser>>(`/user/${id}`)
    return response.data.data
  }

  async createUser(userData: CreateUserRequest): Promise<ApiUser> {
    const response = await httpClient.post<ApiResponse<ApiUser>>('/user', userData)
    return response.data.data
  }

  async updateUser(id: string, userData: Partial<CreateUserRequest & { score: number }>): Promise<ApiUser> {
    const response = await httpClient.put<ApiResponse<ApiUser>>(`/user/${id}`, userData)
    return response.data.data
  }

  async deleteUser(id: string): Promise<void> {
    await httpClient.delete(`/user/${id}`)
  }
}

export const apiRepository = new ApiRepository()
