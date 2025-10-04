import { Hero } from "@/components/hero"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Helplines } from "@/components/helplines"
import Link from "next/link"
import { Key, LinkIcon, Newspaper, MessageSquare, Brain, AlertTriangle, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const FEATURES = [
  {
    title: "Password Generator",
    description: "Create strong, secure passwords instantly",
    icon: Key,
    href: "/password-generator",
    color: "text-blue-500",
  },
  {
    title: "Link Checker",
    description: "Verify suspicious links before clicking",
    icon: LinkIcon,
    href: "/link-checker",
    color: "text-green-500",
  },
  {
    title: "Cybercrime News",
    description: "Latest security news from India & worldwide",
    icon: Newspaper,
    href: "/news",
    color: "text-purple-500",
  },
  {
    title: "Anonymous Stories",
    description: "Share and read real fraud experiences",
    icon: MessageSquare,
    href: "/stories",
    color: "text-orange-500",
  },
  {
    title: "Security Quiz",
    description: "Test your cybersecurity knowledge",
    icon: Brain,
    href: "/quiz",
    color: "text-pink-500",
  },
  {
    title: "Fraud Types & Tips",
    description: "Learn about common frauds and prevention",
    icon: AlertTriangle,
    href: "/fraud-tips",
    color: "text-red-500",
  },
  {
    title: "Safety Resources",
    description: "Educational guides and best practices",
    icon: BookOpen,
    href: "/resources",
    color: "text-cyan-500",
  },
]

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Explore byteGuard Tools</h2>
          <p className="text-muted-foreground text-lg">Click any card to access interactive cybersecurity features</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.href} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-medium text-primary hover:underline">Launch Tool →</span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section id="helplines" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-balance mb-6">
          India Helplines & Official Links
        </h2>
        <Helplines />
      </section>

      <SiteFooter />
    </main>
  )
}
