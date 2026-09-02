import type { Metric } from "@/lib/case-studies";

// Same stat-tile shape as the homepage "Track record" strip (src/pages/index.tsx) — reused
// rather than reinvented so a metric reads the same wherever it appears on the site.
export function MetricProof({ metrics }: { metrics: Metric[] }) {
  if (metrics.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col gap-1 px-5 py-4 first:pt-4 last:pb-4 sm:px-6 sm:py-5 sm:first:pl-6 sm:last:pr-6"
          >
            <p className="text-h2 font-semibold tracking-tight text-foreground">{metric.value}</p>
            <p className="max-w-[26ch] text-meta text-foreground-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
