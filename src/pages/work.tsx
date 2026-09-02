import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Seo } from "@/components/seo";
import { SelectedWork } from "@/components/home/selected-work";

export default function WorkPage() {
  return (
    <>
      <Seo
        title="Work — Peter Logo"
        description="Case studies in AI infrastructure, payments, data platforms, and AI-native products — ModelRail, KrownPay, Resonance Holdings, Rightward, and EchoFaith."
        path="/work"
      />
      <Section spacing="compact">
        <Container>
          <h1 className="text-h1 font-semibold tracking-tight text-foreground">Work</h1>
          <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
            Production systems across AI infrastructure, payments, data platforms, and AI-native products. Each
            project links to a write-up — long-form case study where the detail is public, a shorter verified
            summary where it is not.
          </p>
        </Container>
      </Section>
      <SelectedWork showHeading={false} variant="index" />
    </>
  );
}
