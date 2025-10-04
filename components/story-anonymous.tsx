"use client"

import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type Story = {
  id: string
  text: string
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const SAMPLE_STORIES: Story[] = [
  {
    id: "sample-1",
    text: "I received a call from someone claiming to be from my bank. They said my account was compromised and asked for my OTP. I almost gave it but remembered the 1930 helpline advice. I hung up and called my bank directly. It was a scam! Always verify through official channels.",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-2",
    text: "I got a WhatsApp message offering a work-from-home job with high pay. They asked me to complete simple tasks and pay a registration fee. After paying ₹5,000, they disappeared. Never pay for job opportunities, especially on WhatsApp!",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-3",
    text: "Someone created a fake profile on a dating app and gained my trust over weeks. They then asked for money for a 'medical emergency'. I sent ₹20,000 before realizing it was a romance scam. Be very careful with online relationships.",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-4",
    text: "I clicked on a link that looked like it was from my electricity board about a pending bill. It took me to a fake payment page. Luckily, my bank's fraud detection blocked the transaction. Always check the URL carefully before entering payment details.",
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-5",
    text: "A 'police officer' called saying my Aadhaar was linked to illegal activities and I would be arrested unless I paid a fine immediately. This is called 'digital arrest' scam. I reported it to cybercrime.gov.in. Real police never demand money over phone!",
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-6",
    text: "I downloaded a loan app that seemed legitimate. After taking a small loan, they started harassing me and my contacts for repayment with extremely high interest. Only use RBI-registered loan apps. Check the RBI website before downloading any financial app.",
    createdAt: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-7",
    text: "I received an email saying I won a lottery I never entered. They asked for bank details to transfer the prize money. Classic lottery scam! If you didn't participate, you can't win. Delete such emails immediately.",
    createdAt: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-8",
    text: "Someone hacked my friend's Instagram and sent me a message asking for urgent financial help. I almost sent money but decided to call my friend first. Their account was compromised. Always verify through a different communication channel.",
    createdAt: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-9",
    text: "I got a call about KYC update required for my bank account. They sent a link to update details. The link was a phishing site designed to steal my credentials. Banks never ask for KYC updates via phone calls or SMS links.",
    createdAt: new Date(Date.now() - 63 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "sample-10",
    text: "I saw an ad on social media for cryptocurrency investment with guaranteed 300% returns. I invested ₹50,000 and the website disappeared after a week. If returns sound too good to be true, they probably are. Research thoroughly before investing.",
    createdAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function AnonymousStories() {
  const [text, setText] = useState("")
  const { data, mutate } = useSWR<{ stories: Story[] }>("/api/stories", fetcher)

  // Local fallback to persist across reloads if serverless store resets
  useEffect(() => {
    if (!data?.stories?.length) {
      const local = localStorage.getItem("anon_stories")
      if (local) {
        const parsed = JSON.parse(local)
        mutate({ stories: [...SAMPLE_STORIES, ...parsed] }, { revalidate: false })
      } else {
        mutate({ stories: SAMPLE_STORIES }, { revalidate: false })
      }
    } else {
      const userStories = data.stories.filter((s) => !s.id.startsWith("sample-"))
      localStorage.setItem("anon_stories", JSON.stringify(userStories))
    }
  }, [data?.stories, mutate])

  async function submit() {
    if (!text.trim()) return
    const payload = { text: text.trim() }
    const res = await fetch("/api/stories", { method: "POST", body: JSON.stringify(payload) })
    if (res.ok) {
      setText("")
      mutate()
    }
  }

  const stories = useMemo(() => data?.stories ?? SAMPLE_STORIES, [data?.stories])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Experience</CardTitle>
        <CardDescription>
          Help others learn by sharing your cyber fraud story anonymously. Read real experiences from other Indians
          below.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Textarea
          placeholder="Share details (avoid personal info like phone, account numbers)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
        />
        <div className="flex items-center gap-2">
          <Button onClick={submit} className="bg-primary text-primary-foreground">
            Post Anonymously
          </Button>
          <span className="text-xs text-muted-foreground">
            Stories are public and anonymous. Do not include identifiable details.
          </span>
        </div>
        <Separator />
        <div className="grid gap-3 max-h-[600px] overflow-y-auto">
          <p className="text-sm font-semibold text-muted-foreground">
            {stories.length} {stories.length === 1 ? "Story" : "Stories"} Shared
          </p>
          {stories.map((s) => (
            <div key={s.id} className="p-4 rounded-md border border-border bg-card/50 hover:bg-card transition">
              <p className="whitespace-pre-wrap leading-relaxed text-sm">{s.text}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {new Date(s.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
