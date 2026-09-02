import { useEffect, useState } from "react";

export type NavSection = { id: string; label: string };

function SectionLink({
  section,
  current,
  className,
}: {
  section: NavSection;
  current: boolean;
  className: string;
}) {
  return (
    <a
      href={`#${section.id}`}
      aria-current={current ? "location" : undefined}
      className={`no-underline motion-reduce:transition-none ${className} ${
        current ? "text-foreground" : "text-foreground-muted hover:text-foreground"
      }`}
    >
      {section.label}
    </a>
  );
}

export function CaseStudyNav({ sections }: { sections: NavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const sectionKey = sections.map((section) => section.id).join();

  useEffect(() => {
    const ids = sectionKey ? sectionKey.split(",") : [];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry);
        }
        const intersecting = ids
          .map((id) => visible.get(id))
          .filter((entry): entry is IntersectionObserverEntry => Boolean(entry?.isIntersecting));
        if (intersecting.length === 0) return;
        intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(intersecting[0].target.id);
      },
      { rootMargin: "-96px 0px -45% 0px", threshold: [0, 0.25, 1] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [sectionKey]);

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:h-fit print:hidden">
      <details className="rounded-lg border border-border bg-surface p-4 lg:hidden">
        <summary className="cursor-pointer font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">
          On this page
        </summary>
        <ul className="mt-3 flex flex-col gap-2">
          {sections.map((section) => (
            <li key={section.id}>
              <SectionLink
                section={section}
                current={section.id === activeId}
                className="text-body transition-colors duration-150 ease-out"
              />
            </li>
          ))}
        </ul>
      </details>

      <div className="hidden lg:block">
        <p className="font-mono text-meta uppercase tracking-[0.08em] text-foreground-subtle">On this page</p>
        <ul className="mt-3 flex flex-col gap-2 border-l border-border pl-4">
          {sections.map((section) => (
            <li key={section.id}>
              <SectionLink
                section={section}
                current={section.id === activeId}
                className="text-meta transition-colors duration-150 ease-out"
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
