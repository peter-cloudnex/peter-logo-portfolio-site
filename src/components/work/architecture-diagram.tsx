import type { ReactNode } from "react";

// Shell only — each project supplies its own inline SVG so the diagram stays truthful to
// what that project's data actually supports instead of forcing one generic shape.
export function ArchitectureDiagram({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="rounded-lg border border-border bg-surface p-4 sm:p-6">
      <div className="overflow-x-auto">{children}</div>
      <figcaption className="mt-4 border-t border-border pt-3 text-meta text-foreground-subtle">{caption}</figcaption>
    </figure>
  );
}
