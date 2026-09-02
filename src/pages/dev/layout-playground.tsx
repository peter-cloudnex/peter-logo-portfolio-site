import type { GetStaticProps } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container, CONTAINER_WIDTHS, type ContainerWidth } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";
import { Button } from "@/components/button";
import { Tag } from "@/components/tag";

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV === "production") return { notFound: true };
  return { props: {} };
};

const WIDTH_SAMPLES: { width: ContainerWidth; note: string }[] = [
  { width: "wide", note: "header / footer chrome" },
  { width: "default", note: "page content, project grids" },
  { width: "case-study", note: "project detail pages (Phase 3)" },
  { width: "reading", note: "About, Resume, Contact prose" },
];

export default function LayoutPlayground() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Section>
          <Container>
            <p className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">Phase 2</p>
            <h1 className="mt-2 text-h1 font-semibold tracking-tight">Layout system</h1>
            <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
              Reusable shell primitives — not the final homepage. Resize the window to check the gutters, the mobile
              nav, and container widths; try Tab/Shift+Tab and Escape on the mobile menu.
            </p>
          </Container>
        </Section>

        <Section spacing="compact" className="border-t border-border">
          <Container>
            <h2 className="text-h3 font-medium">Container widths</h2>
            <div className="mt-6 space-y-4">
              {WIDTH_SAMPLES.map((sample) => (
                <div key={sample.width} className={`mx-auto w-full ${CONTAINER_WIDTHS[sample.width]}`}>
                  <div className="rounded-md border border-dashed border-border-strong bg-surface px-4 py-3">
                    <p className="font-mono text-mono text-foreground-muted">
                      {sample.width} — {CONTAINER_WIDTHS[sample.width]}
                    </p>
                    <p className="text-meta text-foreground-subtle">{sample.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section spacing="compact" className="border-t border-border">
          <Container>
            <SectionHeading
              eyebrow="Primitive"
              title="Section heading"
              description="Eyebrow, title, and an optional description — used to introduce repeating page sections."
            />
          </Container>
        </Section>

        <Section spacing="compact" className="border-t border-border">
          <Container>
            <h2 className="text-h3 font-medium">Buttons, links &amp; tags</h2>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
              <TextLink href="/work">See the work</TextLink>
              <Tag>Design systems</Tag>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
