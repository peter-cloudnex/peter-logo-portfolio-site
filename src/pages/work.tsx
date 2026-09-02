import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Seo } from "@/components/seo";
import { SelectedWork } from "@/components/home/selected-work";

export default function WorkPage() {
  return (
    <>
      <Seo
        title="Work — Peter Logo"
        description="AI infrastructure, payments, and AI-driven data platforms — case studies for ModelRail, KrownPay, and Resonance Holdings."
        path="/work"
      />
      <Section spacing="compact">
        <Container>
          <h1 className="text-h1 font-semibold tracking-tight text-foreground">Work</h1>
          <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
            Production systems across AI infrastructure, payments, and data platforms. Each project links to a full
            case study — context, architecture, and trade-offs, not just the summary.
          </p>
        </Container>
      </Section>
      <SelectedWork showHeading={false} />
    </>
  );
}
