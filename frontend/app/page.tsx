"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

// Dados do quiz expandido com elementos temáticos
const quizData = {
  questions: [
    {
      id: 1,
      question: "Qual é o nome completo do nosso querido chefe Michael?",
      options: ["Michael Gary Scott", "Michael George Scott", "Michael Grant Scott", "Michael Glenn Scott"],
      correct: 0,
      explanation: "Michael Gary Scott é nosso gerente regional favorito da Dunder Mifflin! 🎉",
      characterImage: "/placeholder.svg?height=120&width=120&text=😊+Michael",
      emoji: "👔",
      gif: "/placeholder.svg?height=200&width=300&text=Michael+Dancing",
    },
    {
      id: 2,
      question: "Em qual empresa nossos personagens trabalham?",
      options: [
        "Scranton Paper Company",
        "Dunder Mifflin Paper Company",
        "Pennsylvania Paper Co.",
        "Northeastern Paper Supply",
      ],
      correct: 1,
      explanation: "Dunder Mifflin é o lar dos nossos personagens favoritos! 🏢",
      characterImage: "/placeholder.svg?height=120&width=120&text=🏢+DM",
      emoji: "🏢",
      gif: "/placeholder.svg?height=200&width=300&text=Office+Building",
    },
    {
      id: 3,
      question: "Quem é o especialista em beterrabas do escritório?",
      options: ["Jim Halpert", "Stanley Hudson", "Dwight Schrute", "Creed Bratton"],
      correct: 2,
      explanation: "Dwight e suas beterrabas são inseparáveis! 🥬",
      characterImage: "/placeholder.svg?height=120&width=120&text=🥬+Dwight",
      emoji: "🥬",
      gif: "/placeholder.svg?height=200&width=300&text=Dwight+FALSE",
    },
    {
      id: 4,
      question: "Quem é a recepcionista mais querida de Scranton?",
      options: ["Karen Filippelli", "Angela Martin", "Kelly Kapoor", "Pam Beesly"],
      correct: 3,
      explanation: "Pam é o coração do escritório! ❤️",
      characterImage: "/placeholder.svg?height=120&width=120&text=❤️+Pam",
      emoji: "🎨",
      gif: "/placeholder.svg?height=200&width=300&text=Pam+Smiling",
    },
    {
      id: 5,
      question: "Qual é a frase mais icônica do Michael?",
      options: ["Bears. Beets. Battlestar Galactica.", "That's what she said!", "I am Beyoncé, always.", "Parkour!"],
      correct: 1,
      explanation: "Essa frase nunca sai de moda! 😂",
      characterImage: "/placeholder.svg?height=120&width=120&text=😂+Michael",
      emoji: "😂",
      gif: "/placeholder.svg?height=200&width=300&text=Michael+Laughing",
    },
    {
      id: 6,
      question: "Como Dwight carinhosamente chama o Jim?",
      options: ["Tuna", "Big Tuna", "Jimothy", "James"],
      correct: 1,
      explanation: "Big Tuna é um apelido que ficou para sempre! 🐟",
      characterImage: "/placeholder.svg?height=120&width=120&text=🐟+Jim",
      emoji: "🐟",
      gif: "/placeholder.svg?height=200&width=300&text=Jim+Pranking",
    },
    {
      id: 7,
      question: "Qual é a paixão culinária do Kevin?",
      options: ["Brownies", "M&Ms", "Cookies", "Donuts"],
      correct: 0,
      explanation: "Os brownies do Kevin são lendários! 🍫",
      characterImage: "/placeholder.svg?height=120&width=120&text=🍫+Kevin",
      emoji: "🍫",
      gif: "/placeholder.svg?height=200&width=300&text=Kevin+Eating",
    },
    {
      id: 8,
      question: "Quem cuida das contas da empresa?",
      options: ["Oscar Martinez", "Angela Martin", "Kevin Malone", "Stanley Hudson"],
      correct: 0,
      explanation: "Oscar é nosso contador mais confiável! 📊",
      characterImage: "/placeholder.svg?height=120&width=120&text=📊+Oscar",
      emoji: "📊",
      gif: "/placeholder.svg?height=200&width=300&text=Oscar+Working",
    },
  ],
  characters: [
    {
      name: "Michael Scott",
      description:
        "Você é carismático, engraçado e sempre tenta fazer todos rirem! Às vezes exagera, mas tem um coração de ouro.",
      image: "/placeholder.svg?height=200&width=200&text=😊+Michael",
      minScore: 85,
      color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700",
      quote: "I'm not superstitious, but I am a little stitious.",
      emoji: "👔",
    },
    {
      name: "Jim Halpert",
      description:
        "Você é inteligente, sarcástico e adora uma boa pegadinha! Sabe equilibrar trabalho e diversão perfeitamente.",
      image: "/placeholder.svg?height=200&width=200&text=😏+Jim",
      minScore: 70,
      color: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700",
      quote: "Bears. Beets. Battlestar Galactica.",
      emoji: "😏",
    },
    {
      name: "Dwight Schrute",
      description: "Você é dedicado, intenso e leva tudo muito a sério! Especialista em... bem, em muitas coisas!",
      image: "/placeholder.svg?height=200&width=200&text=🤓+Dwight",
      minScore: 55,
      color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700",
      quote: "FACT: Bears eat beets. Bears. Beets. Battlestar Galactica.",
      emoji: "🤓",
    },
    {
      name: "Pam Beesly",
      description: "Você é criativa, gentil e observadora. É o tipo de pessoa que todos querem ter por perto!",
      image: "/placeholder.svg?height=200&width=200&text=🎨+Pam",
      minScore: 40,
      color: "bg-pink-50 border-pink-200 dark:bg-pink-900/20 dark:border-pink-700",
      quote: "I'm sorry, what was the question?",
      emoji: "🎨",
    },
    {
      name: "Kevin Malone",
      description: "Você é descontraído e gosta das coisas simples da vida. Às vezes confuso, mas sempre simpático!",
      image: "/placeholder.svg?height=200&width=200&text=😄+Kevin",
      minScore: 0,
      color: "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700",
      quote: "Why waste time say lot word when few word do trick?",
      emoji: "😄",
    },
  ],
  feedback: {
    correct: [
      "That's what she said! 😄",
      "Perfeito! Você manda bem! ✨",
      "Excelente! Michael ficaria orgulhoso! 🏆",
      "Acertou em cheio! 👌",
      "Você conhece mesmo The Office! 📺",
    ],
    incorrect: [
      "FALSE! - Dwight Schrute 🤓",
      "Ops! Não foi dessa vez 😅",
      "Quase lá! Na próxima você acerta! 💪",
      "Não desista, você consegue! 🌟",
      "Todo mundo erra às vezes! 😊",
    ],
  },
}

interface PlayerResult {
  name: string
  score: number
  character: string
  date: string
  totalQuestions: number
  correctAnswers: number
}

export default function TheOfficeQuiz() {
  const [gameState, setGameState] = useState<"landing" | "quiz" | "feedback" | "result" | "ranking">("landing")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [playerName, setPlayerName] = useState("")
  const [ranking, setRanking] = useState<PlayerResult[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  // Detectar tema do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setDarkMode(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Aplicar tema ao documento
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Carregar ranking do localStorage
  useEffect(() => {
    const savedRanking = localStorage.getItem("theOfficeQuizRanking")
    if (savedRanking) {
      setRanking(JSON.parse(savedRanking))
    }
  }, [])

  // Função para tocar sons (simulada)
  const playSound = (type: "correct" | "incorrect" | "click" | "finish") => {
    if (!soundEnabled) return
    console.log(`Playing ${type} sound`)
  }

  const handleStartQuiz = () => {
    if (!playerName.trim()) return
    playSound("click")
    setGameState("quiz")
    setCurrentQuestion(0)
    setAnswers([])
    setScore(0)
    setCorrectAnswers(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return
    playSound("click")
    setSelectedAnswer(answerIndex)

    // Mostrar feedback imediatamente
    const correct = answerIndex === quizData.questions[currentQuestion].correct
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      playSound("correct")
      setCorrectAnswers((prev) => prev + 1)
    } else {
      playSound("incorrect")
    }
  }

  const handleNextQuestion = () => {
    playSound("click")
    const newAnswers = [...answers, selectedAnswer!]
    setAnswers(newAnswers)

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      // Quiz finalizado - calcular score final
      const finalScore = Math.round((correctAnswers / quizData.questions.length) * 100)
      setScore(finalScore)

      // Salvar no ranking
      const character = getCharacterResult(finalScore)
      const newResult: PlayerResult = {
        name: playerName,
        score: finalScore,
        character: character?.name || "Kevin Malone",
        date: new Date().toISOString(),
        totalQuestions: quizData.questions.length,
        correctAnswers: correctAnswers,
      }

      const updatedRanking = [...ranking, newResult].sort((a, b) => b.score - a.score).slice(0, 15)
      setRanking(updatedRanking)
      localStorage.setItem("theOfficeQuizRanking", JSON.stringify(updatedRanking))

      playSound("finish")
      setGameState("result")
    }
  }

  const getCharacterResult = (finalScore: number) => {
    return (
      quizData.characters.find((char) => finalScore >= char.minScore) ||
      quizData.characters[quizData.characters.length - 1]
    )
  }

  const resetQuiz = () => {
    playSound("click")
    setGameState("landing")
    setCurrentQuestion(0)
    setAnswers([])
    setScore(0)
    setCorrectAnswers(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setPlayerName("")
  }

  const shareResult = () => {
    playSound("click")
    const character = getCharacterResult(score)
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

  const showRanking = () => {
    playSound("click")
    setGameState("ranking")
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  // Animações do Framer Motion
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

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  }

  if (gameState === "landing") {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
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
            {/* Controls */}
            <div className="absolute top-28 right-6 flex gap-2">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 rounded-full shadow-lg"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => setSoundEnabled(!soundEnabled)}
                variant="outline"
                size="sm"
                className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 rounded-full shadow-lg"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>

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
                  Pronto para provar que você é o Regional Manager de Scranton? 🏆
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
                        onKeyPress={(e) => e.key === "Enter" && handleStartQuiz()}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      <span className="font-semibold text-blue-700 dark:text-blue-300">O que te espera:</span>
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                      <p>✨ {quizData.questions.length} perguntas divertidas</p>
                      <p>🎯 Sem pressa, responda no seu ritmo</p>
                      <p>🎭 Descubra qual personagem você é</p>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleStartQuiz}
                      disabled={!playerName.trim()}
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white font-bold text-lg py-4 rounded-2xl transform transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                      onClick={showRanking}
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

  if (gameState === "quiz") {
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
    const question = quizData.questions[currentQuestion]

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
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
                    <span className="text-white font-bold text-sm">{question.emoji}</span>
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">Quiz do The Office</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Olá, {playerName}! 👋</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 px-3 py-1 rounded-full">
                  {currentQuestion + 1} de {quizData.questions.length}
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
                    src={question.characterImage || "/placeholder.svg"}
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
                        {question.question}
                      </h3>
                    </motion.div>

                    {!showFeedback ? (
                      <div className="space-y-4">
                        {question.options.map((option, index) => (
                          <motion.div
                            key={index}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <button
                              onClick={() => handleAnswerSelect(index)}
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
                                {isCorrect
                                  ? quizData.feedback.correct[
                                      Math.floor(Math.random() * quizData.feedback.correct.length)
                                    ]
                                  : quizData.feedback.incorrect[
                                      Math.floor(Math.random() * quizData.feedback.incorrect.length)
                                    ]}
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
                              src={question.gif || "/placeholder.svg"}
                              alt="Reaction GIF"
                              className="w-48 h-32 mx-auto rounded-2xl object-cover shadow-lg"
                            />
                          </motion.div>

                          {!isCorrect && (
                            <div className="bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded-2xl p-3 mb-4">
                              <p className="text-green-800 dark:text-green-300 font-medium">
                                <strong>Resposta correta:</strong> {question.options[question.correct]}
                              </p>
                            </div>
                          )}

                          <p className="text-gray-700 dark:text-gray-300 font-medium">{question.explanation}</p>

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
                            onClick={handleNextQuestion}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white font-bold py-4 rounded-2xl transform transition-all duration-200"
                          >
                            {currentQuestion === quizData.questions.length - 1 ? (
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

  if (gameState === "result") {
    const character = getCharacterResult(score)

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
                Você acertou {correctAnswers} de {quizData.questions.length} perguntas
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
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={`rounded-3xl p-6 border-2 ${character?.color} space-y-4`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="w-32 h-32 mx-auto bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg"
              >
                <img
                  src={character?.image || "/placeholder.svg"}
                  alt={character?.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  Você é como {character?.name}! {character?.emoji}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{character?.description}</p>
                <div className="bg-white/80 dark:bg-gray-700/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200 font-medium italic">"{character?.quote}"</p>
                </div>
              </div>
            </motion.div>

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

  if (gameState === "ranking") {
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
                {ranking.length === 0 ? (
                  <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Ainda não temos resultados!</p>
                    <p>Seja o primeiro a fazer o quiz!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {ranking.map((player, index) => {
                      const character = quizData.characters.find((c) => c.name === player.character)
                      return (
                        <motion.div
                          key={index}
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
