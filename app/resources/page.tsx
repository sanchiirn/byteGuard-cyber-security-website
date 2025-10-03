"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, AlertTriangle, FileText, Phone, ExternalLink, ChevronRight } from "lucide-react"

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const categories = [
    { id: "all", label: "All Resources", icon: Shield },
    { id: "prevention", label: "Prevention", icon: Lock },
    { id: "reporting", label: "Reporting", icon: AlertTriangle },
    { id: "education", label: "Education", icon: FileText },
    { id: "emergency", label: "Emergency", icon: Phone },
  ]

  const resources = [
    {
      id: "cert-in",
      category: "reporting",
      title: "CERT-In",
      description: "Indian Computer Emergency Response Team",
      content: "Report cybersecurity incidents and get expert guidance from India's national nodal agency.",
      link: "https://www.cert-in.org.in/",
      action: "Visit Portal",
    },
    {
      id: "cybercrime",
      category: "reporting",
      title: "National Cybercrime Portal",
      description: "Report cybercrimes online",
      content: "File complaints for online fraud, financial crimes, social media abuse, and more.",
      link: "https://cybercrime.gov.in/",
      action: "Report Now",
    },
    {
      id: "password-tips",
      category: "prevention",
      title: "Password Security",
      description: "Best practices for strong passwords",
      content: "Use 12+ characters, mix uppercase, lowercase, numbers, and symbols. Enable 2FA everywhere.",
      link: "/",
      action: "Generate Password",
    },
    {
      id: "phishing",
      category: "prevention",
      title: "Phishing Awareness",
      description: "Identify suspicious links and emails",
      content: "Check sender addresses, hover over links, verify URLs, and never share OTPs or passwords.",
      link: "/",
      action: "Check Link",
    },
    {
      id: "rbi-sachet",
      category: "reporting",
      title: "RBI Sachet Portal",
      description: "Report banking fraud",
      content: "Lodge complaints against banks, NBFCs, and digital payment issues.",
      link: "https://sachet.rbi.org.in/",
      action: "File Complaint",
    },
    {
      id: "quiz",
      category: "education",
      title: "Security Quiz",
      description: "Test your cybersecurity knowledge",
      content: "Take our interactive quiz to learn about common threats and best practices.",
      link: "/#quiz",
      action: "Take Quiz",
    },
    {
      id: "helpline-1930",
      category: "emergency",
      title: "Helpline 1930",
      description: "National Cybercrime Helpline",
      content: "Call 1930 for immediate assistance with cyber fraud, financial crimes, and online scams.",
      link: "tel:1930",
      action: "Call Now",
    },
    {
      id: "helpline-112",
      category: "emergency",
      title: "Emergency 112",
      description: "All-India emergency number",
      content: "For urgent police, medical, or fire emergencies including cyber threats.",
      link: "tel:112",
      action: "Call 112",
    },
  ]

  const filteredResources =
    activeCategory === "all" ? resources : resources.filter((r) => r.category === activeCategory)

  const handleCardClick = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">Cybersecurity Resources</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Quick access to essential tools, helplines, and official portals for cyber safety
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </Button>
            )
          })}
        </div>

        {/* Resource Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
              onClick={() => handleCardClick(resource.id)}
            >
              <CardHeader>
                <CardTitle className="text-xl text-balance">{resource.title}</CardTitle>
                <CardDescription className="text-balance">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 text-pretty">
                  {expandedCard === resource.id ? resource.content : `${resource.content.slice(0, 60)}...`}
                </p>
                <Button asChild variant="default" className="w-full gap-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={resource.link}
                    target={resource.link.startsWith("http") ? "_blank" : undefined}
                    rel={resource.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {resource.action}
                    {resource.link.startsWith("http") ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Action Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-balance">Need Immediate Help?</CardTitle>
              <CardDescription className="text-balance">
                If you're experiencing an active cyber attack or fraud
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="tel:1930">
                  <Phone className="h-5 w-5" />
                  Call 1930
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
                <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">
                  <AlertTriangle className="h-5 w-5" />
                  Report Online
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
                <a href="/">
                  <Shield className="h-5 w-5" />
                  Back to Home
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
