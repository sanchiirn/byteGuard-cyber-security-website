import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Helplines() {
  return (
    <Card>
      <CardContent className="pt-6 grid gap-4">
        <div>
          <h3 className="text-lg font-semibold">India Emergency Helpline</h3>
          <p className="text-muted-foreground leading-relaxed">
            Dial <Badge className="bg-primary text-primary-foreground">1930</Badge> (Cybercrime Helpline) immediately to
            report financial cyber frauds. For life-threatening emergencies, dial <Badge variant="secondary">112</Badge>
            .
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Official Links</h4>
          <ul className="list-disc ml-6 leading-relaxed">
            <li>
              National Cyber Crime Reporting Portal:{" "}
              <a className="underline" href="https://www.cybercrime.gov.in/" target="_blank" rel="noreferrer">
                https://www.cybercrime.gov.in/
              </a>
            </li>
            <li>
              CERT-In (Indian Computer Emergency Response Team):{" "}
              <a className="underline" href="https://www.cert-in.org.in/" target="_blank" rel="noreferrer">
                https://www.cert-in.org.in/
              </a>
            </li>
            <li>
              Government of India Cyber Safety resources:{" "}
              <a
                className="underline"
                href="https://www.india.gov.in/spotlight/cyber-crime-portal"
                target="_blank"
                rel="noreferrer"
              >
                https://www.india.gov.in/spotlight/cyber-crime-portal
              </a>
            </li>
            <li>
              RBI Sachet (report unauthorised lending/financial entities):{" "}
              <a className="underline" href="https://sachet.rbi.org.in/" target="_blank" rel="noreferrer">
                https://sachet.rbi.org.in/
              </a>
            </li>
            <li>
              NPCI UPI Safety & Security:{" "}
              <a
                className="underline"
                href="https://www.npci.org.in/what-we-do/upi/safety-and-security"
                target="_blank"
                rel="noreferrer"
              >
                https://www.npci.org.in/what-we-do/upi/safety-and-security
              </a>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Preserve evidence: screenshots, transaction IDs, phone numbers, and URLs. Report quickly for best outcomes.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
