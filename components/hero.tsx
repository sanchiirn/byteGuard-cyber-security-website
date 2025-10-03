"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <header className="relative">
      <div className="relative overflow-hidden rounded-none md:rounded-xl">
        <div className="relative h-[320px] md:h-[420px] w-full">
          <Image
            src="/images/cyber-bg.jpg"
            alt="Dark cyber security background with circuits"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-pretty">
                  Stay Safe Online: Tools, News, and Tips
                </h1>
                <p className="mt-3 md:mt-4 text-muted-foreground leading-relaxed">
                  Generate strong passwords, check risky links, read global cybercrime news, share experiences
                  anonymously, and learn how to protect yourself.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#tools">
                    <Button className="bg-primary text-primary-foreground hover:opacity-90">Get Started</Button>
                  </a>
                  <a href="#news">
                    <Button variant="secondary">Latest News</Button>
                  </a>
                  <a href="#helplines">
                    <Button variant="outline">Need Help?</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
