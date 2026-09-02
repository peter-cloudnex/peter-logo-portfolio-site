// Centralized so header/footer and other pages can reuse the same URLs later.
export const SITE_URLS = {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  resume: "/Peter-Logo-Software-Engineer-Resume.docx",
  // Placeholder pending the real production domain — same pattern as github/linkedin above.
  // Update before launch; canonical/OG tags (src/components/seo.tsx) build on this.
  origin: "https://your-domain.com",
} as const;
