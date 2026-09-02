import type { ComponentType } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Seo } from "@/components/seo";
import { Tag } from "@/components/tag";
import { TextLink } from "@/components/text-link";
import { CaseStudyHeader } from "@/components/work/case-study-header";
import { CaseStudyNav, type NavSection } from "@/components/work/case-study-nav";
import { CaseStudySection } from "@/components/work/case-study-section";
import { CaseStudyFooterNav } from "@/components/work/case-study-footer-nav";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";
import { ModelRailDiagram, KrownPayDiagram, ResonanceDiagram } from "@/components/work/diagrams";
import { TechnicalDecision } from "@/components/work/technical-decision";
import { TradeoffCallout } from "@/components/work/tradeoff-callout";
import { ContentPlaceholder } from "@/components/work/content-placeholder";
import { MetricProof } from "@/components/work/metric-proof";
import { PROJECTS, EXPERIENCE, type Project } from "@/lib/portfolio";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";

const DIAGRAM_COMPONENTS: Record<string, ComponentType | undefined> = {
  modelrail: ModelRailDiagram,
  krownpay: KrownPayDiagram,
  "resonance-holdings": ResonanceDiagram,
};

const DIAGRAM_CAPTIONS: Record<string, string> = {
  modelrail: "Request flow from a calling app through routing to a provider, plus the infrastructure the gateway relies on.",
  krownpay: "High-level shape of the migration — internal service boundaries beyond this level are proprietary to KrownPay.",
  "resonance-holdings": "Illustrative only — entity and relationship types shown are generic, not the production schema.",
};

const SECTIONS: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "role", label: "Role & ownership" },
  { id: "constraints", label: "Constraints" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Technical decisions" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "challenges", label: "Challenges" },
  { id: "outcome", label: "Outcome" },
  { id: "technologies", label: "Technologies" },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-body text-foreground-muted">
          <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
          {item}
        </li>
      ))}
    </ul>
  );
}

type Props = {
  project: Project;
  caseStudy: CaseStudy;
  period: string | null;
  previous: Project;
  next: Project;
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: PROJECTS.map((project) => ({ params: { slug: project.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug = params?.slug as string;
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  const caseStudy = CASE_STUDIES[slug];
  if (index === -1 || !caseStudy) return { notFound: true };

  const project = PROJECTS[index];
  const period = EXPERIENCE.find((entry) => entry.company === project.name)?.period ?? null;
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return { props: { project, caseStudy, period, previous, next } };
};

export default function CaseStudyPage({ project, caseStudy, period, previous, next }: Props) {
  const Diagram = DIAGRAM_COMPONENTS[project.slug];
  const sections = caseStudy.links.length > 0 ? [...SECTIONS, { id: "links", label: "Links" }] : SECTIONS;

  return (
    <>
      <Seo
        title={`${project.name} — Case study | Peter Logo`}
        description={caseStudy.overview[0]}
        path={`/work/${project.slug}`}
        ogType="article"
      />

      <Section>
        <Container>
          <CaseStudyHeader project={project} tagline={caseStudy.overview[0]} period={period ?? undefined} />

          {/* Wider than Container's "case-study" (4xl) variant — that width was sized for a single
              prose column, and this page adds a nav rail alongside the long-form content. */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
            <CaseStudyNav sections={sections} />

            <div className="min-w-0">
              <CaseStudySection id="overview" title="Overview">
                {caseStudy.context.map((paragraph) => (
                  <p key={paragraph} className="max-w-prose text-body-lg text-foreground-muted">
                    {paragraph}
                  </p>
                ))}
              </CaseStudySection>

              <CaseStudySection id="problem" title="Problem">
                {caseStudy.problem.map((paragraph) => (
                  <p key={paragraph} className="max-w-prose text-body text-foreground-muted">
                    {paragraph}
                  </p>
                ))}
              </CaseStudySection>

              <CaseStudySection id="role" title="Role & ownership">
                {caseStudy.role.map((paragraph) => (
                  <p key={paragraph} className="max-w-prose text-body text-foreground-muted">
                    {paragraph}
                  </p>
                ))}
              </CaseStudySection>

              <CaseStudySection id="constraints" title="Constraints">
                {caseStudy.constraints.items.length > 0 ? <BulletList items={caseStudy.constraints.items} /> : null}
                {caseStudy.constraints.note ? <ContentPlaceholder note={caseStudy.constraints.note} /> : null}
              </CaseStudySection>

              <CaseStudySection id="architecture" title="architecture" variant="technical">
                {caseStudy.architecture.intro.map((paragraph) => (
                  <p key={paragraph} className="max-w-prose text-body text-foreground-muted">
                    {paragraph}
                  </p>
                ))}
                {Diagram ? (
                  <ArchitectureDiagram caption={DIAGRAM_CAPTIONS[project.slug]}>
                    <Diagram />
                  </ArchitectureDiagram>
                ) : null}
              </CaseStudySection>

              <CaseStudySection id="decisions" title="technical decisions" variant="technical">
                <div className={caseStudy.decisions.length > 1 ? "grid gap-4 sm:grid-cols-2" : "flex flex-col gap-4"}>
                  {caseStudy.decisions.map((decision) => (
                    <TechnicalDecision key={decision.decision} decision={decision} />
                  ))}
                </div>
              </CaseStudySection>

              <CaseStudySection id="tradeoffs" title="trade-offs" variant="technical">
                <div className={caseStudy.tradeoffs.length > 1 ? "grid gap-4 sm:grid-cols-2" : "flex flex-col gap-4"}>
                  {caseStudy.tradeoffs.map((tradeoff) => (
                    <TradeoffCallout key={tradeoff.choice} tradeoff={tradeoff} />
                  ))}
                </div>
              </CaseStudySection>

              <CaseStudySection id="challenges" title="challenges" variant="technical">
                {caseStudy.challenges.items.length > 0 ? <BulletList items={caseStudy.challenges.items} /> : null}
                {caseStudy.challenges.note ? <ContentPlaceholder note={caseStudy.challenges.note} /> : null}
              </CaseStudySection>

              <CaseStudySection id="outcome" title="Outcome">
                <MetricProof metrics={caseStudy.outcome.metrics} />
                <BulletList items={caseStudy.outcome.bullets} />
                {caseStudy.outcome.note ? <ContentPlaceholder note={caseStudy.outcome.note} /> : null}
              </CaseStudySection>

              <CaseStudySection id="technologies" title="Technologies">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </CaseStudySection>

              {caseStudy.links.length > 0 ? (
                <CaseStudySection id="links" title="Links">
                  <div className="flex flex-wrap gap-6">
                    {caseStudy.links.map((link) => (
                      <TextLink key={link.href} href={link.href}>
                        {link.label}
                      </TextLink>
                    ))}
                  </div>
                </CaseStudySection>
              ) : null}
            </div>
          </div>

          <div className="mt-16">
            <CaseStudyFooterNav previous={previous} next={next} />
          </div>
        </Container>
      </Section>
    </>
  );
}
