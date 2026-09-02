// Long-form case-study content, keyed by Project["slug"] (see portfolio.ts). Kept separate from
// PROJECTS because that type feeds compact homepage cards — this feeds full /work/[slug] pages.
//
// Every fact below traces back to PROJECTS/EXPERIENCE in portfolio.ts or the case-study brief.
// Where a section has no verified source material, omit it. A `note` only accompanies real
// items when further detail exists but is unpublished — never as a stand-in for the section.

export type TechnicalDecision = {
  decision: string;
  rationale: string;
  alternativeApproach?: string;
};

export type Tradeoff = {
  choice: string;
  cost: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudy = {
  slug: string;
  seoTitle: string;
  seoDescription?: string;
  overview: string[];
  context: string[];
  problem: string[];
  role: string[];
  constraints: { items: string[]; note?: string };
  architecture: { intro: string[] };
  decisions: TechnicalDecision[];
  tradeoffs: Tradeoff[];
  challenges: { items: string[]; note?: string };
  outcome: { metrics: Metric[]; bullets: string[]; note?: string };
  links: CaseStudyLink[];
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  modelrail: {
    slug: "modelrail",
    seoTitle: "ModelRail: Production AI gateway",
    seoDescription:
      "ModelRail is a production AI gateway with one API for routing, failover, usage limits, and billing across multiple language models.",
    overview: [
      "ModelRail is a production AI gateway: one API for routing, failover, usage limits, and billing across multiple language models — launching first for developers in Nigeria.",
    ],
    context: [
      "Teams calling multiple LLM providers directly end up duplicating routing, retry, and billing logic per integration. ModelRail collapses that into a single API surface, with a prepaid credit wallet built to remove payment friction for the initial Nigeria launch market.",
    ],
    problem: [
      "The routing layer had to pick the right model for a request accurately — without adding the latency and cost of a separate LLM call just to decide which model to use.",
    ],
    role: [
      "Designed and built ModelRail's routing engine, provider integrations, and usage-control layer — the workload-alias system, the two-tier router, rate limiting and spend caps, and the prepaid wallet for the Nigeria launch.",
    ],
    constraints: {
      items: [
        "Routing decisions could not themselves cost an extra model call — the router had to stay static-mapping-plus-heuristics, not a second LLM in the request path.",
        "Usage needed hard limits: rate limits and monthly spend caps with clear error responses, to prevent runaway usage and surprise bills.",
      ],
    },
    architecture: {
      intro: [
        "Calling applications target a stable workload alias — modelrail-auto, modelrail-chat, modelrail-reasoning, modelrail-code, or modelrail-tools — instead of a specific provider model.",
        "Each alias resolves through a two-tier router: a static mapping table handles the common case, with lightweight heuristics deciding when a request needs a different tier. Nothing in that path is itself a model call.",
        "Requests then go through provider routing with failover, so a provider outage or rate limit doesn't surface as a failure to the caller. NestJS (on Fastify) handles the request layer; Redis and BullMQ back rate limiting and queued work; MongoDB persists usage, wallet, and billing state.",
      ],
    },
    decisions: [
      {
        decision: "Static mapping + heuristics over an LLM-based router",
        rationale:
          "A static mapping table covers the common routing case, with heuristics handling the rest — accurate enough without a second model round-trip on every request.",
        alternativeApproach:
          "The obvious alternative — routing every request through a classifier model first — was avoided because it doubles the model calls a single request needs, adding latency and cost to double as much traffic.",
      },
      {
        decision: "Workload aliases instead of exposing raw model names",
        rationale:
          "Aliases like modelrail-chat or modelrail-reasoning describe what a request needs, not which vendor model serves it, so calling code stays stable when the underlying model or provider changes.",
      },
      {
        decision: "Rate limits and spend caps enforced at the gateway",
        rationale:
          "Usage limits and monthly spend caps live in the gateway layer, with clear error responses, so a single client can't create a runaway bill or crowd out other traffic.",
      },
      {
        decision: "Prepaid wallet for the Nigeria launch",
        rationale:
          "A prepaid credit wallet removes payment friction for developers in the initial Nigeria launch market, rather than requiring a card-based billing flow.",
      },
    ],
    tradeoffs: [
      {
        choice: "Static mapping + heuristics instead of a learned/LLM router",
        cost: "Heuristic routing needs manual upkeep as new models and workload types are added. A learned router would generalize better, but reintroduces the latency and cost this design exists to avoid.",
      },
      {
        choice: "Provider failover handled at the gateway layer",
        cost: "Centralizing failover in the gateway makes it a critical-path component — its own availability now bounds every provider's effective availability to callers.",
      },
    ],
    challenges: {
      items: [
        "Keeping heuristic routing accurate without a model-based fallback meant tuning the static mapping and heuristics against real workload patterns, rather than leaning on a router that could reason its way through edge cases.",
      ],
      note: "A fuller account of specific incidents and debugging stories from the ModelRail build isn't published yet.",
    },
    outcome: {
      metrics: [],
      bullets: [
        "Shipped the workload-alias system (modelrail-auto, modelrail-chat, modelrail-reasoning, modelrail-code, modelrail-tools) so applications call a stable alias instead of a specific model.",
        "Rate limits and monthly spend caps live in production, with clear error responses to prevent runaway usage and surprise bills.",
        "A prepaid credit wallet live for the Nigeria launch, removing payment friction for developers there.",
      ],
    },
    links: [{ label: "modelrail.dev", href: "https://modelrail.dev" }],
  },

  krownpay: {
    slug: "krownpay",
    seoTitle: "KrownPay: Payments infrastructure on AWS",
    overview: [
      "Backend services, cloud infrastructure, and transaction workflows for a production payments platform.",
    ],
    context: [
      "Full-Stack Developer and Blockchain Engineer at KrownPay, 2021–2024 (part-time), working across payment processing, cloud infrastructure, and blockchain transaction tracking.",
    ],
    problem: [
      "The platform started as a monolith. As payment volume and feature surface grew, the monolith constrained how reliably and responsively payment processing could handle load.",
    ],
    role: [
      "Led the move from a monolith to event-driven microservices, and led an AWS cost-optimization project across the platform's infrastructure.",
    ],
    constraints: {
      items: [
        "Payments infrastructure carries compliance and security requirements that shape architecture choices before performance or cost.",
      ],
      note: "Specific regulatory and compliance requirements are proprietary to KrownPay and aren't detailed here.",
    },
    architecture: {
      intro: [
        "The move from a monolith to event-driven microservices restructured how payment processing communicated internally, improving reliability and responsiveness under load.",
        "Infrastructure ran on AWS EKS. Adding spot instances to the cluster cut infrastructure costs by 30% while improving scaling — mixing in lower-cost capacity without sacrificing the reliability payment processing needs.",
        "Blockchain transaction monitoring ran in real time across Solana, Ethereum, and Polygon, tracking payments as they moved on-chain, alongside the platform's transaction-tracking APIs.",
      ],
    },
    decisions: [
      {
        decision: "Monolith → event-driven microservices",
        rationale:
          "Decoupling payment processing into event-driven services improved reliability and responsiveness — a failure or slowdown in one area no longer directly blocked the rest of the system.",
      },
      {
        decision: "Spot instances added to the EKS cluster",
        rationale:
          "Mixing spot capacity into the cluster around workloads that could tolerate interruption cut infrastructure costs by 30% while improving scaling.",
        alternativeApproach:
          "On-demand-only capacity is simpler to reason about, but leaves that cost saving on the table for workloads that don't need guaranteed capacity.",
      },
    ],
    tradeoffs: [
      {
        choice: "Spot instances for cost savings",
        cost: "Spot capacity can be reclaimed on short notice, so workloads placed on it need to tolerate interruption — not every part of a payments system is a safe fit for spot.",
      },
      {
        choice: "Event-driven microservices over a monolith",
        cost: "Splitting the monolith traded a single deployable for distributed-systems concerns — message ordering, eventual consistency, and more moving parts to operate.",
      },
    ],
    challenges: {
      items: [
        "Moving a live payments system from a monolith to event-driven services without downtime meant the cutover itself, not just the target architecture, had to be engineered carefully.",
      ],
      note: "Deeper specifics of the migration are proprietary to KrownPay and aren't published here.",
    },
    outcome: {
      metrics: [{ value: "30%", label: "AWS infrastructure cost reduction" }],
      bullets: [
        "Real-time blockchain transaction monitoring live across Solana, Ethereum, and Polygon.",
        "Improved reliability and responsiveness for payment processing after the move to event-driven microservices.",
      ],
    },
    links: [],
  },

  "resonance-holdings": {
    slug: "resonance-holdings",
    seoTitle: "Resonance Holdings: Graph-backed market intelligence",
    overview: [
      "AI-driven market intelligence products — data exploration, relationship mapping, and contextual insights.",
    ],
    context: [
      "Full-Stack Developer at Resonance Holdings, 2025, working on the data model, APIs, and cloud infrastructure behind the product's market-intelligence features.",
    ],
    problem: [
      "Market intelligence is fundamentally about relationships — between companies, events, and signals — not just records in isolation. The data model and APIs needed to make those relationships queryable, not just stored.",
    ],
    role: [
      "Designed and tuned Neo4j graph models and Cypher queries for relationship-based search, filtering, and analytics, and set up the AWS infrastructure serving them.",
    ],
    constraints: { items: [] },
    architecture: {
      intro: [
        "Graph models and Cypher queries in Neo4j power relationship-based search, filtering, and analytics — connecting entities the way the underlying relationships actually work, rather than flattening them into rows.",
        "Proprietary and third-party AI models feed into the data pipeline to improve recommendations.",
        "AWS infrastructure — EKS, S3, Lambda, and API Gateway — serves the pipeline and APIs securely at scale.",
      ],
    },
    decisions: [
      {
        decision: "Neo4j graph model over a relational schema",
        rationale:
          "Market intelligence is relationship-heavy — Neo4j and Cypher let relationship-based search and filtering run as native graph traversals instead of multi-table joins.",
      },
      {
        decision: "AI models integrated directly into the data pipeline",
        rationale:
          "Feeding proprietary and third-party AI models into the pipeline, rather than bolting them on as a separate downstream step, let recommendations use relationship context from the graph directly.",
      },
    ],
    tradeoffs: [
      {
        choice: "Graph database over relational",
        cost: "A graph database fits relationship-heavy queries well, but it's a less familiar operational surface than relational stores, and not every part of the product's data is naturally graph-shaped.",
      },
    ],
    challenges: { items: [] },
    outcome: {
      metrics: [],
      bullets: [
        "Neo4j graph models and Cypher queries live for relationship-based search, filtering, and analytics.",
        "Proprietary and third-party AI models integrated into the data pipeline to improve recommendations.",
        "AWS infrastructure (EKS, S3, Lambda, API Gateway) set up for secure, scalable deployment.",
      ],
    },
    links: [],
  },

  rightward: {
    slug: "rightward",
    seoTitle: "Rightward: AI-powered bill savings for Canadians",
    overview: [
      "Rightward is an AI-powered app that helps Canadians review recurring bills and find ways to save money.",
    ],
    context: [
      "A consumer fintech product focused on telecom bill analysis, plan comparisons, and savings recommendations — built and iterated from real-world testing and user feedback.",
    ],
    problem: [],
    role: [
      "Built the product end-to-end with Next.js, TypeScript, Supabase, Tailwind CSS, Claude SDK, and Resend, working solo and balancing accuracy, reliability, privacy, and trust.",
    ],
    constraints: { items: [] },
    architecture: { intro: [] },
    decisions: [],
    tradeoffs: [],
    challenges: { items: [] },
    outcome: {
      metrics: [],
      bullets: [
        "Workflows for telecom bill analysis, plan comparisons, and savings recommendations.",
        "Used the Claude SDK to turn complex billing data into clear, actionable recommendations.",
        "Iterated on features based on user feedback and real-world testing.",
      ],
    },
    links: [{ label: "rightward.ca", href: "https://rightward.ca" }],
  },

  echofaith: {
    slug: "echofaith",
    seoTitle: "EchoFaith: Multi-tenant church communication platform",
    overview: [
      "EchoFaith is an AI-native, multi-tenant platform for church communication and workflow automation.",
    ],
    context: [
      "The product is built for scheduled messaging, outreach automation, and member lifecycle management across tenants.",
    ],
    problem: [],
    role: [
      "Designing the backend for scheduled messaging, outreach automation, and member lifecycle management.",
    ],
    constraints: { items: [] },
    architecture: { intro: [] },
    decisions: [],
    tradeoffs: [],
    challenges: { items: [] },
    outcome: {
      metrics: [],
      bullets: [
        "Queue-based job processing, timezone-aware scheduling, and activity tracking across tenants.",
      ],
    },
    links: [{ label: "echofaith.io", href: "https://echofaith.io" }],
  },
};
