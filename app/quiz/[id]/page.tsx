"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react"

export default function QuizPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  // Mock quiz data
  const quiz = {
    id: Number(id),
    title: "HTML Fundamentals Quiz",
    description: "Test your knowledge of HTML basics",
    courseId: 1,
    courseName: "Introduction to Web Development",
    totalQuestions: 5,
    timeLimit: "10 minutes",
    passingScore: 80,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Hyper Text Modern Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
      },
      {
        id: 2,
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: "<a>",
      },
      {
        id: 3,
        question: "Which HTML element is used to define the title of a document?",
        options: ["<head>", "<title>", "<header>", "<meta>"],
        correctAnswer: "<title>",
      },
      {
        id: 4,
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "styles", "style", "font"],
        correctAnswer: "style",
      },
      {
        id: 5,
        question: "Which HTML element is used to create an unordered list?",
        options: ["<ol>", "<list>", "<ul>", "<dl>"],
        correctAnswer: "<ul>",
      },
    ],
  }

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answer
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100)
    setScore(finalScore)
    setIsSubmitted(true)

    // Show toast notification
    if (finalScore >= quiz.passingScore) {
      toast({
        title: "Quiz Completed!",
        description: `Congratulations! You scored ${finalScore}% and passed the quiz.`,
      })
    } else {
      toast({
        title: "Quiz Completed",
        description: `You scored ${finalScore}%. You need ${quiz.passingScore}% to pass.`,
        variant: "destructive",
      })
    }
  }

  const currentQuestionData = quiz.questions[currentQuestion]
  const isAnswered = selectedAnswers[currentQuestion] !== undefined
  const isLastQuestion = currentQuestion === quiz.questions.length - 1
  const isAllAnswered =
    selectedAnswers.length === quiz.questions.length && selectedAnswers.every((answer) => answer !== undefined)

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={`/courses/${quiz.courseId}`}
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to {quiz.courseName}
            </Link>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.description}</p>
          </div>
          {!isSubmitted && <div className="text-sm text-muted-foreground">Time Limit: {quiz.timeLimit}</div>}
        </div>

        {!isSubmitted ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Question {currentQuestion + 1} of {quiz.totalQuestions}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {currentQuestion + 1} / {quiz.totalQuestions}
                </div>
              </div>
              <Progress value={((currentQuestion + 1) / quiz.totalQuestions) * 100} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg font-medium">{currentQuestionData.question}</div>
              <RadioGroup value={selectedAnswers[currentQuestion]} onValueChange={handleAnswerSelect}>
                {currentQuestionData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>
              <div className="flex space-x-2">
                {isLastQuestion ? (
                  <Button onClick={handleSubmit} disabled={!isAllAnswered} className="bg-blue-600 hover:bg-blue-700">
                    Submit Quiz
                  </Button>
                ) : (
                  <Button onClick={handleNext} disabled={!isAnswered} className="bg-blue-600 hover:bg-blue-700">
                    Next <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
              <CardDescription>You scored {score}% on this quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-6">
                {score >= quiz.passingScore ? (
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    <h2 className="mt-2 text-2xl font-bold text-green-500">Passed!</h2>
                    <p className="mt-1 text-muted-foreground">Congratulations! You've passed the quiz.</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <XCircle className="mx-auto h-16 w-16 text-red-500" />
                    <h2 className="mt-2 text-2xl font-bold text-red-500">Not Passed</h2>
                    <p className="mt-1 text-muted-foreground">You need {quiz.passingScore}% to pass this quiz.</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Question Review</h3>
                {quiz.questions.map((question, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex items-start space-x-2">
                      {selectedAnswers[index] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm">
                          Your answer:{" "}
                          <span
                            className={
                              selectedAnswers[index] === question.correctAnswer
                                ? "text-green-500 font-medium"
                                : "text-red-500 font-medium"
                            }
                          >
                            {selectedAnswers[index]}
                          </span>
                        </p>
                        {selectedAnswers[index] !== question.correctAnswer && (
                          <p className="text-sm">
                            Correct answer: <span className="text-green-500 font-medium">{question.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/courses/${quiz.courseId}`}>Back to Course</Link>
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(0)
                  setSelectedAnswers([])
                  setIsSubmitted(false)
                  setScore(0)
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Retake Quiz
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
