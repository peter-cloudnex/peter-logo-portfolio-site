import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClasses } from "@/components/button";
import { Seo } from "@/components/seo";
import { NewTabHint } from "@/components/text-link";
import { analytics } from "@/lib/analytics";
import { SITE_JOB_TITLE, SITE_TITLE, SITE_URLS } from "@/lib/site-config";
import { SelectedWork } from "@/components/home/selected-work";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { TechnicalExpertise } from "@/components/home/technical-expertise";
import { EngineeringApproach } from "@/components/home/engineering-approach";
import { FinalCta } from "@/components/home/final-cta";

const PROOF_POINTS = [
  { value: "5+", label: "years of professional software engineering experience" },
  { value: "30%", label: "AWS infrastructure cost reduction", source: "KrownPay" },
  { value: "30%", label: "database retrieval performance improvement", source: "Montra Interactive" },
] as const;

export default function Home() {
  return (
    <>
      <Seo
        title={`Peter Logo — ${SITE_JOB_TITLE}`}
        description={`${SITE_JOB_TITLE} specializing in backend systems, AI-native applications, and cloud infrastructure.`}
        path="/"
        includePerson
      />
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <p className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">
                {SITE_TITLE}
              </p>

              <div>
                <h1 className="text-display font-semibold tracking-tight text-foreground">Peter Logo</h1>
                <p className="mt-3 text-h3 font-medium text-foreground-muted">
                  {SITE_TITLE} specializing in backend systems, AI-native applications, and cloud
                  infrastructure.
                </p>
              </div>

              <p className="max-w-prose text-body-lg text-foreground-muted">
                I build production systems across TypeScript, React, and Node.js on AWS — spanning AI
                infrastructure, payments, and data-intensive platforms, end to end.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/work"
                  className={buttonClasses("primary")}
                  onClick={() => analytics.trackSelectedWork()}
                >
                  View selected work
                </Link>
                <a
                  href={SITE_URLS.resume}
                  download
                  className={buttonClasses("secondary")}
                >
                  Download résumé
                </a>
              </div>

              <div className="flex items-center gap-4 text-meta">
                <a
                  href={SITE_URLS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-medium text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  GitHub
                  <NewTabHint />
                </a>
                <span aria-hidden className="text-border-strong">
                  /
                </span>
                <a
                  href={SITE_URLS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-medium text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  LinkedIn
                  <NewTabHint />
                </a>
                <span aria-hidden className="text-border-strong">
                  /
                </span>
                <a
                  href={`mailto:${SITE_URLS.email}`}
                  className="inline-flex min-h-11 items-center font-medium text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  onClick={() => analytics.trackEmailClick()}
                >
                  Email
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
              <div className="overflow-hidden rounded-lg border border-border bg-surface">
                <div className="relative aspect-square">
                  <Image
                    src="/Peter-Logo-Photo.jpg"
                    alt="Portrait of Peter Logo"
                    fill
                    sizes="(min-width: 1024px) 460px, 320px"
                    className="object-cover dark:brightness-[0.92] dark:contrast-[1.03]"
                    priority
                  />
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
                  <span className="font-mono text-mono uppercase tracking-[0.08em] text-foreground-subtle">
                    Peter Logo
                  </span>
                  <span className="font-mono text-mono uppercase tracking-[0.08em] text-foreground-subtle">
                    {SITE_TITLE}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="compact" className="border-y border-border bg-surface">
        <Container>
          <h2 className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">Track record</h2>

          <div className="mt-6 grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {PROOF_POINTS.map((point) => (
              <div
                key={point.label}
                className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0"
              >
                <p className="text-h2 font-semibold tracking-tight text-foreground">{point.value}</p>
                <p className="max-w-[26ch] text-meta text-foreground-muted">{point.label}</p>
                {"source" in point ? (
                  <p className="font-mono text-mono uppercase tracking-[0.08em] text-foreground-subtle">
                    {point.source}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-prose border-t border-border pt-6 text-body text-foreground-muted sm:mt-8 sm:pt-8">
            Also shipped production systems spanning{" "}
            <strong className="font-semibold text-foreground">AI infrastructure</strong>,{" "}
            <strong className="font-semibold text-foreground">payments</strong>, and{" "}
            <strong className="font-semibold text-foreground">cloud data systems</strong>.
          </p>
        </Container>
      </Section>

      <SelectedWork variant="teaser" />
      <ExperienceTimeline />
      <TechnicalExpertise />
      <EngineeringApproach />
      <FinalCta />
    </>
  );
}
