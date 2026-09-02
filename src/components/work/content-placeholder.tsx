// Dashed border is reserved for this component alone — it's the one visual signal in the
// case-study system that means "not fabricated, not yet published" rather than "real content."
export function ContentPlaceholder({ note }: { note: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border-strong p-5">
      <p className="font-mono text-mono uppercase tracking-[0.08em] text-foreground-subtle">Content placeholder</p>
      <p className="mt-2 text-body text-foreground-muted">{note}</p>
    </div>
  );
}
