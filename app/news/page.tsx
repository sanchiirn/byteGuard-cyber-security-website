import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsFeed } from "@/components/news-feed"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewsPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Cybercrime News</h1>
        <p className="text-muted-foreground mb-6">
          Stay updated with the latest cybersecurity news from India and around the world
        </p>
        <NewsFeed />
      </div>
      <SiteFooter />
    </main>
  )
}
