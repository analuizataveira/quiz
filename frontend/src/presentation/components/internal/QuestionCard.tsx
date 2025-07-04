"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { useQuiz } from "../../../hooks/useQuiz"
import { FEEDBACK_PHRASES } from "../../../domain/constants/phrases"
import { getRandomFeedbackPhrase } from "../../../utils/quiz.utils"

export const QuestionCard = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    showFeedback,
    isCorrect,
    playerName,
    progress,
    selectAnswer,
    nextQuestion,
  } = useQuiz()

  if (!currentQuestion) return null

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestionIndex}
        initial="initial"
        animate="in"
        exit="out"
        variants={slideVariants}
        transition={pageTransition}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex flex-col office-paper-texture"
      >
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
                  <span className="text-white font-bold text-sm">{currentQuestion.emoji}</span>
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">Quiz do The Office</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Olá, {playerName}! 👋</p>
                </div>
              </div>
              <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 px-3 py-1 rounded-full">
                {currentQuestionIndex + 1} de {totalQuestions}
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
                  src={currentQuestion.characterImage || "/placeholder.svg"}
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
                      {currentQuestion.question}
                    </h3>
                  </motion.div>

                  {!showFeedback ? (
                    <div className="space-y-4">
                      {currentQuestion.options.map((option, index) => (
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
                            className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 hover:shadow-md ${
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
                                    : "border-gray-300 dark:border-gray-500 text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span className="font-medium text-gray-800 dark:text-white flex-1">{option}</span>
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="space-y-6"
                    >
                      {/* Feedback Balloon */}
                      <div
                        className={`relative p-6 rounded-3xl text-center ${
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
                              {isCorrect ? "Perfeito! 🎉" : "Quase lá! 😊"}
                            </h4>
                            <p
                              className={`text-lg ${
                                isCorrect
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-orange-600 dark:text-orange-400"
                              }`}
                            >
                              {getRandomFeedbackPhrase(
                                isCorrect ? FEEDBACK_PHRASES.correct : FEEDBACK_PHRASES.incorrect,
                              )}
                            </p>
                          </div>
                        </div>

                        {/* GIF Placeholder */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mb-4"
                        >
                          <img
                            src={currentQuestion.gif || "/placeholder.svg"}
                            alt="Reaction GIF"
                            className="w-48 h-32 mx-auto rounded-2xl object-cover shadow-lg"
                          />
                        </motion.div>

                        {!isCorrect && (
                          <div className="bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded-2xl p-3 mb-4">
                            <p className="text-green-800 dark:text-green-300 font-medium">
                              <strong>Resposta correta:</strong> {currentQuestion.options[currentQuestion.correct]}
                            </p>
                          </div>
                        )}

                        <p className="text-gray-700 dark:text-gray-300 font-medium">{currentQuestion.explanation}</p>

                        {/* Speech bubble tail */}
                        <div
                          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 ${
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
                          variant="gradient"
                          className="w-full font-bold py-4 rounded-2xl transform transition-all duration-200"
                        >
                          {currentQuestionIndex === totalQuestions - 1 ? (
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
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
