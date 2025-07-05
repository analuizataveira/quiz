"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Progress } from "../../../../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Input } from "../../../../components/ui/input"
import { Alert, AlertDescription } from "../../../../components/ui/alert"
import {
  Trophy,
  Share2,
  RotateCcw,
  Star,
  Users,
  CheckCircle,
  XCircle,
  Volume2,
  VolumeX,
  Heart,
  Zap,
  User,
  ArrowRight,
  PartyPopper,
  Coffee,
  Moon,
  Sun,
  Paperclip,
  Building,
  FileText,
  Monitor,
  Loader2,
  AlertCircle,
} from "lucide-react"
import type { RankingEntry } from "../../../domain/types/quiz"
import { useQuizWithApi } from "../../../hooks/useQuizWithApi"
import { OFFICE_CHARACTERS } from "../../../utils/apiMappers"

export function QuizPageWithApi() {
  const {
    gameState,
    currentQuestion,
    questions,
    selectedAnswer,
    showFeedback,
    isCorrect,
    score,
    correctAnswers,
    playerName,
    ranking,
    loading,
    error,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    showRanking,
  } = useQuizWithApi()

  const [tempPlayerName, setTempPlayerName] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  // Detectar tema do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setDarkMode(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Aplicar classe do tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0
  const currentQ = questions[currentQuestion]

  const handleStartQuiz = async () => {
    if (tempPlayerName.trim()) {
      await startQuiz(tempPlayerName.trim())
    }
  }

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Quiz do The Office',
        text: `Acabei de fazer ${score}% no Quiz do The Office! 🎉`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(
        `Acabei de fazer ${score}% no Quiz do The Office! 🎉 ${window.location.href}`
      )
      // Aqui você poderia mostrar uma notificação de "Copiado!"
    }
  }

  // Loading state
  if (loading && gameState === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
            <p>Carregando Quiz do The Office...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Landing Page
  if (gameState === "landing") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden"
      >
        {/* Error Alert */}
        {error && (
          <div className="absolute top-4 left-4 right-4 z-50">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Theme Toggle */}
        <div className="absolute top-6 right-6 z-10">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-gray-800/30"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-gray-800/30"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center gap-4 mb-1">
              <Building className="w-6 h-6 text-yellow-400" />
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">DUNDER MIFFLIN</h1>
              <Building className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-yellow-200 text-xs tracking-widest">PAPER COMPANY • SCRANTON BRANCH</p>
          </motion.div>
        </div>

        {/* Office Elements Decorations */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-32 left-10"
          >
            <Coffee className="w-16 h-16 text-blue-400" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-40 right-20"
          >
            <Paperclip className="w-12 h-12 text-yellow-500" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-32 left-16"
          >
            <FileText className="w-14 h-14 text-green-400" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-20 right-16"
          >
            <Monitor className="w-18 h-18 text-purple-400" />
          </motion.div>
        </div>

        {/* Character Silhouettes */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.2 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-32 left-20"
          >
            <img
              src="/placeholder.svg?height=150&width=120&text=Michael"
              alt="Michael"
              className="rounded-lg shadow-2xl transform rotate-3"
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.2 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute top-40 right-32"
          >
            <img
              src="/placeholder.svg?height=140&width=110&text=Dwight"
              alt="Dwight"
              className="rounded-lg shadow-2xl transform -rotate-2"
            />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Hero */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="relative inline-block"
                >
                  <img
                    src="/placeholder.svg?height=140&width=140&text=The+Office"
                    alt="The Office Characters"
                    className="w-20 h-20 rounded-full"
                  />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 dark:bg-red-500 rounded-full flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight"
                >
                  Quiz do
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400 block">
                    The Office
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0"
                >
                  Teste seus conhecimentos sobre a melhor série de comédia de todos os tempos! 📺
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center lg:justify-start"
                >
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>10 perguntas • Múltipla escolha • Diversão garantida</span>
                </motion.div>
              </div>
            </div>

            {/* Right side - Start Quiz */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex-1 w-full max-w-md"
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                      <User className="w-5 h-5" />
                      <span className="font-medium">Como podemos te chamar?</span>
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Digite seu nome..."
                        value={tempPlayerName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempPlayerName(e.target.value)}
                        className="text-center text-lg font-medium border-2 border-gray-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 rounded-2xl bg-gray-50 dark:bg-gray-700 py-4 px-6 text-gray-800 dark:text-white"
                        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleStartQuiz()}
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleStartQuiz}
                      disabled={!tempPlayerName.trim() || loading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white font-bold py-4 rounded-2xl text-lg transform transition-all duration-200 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Carregando...
                        </>
                      ) : (
                        <>
                          <PartyPopper className="w-5 h-5 mr-2" />
                          Começar Quiz
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <div className="text-center">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="ghost"
                        onClick={showRanking}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Ver Ranking
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Top Players Preview */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Melhores Pontuações</h3>
                </div>
                <div className="space-y-3">
                  {ranking.slice(0, 3).map((player: RankingEntry, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-orange-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                          {player.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {player.character}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{player.score}%</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // Quiz Page
  if (gameState === "quiz" && currentQ) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex flex-col office-paper-texture"
      >
        {/* Error Alert */}
        {error && (
          <div className="absolute top-4 left-4 right-4 z-50">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-gray-700 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold text-sm">{currentQ.emoji}</span>
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">Quiz do The Office</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Olá, {playerName}! 👋</p>
                </div>
              </div>
              <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 px-3 py-1 rounded-full">
                {currentQuestion + 1} de {questions.length}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Progresso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl space-y-8">
            {/* Character Image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-yellow-600 dark:to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={currentQ.characterImage || "/placeholder.svg"}
                  alt="Character"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </motion.div>

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white leading-tight mb-4">
                      {currentQ.question}
                    </h3>
                  </motion.div>

                  {!showFeedback ? (
                    <div className="space-y-4">
                      {currentQ.options.map((option: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => selectAnswer(index)}
                            disabled={loading}
                            className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 hover:shadow-md disabled:opacity-50 ${
                              selectedAnswer === index
                                ? "border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg transform scale-[1.02]"
                                : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                                  selectedAnswer === index
                                    ? "border-blue-400 dark:border-blue-500 bg-blue-400 dark:bg-blue-500 text-white"
                                    : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span className="text-gray-800 dark:text-white font-medium flex-1">
                                {option}
                              </span>
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-6"
                    >
                      <div
                        className={`p-6 rounded-2xl border-2 ${
                          isCorrect
                            ? "bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-700"
                            : "bg-orange-50 dark:bg-orange-900/30 border-2 border-orange-200 dark:border-orange-700"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                          >
                            {isCorrect ? (
                              <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
                            ) : (
                              <XCircle className="w-12 h-12 text-orange-500 dark:text-orange-400" />
                            )}
                          </motion.div>
                          <div>
                            <h4
                              className={`text-2xl font-bold ${
                                isCorrect
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-orange-700 dark:text-orange-300"
                              }`}
                            >
                              {isCorrect ? "Correto! 🎉" : "Ops! 😅"}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {isCorrect ? "Você mandou bem!" : "Não foi dessa vez"}
                            </p>
                          </div>
                        </div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4"
                        >
                          <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
                            {currentQ.explanation}
                          </p>
                        </motion.div>

                        {/* Animated Elements */}
                        <div className="relative mt-4">
                          <div
                            className={`w-full h-2 rounded-full ${
                              isCorrect
                                ? "bg-green-50 dark:bg-green-900/30 border-r-2 border-b-2 border-green-200 dark:border-green-700"
                                : "bg-orange-50 dark:bg-orange-900/30 border-r-2 border-b-2 border-orange-200 dark:border-orange-700"
                            }`}
                          ></div>
                        </div>

                        {/* Next Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={nextQuestion}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white font-bold py-4 rounded-2xl transform transition-all duration-200 mt-4"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Processando...
                              </>
                            ) : currentQuestion === questions.length - 1 ? (
                              <>
                                <Trophy className="w-5 h-5 mr-2" />
                                Ver Meu Resultado
                              </>
                            ) : (
                              <>
                                Próxima Pergunta
                                <ArrowRight className="w-5 h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {!showFeedback && selectedAnswer !== null && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={nextQuestion}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white font-bold py-4 rounded-2xl transform transition-all duration-200"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Confirmar Resposta
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    )
  }

  // Result Page
  if (gameState === "result") {
    const characterFromScore = OFFICE_CHARACTERS.find((char) => score >= char.minScore) || OFFICE_CHARACTERS[OFFICE_CHARACTERS.length - 1]
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4"
      >
        {/* Error Alert */}
        {error && (
          <div className="absolute top-4 left-4 right-4 z-50">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <Card className="w-full max-w-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-8 text-center space-y-8">
            {/* Celebration Header */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  Parabéns, {playerName}!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Você completou o Quiz do The Office! 🎉
                </p>
              </div>
            </motion.div>

            {/* Score Display */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2"
              >
                {score}%
              </motion.div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Você acertou {correctAnswers} de {questions.length} perguntas
              </p>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < Math.floor(score / 20)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Character Result */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Você é mais parecido com:
              </h3>
              <div className="flex items-center justify-center gap-4 mb-4">
                <img
                  src={characterFromScore.image}
                  alt={characterFromScore.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="text-left">
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {characterFromScore.name} {characterFromScore.emoji}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">{characterFromScore.description}</p>
                </div>
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 italic">
                "{characterFromScore.quote}"
              </blockquote>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={shareResult}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 dark:from-green-600 dark:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white font-bold py-3 rounded-2xl transform transition-all duration-200"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Compartilhar
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={showRanking}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white font-bold py-3 rounded-2xl transform transition-all duration-200"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Ver Ranking
                  </Button>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="w-full border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold py-3 rounded-2xl transform transition-all duration-200"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Jogar Novamente
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Ranking Page
  if (gameState === "ranking") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-4"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Ranking dos Mestres do The Office
              </h1>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Os verdadeiros conhecedores da Dunder Mifflin
            </p>
          </motion.div>

          {/* Ranking List */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
                    <p>Carregando ranking...</p>
                  </div>
                ) : ranking.length === 0 ? (
                  <div className="p-8 text-center">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Nenhum resultado ainda. Seja o primeiro!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {ranking.map((player: RankingEntry, index: number) => {
                      const character = OFFICE_CHARACTERS.find((char) => 
                        char.name.toLowerCase().includes(player.character.toLowerCase())
                      ) || OFFICE_CHARACTERS[0]
                      
                      return (
                        <motion.div
                          key={player.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * index }}
                          className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                            index < 3
                              ? "bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-900/20 dark:to-transparent"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {/* Position */}
                            <div className="flex-shrink-0">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white ${
                                  index === 0
                                    ? "bg-yellow-400"
                                    : index === 1
                                      ? "bg-gray-400"
                                      : index === 2
                                        ? "bg-orange-400"
                                        : "bg-blue-400"
                                }`}
                              >
                                {index + 1}
                              </div>
                            </div>

                            {/* Character Avatar */}
                            <div className="flex-shrink-0">
                              <Avatar className="w-14 h-14 border-2 border-gray-200 dark:border-gray-600">
                                <AvatarImage src={character?.image || "/placeholder.svg"} alt={character?.name} />
                                <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold">
                                  {character?.emoji || "😊"}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            {/* Player Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                                {player.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Como {player.character}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(player.date).toLocaleDateString("pt-BR")} • {player.correctAnswers}/
                                {player.totalQuestions} acertos
                              </p>
                            </div>

                            {/* Score */}
                            <div className="flex-shrink-0 text-right">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{player.score}%</div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(player.score / 20)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white font-bold py-3 px-8 rounded-2xl transform transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Fazer Novo Quiz
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return null
}
