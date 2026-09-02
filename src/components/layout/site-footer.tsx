import Link from "next/link";
import { Container } from "@/components/layout/container";
import { RecruiterActions } from "@/components/recruiter-actions";

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
      <Container width="wide" className="flex flex-col gap-8 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-body-lg font-semibold tracking-tight text-foreground">
              Peter <span className="text-brand">Logo</span>
            </p>
            <p className="mt-1 max-w-sm text-meta text-foreground-muted">
              Full-stack engineer — backend systems, AI-native applications, and cloud infrastructure.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="no-underline text-meta font-medium text-foreground-muted transition-colors duration-150 ease-out hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <RecruiterActions />
          </div>
        </div>

        <p className="border-t border-border pt-6 text-meta text-foreground-subtle">
          © {year} Peter Logo
        </p>
      </Container>
    </footer>
  );
}
