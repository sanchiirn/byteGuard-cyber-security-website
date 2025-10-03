"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type Q = {
  q: string
  options: string[]
  answer: number
  explanation: string
}

const QUESTIONS: Q[] = [
  {
    q: "What is the safest way to verify a bank message asking for OTP?",
    options: [
      "Reply to the message with your OTP",
      "Call the number in the message",
      "Ignore and contact the bank through official channels",
      "Forward to a friend to check",
    ],
    answer: 2,
    explanation: "Never share OTPs. Use official channels like the bank’s website/app or 1930 for help.",
  },
  {
    q: "Which password is strongest?",
    options: ["Password@123", "P@ssw0rd2020", "jelly-harbor-skyline-93", "iloveyou"],
    answer: 2,
    explanation: "Long, random phrases have higher entropy and are easier to remember.",
  },
  {
    q: "A link shortener takes you to a login page. What should you do?",
    options: [
      "Enter your credentials",
      "Check the domain carefully before entering info",
      "Use any password",
      "Share link widely",
    ],
    answer: 1,
    explanation: "Check the domain and SSL certificate. When unsure, type the address manually.",
  },
]

export function SecurityQuiz() {
  const [answers, setAnswers] = useState<Record<number, number | undefined>>({})
  const [submitted, setSubmitted] = useState(false)

  const correct = Object.entries(answers).filter(([i, v]) => QUESTIONS[Number(i)]?.answer === v).length

  function select(qIndex: number, optIndex: number) {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }))
  }

  function submit() {
    setSubmitted(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cybersecurity Basics Quiz</CardTitle>
        <CardDescription>Test your awareness. No data is stored.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="grid gap-2">
            <p className="font-medium">
              {i + 1}. {q.q}
            </p>
            <RadioGroup
              value={answers[i]?.toString() ?? ""}
              onValueChange={(v) => select(i, Number(v))}
              className="grid gap-2"
            >
              {q.options.map((opt, j) => (
                <div key={j} className="flex items-center gap-2">
                  <RadioGroupItem id={`q${i}-${j}`} value={String(j)} />
                  <Label htmlFor={`q${i}-${j}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
            {submitted && (
              <p className="text-sm text-muted-foreground">
                {answers[i] === q.answer ? "Correct. " : "Incorrect. "}
                {q.explanation}
              </p>
            )}
          </div>
        ))}
        {!submitted ? (
          <Button onClick={submit} className="bg-primary text-primary-foreground">
            Submit
          </Button>
        ) : (
          <p className="text-sm">
            Score: {correct} / {QUESTIONS.length}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
