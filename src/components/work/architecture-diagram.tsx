import type { ReactNode } from "react";

// Shell only — each project supplies its own inline SVG so the diagram stays truthful to
// what that project's data actually supports instead of forcing one generic shape.
export function ArchitectureDiagram({
  caption,
  captionId,
  children,
}: {
  caption: string;
  captionId: string;
  children: ReactNode;
}) {
  return (
    <figure className="rounded-lg border border-border bg-surface p-4 sm:p-6">
      <div className="overflow-x-auto overscroll-x-contain">{children}</div>
      <p className="mt-3 text-meta text-foreground-subtle sm:hidden">Scroll horizontally to view the full diagram.</p>
      <figcaption id={captionId} className="mt-4 border-t border-border pt-3 text-meta text-foreground-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}
