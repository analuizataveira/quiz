"use client"

import { AnimatePresence } from "framer-motion"
import { Moon, Sun, Volume2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Toaster } from "../../components/ui/toaster"
import { StartScreen } from "../../components/internal/StartScreen"
import { QuestionCard } from "../../components/internal/QuestionCard"
import { ResultScreen } from "../../components/internal/ResultScreen"
import { RankingScreen } from "../../components/internal/RankingScreen"
import { useQuiz } from "../../../hooks/useQuiz"
import { useDarkMode } from "../../../hooks/useDarkMode"

const QuizPage = () => {
  const { gameState } = useQuiz()
  const { isDark, toggleTheme } = useDarkMode()

  return (
    <div className="relative min-h-screen">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 rounded-full shadow-lg"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 rounded-full shadow-lg"
        >
          <Volume2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {gameState === "landing" && <StartScreen key="start" />}
        {gameState === "quiz" && <QuestionCard key="quiz" />}
        {gameState === "result" && <ResultScreen key="result" />}
        {gameState === "ranking" && <RankingScreen key="ranking" />}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}

export default QuizPage
