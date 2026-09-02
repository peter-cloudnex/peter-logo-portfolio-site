import type { Project } from "@/lib/portfolio";
import { ProjectMeta } from "@/components/home/selected-work";
import { Tag } from "@/components/tag";

// The recruiter-skimmable top of a case study: category, name, one line of context, stack —
// no architecture or trade-off detail lives here (see the "Progressive disclosure" note in the brief).
export function CaseStudyHeader({
  project,
  tagline,
  period,
}: {
  project: Project;
  tagline: string;
  period?: string;
}) {
  return (
    <header className="flex flex-col gap-6 border-b border-border pb-10">
      <ProjectMeta project={project} />
      <div>
        <h1 className="text-h1 font-semibold tracking-tight text-foreground">{project.name}</h1>
        {period ? (
          <p className="mt-2 font-mono text-mono uppercase tracking-[0.08em] text-foreground-subtle">{period}</p>
        ) : null}
      </div>
      <p className="max-w-prose text-body-lg text-foreground-muted">{tagline}</p>
      {project.stack.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      ) : null}
    </header>
  );
}
