"use client"

import { motion } from "framer-motion"
import { Trophy, RotateCcw, Star } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useQuiz } from "../../../hooks/useQuiz"
import { useRanking } from "../../../hooks/useRanking"
import { CHARACTERS } from "../../../domain/constants/quiz"

export const RankingScreen = () => {
  const { resetQuiz } = useQuiz()
  const { ranking, loading, error } = useRanking()

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-6 office-paper-texture"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">Hall da Fama</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Os melhores conhecedores de The Office!</p>
        </motion.div>

        {/* Ranking Cards */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-lg">Carregando ranking...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16 text-red-500 dark:text-red-400">
                  <p className="text-lg">Erro ao carregar ranking</p>
                  <p className="text-sm">{error}</p>
                </div>
              ) : ranking.length === 0 ? (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                  <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Ainda não temos resultados!</p>
                  <p>Seja o primeiro a fazer o quiz!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {ranking.map((player, index) => {
                    const character = CHARACTERS.find((c) => c.name === player.character)
                    return (
                      <motion.div
                        key={player.id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
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
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">{player.name}</h3>
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
              variant="gradient"
              className="font-bold py-3 px-8 rounded-2xl transform transition-all duration-200"
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
