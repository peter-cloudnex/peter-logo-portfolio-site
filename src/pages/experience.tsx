import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function ExperiencePage() {
  return (
    <Section>
      <Container>
        <h1 className="text-h1 font-semibold tracking-tight text-foreground">Experience</h1>
        <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
          The work history timeline lands in Phase 3.
        </p>
      </Container>
    </Section>
  );
}
