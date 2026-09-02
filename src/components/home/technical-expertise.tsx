import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { EXPERTISE_GROUPS } from "@/lib/portfolio";

export function TechnicalExpertise() {
  return (
    <Section className="border-y border-border bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Technical expertise"
          title="What I build with"
          description="Organized by how these tools show up in real systems, not an alphabetical list."
        />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTISE_GROUPS.map((group) => (
            <div key={group.name} className="flex flex-col gap-3 border-t border-border pt-4">
              <div>
                <h3 className="font-semibold text-foreground">{group.name}</h3>
                <p className="mt-1 text-meta text-foreground-muted">{group.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.core.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
                {group.specialized.map((tech) => (
                  <Tag key={tech} muted>
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
