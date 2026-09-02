import type { Tradeoff } from "@/lib/case-studies";

export function TradeoffCallout({ tradeoff }: { tradeoff: Tradeoff }) {
  return (
    <div className="rounded-lg border border-border border-l-2 border-l-border-strong bg-surface-muted p-5">
      <p className="font-mono text-mono uppercase tracking-[0.08em] text-foreground-subtle">Trade-off</p>
      <p className="mt-2 font-semibold text-foreground">{tradeoff.choice}</p>
      <p className="mt-2 text-body text-foreground-muted">{tradeoff.cost}</p>
    </div>
  );
}
