import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Seo } from "@/components/seo";
import { TextLink } from "@/components/text-link";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About — Peter Logo"
        description="Backend-leaning full-stack engineer focused on AI-native applications, cloud systems, and reliable production software."
        path="/about"
      />
      <Section>
        <Container width="reading">
          <h1 className="text-h1 font-semibold tracking-tight text-foreground">About</h1>

          <div className="mt-8 flex flex-col gap-5 text-body-lg text-foreground-muted">
            <p>
              I started in full-stack product work and steadily moved toward the systems side of
              shipping software — APIs, data models, cloud infrastructure, and the operational
              details that keep production services trustworthy.
            </p>
            <p>
              Today I work as a backend-leaning full-stack engineer. I am comfortable across the
              stack, but I spend most of my time on TypeScript/Node services, data-intensive
              backends, and AWS infrastructure that product features depend on.
            </p>
            <p>
              Recent work includes AI-native applications and AI infrastructure: LLM integrations,
              agentic workflows, graph-backed market intelligence, and ModelRail — a production AI
              gateway for multi-model routing, limits, and billing. Earlier roles covered payments
              platforms, authentication, and performance-sensitive web products.
            </p>
            <p>
              I am most interested in engineering problems where reliability, cost, and clear
              interfaces matter: event-driven backends, cloud systems that scale without surprise
              bills, and AI features that behave predictably in production rather than only in demos.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8">
            <p className="text-body text-foreground-muted">
              Prefer the short version? Review selected work, experience, or the résumé.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <TextLink href="/work">Selected work</TextLink>
              <TextLink href="/experience">Experience</TextLink>
              <TextLink href="/resume">Résumé</TextLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
