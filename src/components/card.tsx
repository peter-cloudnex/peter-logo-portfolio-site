import type { ReactNode } from "react";

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 transition-colors duration-150 ease-out hover:border-border-strong hover:bg-surface-muted ${className}`}
    >
      {children}
    </div>
  );
}
