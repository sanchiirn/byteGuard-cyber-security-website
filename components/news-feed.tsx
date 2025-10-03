"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type NewsItem = {
  title: string
  link: string
  pubDate?: string
  source?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function NewsFeed() {
  const { data, isLoading, error, mutate } = useSWR<{ items: NewsItem[] }>("/api/news", fetcher, {
    revalidateOnFocus: false,
  })

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Curated from trusted security feeds. Sources include India & global outlets.
        </p>
        <Button size="sm" variant="secondary" onClick={() => mutate()}>
          Refresh
        </Button>
      </div>

      {isLoading && <p className="text-sm">Loading news…</p>}
      {error && <p className="text-sm text-destructive">Failed to load news. Please try again.</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {data?.items?.slice(0, 10).map((item, i) => (
          <Card key={i} className="hover:translate-y-[1px] transition">
            <CardHeader>
              <CardTitle className="text-base leading-6">
                <a href={item.link} target="_blank" rel="noreferrer" className="hover:underline">
                  {item.title}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>{item.source}</span>
                <span>{item.pubDate ? new Date(item.pubDate).toLocaleString() : ""}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
