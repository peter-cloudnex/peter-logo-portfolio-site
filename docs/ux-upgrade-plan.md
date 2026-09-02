# Portfolio UX upgrade plan

> Recruiter-facing engineering site. Execute phases in order. Each phase is independently shippable. Do not restyle the visual identity.

**Goal:** Make the site safe to share with recruiters: correct metadata, accessible chrome, a homepage that is not a clone of inner pages, and case studies that look finished without inventing facts.

**Architecture:** Keep the existing Pages Router + Tailwind 4 token system (Geist, slate/blue, `data-theme`). Change information architecture, accessibility, and evidence presentation. Do not introduce GSAP, a new palette, or a new type family.

**Stack:** Next.js 16 Pages Router, React 19, Tailwind 4, `next/font` Geist.

**Review:** Open `portfolio-ux-review.canvas.tsx` beside chat in Cursor for the filterable findings table.

## Global constraints

- Keep semantic tokens in `src/styles/globals.css`. No raw hex in new components.
- Keep `prefers-reduced-motion` as a global disable in `globals.css`.
- Do not fabricate metrics, screenshots, or case-study detail. If a fact is unpublished, omit the section or label it “Not published”.
- One primary CTA per view. Secondary actions stay `buttonClasses("secondary")` or text links.
- Job title: pick one string and reuse it (recommended: `Full-stack engineer`).
- Do not add a contact form, testimonials carousel, or scroll-driven animation unless explicitly requested after Phase 4.
- Browser-verify each phase on `/`, `/work`, `/work/modelrail`, `/experience`, `/about`, `/resume`, `/contact`, at ~375px and desktop, light and dark.

## What to keep (do not rip up)

- Swiss / minimal layout, Geist pairing, existing color tokens, 150ms color transitions.
- Case-study structure: overview → problem → role → constraints → architecture → decisions → trade-offs → outcome.
- Honesty about unpublished material — change the label, not the policy.
- Theme bootstrap script in `_document.tsx`.
- `next/image` for the portrait.

## What not to do

- Motion-driven / parallax portfolio restyle.
- Purple/gold or pure-black palettes from generic design-system search.
- Replacing Geist with Archivo, Space Grotesk, or Fira.
- Adding GSAP for “scroll reveal”.
- Shipping create-next-app leftovers (`/api/hello`, `vercel.svg`, `window.svg`, `file.svg`).

---

### Phase 0: Launch hygiene

**Files:**
- Modify: `src/pages/index.tsx`
- Modify: `src/components/seo.tsx`
- Modify: `src/lib/site-config.ts`
- Modify: `src/components/layout/site-shell.tsx`
- Delete: `src/pages/api/hello.ts`
- Add: `public/Peter-Logo-Software-Engineer-Resume.pdf` (source file from Peter)
- Modify: `src/pages/resume.tsx`, `src/components/recruiter-actions.tsx`

**Produces:** Homepage metadata; production origin; skip link that passes contrast in both themes; no stub API; PDF as the default résumé download.

- [ ] **Step 1: Homepage Seo**

Add to `src/pages/index.tsx`:

```tsx
<Seo
  title="Peter Logo — Full-stack engineer"
  description="Full-stack engineer specializing in backend systems, AI-native applications, and cloud infrastructure."
  path="/"
/>
```

Extend `Seo` so home uses `og:type="website"` and case studies keep `article`. Add `twitter:image` using the same image as `og:image`.

- [ ] **Step 2: Origin**

Replace `SITE_URLS.origin` with the real production domain. If the domain is not known yet, keep a clearly named `PLACEHOLDER_ORIGIN` and skip indexing (`<meta name="robots" content="noindex">`) until it is real. Do not ship `https://your-domain.com` as canonical.

- [ ] **Step 3: Skip link contrast**

In `site-shell.tsx`, change the skip link from `focus:text-white` to a token pair that works in both themes (`text-white` on light brand, `dark:text-background` on dark brand). Reveal with `focus-visible:not-sr-only`, not `focus:`.

- [ ] **Step 4: Delete `/api/hello`**

Remove `src/pages/api/hello.ts`. Confirm `/api/hello` 404s.

- [ ] **Step 5: PDF résumé**

Point `SITE_URLS.resume` at a PDF. Keep the `.docx` only if Peter still wants Word as a secondary link. Primary buttons and RecruiterActions download the PDF.

- [ ] **Step 6: Verify**

View-source `/` for title + canonical. Tab to the skip link in light and dark. Confirm résumé download MIME is `application/pdf`.

---

### Phase 1: Accessibility and interaction

**Files:**
- Modify: `src/pages/work.tsx`, `src/components/home/selected-work.tsx`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/button.tsx`, `src/components/theme-toggle.tsx`
- Modify: `src/components/recruiter-actions.tsx`, `src/pages/index.tsx`
- Add: `public/favicon.ico` (or SVG favicon referenced from `_document.tsx`)

**Produces:** Sequential headings on `/work`; a mobile menu that is inert when closed and trapped when open; 44px header controls; obvious card links; featured label not color-only.

- [ ] **Step 1: Heading hierarchy on `/work`**

Either pass `showHeading` true, or add an `h2` “Case studies” under the page `h1`, and keep card titles as `h3`. Do not skip from `h1` to `h3`.

- [ ] **Step 2: Mobile menu**

When `menuOpen` is false: `hidden` or `inert` on `#mobile-nav` so links leave the accessibility tree. When true: focus the first link, trap Tab/Shift+Tab inside the panel, Escape closes and returns focus to the menu button (already started). Desktop `nav` stays `hidden md:flex`. Give the two navs distinct labels if both can exist (`Primary` vs `Mobile`).

- [ ] **Step 3: Cursor and hit area**

Add `cursor-pointer` to `buttonClasses` base. Theme toggle buttons: `min-h-11`. Header Contact: stop shrinking vertical padding below `py-2` plus `min-h-11`.

- [ ] **Step 4: Work card affordance**

On `article`, add `cursor-pointer`. Add a visible text control “Read case study” (can remain covered by the overlay for mouse, but must be in the accessibility tree as the overlay’s name). Add a non-color “Featured” label next to ModelRail’s category.

- [ ] **Step 5: New-tab announcement**

Any `target="_blank"` link gets an accessible name that includes “opens in a new tab” (visually optional ↗ is already used in one place).

- [ ] **Step 6: Favicon**

Add a real favicon. Delete unused starter SVGs in Phase 4 if not done here.

- [ ] **Step 7: Verify**

Keyboard: Tab through header, open mobile menu at 375px, Escape, Tab does not reach closed-menu links. `/work` headings in the accessibility tree are h1 → h2 → h3.

---

### Phase 2: Information architecture

**Files:**
- Modify: `src/pages/index.tsx`
- Modify: `src/components/home/selected-work.tsx`
- Modify: `src/components/home/experience-timeline.tsx`
- Modify: `src/components/home/final-cta.tsx`
- Modify: `src/pages/about.tsx`, `src/pages/contact.tsx`
- Modify: `src/lib/portfolio.ts`
- Create (if going beyond teasers): `src/lib/case-studies.ts` entries for Rightward and EchoFaith — only with verified facts from `src/lib/resume.ts`

**Produces:** Home is a pitch. `/work` is the catalog. Résumé projects and Work listings agree.

- [ ] **Step 1: Homepage selected work**

Home shows ModelRail featured + two compact cards, then a single text link “All case studies”. `/work` shows the full set. `SelectedWork` should accept `limit` or a `variant="teaser" | "index"`.

- [ ] **Step 2: Homepage experience**

Replace the full timeline clone with 2–3 latest roles and a link to `/experience`. Do not paste all four `EXPERIENCE` entries on home.

- [ ] **Step 3: CTA density**

Hero: View selected work (primary) + Download résumé (secondary). Socials can stay as three text links. Final CTA: Email (primary) + View résumé (secondary). Remove `RecruiterActions` from Final CTA and About. Keep it on Contact and Footer only.

- [ ] **Step 4: Missing products**

Add Rightward.ca and EchoFaith to `PROJECTS` using résumé bullets only. If a full case study is not ready, the `/work/[slug]` page should be a short verified summary — not a page of placeholders. Prefer a short page over a long unfinished one.

- [ ] **Step 5: Title string**

Export `SITE_TITLE = "Full-stack engineer"` from `site-config.ts`. Use it in the hero eyebrow/subtitle, footer, SEO defaults, and `RESUME_PROFILE.title`.

- [ ] **Step 6: Verify**

Home is shorter than `/work`. `/work` lists five projects (or three + an “also shipping” pair). About no longer repeats the full recruiter link row.

---

### Phase 3: Case-study credibility

**Files:**
- Modify: `src/components/work/content-placeholder.tsx`
- Modify: `src/pages/work/[slug].tsx`
- Modify: `src/lib/case-studies.ts`
- Modify: `src/components/home/selected-work.tsx`
- Modify: `src/components/work/case-study-header.tsx`
- Add: `public/work/` images only if real assets exist

**Produces:** No recruiter-visible “placeholder”. Outcomes either have numbers or they don’t appear as a metric strip. Each project has a reserved-ratio visual or none (never a broken image).

- [ ] **Step 1: Rename / hide placeholders**

Replace the “Content placeholder” eyebrow with nothing, or “Not published” in the same meta style. If `items` and `note` would be the only content in a section, omit the section from `SECTIONS` / the page instead of rendering an empty heading plus a dashed box.

- [ ] **Step 2: Metrics**

If ModelRail/Resonance have no public numbers, keep `metrics: []` (already hides `MetricProof`). Do not invent percentages. Optionally move a homepage proof point so the featured project’s story and the track-record strip do not feel disconnected (homepage 30% figures are KrownPay/Montra — that is fine if labeled as such).

- [ ] **Step 3: Visual per project**

Add an optional `image` on `Project` (`src`, `alt`, `width`/`height` or aspect). Render in the featured card and case-study header with `next/image` and `aspect-[16/10]`. If there is no real asset, skip — do not use stock photos or fake UI.

- [ ] **Step 4: Technical heading a11y**

Keep the `//` visual if desired, but pass a sentence-case `title` (“Architecture”, not “architecture”) so the accessible name is normal English.

- [ ] **Step 5: Verify**

Open `/work/modelrail`, `/work/krownpay`, `/work/resonance-holdings`. No string “placeholder”. Empty sections gone. Dark/light diagrams still readable.

---

### Phase 4: Conversion polish

**Files:**
- Modify: `src/components/seo.tsx`
- Modify: `src/components/layout/site-shell.tsx`
- Modify: `src/pages/resume.tsx`, `src/styles/globals.css`
- Modify: `src/components/work/case-study-nav.tsx`
- Delete: `public/vercel.svg`, `public/window.svg`, `public/file.svg`
- Optional: WebP/AVIF portrait next to `Peter-Logo-Photo.jpg`

**Produces:** Machine-readable person data, print-friendly résumé, current-section nav, no starter assets.

- [ ] **Step 1: JSON-LD**

Add a `Person` JSON-LD script via `Seo` or `_document`: name, job title, url, sameAs (GitHub, LinkedIn), email.

- [ ] **Step 2: Portrait + shell**

Serve a WebP (or let `next/image` transcode). Change `min-h-screen` to `min-h-dvh` on `SiteShell`.

- [ ] **Step 3: Print résumé**

`@media print`: hide header, footer, theme toggle, download buttons; black text on white; avoid splitting a job mid-section.

- [ ] **Step 4: Case-study scroll-spy**

`IntersectionObserver` on section ids. `aria-current="location"` on the active on-this-page link. No animation required. Honor reduced-motion (instant state, no scroll-smooth).

- [ ] **Step 5: Starter assets**

Delete unused `public/*.svg` from create-next-app.

- [ ] **Step 6: Verify**

Rich-results test for Person JSON-LD (when origin is real). Print preview of `/resume`. Keyboard through case-study nav; current section tracks scroll.

---

## Out of scope unless requested later

- Contact form (mailto is enough; a form needs spam and a mail provider).
- App Router migration.
- Analytics.
- Per-page OG image generation.
- Testimonials.
- GSAP / shared-element page transitions.

## Success criteria

- Sharing `/` on LinkedIn/iMessage shows Peter’s name, role, and photo — not a placeholder domain.
- Keyboard user can skip nav, operate the menu, and complete every page without a heading skip.
- A recruiter who opens Home then Work sees more depth on Work, not a duplicate.
- Case studies never say “placeholder”.
- Visual identity is still the current Swiss / slate / Geist system.
