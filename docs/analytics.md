# Analytics

Privacy-friendly recruiter engagement tracking via [Plausible Analytics](https://plausible.io) and the official [`@plausible-analytics/tracker`](https://www.npmjs.com/package/@plausible-analytics/tracker) package.

## Integration

- Package: `@plausible-analytics/tracker`
- Helpers + config: `src/lib/analytics.ts`
- Initialization: `analytics.init()` from `src/pages/_app.tsx` inside `useEffect` (client-only, once)
- Production: initializes only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set
- Dev: does **not** initialize unless `NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST=true`

Custom events call `track()` and no-op if the tracker is not initialized (dev, missing env, blockers, offline). Native link and `download` behaviour is never replaced.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_ORIGIN` | Yes (for launch) | Canonical / OG / sitemap origin, e.g. `https://peterlogo.dev` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Yes (for analytics) | Domain registered in Plausible, e.g. `peterlogo.dev` |
| `NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST` | No | Set `true` to send events from local/dev builds |

Copy `.env.example` → `.env.local` for local overrides. Never commit secrets (there are none for Plausible).

Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Vercel for production.

## Automatic tracking

These are enabled in `init()` — no per-component instrumentation:

| Signal | How it shows in Plausible | What it covers |
|---|---|---|
| Pageviews | Top Pages / pageview goals | Direct loads and client-side (SPA) navigations, including case-study URLs |
| File downloads | Goal **File Download** (`url` prop) | Résumé PDF and DOCX (`/Peter-Logo-Software-Engineer-Resume.pdf` and `.docx`) |
| Outbound links | Goal **Outbound Link: Click** (`url` prop) | GitHub, LinkedIn, project sites, and other external `https` links |

Do **not** add custom events for résumé downloads, GitHub, LinkedIn, or case-study views — that would double-count.

### How to identify résumé downloads

In Plausible: **Goals → File Download**. Filter or inspect the `url` property for:

- `/Peter-Logo-Software-Engineer-Resume.pdf`
- `/Peter-Logo-Software-Engineer-Resume.docx`

PDF vs Word is distinguished by that `url`, not by a custom event.

## Custom events

Only used where pageviews / outbound / file downloads are not enough:

| Event | Meaning | Emitted from |
|---|---|---|
| `Selected Work` | Hero primary CTA → `/work` | Homepage “View selected work” |
| `Email Click` | `mailto:` contact | Hero, footer, contact, final CTA, résumé |

`mailto:` is not a reliable outbound-link match, so email stays a custom event.

### Case study views (pageviews, not custom events)

Do **not** emit `modelrail_case_study_view` / etc. from code. Optional: configure **pageview goals** in Plausible for:

- `/work/modelrail`
- `/work/krownpay`
- `/work/resonance-holdings`

## Adding another custom event

1. Add a helper on `analytics` in `src/lib/analytics.ts` (same try/catch no-op pattern).
2. Call it from an `onClick` on the real `<a>` / `<Link>` — never `preventDefault`.
3. Create a matching **Custom event** goal in the Plausible dashboard (exact name match).
4. Document it in this file.

Skip this if a pageview, File Download, or Outbound Link: Click already covers the action.

## Testing locally

1. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and `NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST=true` in `.env.local`.
2. Allow the domain (or `localhost`) in your Plausible site settings if you want dashboard hits.
3. Run `pnpm dev`, open DevTools → Network, filter `event`.
4. Click tracked actions; confirm POSTs to `https://plausible.io/api/event`.
5. After production deploy, use Plausible **Realtime** and the installation verifier (`window.plausible`).

## Plausible dashboard setup (manual)

After deploy:

1. Add the site with the same domain as `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
2. Enable automatic goals: **File Download** and **Outbound Link: Click**.
3. **Goals → Custom events** for: `Selected Work`, `Email Click`.
4. Optional **Goals → Pageview** for the three `/work/…` case studies above.
5. **Funnels** (recommended):

   ```
   Visit homepage (/)
     → Selected Work
     → /work/{slug} (pageview)
     → File Download (résumé)
     → Outbound Link: Click (GitHub / LinkedIn) | Email Click
   ```

6. UTMs (`utm_source`, `utm_medium`, …) are captured by Plausible automatically — no app changes needed.

## Privacy

We do not collect names, emails, form bodies, résumé contents, query PII, keystrokes, or fingerprints. No session replay or heatmaps.
