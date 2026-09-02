import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { PROJECTS, type Project } from "@/lib/portfolio";

// Exported so the case-study header (src/components/work/case-study-header.tsx) can reuse the
// exact same category/link row instead of re-implementing it.
export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <p
        className={`font-mono text-meta uppercase tracking-[0.08em] ${
          project.featured ? "text-brand" : "text-foreground-subtle"
        }`}
      >
        {project.category}
      </p>
      {project.href ? (
        <>
          <span aria-hidden className="text-border-strong">
            /
          </span>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground no-underline hover:text-brand hover:underline"
          >
            View project ↗
          </a>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-brand/30 bg-surface p-8 transition-colors hover:border-brand/60 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-4">
          <ProjectMeta project={project} />
          <h3 className="text-h2 font-semibold tracking-tight text-foreground">
            <Link href={`/work/${project.slug}`} className="no-underline hover:text-brand hover:underline">
              {project.name}
            </Link>
          </h3>
          <p className="max-w-prose text-body-lg text-foreground-muted">{project.context}</p>
          <p className="max-w-prose text-body text-foreground">{project.responsibility}</p>
        </div>

        <div className="flex flex-col gap-6 lg:border-l lg:border-border lg:pl-8">
          <ul className="flex flex-col gap-2">
            {project.proof.map((point) => (
              <li key={point} className="flex gap-2 text-meta text-foreground-muted">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StandardCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong">
      <ProjectMeta project={project} />
      <h3 className="text-h3 font-semibold tracking-tight text-foreground">
        <Link href={`/work/${project.slug}`} className="no-underline hover:text-brand hover:underline">
          {project.name}
        </Link>
      </h3>
      <p className="text-body text-foreground-muted">{project.context}</p>
      <p className="text-body text-foreground">{project.responsibility}</p>
      <ul className="flex flex-col gap-2">
        {project.proof.map((point) => (
          <li key={point} className="flex gap-2 text-meta text-foreground-muted">
            <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </div>
  );
}

export function SelectedWork() {
  const [featured, ...rest] = PROJECTS;
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Systems shipped to production"
          description="AI infrastructure, payments, and AI-driven data platforms — built and running in production."
        />

        <div className="mt-10 flex flex-col gap-6">
          <FeaturedCard project={featured} />
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((project) => (
              <StandardCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
