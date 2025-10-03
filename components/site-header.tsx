import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/placeholder-logo.png" width={28} height={28} alt="" className="rounded-sm" />
          <span className="text-lg font-semibold">byteGuard</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/#tools">
            <Button variant="ghost">Tools</Button>
          </Link>
          <Link href="/#news">
            <Button variant="ghost">News</Button>
          </Link>
          <Link href="/resources">
            <Button variant="ghost">Resources</Button>
          </Link>
          <Link href="/#quiz">
            <Button variant="ghost">Quiz</Button>
          </Link>
          <Link href="/#helplines">
            <Button variant="default" className="bg-primary text-primary-foreground">
              Helplines
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
