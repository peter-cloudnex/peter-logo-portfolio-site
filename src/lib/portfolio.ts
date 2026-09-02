// Centralized project, experience, and skills data — sourced from the résumé so
// homepage sections (and future /work, /experience pages) share one source of truth.

export type Project = {
  slug: string;
  name: string;
  category: string;
  href?: string;
  context: string;
  responsibility: string;
  proof: string[];
  stack: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "modelrail",
    name: "ModelRail",
    category: "AI Infrastructure",
    href: "https://modelrail.dev",
    context:
      "A production AI gateway that gives developers one API for routing, failover, usage limits, and billing across multiple models — launching first for developers in Nigeria.",
    responsibility:
      "Built a two-tier routing system that picks the right model from static mapping plus lightweight heuristics, with no added latency from an extra LLM call.",
    proof: [
      "Workload-alias system (auto, chat, reasoning, code, tools) so apps call a stable alias instead of a specific model.",
      "Rate limits and monthly spend caps with clear error responses to prevent runaway usage and surprise bills.",
      "Prepaid credit wallet built to remove payment friction for developers in Nigeria.",
    ],
    stack: ["NestJS", "TypeScript", "Redis", "BullMQ", "MongoDB"],
    featured: true,
  },
  {
    slug: "krownpay",
    name: "KrownPay",
    category: "Payments Infrastructure",
    context: "Backend services, cloud infrastructure, and transaction workflows for a production payments platform.",
    responsibility:
      "Led the move from a monolith to event-driven microservices, improving reliability and responsiveness for payment processing.",
    proof: [
      "30% AWS infrastructure cost reduction from adding spot instances to EKS while improving scaling.",
      "Real-time blockchain transaction monitoring across Solana, Ethereum, and Polygon.",
    ],
    stack: ["AWS", "EKS", "Kubernetes", "Event-Driven Microservices", "Blockchain Monitoring"],
  },
  {
    slug: "resonance-holdings",
    name: "Resonance Holdings",
    category: "AI & Data Systems",
    context: "AI-driven market intelligence products — data exploration, relationship mapping, and contextual insights.",
    responsibility:
      "Designed and tuned Neo4j graph models and Cypher queries for relationship-based search, filtering, and analytics.",
    proof: [
      "Integrated proprietary and third-party AI models into the data pipeline to improve recommendations.",
      "Set up AWS infrastructure (EKS, S3, Lambda, API Gateway) for secure, scalable deployments.",
    ],
    stack: ["Neo4j", "Cypher", "Node.js", "TypeScript", "AWS"],
  },
  {
    slug: "rightward",
    name: "Rightward",
    category: "Consumer Fintech",
    href: "https://rightward.ca",
    context: "An AI-powered app that helps Canadians review recurring bills and find ways to save money.",
    responsibility:
      "Built the product end-to-end with Next.js, TypeScript, Supabase, Tailwind CSS, Claude SDK, and Resend.",
    proof: [
      "Workflows for telecom bill analysis, plan comparisons, and savings recommendations.",
      "Used the Claude SDK to turn complex billing data into clear, actionable recommendations.",
      "Balanced accuracy, reliability, privacy, and trust while building solo.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Claude SDK", "Resend"],
  },
  {
    slug: "echofaith",
    name: "EchoFaith",
    category: "AI-Native Product",
    href: "https://echofaith.io",
    context: "An AI-native, multi-tenant platform for church communication and workflow automation.",
    responsibility: "Designing backend for scheduled messaging, outreach automation, and member lifecycle management.",
    proof: [
      "Queue-based job processing, timezone-aware scheduling, and activity tracking across tenants.",
    ],
    stack: [],
  },
];

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Resonance Holdings",
    role: "Full-Stack Developer",
    period: "2025",
    bullets: [
      "Designed and tuned Neo4j graph models and Cypher queries for relationship-based search, filtering, and analytics.",
      "Set up and managed AWS infrastructure (EKS, S3, Lambda, API Gateway) for secure, scalable deployments.",
    ],
  },
  {
    company: "KrownPay",
    role: "Full-Stack Developer, Blockchain Engineer",
    period: "2021 – 2024 · Part-time",
    bullets: [
      "Led an AWS cost optimization project, adding spot instances to EKS and cutting cloud costs by 30% while improving scaling.",
      "Led the move from a monolith to event-driven microservices, improving reliability for payment processing.",
    ],
  },
  {
    company: "Montra Interactive",
    role: "Full-Stack Engineer",
    period: "2022 – 2023",
    bullets: [
      "Rewrote database queries, improving retrieval speed by 30% across key flows.",
      "Added OAuth and JWT authentication to improve account security.",
    ],
  },
  {
    company: "Hatchways",
    role: "Full-Stack Software Developer",
    period: "2021",
    bullets: [
      "Helped design a plugin management system for a task management platform.",
      "Added client-side auth workflows, cutting security vulnerabilities by 25%.",
    ],
  },
];

export type ExpertiseGroup = {
  name: string;
  description: string;
  core: string[];
  specialized: string[];
};

export const EXPERTISE_GROUPS: ExpertiseGroup[] = [
  {
    name: "Product Engineering",
    description: "React, Next.js, TypeScript and related full-stack product work.",
    core: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    specialized: ["Three.js"],
  },
  {
    name: "Backend Systems",
    description: "Node.js, NestJS, APIs, queues, microservices and event-driven architecture.",
    core: ["Node.js", "NestJS", "REST APIs", "GraphQL"],
    specialized: ["Redis", "BullMQ", "MongoDB", "PostgreSQL", "Neo4j (Cypher)"],
  },
  {
    name: "Cloud Infrastructure",
    description: "AWS, Kubernetes, Docker, EKS and CI/CD.",
    core: ["AWS", "Kubernetes", "Docker", "EKS"],
    specialized: ["CI/CD", "Lambda", "API Gateway"],
  },
  {
    name: "Applied AI",
    description: "LLM integration, AI workflows, agentic systems, AI routing and AI-native applications.",
    core: ["LLM Integration", "Agentic AI Systems", "AI Model Routing"],
    specialized: ["Prompt Engineering", "Claude SDK"],
  },
];

export type Principle = {
  title: string;
  body: string;
};

export const PRINCIPLES: Principle[] = [
  {
    title: "Build reliable systems",
    body: "Led the move from a monolith to event-driven microservices at KrownPay, improving reliability and responsiveness for live payment processing.",
  },
  {
    title: "Design pragmatically",
    body: "ModelRail's routing picks the right model from static mapping plus lightweight heuristics — accurate enough without the latency of an extra LLM call.",
  },
  {
    title: "Own systems end-to-end",
    body: "At Resonance Holdings, owned the stack from Neo4j data modeling and API design through to the AWS infrastructure serving it.",
  },
  {
    title: "Optimize against real constraints",
    body: "Rewrote database queries at Montra Interactive for a 30% gain in retrieval speed, and cut KrownPay's AWS costs 30% with right-sized, spot-backed infrastructure.",
  },
];
