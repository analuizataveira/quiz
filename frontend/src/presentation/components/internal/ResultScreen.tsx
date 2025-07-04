"use client"

import React from "react"

import { motion } from "framer-motion"
import { Trophy, Share2, RotateCcw, Star, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useQuiz } from "../../../hooks/useQuiz"

export const ResultScreen = () => {
  const { result, playerName, score, correctAnswers, totalQuestions, resetQuiz, setGameState, saveResult } = useQuiz()

  const character = result?.character

  const handleShare = () => {
    const text = `🎉 Acabei de fazer o Quiz do The Office e descobri que sou como ${character?.name}! Consegui ${score}% de acertos! "${character?.quote}" 😄`

    if (navigator.share) {
      navigator.share({
        title: "Quiz do The Office",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text + " " + window.location.href)
    }
  }

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

  // Save result when component mounts
  React.useEffect(() => {
    if (result) {
      saveResult()
    }
  }, [result, saveResult])

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-6 office-paper-texture"
    >
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
                Parabéns, {playerName}! 🎉
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Você completou o quiz!</p>
            </div>
          </motion.div>

          {/* Score Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl p-6 border-2 border-blue-100 dark:border-blue-800"
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
              Você acertou {correctAnswers} de {totalQuestions} perguntas
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
                      i < Math.floor(score / 20) ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Character Result */}
          {character && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={`rounded-3xl p-6 border-2 ${character.color} space-y-4`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="w-32 h-32 mx-auto bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg"
              >
                <img
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  Você é como {character.name}! {character.emoji}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{character.description}</p>
                <div className="bg-white/80 dark:bg-gray-700/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200 font-medium italic">"{character.quote}"</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleShare}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 dark:from-green-600 dark:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white font-bold py-3 rounded-2xl transform transition-all duration-200"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setGameState("ranking")}
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
                className="w-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold py-3 rounded-2xl bg-transparent transform transition-all duration-200"
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
