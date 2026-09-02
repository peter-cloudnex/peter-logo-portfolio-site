import type { ReactNode } from "react";

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong ${className}`}
    >
      {children}
    </div>
  );
}
