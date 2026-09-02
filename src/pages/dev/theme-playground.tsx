import type { GetStaticProps } from "next";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Tag } from "@/components/tag";
import { ThemeToggle } from "@/components/theme-toggle";

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV === "production") return { notFound: true };
  return { props: {} };
};

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-4 font-mono text-mono text-foreground-subtle">{children}</p>;
}

export default function ThemePlayground() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-6 py-4">
        <span className="font-mono text-mono text-foreground-muted">theme-playground</span>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-3xl space-y-16 px-6 py-16">
        <section>
          <SectionLabel>01 TYPOGRAPHY</SectionLabel>
          <div className="space-y-4">
            <h1 className="text-display font-semibold tracking-tight">Display heading</h1>
            <h2 className="text-h1 font-semibold">H1 section heading</h2>
            <h3 className="text-h2 font-medium">H2 section heading</h3>
            <h4 className="text-h3 font-medium">H3 section heading</h4>
            <p className="text-body-lg text-foreground">
              Large body text for lead paragraphs — calm, readable, and restrained rather than decorative.
            </p>
            <p className="text-body text-foreground">
              Standard body text for the bulk of the site&apos;s prose, sized for comfortable long-form reading.
            </p>
            <p className="text-meta text-foreground-muted">Small / meta text — dates, captions, secondary labels.</p>
            <p className="font-mono text-mono text-foreground-muted">
              STACK: Next.js · TypeScript · Tailwind CSS
            </p>
          </div>
        </section>

        <section>
          <SectionLabel>02 COLOR</SectionLabel>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-md border border-border bg-background p-4">
              <p className="font-mono text-mono text-foreground-subtle">background</p>
            </div>
            <div className="rounded-md border border-border bg-surface p-4">
              <p className="font-mono text-mono text-foreground-subtle">surface</p>
            </div>
            <div className="rounded-md border border-border bg-surface-muted p-4">
              <p className="font-mono text-mono text-foreground-subtle">surface-muted</p>
            </div>
          </div>
          <div className="mt-4 space-y-1 rounded-md border border-border bg-surface p-4">
            <p className="text-foreground">foreground — primary text</p>
            <p className="text-foreground-muted">foreground-muted — secondary text</p>
            <p className="text-foreground-subtle">foreground-subtle — tertiary text</p>
          </div>
        </section>

        <section>
          <SectionLabel>03 BUTTONS</SectionLabel>
          <div className="flex gap-4">
            <Button variant="primary">Primary action</Button>
            <Button variant="secondary">Secondary action</Button>
          </div>
        </section>

        <section>
          <SectionLabel>04 LINK</SectionLabel>
          <p className="text-body text-foreground">
            Read more about the architecture in the{" "}
            <a href="#">technical write-up</a>.
          </p>
        </section>

        <section>
          <SectionLabel>05 CARD</SectionLabel>
          <Card className="max-w-sm">
            <h3 className="text-h3 font-medium">Project title</h3>
            <p className="mt-1 text-meta text-foreground-muted">2026 · Case study</p>
            <p className="mt-3 text-body text-foreground-muted">
              A short description of the project, its scope, and the outcome.
            </p>
            <div className="mt-4 flex gap-2">
              <Tag>TypeScript</Tag>
              <Tag>Next.js</Tag>
              <Tag>Infra</Tag>
            </div>
          </Card>
        </section>

        <section>
          <SectionLabel>06 BORDERS &amp; RADIUS</SectionLabel>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-sm border border-border p-4 font-mono text-mono text-foreground-subtle">
              border / rounded-sm
            </div>
            <div className="rounded-md border border-border-strong p-4 font-mono text-mono text-foreground-subtle">
              border-strong / rounded-md
            </div>
            <div className="rounded-lg border border-border p-4 font-mono text-mono text-foreground-subtle">
              border / rounded-lg
            </div>
          </div>
        </section>

        <section>
          <SectionLabel>07 TECHNICAL TAGS</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <Tag>TypeScript</Tag>
            <Tag>Next.js</Tag>
            <Tag>Infra</Tag>
          </div>
        </section>

        <footer className="border-t border-border pt-8">
          <p className="text-meta text-foreground-subtle">
            Phase 1 design-system playground — not part of the final site.
          </p>
        </footer>
      </main>
    </div>
  );
}
