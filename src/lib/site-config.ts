// Centralized recruiter destinations — header, hero, contact, footer, and résumé share these.
export const SITE_URLS = {
  github: "https://github.com/peterlogo",
  linkedin: "https://www.linkedin.com/in/peterlogo",
  resume: "/Peter-Logo-Software-Engineer-Resume.docx",
  email: "peterlogo77@gmail.com",
  // Placeholder pending the real production domain.
  // Update before launch; canonical/OG tags (src/components/seo.tsx) build on this.
  origin: "https://your-domain.com",
} as const;

export const SITE_EMAIL_HREF = `mailto:${SITE_URLS.email}` as const;
