import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function WorkPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-h1 font-semibold tracking-tight text-foreground">Work</h1>
        <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
          Selected projects and case studies land in Phase 3.
        </p>
      </Container>
    </Section>
  );
}
