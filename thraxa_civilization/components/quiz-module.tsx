"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "ai" | "economics" | "science" | "behavior"
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is the main purpose of a selector node in a behavioral tree?",
    options: [
      "Execute all child nodes in sequence",
      "Choose one child node to execute",
      "Test if a condition is true",
      "Perform an action in the world",
    ],
    correctAnswer: 1,
    explanation:
      "A selector node (OR logic) tries to execute its child nodes in order until one succeeds, then returns success.",
    category: "ai",
  },
  {
    id: 2,
    text: "In economics, what does 'opportunity cost' refer to?",
    options: [
      "The monetary cost of a product",
      "The cost of operating a business",
      "The value of the next best alternative given up",
      "The cost of importing goods from other countries",
    ],
    correctAnswer: 2,
    explanation: "Opportunity cost is the value of what you give up (the next best alternative) when making a choice.",
    category: "economics",
  },
  {
    id: 3,
    text: "Which technology in the simulation directly improves food production?",
    options: ["Military", "Culture", "Science", "Agriculture"],
    correctAnswer: 3,
    explanation:
      "Agriculture technology directly improves food production efficiency, allowing civilizations to support larger populations.",
    category: "science",
  },
  {
    id: 4,
    text: "What factor might make two civilizations less likely to go to war?",
    options: [
      "High trade value between them",
      "Similar military strength",
      "Close geographic proximity",
      "Abundant resources",
    ],
    correctAnswer: 0,
    explanation:
      "High trade value creates economic interdependence, making war more costly for both sides and therefore less likely.",
    category: "behavior",
  },
]

export default function QuizModule() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)

  const startQuiz = (category: "ai" | "economics" | "science" | "behavior") => {
    const categoryQuestions = questions.filter((q) => q.category === category)
    const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)]
    setCurrentQuestion(randomQuestion)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  const handleAnswer = () => {
    if (selectedAnswer === null) return

    setIsAnswered(true)
    setTotalAnswered((prev) => prev + 1)

    if (selectedAnswer === currentQuestion?.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (!currentQuestion) return

    const categoryQuestions = questions.filter((q) => q.category === currentQuestion.category)
    let randomQuestion

    do {
      randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)]
    } while (randomQuestion.id === currentQuestion.id && categoryQuestions.length > 1)

    setCurrentQuestion(randomQuestion)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Knowledge Check</CardTitle>
        <CardDescription>Test your understanding with these quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        {!currentQuestion ? (
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-20"
              onClick={() => startQuiz("ai")}
            >
              <span className="text-lg mb-1">🧠</span>
              <span>AI Quiz</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-20"
              onClick={() => startQuiz("economics")}
            >
              <span className="text-lg mb-1">📈</span>
              <span>Economics Quiz</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-20"
              onClick={() => startQuiz("science")}
            >
              <span className="text-lg mb-1">🔬</span>
              <span>Science Quiz</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-20"
              onClick={() => startQuiz("behavior")}
            >
              <span className="text-lg mb-1">👥</span>
              <span>Behavior Quiz</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Score: {correctAnswers}/{totalAnswered}
            </div>

            <div>
              <h3 className="font-medium mb-2">{currentQuestion.text}</h3>

              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswered} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                      {isAnswered && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="inline ml-2 text-green-500" size={16} />
                      )}
                      {isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <XCircle className="inline ml-2 text-red-500" size={16} />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {isAnswered && (
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="font-medium">Explanation:</p>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => setCurrentQuestion(null)}>
                Back to Topics
              </Button>

              {!isAnswered ? (
                <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion}>Next Question</Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

