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

export function AnonymousStories() {
  const [text, setText] = useState("")
  const { data, mutate } = useSWR<{ stories: Story[] }>("/api/stories", fetcher)

  // Local fallback to persist across reloads if serverless store resets
  useEffect(() => {
    if (!data?.stories?.length) {
      const local = localStorage.getItem("anon_stories")
      if (local) {
        // Optimistically hydrate UI with local cache
        mutate({ stories: JSON.parse(local) }, { revalidate: false })
      }
    } else {
      localStorage.setItem("anon_stories", JSON.stringify(data.stories))
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

  const stories = useMemo(() => data?.stories ?? [], [data?.stories])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Experience</CardTitle>
        <CardDescription>Help others learn by sharing your cyber fraud story anonymously.</CardDescription>
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
        <div className="grid gap-3">
          {stories.length === 0 && (
            <p className="text-sm text-muted-foreground">No stories yet. Be the first to share.</p>
          )}
          {stories.map((s) => (
            <div key={s.id} className="p-3 rounded-md border border-border bg-card/50">
              <p className="whitespace-pre-wrap leading-relaxed">{s.text}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">{new Date(s.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
