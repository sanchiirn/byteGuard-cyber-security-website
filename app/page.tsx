import { Hero } from "@/components/hero"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PasswordGenerator } from "@/components/password-generator"
import { LinkChecker } from "@/components/link-checker"
import { NewsFeed } from "@/components/news-feed"
import { AnonymousStories } from "@/components/story-anonymous"
import { SecurityQuiz } from "@/components/quiz"
import { FraudAccordion } from "@/components/fraud-accordion"
import { Helplines } from "@/components/helplines"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />

      <section id="tools" className="container mx-auto px-4 py-10 grid gap-8 md:gap-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-balance">Interactive Tools</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <PasswordGenerator />
          <LinkChecker />
        </div>
      </section>

      <section id="news" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-balance">
          Cybercrime News (India & World)
        </h2>
        <NewsFeed />
      </section>

      <section id="stories" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-balance">Share Your Story (Anonymous)</h2>
        <AnonymousStories />
      </section>

      <section id="quiz" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-balance">Cybersecurity Basics Quiz</h2>
        <SecurityQuiz />
      </section>

      <section id="fraud-tips" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-balance">Fraud Types & Safety Tips</h2>
        <FraudAccordion />
      </section>

      <section id="helplines" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-balance">
          India Helplines & Official Links
        </h2>
        <Helplines />
      </section>

      <SiteFooter />
    </main>
  )
}
