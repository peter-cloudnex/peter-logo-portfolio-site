import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";
import { EXPERIENCE } from "@/lib/portfolio";

export function ExperienceTimeline() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Professional experience"
          description="The roles behind the work above, condensed to what mattered most in each."
        />

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

        <div className="mt-8">
          <TextLink href="/experience">Full experience page</TextLink>
        </div>
      </Container>
    </Section>
  );
}
