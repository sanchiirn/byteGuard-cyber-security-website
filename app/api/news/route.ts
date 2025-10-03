import { NextResponse } from "next/server"
import { XMLParser } from "fast-xml-parser"

const SOURCES = [
  { url: "https://feeds.feedburner.com/TheHackersNews", source: "The Hacker News" },
  { url: "https://krebsonsecurity.com/feed/", source: "Krebs on Security" },
  { url: "https://www.zdnet.com/topic/security/rss.xml", source: "ZDNet Security" },
  // India-related general tech/security sections
  { url: "https://www.indiatoday.in/rss/1204", source: "India Today (Crime/Security)" },
]

export async function GET() {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  })

  const results = await Promise.allSettled(
    SOURCES.map(async (s) => {
      const res = await fetch(s.url, { cache: "no-store" })
      const text = await res.text()
      const xml = parser.parse(text)
      // Try RSS 2.0 or Atom
      const items: any[] = xml?.rss?.channel?.item ?? xml?.feed?.entry ?? []
      return items.map((it: any) => ({
        title: it.title?.["#text"] || it.title || "",
        link: it.link?.href || it.link || it?.guid || "",
        pubDate: it.pubDate || it.updated || it.published || "",
        source: s.source,
      }))
    }),
  )

  const items = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []))

  // Basic de-dup by title
  const seen = new Set<string>()
  const deduped = items.filter((i) => {
    const key = i.title
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return NextResponse.json({ items: deduped.slice(0, 30) }, { headers: { "Cache-Control": "no-store" } })
}
