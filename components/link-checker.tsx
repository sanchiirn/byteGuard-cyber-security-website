"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TriangleAlert, ShieldCheck } from "lucide-react"

function analyzeUrl(url: string) {
  const trimmed = url.trim()
  let risk = 0
  const reasons: string[] = []

  try {
    const u = new URL(trimmed)
    const host = u.hostname

    // Heuristics
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
      risk += 2
      reasons.push("Uses IP address instead of domain")
    }
    if (host.split(".").some((part) => part.length > 20)) {
      risk += 1
      reasons.push("Very long subdomain/label")
    }
    if (host.includes("-")) {
      risk += 1
      reasons.push("Hyphens in domain")
    }
    if (u.href.length > 120) {
      risk += 1
      reasons.push("Unusually long URL")
    }
    if (u.searchParams.toString().length > 60) {
      risk += 1
      reasons.push("Many/long query parameters")
    }
    if (trimmed.includes("@")) {
      risk += 2
      reasons.push("Contains @ (can hide real destination)")
    }
    if (/\.(zip|mov|cam|gq|country|kim|men|mom|work|party|science|trade|stream)$/i.test(host)) {
      risk += 1
      reasons.push("Suspicious/abused TLD")
    }
    if (/xn--/.test(host)) {
      risk += 2
      reasons.push("Punycode detected (homograph risk)")
    }

    const score = Math.min(risk, 6)
    const level = score >= 5 ? "high" : score >= 3 ? "medium" : "low"
    return { level, reasons, host }
  } catch {
    return { level: "invalid" as const, reasons: ["Not a valid URL"], host: "" }
  }
}

export function LinkChecker() {
  const [url, setUrl] = useState("")
  const result = useMemo(() => (url ? analyzeUrl(url) : null), [url])

  const color =
    result?.level === "high"
      ? "bg-destructive/10 border-destructive"
      : result?.level === "medium"
        ? "bg-accent/20 border-accent"
        : result?.level === "low"
          ? "bg-secondary/30 border-secondary"
          : ""

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Risk Checker</CardTitle>
        <CardDescription>Identify suspicious links before you click.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Paste a link (https://...)" value={url} onChange={(e) => setUrl(e.target.value)} />
          <Button onClick={() => setUrl(url.trim())} className="bg-primary text-primary-foreground">
            Check
          </Button>
        </div>

        {result && result.level !== "invalid" && (
          <Alert className={color}>
            <AlertTitle className="flex items-center gap-2">
              {result.level === "low" ? <ShieldCheck className="h-4 w-4" /> : <TriangleAlert className="h-4 w-4" />}
              Risk: {result.level.toUpperCase()}
            </AlertTitle>
            <AlertDescription>
              {result.reasons.length ? (
                <ul className="list-disc ml-5 space-y-1">
                  {result.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              ) : (
                "No obvious risks detected."
              )}
            </AlertDescription>
          </Alert>
        )}

        {result?.level === "invalid" && (
          <Alert className="bg-destructive/10 border-destructive">
            <AlertTitle>Invalid URL</AlertTitle>
            <AlertDescription>Enter a full URL like https://example.com</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
