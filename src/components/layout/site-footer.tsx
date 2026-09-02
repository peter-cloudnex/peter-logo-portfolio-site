import Link from "next/link";
import { Container } from "@/components/layout/container";

const FOOTER_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <Container width="wide" className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-body-lg font-semibold tracking-tight text-foreground">
            Peter <span className="text-brand">Logo</span>
          </p>
          <p className="mt-1 text-meta text-foreground-subtle">© {year} — all rights reserved.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="no-underline text-meta font-medium text-foreground-muted hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
