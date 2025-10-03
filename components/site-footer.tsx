export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-10">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
        <p className="leading-relaxed">
          Disclaimer: This site provides general information and tools for awareness. For emergencies in India, dial
          1930 and report at official portals linked below.
        </p>
        <p className="mt-2">© {new Date().getFullYear()} byteGuard</p>
      </div>
    </footer>
  )
}
