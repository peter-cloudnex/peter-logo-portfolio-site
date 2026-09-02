export type NavSection = { id: string; label: string };

// Native <details> gives the mobile "on this page" list a free disclosure with zero JS;
// the lg: rail is a plain sticky anchor list — no scroll-spy, that's a later nice-to-have.
export function CaseStudyNav({ sections }: { sections: NavSection[] }) {
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:h-fit">
      <details className="rounded-lg border border-border bg-surface p-4 lg:hidden">
        <summary className="cursor-pointer font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">
          On this page
        </summary>
        <ul className="mt-3 flex flex-col gap-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-body text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground">
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </details>

      <div className="hidden lg:block">
        <p className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">On this page</p>
        <ul className="mt-3 flex flex-col gap-2 border-l border-border pl-4">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-meta text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground">
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
