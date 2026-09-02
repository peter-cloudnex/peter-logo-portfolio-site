import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function Home() {
  return (
    <Section>
      <Container>
        <p className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">Portfolio</p>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight text-foreground">Homepage content arrives in Phase 3</h1>
        <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
          This placeholder validates the site shell, container widths, and spacing ahead of the real hero and project sections.
        </p>
      </Container>
    </Section>
  );
}
