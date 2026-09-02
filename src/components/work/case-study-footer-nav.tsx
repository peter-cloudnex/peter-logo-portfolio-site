import Link from "next/link";
import type { Project } from "@/lib/portfolio";

export function CaseStudyFooterNav({ previous, next }: { previous: Project; next: Project }) {
  return (
    <nav aria-label="More case studies" className="grid gap-6 border-t border-border pt-10 sm:grid-cols-2">
      <Link
        href={`/work/${previous.slug}`}
        className="group flex flex-col gap-1 no-underline transition-colors duration-150 ease-out"
      >
        <span className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">← Previous</span>
        <span className="text-h3 font-semibold tracking-tight text-foreground transition-colors duration-150 ease-out group-hover:text-brand">
          {previous.name}
        </span>
      </Link>
      <Link
        href={`/work/${next.slug}`}
        className="group flex flex-col gap-1 no-underline transition-colors duration-150 ease-out sm:items-end sm:text-right"
      >
        <span className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">Next →</span>
        <span className="text-h3 font-semibold tracking-tight text-foreground transition-colors duration-150 ease-out group-hover:text-brand">
          {next.name}
        </span>
      </Link>
    </nav>
  );
}
