// Structured résumé content mirrored from public/Peter-Logo-Software-Engineer-Resume.docx.
// Keep factual fields aligned with that document; do not invent roles, dates, or metrics.

export const RESUME_PROFILE = {
  name: "Peter Logo",
  title: "FullStack Engineer",
  location: "Ottawa, Ontario, Canada",
  summary:
    "FullStack Engineer with 5+ years building web apps, APIs, and cloud systems with TypeScript, JavaScript, React, Node.js, AWS, Docker, and Kubernetes. Also design and ship AI features, from LLM integrations to agentic workflows, and enjoy taking AI-native products from idea to production. Worked across AI, payments, authentication, and data pipelines in Agile teams alongside engineering, product, data, and business folks, building software that solves real problems. Builder of ModelRail (a production AI gateway for developers), Rightward.ca (an AI-powered consumer fintech app), and EchoFaith.io (an AI-native church communication platform).",
} as const;

export const RESUME_AI_ENGINEERING = {
  modelsAndSdks: ["Claude SDK", "LLM APIs", "AI Model Integration", "Third-Party AI Services"],
  specialisations: [
    "Agentic AI Systems",
    "LLM Workflows",
    "Prompt Engineering",
    "AI-Driven Applications",
    "AI-Native Product Development",
  ],
  appliedAi: [
    "Conversational AI Interfaces",
    "AI-Powered Data Pipelines",
    "Intelligent Outreach Automation",
    "Bill Analysis via LLM",
    "Multi-Model Gateway Routing",
  ],
} as const;

export type ResumeSkillGroup = {
  name: string;
  items: string[];
};

export const RESUME_SKILLS: ResumeSkillGroup[] = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Golang"],
  },
  {
    name: "Frameworks & Libraries",
    items: ["React", "Node.js", "Next.js", "NestJS", "FastAPI", "Three.js", "Tailwind CSS"],
  },
  {
    name: "Cloud & Infrastructure",
    items: [
      "AWS (EKS, S3, Lambda, API Gateway)",
      "Docker",
      "Kubernetes",
      "Microservices",
      "Event-Driven Architecture",
      "CI/CD",
    ],
  },
  {
    name: "Databases & Queues",
    items: ["Neo4j (Cypher)", "PostgreSQL", "MongoDB", "Redis", "BullMQ", "SQL", "NoSQL"],
  },
  {
    name: "APIs & Protocols",
    items: ["REST APIs", "GraphQL", "API Design", "Third-Party Integrations", "Webhooks"],
  },
  {
    name: "Tools & Practices",
    items: [
      "Git",
      "Agile/Scrum",
      "Code Reviews",
      "Logging",
      "Monitoring",
      "Performance Optimization",
      "Debugging",
    ],
  },
];

export type ResumeExperience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const RESUME_EXPERIENCE: ResumeExperience[] = [
  {
    role: "Full-Stack Developer",
    company: "Resonance Holdings",
    location: "Remote",
    period: "2025",
    bullets: [
      "Built full-stack features for AI-driven market intelligence products, including data exploration, relationship mapping, and contextual insights for users.",
      "Designed and tuned Neo4j graph models and Cypher queries for relationship-based search, filtering, and analytics.",
      "Built REST APIs and backend services in TypeScript and Node.js for data workflows and app features.",
      "Worked with data engineering and AI teams to plug proprietary and third-party AI models into the data pipeline for better recommendations.",
      "Designed UI for AI-driven chat and analytics to make data exploration easier for users.",
      "Set up and managed AWS infrastructure (EKS, S3, Lambda, API Gateway) for secure, scalable deployments.",
      "Built data pipelines to process and deliver datasets for AI model training and inference.",
      "Took part in system design, data modeling, and architecture discussions across the stack.",
    ],
  },
  {
    role: "Full-Stack Developer, Blockchain Engineer",
    company: "KrownPay",
    location: "Remote",
    period: "2021 – 2024 (Part-Time)",
    bullets: [
      "Built full-stack features for a payment platform, covering backend services, cloud infra, REST APIs, and transaction workflows.",
      "Led an AWS cost optimization project, adding spot instances to EKS and cutting cloud costs by 30% while improving scaling.",
      "Led the move from a monolith to event-driven microservices, improving reliability and responsiveness for payment processing.",
      "Built real-time blockchain notification systems for Solana, Ethereum, and Polygon to speed up payment tracking.",
      "Worked with compliance teams to align system workflows with Australian financial regulations.",
      "Built and maintained REST APIs for transaction monitoring and payment processing.",
      "Fixed production issues, tuned performance, and improved CI/CD for more reliable deployments.",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Montra Interactive",
    location: "Remote",
    period: "2022 – 2023",
    bullets: [
      "Built full-stack features for a video web app, across React, Node.js, auth, and the database layer.",
      "Added OAuth and JWT authentication to improve account security.",
      "Rewrote database queries, improving retrieval speed by 30% across key flows.",
      "Worked on Three.js video editing features, making them faster and more reliable.",
      "Helped with debugging, QA, and iterative delivery in an Agile setup.",
    ],
  },
  {
    role: "Full-Stack Software Developer",
    company: "Hatchways",
    location: "Remote",
    period: "2021",
    bullets: [
      "Built React frontend features to improve usability and responsiveness.",
      "Helped design a plugin management system for a task management platform.",
      "Added client-side auth workflows, cutting security vulnerabilities by 25%.",
      "Worked in Agile sprints on feature delivery, code review, and debugging.",
    ],
  },
];

export type ResumeProject = {
  name: string;
  subtitle: string;
  href?: string;
  bullets: string[];
};

export const RESUME_PROJECTS: ResumeProject[] = [
  {
    name: "ModelRail",
    subtitle: "Production AI Gateway for Developers",
    href: "https://modelrail.dev",
    bullets: [
      "Building a production AI gateway that gives developers one API for routing, failover, usage limits, and billing across multiple models, launching first for developers in Nigeria.",
      "Built a workload-alias system (modelrail-auto, -chat, -reasoning, -code, -tools) so apps call a stable alias instead of a specific provider or model.",
      "Built a two-tier routing system that picks the right model using static mapping plus simple heuristics, without adding latency from an extra LLM call.",
      "Added rate limits and monthly spend caps with clear error responses to stop runaway usage and surprise bills.",
      "Built the backend with NestJS (Fastify), MongoDB, Redis, and BullMQ, plus a prepaid credit wallet to solve payment friction for developers in Nigeria.",
    ],
  },
  {
    name: "Rightward.ca",
    subtitle: "Consumer Fintech Platform",
    href: "https://rightward.ca",
    bullets: [
      "Building an AI-powered app that helps Canadians review recurring bills and find ways to save money.",
      "Built workflows for telecom bill analysis, plan comparisons, and savings recommendations.",
      "Built the product end-to-end with Next.js, TypeScript, Supabase, Tailwind CSS, Claude SDK, and Resend.",
      "Used the Claude SDK to turn complex billing data into clear, actionable recommendations.",
      "Iterated on features based on user feedback and real-world testing.",
      "Balanced accuracy, reliability, privacy, and trust while building solo.",
    ],
  },
  {
    name: "EchoFaith",
    subtitle: "AI-First Church Communication Platform",
    href: "https://echofaith.io",
    bullets: [
      "Building an AI-native, multi-tenant platform for church communication and workflow automation.",
      "Designing backend for scheduled messaging, outreach automation, and member lifecycle management.",
      "Built queue-based job processing, timezone-aware scheduling, and activity tracking across tenants.",
    ],
  },
];

export type ResumeCredential = {
  title: string;
  org: string;
  detail: string;
};

export const RESUME_EDUCATION: ResumeCredential[] = [
  {
    title: "Bachelor of Arts, Economics",
    org: "Carleton University",
    detail: "Ottawa, Canada · 2024",
  },
  {
    title: "Software Engineering PreCourse",
    org: "Hack Reactor",
    detail: "2021",
  },
];

export const RESUME_CERTIFICATIONS: ResumeCredential[] = [
  {
    title: "AI Engineering — Agentic Track",
    org: "Udemy",
    detail: "In Progress, 2026",
  },
  {
    title: "Neo4j Fundamentals",
    org: "Neo4j GraphAcademy",
    detail: "2025",
  },
];
