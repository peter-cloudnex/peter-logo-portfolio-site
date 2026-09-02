import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TextLink } from "@/components/text-link";

export default function ContactPage() {
  return (
    <Section>
      <Container width="reading">
        <h1 className="text-h1 font-semibold tracking-tight text-foreground">Contact</h1>
        <p className="mt-4 text-body-lg text-foreground-muted">
          The contact form lands in Phase 3. For now, reach out directly.
        </p>
        <p className="mt-6">
          <TextLink href="mailto:hello@example.com">hello@example.com</TextLink>
        </p>
      </Container>
    </Section>
  );
}
