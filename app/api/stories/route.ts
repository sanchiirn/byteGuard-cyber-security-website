import { type NextRequest, NextResponse } from "next/server"

type Story = {
  id: string
  text: string
  createdAt: string
}

// Module-level store (resets on cold start). For persistence, connect a DB integration later.
const store: Story[] = []

export async function GET() {
  // newest first
  const items = [...store].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  return NextResponse.json({ stories: items })
}

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  if (!text || typeof text !== "string" || text.length < 10) {
    return NextResponse.json({ error: "Story too short" }, { status: 400 })
  }
  const sanitized = text.slice(0, 5000)
  const item: Story = { id: crypto.randomUUID(), text: sanitized, createdAt: new Date().toISOString() }
  store.push(item)
  return NextResponse.json({ ok: true })
}
