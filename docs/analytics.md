# Analytics

Privacy-friendly recruiter engagement tracking via [Plausible Analytics](https://plausible.io).

## Integration

- Script: `src/components/plausible-script.tsx` (loaded globally from `_app.tsx`)
- Helpers: `src/lib/analytics.ts`
- Strategy: `afterInteractive` — does not block first paint
- Dev: script is **not** loaded unless `NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST=true`
- Production: loads only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set

No extra analytics packages. Custom events call `window.plausible` and no-op if the script is missing (ad blockers, offline, misconfig). Native link/`download` behaviour is never replaced.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_ORIGIN` | Yes (for launch) | Canonical / OG / sitemap origin, e.g. `https://peterlogo.dev` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Yes (for analytics) | Domain registered in Plausible, e.g. `peterlogo.dev` |
| `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC` | No | Override script URL (defaults to `https://plausible.io/js/script.js`) |
| `NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST` | No | Set `true` to send events from local/dev builds |

Copy `.env.example` → `.env.local` for local overrides. Never commit secrets (there are none for Plausible).

## Events tracked in code

| Event | Meaning | Props | Emitted from |
|---|---|---|---|
| `resume_download` | Résumé file download (PDF or DOCX) | `location`, `page`, `format` | Hero, footer, contact, résumé page |
| `github_click` | GitHub profile link | `location`, `page` | Hero, footer, contact, résumé |
| `linkedin_click` | LinkedIn profile link | `location`, `page` | Hero, footer, contact, résumé |
| `email_click` | `mailto:` contact | `location`, `page` | Hero, footer, contact, final CTA, résumé |
| `selected_work_click` | Hero primary CTA → `/work` | `location=hero`, `page` | Homepage hero |

`location` values: `hero` · `footer` · `contact` · `resume` · `final_cta`

### Case study views (pageviews, not custom events)

Do **not** emit `modelrail_case_study_view` / etc. from code. Configure **pageview goals** in Plausible for:

- `/work/modelrail`
- `/work/krownpay`
- `/work/resonance-holdings`

That avoids double-counting page visits as custom events.

### Résumé counting

Use the custom `resume_download` goal only. **Do not** also enable Plausible’s automatic File Downloads goal for the résumé PDF/DOCX, or downloads will double-count.

## Adding another event

1. Add a helper in `src/lib/analytics.ts` (or call `trackEvent("name", props)`).
2. Attach `onClick={() => track…()}` on the real `<a>` / `<Link>` — never `preventDefault`.
3. Create a matching **Custom event** goal in the Plausible dashboard (exact name match).
4. Document it in this file.

## Testing

1. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and `NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST=true` in `.env.local`.
2. Ensure the domain (or `localhost`) is allowed in your Plausible site settings.
3. Run `pnpm dev`, open DevTools → Network, filter `event`.
4. Click tracked actions; confirm POSTs to Plausible (or your proxy).
5. In production, verify Realtime in the Plausible dashboard.

## Plausible dashboard setup (manual)

After deploy:

1. Add the site with the same domain as `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
2. **Goals → Custom events** for: `resume_download`, `github_click`, `linkedin_click`, `email_click`, `selected_work_click`.
3. **Goals → Pageview** for the three `/work/…` case studies above.
4. **Funnels** (recommended):

   ```
   Visit homepage (/)
     → selected_work_click
     → /work/{slug} (pageview goal)
     → resume_download
     → linkedin_click | github_click | email_click
   ```

5. Leave automatic File Downloads **off** (or exclude résumé assets) to avoid double-counting.
6. Outbound-link auto-tracking is optional; GitHub/LinkedIn already use custom events.
7. UTMs (`utm_source`, `utm_medium`, …) are captured by Plausible automatically — no app changes needed.

## Privacy

We do not collect names, emails, form bodies, résumé recipients, query PII, keystrokes, or fingerprints. No session replay or heatmaps.
