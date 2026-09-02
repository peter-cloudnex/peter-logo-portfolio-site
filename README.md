# Peter Logo — portfolio site

Personal portfolio for Peter Logo (full-stack engineer). Next.js Pages Router, TypeScript, Tailwind CSS, deployed on Vercel with Plausible Analytics.

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

See `.env.example`. For production on Vercel set at least:

- `NEXT_PUBLIC_SITE_ORIGIN` — e.g. `https://peterlogo.dev` (canonical / OG / sitemap)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — e.g. `peterlogo.dev`

Analytics details, event taxonomy, and dashboard setup: [docs/analytics.md](docs/analytics.md).

## Scripts

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint
```

## Deploy (Vercel)

1. Import this repo in Vercel.
2. Framework preset: Next.js (defaults are fine).
3. Add the production env vars above.
4. Point the custom domain at the Vercel project.
5. Complete Plausible goals/funnels per [docs/analytics.md](docs/analytics.md).

`.env.local` is gitignored. Do not commit secrets (this project has none required beyond public config).
