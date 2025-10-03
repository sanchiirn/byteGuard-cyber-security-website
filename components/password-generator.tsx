"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

function calculateEntropy(length: number, charsetSize: number) {
  // Entropy in bits ≈ length * log2(charsetSize)
  return length * Math.log2(charsetSize)
}

export function PasswordGenerator() {
  const [length, setLength] = useState<number>(16)
  const [useLower, setUseLower] = useState(true)
  const [useUpper, setUseUpper] = useState(true)
  const [useDigits, setUseDigits] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [password, setPassword] = useState("")

  const charset = useMemo(() => {
    let chars = ""
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz"
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (useDigits) chars += "0123456789"
    if (useSymbols) chars += "!@#$%^&*()-_=+[]{};:,.<>/?|~"
    return chars
  }, [useLower, useUpper, useDigits, useSymbols])

  const entropy = useMemo(() => {
    const size = new Set(charset.split("")).size
    return Math.round(calculateEntropy(length, size))
  }, [length, charset])

  function generate() {
    if (!charset) return
    const array = new Uint32Array(length)
    if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
      window.crypto.getRandomValues(array)
    } else {
      for (let i = 0; i < array.length; i++) array[i] = Math.floor(Math.random() * 4294967296)
    }
    let pwd = ""
    for (let i = 0; i < length; i++) {
      const idx = array[i] % charset.length
      pwd += charset[idx]
    }
    setPassword(pwd)
  }

  function copy() {
    if (!password) return
    navigator.clipboard.writeText(password)
  }

  const strength = entropy >= 100 ? "Strong" : entropy >= 80 ? "Good" : entropy >= 60 ? "Moderate" : "Weak"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strong Password Generator</CardTitle>
        <CardDescription>Generate high-entropy passwords with customizable options.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Input value={password} readOnly className="font-mono" placeholder="Click Generate" />
          <Button onClick={copy} variant="secondary">
            Copy
          </Button>
          <Button onClick={generate} className="bg-primary text-primary-foreground">
            Generate
          </Button>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground">Length: {length}</label>
            <Slider value={[length]} onValueChange={([v]) => setLength(v)} min={8} max={64} step={1} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <Checkbox checked={useLower} onCheckedChange={(v) => setUseLower(Boolean(v))} /> Lowercase
            </label>
            <label className="flex items-center gap-2">
              <Checkbox checked={useUpper} onCheckedChange={(v) => setUseUpper(Boolean(v))} /> Uppercase
            </label>
            <label className="flex items-center gap-2">
              <Checkbox checked={useDigits} onCheckedChange={(v) => setUseDigits(Boolean(v))} /> Numbers
            </label>
            <label className="flex items-center gap-2">
              <Checkbox checked={useSymbols} onCheckedChange={(v) => setUseSymbols(Boolean(v))} /> Symbols
            </label>
          </div>
          <div className="text-sm">
            Entropy: <span className="font-mono">{entropy} bits</span> —{" "}
            <span className="font-semibold">{strength}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
