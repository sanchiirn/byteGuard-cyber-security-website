"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Q = {
  q: string
  options: string[]
  answer: number
  explanation: string
}

type DescriptiveQ = {
  q: string
  type: "descriptive"
  sampleAnswer: string
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
    explanation: "Never share OTPs. Use official channels like the bank's website/app or 1930 for help.",
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
  {
    q: "What should you do if you receive a call claiming to be from your bank asking for card details?",
    options: [
      "Provide the details immediately",
      "Hang up and call the bank's official number",
      "Ask them to send an email first",
      "Share only the CVV number",
    ],
    answer: 1,
    explanation: "Banks never ask for complete card details over phone. Always verify by calling official numbers.",
  },
  {
    q: "Which of these is a sign of a phishing email?",
    options: [
      "Personalized greeting with your name",
      "Urgent language demanding immediate action",
      "Official company logo",
      "Professional formatting",
    ],
    answer: 1,
    explanation: "Phishing emails often create urgency to bypass your critical thinking. Always verify independently.",
  },
  {
    q: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "Logging in from two devices",
      "Adding a second verification step beyond password",
      "Having two email accounts",
    ],
    answer: 2,
    explanation:
      "2FA adds an extra security layer, typically requiring something you know (password) and something you have (phone/token).",
  },
  {
    q: "If you accidentally click a suspicious link, what should you do first?",
    options: [
      "Close the browser immediately",
      "Disconnect from the internet and run antivirus scan",
      "Change all your passwords on the same device",
      "Ignore it if nothing happens",
    ],
    answer: 1,
    explanation: "Disconnect immediately to prevent data transmission, then scan for malware before reconnecting.",
  },
]

const DESCRIPTIVE_Q: DescriptiveQ = {
  q: "Describe in your own words: What steps would you take if you realize you've been a victim of online fraud?",
  type: "descriptive",
  sampleAnswer:
    "Sample answer: 1) Stop all communication with the fraudster, 2) Report to cybercrime.gov.in and call 1930, 3) Inform your bank/payment provider immediately, 4) Change all passwords, 5) Document all evidence (screenshots, messages, transaction details), 6) File an FIR at the nearest police station, 7) Monitor your accounts for suspicious activity.",
}

export function SecurityQuiz() {
  const [answers, setAnswers] = useState<Record<number, number | undefined>>({})
  const [descriptiveAnswer, setDescriptiveAnswer] = useState("")
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
        <CardDescription>
          Test your awareness with 7 multiple choice and 1 descriptive question. No data is stored.
        </CardDescription>
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
                {answers[i] === q.answer ? "✓ Correct. " : "✗ Incorrect. "}
                {q.explanation}
              </p>
            )}
          </div>
        ))}

        <div className="grid gap-2 border-t pt-6">
          <p className="font-medium">
            {QUESTIONS.length + 1}. {DESCRIPTIVE_Q.q} (Descriptive)
          </p>
          <Textarea
            placeholder="Write your answer here..."
            value={descriptiveAnswer}
            onChange={(e) => setDescriptiveAnswer(e.target.value)}
            rows={6}
            className="resize-none"
          />
          {submitted && (
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              <p className="font-medium mb-2">Sample Answer:</p>
              <p>{DESCRIPTIVE_Q.sampleAnswer}</p>
            </div>
          )}
        </div>

        {!submitted ? (
          <Button onClick={submit} className="bg-primary text-primary-foreground">
            Submit Quiz
          </Button>
        ) : (
          <div className="text-sm space-y-2">
            <p className="font-semibold text-lg">
              Multiple Choice Score: {correct} / {QUESTIONS.length}
            </p>
            <p className="text-muted-foreground">
              Review the explanations above and compare your descriptive answer with the sample.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
