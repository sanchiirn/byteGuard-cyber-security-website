import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PasswordGenerator } from "@/components/password-generator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PasswordGeneratorPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Password Generator</h1>
        <PasswordGenerator />
      </div>
      <SiteFooter />
    </main>
  )
}
