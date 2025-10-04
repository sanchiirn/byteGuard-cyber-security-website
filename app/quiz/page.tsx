import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SecurityQuiz } from "@/components/quiz"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QuizPage() {
  return (
    <main>
      <SiteHeader />
      <div className="container mx-auto px-4 py-10">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Cybersecurity Quiz</h1>
        <p className="text-muted-foreground mb-6">Test your knowledge and learn how to stay safe online</p>
        <SecurityQuiz />
      </div>
      <SiteFooter />
    </main>
  )
}
