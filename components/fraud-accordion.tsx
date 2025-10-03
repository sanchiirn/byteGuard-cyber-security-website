import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export function FraudAccordion() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="upi">
            <AccordionTrigger>UPI / Payment App Frauds</AccordionTrigger>
            <AccordionContent>
              - Phishing links to collect OTPs, screen-sharing scams, fake payment proofs. Tips: Disable screen-sharing
              with strangers, verify merchant UPI IDs, never share OTP/PIN.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="loan">
            <AccordionTrigger>Loan/KYC Spam and Impersonation</AccordionTrigger>
            <AccordionContent>
              - Fake loan apps, KYC expiry messages. Tips: Use official bank apps/sites only; do not install APKs from
              unknown sources.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="job">
            <AccordionTrigger>Job/Investment Scams</AccordionTrigger>
            <AccordionContent>
              - Unrealistic returns, task-based earnings, crypto pump-and-dump. Tips: Check SEBI/RBI advisories; avoid
              upfront fees; beware of Telegram/WhatsApp offers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ecomm">
            <AccordionTrigger>E-commerce / Marketplace Scams</AccordionTrigger>
            <AccordionContent>
              - Fake buyer/seller links, QR-code receipt traps. Tips: Use cash-on-delivery or platform escrow; avoid
              off-platform payments.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="identity">
            <AccordionTrigger>Identity Theft & Account Takeover</AccordionTrigger>
            <AccordionContent>
              - Password reuse, weak MFA, malicious extensions. Tips: Use a password manager, enable 2FA, keep OS and
              apps updated.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
