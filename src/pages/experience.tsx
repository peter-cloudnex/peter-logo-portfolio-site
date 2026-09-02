import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Seo } from "@/components/seo";
import { TextLink } from "@/components/text-link";
import { EXPERIENCE } from "@/lib/portfolio";

export default function ExperiencePage() {
  return (
    <>
      <Seo
        title="Experience — Peter Logo"
        description="Professional experience across AI products, payments infrastructure, and full-stack engineering."
        path="/experience"
      />
      <Section>
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-h1 font-semibold tracking-tight text-foreground">Experience</h1>
              <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
                Roles condensed to the work that mattered most — systems, reliability, and measurable
                outcomes.
              </p>
            </div>
            <TextLink href="/resume">Full résumé</TextLink>
          </div>

          <ol className="mt-10 flex flex-col divide-y divide-border border-t border-border">
            {EXPERIENCE.map((entry) => (
              <li key={entry.company} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-8">
                <div>
                  <p className="font-semibold text-foreground">{entry.company}</p>
                  <p className="text-meta text-foreground-muted">{entry.role}</p>
                  <p className="mt-1 font-mono text-mono uppercase tracking-[0.08em] text-foreground-subtle">
                    {entry.period}
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-body text-foreground-muted">
                      <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-body text-foreground-muted">
            For the complete document, including education and certifications, see the{" "}
            <Link href="/resume" className="font-medium text-foreground no-underline hover:text-brand">
              résumé
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
