// Inline, responsive SVG diagrams — one per case study. Colors use the site's existing
// fill-*/stroke-* utilities (mapped to the same CSS variables as everything else), so each
// diagram switches with light/dark automatically instead of needing its own theme handling.
//
// A fixed min-width lets the ArchitectureDiagram shell's overflow-x-auto wrapper take over on
// very narrow screens rather than shrinking node text below a readable size.

function DiagramNode({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  note,
  emphasis,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  note?: string;
  emphasis?: boolean;
}) {
  const cx = x + w / 2;
  const lineCount = 1 + (subtitle ? 1 : 0) + (note ? 1 : 0);
  const startY = lineCount === 1 ? y + h / 2 : y + 26;
  const lineGap = 20;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        strokeWidth={1.5}
        className={emphasis ? "fill-brand-soft stroke-brand" : "fill-surface stroke-border-strong"}
      />
      <text
        x={cx}
        y={startY}
        textAnchor="middle"
        dominantBaseline={lineCount === 1 ? "middle" : "auto"}
        className="fill-foreground font-sans text-[15px] font-semibold"
      >
        {title}
      </text>
      {subtitle ? (
        <text x={cx} y={startY + lineGap} textAnchor="middle" className="fill-foreground-muted font-mono text-[12px]">
          {subtitle}
        </text>
      ) : null}
      {note ? (
        <text
          x={cx}
          y={startY + lineGap * (subtitle ? 2 : 1)}
          textAnchor="middle"
          className={emphasis ? "fill-brand font-mono text-[11px]" : "fill-foreground-subtle font-mono text-[11px]"}
        >
          {note}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, markerId }: { x1: number; y1: number; x2: number; y2: number; markerId: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-border-strong" strokeWidth={1.5} markerEnd={`url(#${markerId})`} />;
}

function ArrowheadMarker({ id }: { id: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className="fill-border-strong" />
    </marker>
  );
}

export function ModelRailDiagram() {
  return (
    <svg
      viewBox="0 0 760 620"
      role="img"
      aria-labelledby="modelrail-diagram-title"
      aria-describedby="modelrail-diagram-caption"
      focusable="false"
      className="w-full min-w-[640px]"
    >
      <title id="modelrail-diagram-title">ModelRail request flow, from calling app to provider and back</title>
      <defs>
        <ArrowheadMarker id="modelrail-arrow" />
      </defs>

      <DiagramNode x={280} y={20} w={200} h={60} title="Client / calling app" />
      <Arrow x1={380} y1={80} y2={130} x2={380} markerId="modelrail-arrow" />

      <DiagramNode
        x={180}
        y={130}
        w={400}
        h={90}
        title="ModelRail Gateway"
        subtitle="NestJS + Fastify"
        note="aliases: auto · chat · reasoning · code · tools"
      />
      <Arrow x1={380} y1={220} y2={260} x2={380} markerId="modelrail-arrow" />

      <DiagramNode
        x={180}
        y={260}
        w={400}
        h={90}
        title="Two-tier router"
        subtitle="static mapping + heuristics"
        note="no extra model call"
        emphasis
      />
      <Arrow x1={380} y1={350} y2={390} x2={380} markerId="modelrail-arrow" />

      <text x={380} y={378} textAnchor="middle" className="fill-foreground-subtle font-mono text-[11px] uppercase tracking-[0.08em]">
        provider routing + failover
      </text>

      <DiagramNode x={40} y={390} w={200} h={70} title="Provider 1" />
      <DiagramNode x={280} y={390} w={200} h={70} title="Provider 2" />
      <DiagramNode x={520} y={390} w={200} h={70} title="Provider 3" />
      <Arrow x1={240} y1={425} x2={280} y2={425} markerId="modelrail-arrow" />
      <Arrow x1={480} y1={425} x2={520} y2={425} markerId="modelrail-arrow" />
      <text x={380} y={480} textAnchor="middle" className="fill-foreground-subtle font-mono text-[11px]">
        response returned to the calling app
      </text>

      <line x1={40} y1={505} x2={720} y2={505} className="stroke-border" strokeWidth={1} />
      <text x={380} y={530} textAnchor="middle" className="fill-foreground-subtle font-mono text-[11px] uppercase tracking-[0.08em]">
        supporting infrastructure
      </text>

      <DiagramNode x={60} y={545} w={180} h={55} title="Redis" subtitle="rate limiting" />
      <DiagramNode x={290} y={545} w={180} h={55} title="BullMQ" subtitle="queued work" />
      <DiagramNode x={520} y={545} w={180} h={55} title="MongoDB" subtitle="usage & wallet state" />
    </svg>
  );
}

export function KrownPayDiagram() {
  return (
    <svg
      viewBox="0 0 760 380"
      role="img"
      aria-labelledby="krownpay-diagram-title"
      aria-describedby="krownpay-diagram-caption"
      focusable="false"
      className="w-full min-w-[560px]"
    >
      <title id="krownpay-diagram-title">{"KrownPay's move from a monolith to event-driven microservices"}</title>
      <defs>
        <ArrowheadMarker id="krownpay-arrow" />
      </defs>

      <DiagramNode x={280} y={20} w={200} h={60} title="Monolith (before)" />
      <Arrow x1={380} y1={80} y2={130} x2={380} markerId="krownpay-arrow" />
      <text x={430} y={108} className="fill-foreground-subtle font-mono text-[11px]">
        migrated to
      </text>

      <DiagramNode
        x={140}
        y={130}
        w={480}
        h={70}
        title="Event-driven microservices"
        subtitle="AWS EKS + spot instances"
        emphasis
      />

      <Arrow x1={145} y1={200} x2={145} y2={250} markerId="krownpay-arrow" />
      <Arrow x1={380} y1={200} x2={380} y2={250} markerId="krownpay-arrow" />
      <Arrow x1={615} y1={200} x2={615} y2={250} markerId="krownpay-arrow" />

      <DiagramNode x={40} y={250} w={210} h={70} title="Payment processing" />
      <DiagramNode x={270} y={250} w={220} h={70} title="Blockchain monitoring" subtitle="Solana · Ethereum · Polygon" />
      <DiagramNode x={510} y={250} w={210} h={70} title="Transaction APIs" />

      <text x={380} y={345} textAnchor="middle" className="fill-brand font-mono text-[12px]">
        30% AWS cost reduction from spot instances on EKS
      </text>
    </svg>
  );
}

export function ResonanceDiagram() {
  const nodes = [
    { id: "n1", cx: 200, cy: 90 },
    { id: "n2", cx: 430, cy: 60 },
    { id: "n3", cx: 590, cy: 150 },
    { id: "n4", cx: 300, cy: 230 },
    { id: "n5", cx: 500, cy: 260 },
  ];
  const edges: [string, string][] = [
    ["n1", "n2"],
    ["n1", "n4"],
    ["n2", "n3"],
    ["n2", "n5"],
    ["n4", "n5"],
    ["n3", "n5"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 700 340"
      role="img"
      aria-labelledby="resonance-diagram-title"
      aria-describedby="resonance-holdings-diagram-caption"
      focusable="false"
      className="w-full min-w-[520px]"
    >
      <title id="resonance-diagram-title">Conceptual illustration of a Neo4j graph model — entities connected by relationships</title>
      <text x={30} y={30} className="fill-foreground-subtle font-mono text-[11px] uppercase tracking-[0.08em]">
        Neo4j graph model (illustrative)
      </text>

      {edges.map(([a, b]) => {
        const from = byId[a];
        const to = byId[b];
        return <line key={`${a}-${b}`} x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy} className="stroke-border-strong" strokeWidth={1.5} />;
      })}
      <text x={(byId.n2.cx + byId.n3.cx) / 2 + 14} y={(byId.n2.cy + byId.n3.cy) / 2 - 6} className="fill-foreground-subtle font-mono text-[10px]">
        relationship
      </text>

      {nodes.map((node) => (
        <g key={node.id}>
          <circle cx={node.cx} cy={node.cy} r={34} strokeWidth={1.5} className="fill-surface stroke-border-strong" />
          <text x={node.cx} y={node.cy} textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-mono text-[12px]">
            Entity
          </text>
        </g>
      ))}

      <text x={30} y={320} className="fill-foreground-subtle font-mono text-[11px]">
        Cypher queries traverse these relationships directly — no join tables.
      </text>
    </svg>
  );
}
