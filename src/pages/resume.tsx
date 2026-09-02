import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function ResumePage() {
  return (
    <Section>
      <Container width="reading">
        <h1 className="text-h1 font-semibold tracking-tight text-foreground">Resume</h1>
        <p className="mt-4 text-body-lg text-foreground-muted">The resume content and download land in Phase 3.</p>
      </Container>
    </Section>
  );
}
