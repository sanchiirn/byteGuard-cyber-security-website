import { NextResponse } from "next/server"

const INDIAN_CYBERCRIME_NEWS = [
  {
    title: "Mumbai Woman Loses ₹2.5 Lakh in WhatsApp Job Scam",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-15T10:30:00Z",
    source: "National Cybercrime Portal",
    description:
      "A 32-year-old woman from Mumbai lost ₹2.5 lakh after falling victim to a work-from-home job scam on WhatsApp. The fraudsters promised high returns for simple tasks.",
  },
  {
    title: "Delhi Police Arrest 5 in ₹50 Crore Digital Arrest Scam",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-14T14:20:00Z",
    source: "Delhi Cyber Cell",
    description:
      "Five individuals were arrested for running a 'digital arrest' scam where they impersonated police officers and threatened victims with fake legal cases.",
  },
  {
    title: "Bengaluru Techie Loses ₹8 Lakh in Cryptocurrency Investment Fraud",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-13T09:15:00Z",
    source: "Karnataka Cyber Crime",
    description:
      "A software engineer was duped by fraudsters promising guaranteed returns on cryptocurrency investments through a fake trading platform.",
  },
  {
    title: "Pune Businessman Saves ₹15 Lakh After Reporting UPI Fraud to 1930",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-12T16:45:00Z",
    source: "Maharashtra Cyber",
    description:
      "Quick action by calling the national helpline 1930 helped freeze the fraudulent transaction and recover the amount within 24 hours.",
  },
  {
    title: "New Phishing Campaign Targets Indian Bank Customers via SMS",
    link: "https://cert-in.org.in",
    pubDate: "2024-01-11T11:00:00Z",
    source: "CERT-In Alert",
    description:
      "CERT-In warns of a widespread SMS phishing campaign targeting customers of major Indian banks. Users advised to verify all messages through official channels.",
  },
  {
    title: "Hyderabad Woman Recovers ₹3 Lakh After Reporting Romance Scam",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-10T13:30:00Z",
    source: "Telangana Cyber Security",
    description:
      "A 28-year-old woman who was scammed by a fake dating profile managed to recover her money after filing a complaint on the National Cybercrime Portal.",
  },
  {
    title: "RBI Issues Warning Against Fake Loan Apps Charging Exorbitant Interest",
    link: "https://rbi.org.in",
    pubDate: "2024-01-09T10:00:00Z",
    source: "Reserve Bank of India",
    description:
      "The RBI has issued an advisory warning citizens about unregistered loan apps that charge illegal interest rates and harass borrowers.",
  },
  {
    title: "Chennai Police Bust Call Center Running Tech Support Scam",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-08T15:20:00Z",
    source: "Tamil Nadu Cyber Crime",
    description:
      "A fake call center in Chennai was busted for running a tech support scam targeting elderly citizens across India, duping them of over ₹1 crore.",
  },
  {
    title: "Kolkata Student Loses ₹50,000 in Fake Scholarship Scam",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-07T12:10:00Z",
    source: "West Bengal Cyber Cell",
    description:
      "A college student was tricked into paying processing fees for a fake government scholarship scheme advertised on social media.",
  },
  {
    title: "NPCI Warns Users About New UPI Scam Involving QR Code Manipulation",
    link: "https://npci.org.in",
    pubDate: "2024-01-06T09:45:00Z",
    source: "National Payments Corporation",
    description:
      "NPCI has alerted users about fraudsters replacing legitimate QR codes with fake ones at merchant locations to steal money.",
  },
  {
    title: "Jaipur Couple Loses ₹12 Lakh in Property Investment Scam",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-05T14:00:00Z",
    source: "Rajasthan Cyber Crime",
    description:
      "A couple was duped by fraudsters posing as real estate agents, offering lucrative property deals through a fake website.",
  },
  {
    title: "Government Launches New AI-Powered Tool to Detect Cyber Fraud",
    link: "https://meity.gov.in",
    pubDate: "2024-01-04T11:30:00Z",
    source: "Ministry of Electronics & IT",
    description:
      "The government has launched an AI-based system to identify and block fraudulent websites and phone numbers in real-time.",
  },
  {
    title: "Ahmedabad Man Arrested for Running Fake E-Commerce Website",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-03T16:15:00Z",
    source: "Gujarat Cyber Crime",
    description:
      "A 25-year-old was arrested for creating a fake e-commerce site that collected payments but never delivered products, cheating over 500 customers.",
  },
  {
    title: "Lucknow Doctor Loses ₹6 Lakh in Stock Market Tips Scam",
    link: "https://cybercrime.gov.in",
    pubDate: "2024-01-02T10:20:00Z",
    source: "UP Cyber Crime",
    description:
      "A doctor was scammed by fraudsters offering guaranteed stock market tips through a Telegram group, resulting in significant financial loss.",
  },
  {
    title: "TRAI Issues Advisory on SIM Swap Fraud Prevention",
    link: "https://trai.gov.in",
    pubDate: "2024-01-01T09:00:00Z",
    source: "Telecom Regulatory Authority",
    description:
      "TRAI has issued guidelines for telecom operators to strengthen SIM swap verification processes to prevent unauthorized access to user accounts.",
  },
]

export async function GET() {
  // Return curated Indian cybercrime news
  return NextResponse.json({ items: INDIAN_CYBERCRIME_NEWS }, { headers: { "Cache-Control": "public, s-maxage=3600" } })
}
