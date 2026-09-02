import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/section-heading";
import { NewTabHint, TextLink } from "@/components/text-link";
import { Tag } from "@/components/tag";
import { PROJECTS, type Project } from "@/lib/portfolio";

const CARD_SURFACE =
  "group relative cursor-pointer rounded-lg border bg-surface transition-colors duration-150 ease-out hover:bg-surface-muted";

// Exported so the case-study header (src/components/work/case-study-header.tsx) can reuse the
// exact same category/link row instead of re-implementing it.
export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {project.featured ? (
        <>
          <p className="font-mono text-meta uppercase tracking-[0.08em] text-brand">Featured</p>
          <span aria-hidden className="text-border-strong">
            /
          </span>
        </>
      ) : null}
      <p className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">{project.category}</p>
      {project.href ? (
        <>
          <span aria-hidden className="text-border-strong">
            /
          </span>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 pointer-events-auto font-medium text-foreground no-underline transition-colors duration-150 ease-out hover:text-brand hover:underline"
          >
            View project ↗
            <NewTabHint />
          </a>
        </>
      ) : null}
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  if (!project.image) return null;
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-surface">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes="(min-width: 1024px) 640px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function CaseStudyLink({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`absolute inset-0 z-0 rounded-lg no-underline ${className}`}
      aria-label={`Read case study: ${project.name}`}
    />
  );
}

function ReadCaseStudyHint() {
  return (
    <p aria-hidden className="text-meta font-medium text-foreground">
      Read case study
      <span className="ml-1 inline-block transition-transform duration-150 ease-out motion-reduce:transition-none group-hover:translate-x-0.5">
        →
      </span>
    </p>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className={`${CARD_SURFACE} border-brand/30 p-8 hover:border-brand/60 sm:p-10`}>
      <CaseStudyLink project={project} />
      <div className="relative z-[1] grid gap-8 pointer-events-none lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-4">
          <ProjectMeta project={project} />
          <h3 className="text-h2 font-semibold tracking-tight text-foreground transition-colors duration-150 ease-out group-hover:text-brand">
            {project.name}
          </h3>
          <p className="max-w-prose text-body-lg text-foreground-muted">{project.context}</p>
          <p className="max-w-prose text-body text-foreground">{project.responsibility}</p>
          <ProjectVisual project={project} />
          <ReadCaseStudyHint />
        </div>

        <div className="flex flex-col gap-6 lg:border-l lg:border-border lg:pl-8">
          {project.proof.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {project.proof.map((point) => (
                <li key={point} className="flex gap-2 text-meta text-foreground-muted">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
          {project.stack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function StandardCard({ project }: { project: Project }) {
  return (
    <article className={`${CARD_SURFACE} flex flex-col gap-4 border-border p-6 hover:border-border-strong`}>
      <CaseStudyLink project={project} />
      <div className="relative z-[1] flex flex-col gap-4 pointer-events-none">
        <ProjectMeta project={project} />
        <h3 className="text-h3 font-semibold tracking-tight text-foreground transition-colors duration-150 ease-out group-hover:text-brand">
          {project.name}
        </h3>
        <p className="text-body text-foreground-muted">{project.context}</p>
        <p className="text-body text-foreground">{project.responsibility}</p>
        {project.proof.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {project.proof.map((point) => (
              <li key={point} className="flex gap-2 text-meta text-foreground-muted">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
                {point}
              </li>
            ))}
          </ul>
        ) : null}
        {project.stack.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        ) : null}
        <ReadCaseStudyHint />
      </div>
    </article>
  );
}

export function SelectedWork({
  showHeading = true,
  variant = "index",
}: {
  showHeading?: boolean;
  variant?: "teaser" | "index";
}) {
  const [featured, ...rest] = PROJECTS;
  const restToShow = variant === "teaser" ? rest.slice(0, 2) : rest;
  return (
    <Section className={showHeading ? "border-t border-border" : undefined}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="Selected work"
            title="Systems shipped to production"
            description="AI infrastructure, payments, and AI-driven data platforms — built and running in production."
          />
        ) : (
          <h2 className="sr-only">Case studies</h2>
        )}

        <div className={`flex flex-col gap-6 ${showHeading ? "mt-10" : ""}`}>
          <FeaturedCard project={featured} />
          <div className="grid gap-6 sm:grid-cols-2">
            {restToShow.map((project) => (
              <StandardCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        {variant === "teaser" ? (
          <div className="mt-8">
            <TextLink href="/work">All case studies</TextLink>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
