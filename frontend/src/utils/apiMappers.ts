import type { ApiQuestion, ApiUser } from "../domain/types/api"
import type { Question, Character, RankingEntry } from "../domain/types/quiz"

// Converte pergunta da API para formato do frontend
export function apiQuestionToQuestion(apiQuestion: ApiQuestion): Question {
  return {
    id: parseInt(apiQuestion.id.slice(-8), 16), // Converte UUID para número
    question: apiQuestion.description,
    options: [
      apiQuestion.optionA,
      apiQuestion.optionB,
      apiQuestion.optionC,
      apiQuestion.optionD,
    ],
    correct: apiQuestion.correctAnswer === 'A' ? 0 : 
             apiQuestion.correctAnswer === 'B' ? 1 :
             apiQuestion.correctAnswer === 'C' ? 2 : 3,
    explanation: apiQuestion.explanation,
    characterImage: `/placeholder.svg?height=120&width=120&text=${apiQuestion.category || 'Quiz'}`,
    emoji: getDifficultyEmoji(apiQuestion.difficulty),
    gif: `/placeholder.svg?height=200&width=300&text=${apiQuestion.category || 'Quiz'}`,
    difficulty: apiQuestion.difficulty?.toLowerCase() as "easy" | "medium" | "hard",
    season: apiQuestion.season,
  }
}

// Converte usuário da API para entrada do ranking
export function apiUserToRankingEntry(apiUser: ApiUser): RankingEntry {
  return {
    id: apiUser.id,
    name: apiUser.name,
    score: apiUser.score,
    character: apiUser.character,
    date: apiUser.createdAt,
    totalQuestions: 10, // Valor padrão, pode ser calculado dinamicamente
    correctAnswers: Math.round((apiUser.score / 100) * 10), // Aproximação baseada no score
  }
}

// Converte resposta do frontend para formato da API
export function frontendAnswerToApiAnswer(selectedIndex: number): string {
  const mapping = ['A', 'B', 'C', 'D']
  return mapping[selectedIndex] || 'A'
}

// Converte personagem do frontend para string
export function characterToString(character: Character): string {
  return character.name
}

// Obtém emoji baseado na dificuldade
function getDifficultyEmoji(difficulty?: string): string {
  switch (difficulty) {
    case 'EASY':
      return '😊'
    case 'MEDIUM':
      return '🤔'
    case 'HARD':
      return '😤'
    default:
      return '❓'
  }
}

// Lista de personagens do The Office para mapear characters
export const OFFICE_CHARACTERS: Character[] = [
  {
    name: "Michael Scott",
    description: "O chefe carismático e bem-intencionado",
    image: "/placeholder.svg?height=120&width=120&text=Michael",
    minScore: 90,
    color: "bg-yellow-400",
    quote: "That's what she said!",
    emoji: "👔"
  },
  {
    name: "Dwight Schrute",
    description: "O vendedor mais dedicado de Scranton",
    image: "/placeholder.svg?height=120&width=120&text=Dwight",
    minScore: 80,
    color: "bg-orange-400",
    quote: "Bears. Beets. Battlestar Galactica.",
    emoji: "🥾"
  },
  {
    name: "Jim Halpert",
    description: "O brincalhão do escritório",
    image: "/placeholder.svg?height=120&width=120&text=Jim",
    minScore: 70,
    color: "bg-blue-400",
    quote: "Question: What kind of bear is best?",
    emoji: "😏"
  },
  {
    name: "Pam Beesly",
    description: "A recepcionista artística",
    image: "/placeholder.svg?height=120&width=120&text=Pam",
    minScore: 60,
    color: "bg-pink-400",
    quote: "I'm sorry, what was the question?",
    emoji: "🎨"
  },
  {
    name: "Stanley Hudson",
    description: "O veterano prático do escritório",
    image: "/placeholder.svg?height=120&width=120&text=Stanley",
    minScore: 50,
    color: "bg-green-400",
    quote: "Did I stutter?",
    emoji: "📰"
  },
  {
    name: "Kevin Malone",
    description: "O contador com grande coração",
    image: "/placeholder.svg?height=120&width=120&text=Kevin",
    minScore: 0,
    color: "bg-purple-400",
    quote: "Why waste time say lot word when few word do trick?",
    emoji: "🍪"
  }
]

// Determina personagem baseado na pontuação
export function getCharacterByScore(score: number): Character {
  for (const character of OFFICE_CHARACTERS) {
    if (score >= character.minScore) {
      return character
    }
  }
  return OFFICE_CHARACTERS[OFFICE_CHARACTERS.length - 1] // Retorna o último (menor score)
}

// Procura personagem por nome
export function getCharacterByName(name: string): Character | undefined {
  return OFFICE_CHARACTERS.find(char => 
    char.name.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(char.name.toLowerCase())
  )
}
