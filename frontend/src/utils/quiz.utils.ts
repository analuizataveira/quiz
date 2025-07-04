export const shuffleArray = <T>(array: T[]): T[] => {\
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {\
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const calculateScore = (answers: QuizAnswer[]): number => {\
  const correctAnswers = answers.filter(answer => answer.isCorrect).length
  return Math.round((correctAnswers / answers.length) * 100)
}

export const formatTime = (seconds: number): string => {\
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const getRandomFeedbackPhrase = (phrases: string[]): string => {\
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export const filterQuestionsByDifficulty = (
  questions: Question[],
  difficulty: 'easy' | 'medium' | 'hard'
): Question[] => {\
  return questions.filter(q => q.difficulty === difficulty)
}

export const filterQuestionsBySeason = (
  questions: Question[],
  season: number
): Question[] => {\
  return questions.filter(q => q.season === season)
}

export const generateQuizId = (): string => {\
  return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const isValidEmail = (email: string): boolean => {\
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
\
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {\
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {\
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}\
