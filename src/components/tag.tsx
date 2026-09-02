import type { ReactNode } from "react";

// `muted` lowers visual priority for specialized/secondary technologies without a second component.
export function Tag({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-mono ${
        muted
          ? "border-transparent bg-transparent text-foreground-subtle"
          : "border-border bg-surface-muted text-foreground-muted"
      }`}
    >
      {children}
    </span>
  );
}
