export const STORAGE_KEYS = {
  QUIZ_RANKING: "theOfficeQuizRanking",
  PLAYER_NAME: "theOfficeQuizPlayerName",
  THEME_PREFERENCE: "theOfficeQuizTheme",
  SOUND_ENABLED: "theOfficeQuizSound",
  QUIZ_PROGRESS: "theOfficeQuizProgress",
} as const

export const API_ENDPOINTS = {
  SUBMIT_SCORE: "/api/quiz/submit",
  GET_RANKING: "/api/quiz/ranking",
  GET_QUESTIONS: "/api/quiz/questions",
} as const
