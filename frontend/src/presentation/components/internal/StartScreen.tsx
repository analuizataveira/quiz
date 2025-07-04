"use client"

import { motion } from "framer-motion"
import {
  User,
  PartyPopper,
  ArrowRight,
  Trophy,
  Users,
  Coffee,
  Paperclip,
  FileText,
  Monitor,
  Building,
  Heart,
  Zap,
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { useQuiz } from "../../../hooks/useQuiz"
import { useRanking } from "../../../hooks/useRanking"
import { WELCOME_PHRASES } from "../../../domain/constants/phrases"

export const StartScreen = () => {
  const { playerName, setPlayerName, startQuiz, setGameState } = useQuiz()
  const { ranking } = useRanking()

  const welcomePhrase = WELCOME_PHRASES[Math.floor(Math.random() * WELCOME_PHRASES.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden office-paper-texture"
    >
      {/* Dunder Mifflin Header */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-gray-900 border-b-4 border-yellow-400 dark:border-yellow-500 flex items-center justify-center shadow-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
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
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-40 left-32"
        >
          <img
            src="/placeholder.svg?height=130&width=100&text=Jim"
            alt="Jim"
            className="rounded-lg shadow-2xl transform rotate-1"
          />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-60 right-20"
        >
          <img
            src="/placeholder.svg?height=135&width=105&text=Pam"
            alt="Pam"
            className="rounded-lg shadow-2xl transform -rotate-1"
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 pt-32">
        <div className="max-w-2xl w-full space-y-8 text-center">
          {/* World's Best Boss Badge */}
          <motion.div
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: -5, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-32 left-6 bg-yellow-400 dark:bg-yellow-500 text-gray-800 px-3 py-2 rounded-lg shadow-lg transform -rotate-5 border-2 border-yellow-600"
          >
            <div className="text-xs font-bold">WORLD'S</div>
            <div className="text-xs font-bold">BEST BOSS</div>
          </motion.div>

          {/* Main Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-yellow-600 dark:to-orange-600 rounded-full flex items-center justify-center shadow-xl"
              >
                <img
                  src="/placeholder.svg?height=100&width=100&text=😊+Office"
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
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  The Office
                </span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed"
              >
                {welcomePhrase}
              </motion.p>
            </div>
          </motion.div>

          {/* Name Input Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
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
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="text-center text-lg font-medium border-2 border-gray-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 rounded-2xl bg-gray-50 dark:bg-gray-700 py-4 px-6 text-gray-800 dark:text-white"
                      onKeyPress={(e) => e.key === "Enter" && startQuiz()}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    <span className="font-semibold text-blue-700 dark:text-blue-300">O que te espera:</span>
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                    <p>✨ 8 perguntas divertidas</p>
                    <p>🎯 Sem pressa, responda no seu ritmo</p>
                    <p>🎭 Descubra qual personagem você é</p>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={startQuiz}
                    disabled={!playerName.trim()}
                    size="lg"
                    variant="gradient"
                    className="w-full font-bold text-lg py-4 rounded-2xl transform transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PartyPopper className="w-5 h-5 mr-2" />🎬 Começar Quiz
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Ranking Preview */}
          {ranking.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-bold text-gray-700 dark:text-gray-300">Melhores Pontuações</h3>
                  </div>
                  <div className="space-y-3">
                    {ranking.slice(0, 3).map((player, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.4 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-gray-700/50"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                            index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-orange-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                          {player.name}
                        </span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{player.score}%</span>
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setGameState("ranking")}
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Ver Todos os Resultados
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
