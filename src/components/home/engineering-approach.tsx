import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/section-heading";
import { PRINCIPLES } from "@/lib/portfolio";

export function EngineeringApproach() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Engineering approach" title="How I work" />

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="flex flex-col gap-2">
              <h3 className="text-h3 font-semibold tracking-tight text-foreground">{principle.title}</h3>
              <p className="max-w-prose text-body text-foreground-muted">{principle.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
