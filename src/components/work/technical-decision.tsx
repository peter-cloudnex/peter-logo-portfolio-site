import type { TechnicalDecision as TechnicalDecisionData } from "@/lib/case-studies";

export function TechnicalDecision({ decision }: { decision: TechnicalDecisionData }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="font-mono text-mono uppercase tracking-[0.08em] text-brand">Decision</p>
      <p className="mt-2 font-semibold text-foreground">{decision.decision}</p>
      <p className="mt-2 text-body text-foreground-muted">{decision.rationale}</p>
      {decision.alternativeApproach ? (
        <p className="mt-3 border-t border-border pt-3 text-meta text-foreground-subtle">
          <span className="font-medium text-foreground-muted">Why not the alternative — </span>
          {decision.alternativeApproach}
        </p>
      ) : null}
    </div>
  );
}
