// Centralized recruiter destinations — header, hero, contact, footer, and résumé share these.

// Set NEXT_PUBLIC_SITE_ORIGIN (https://your.domain) before launch.
// Until then canonical/OG URLs are omitted and pages send noindex.
const PLACEHOLDER_ORIGIN = "https://your-domain.com";

function resolveSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_ORIGIN?.trim().replace(/\/$/, "") ?? "";
  if (!raw || raw === PLACEHOLDER_ORIGIN) return "";
  if (!/^https?:\/\//i.test(raw)) return "";
  return raw;
}

export const SITE_ORIGIN = resolveSiteOrigin();
export const SITE_ORIGIN_CONFIGURED = SITE_ORIGIN !== "";

export const SITE_URLS = {
  github: "https://github.com/peterlogo",
  linkedin: "https://www.linkedin.com/in/peterlogo",
  resume: "/Peter-Logo-Software-Engineer-Resume.pdf",
  resumeDocx: "/Peter-Logo-Software-Engineer-Resume.docx",
  email: "peterlogo77@gmail.com",
  origin: SITE_ORIGIN,
} as const;

export const SITE_EMAIL_HREF = `mailto:${SITE_URLS.email}` as const;
