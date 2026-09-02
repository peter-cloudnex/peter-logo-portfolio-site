// Thin Plausible wrappers — safe no-ops when the script is absent (dev, blockers, offline).
// Do not preventDefault or replace navigation; tracking only observes clicks.

export type AnalyticsLocation =
  | "hero"
  | "footer"
  | "contact"
  | "resume"
  | "final_cta"
  | "header";

type EventProps = {
  location?: AnalyticsLocation | string;
  page?: string;
  format?: "pdf" | "docx";
  source?: string;
};

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

function cleanProps(props?: EventProps): Record<string, string> | undefined {
  if (!props) return undefined;
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === "string" && value.length > 0) out[key] = value;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

/** Fire a custom event. Never throws; never blocks the caller. */
export function trackEvent(name: string, props?: EventProps) {
  try {
    if (typeof window === "undefined") return;
    const plausible = window.plausible;
    if (typeof plausible !== "function") return;
    const cleaned = cleanProps(props);
    if (cleaned) plausible(name, { props: cleaned });
    else plausible(name);
  } catch {
    // Analytics must never interfere with recruiter actions.
  }
}

export function trackResumeDownload(props: {
  location: AnalyticsLocation | string;
  format?: "pdf" | "docx";
  page?: string;
}) {
  trackEvent("resume_download", props);
}

export function trackGitHubClick(props: { location: AnalyticsLocation | string; page?: string }) {
  trackEvent("github_click", props);
}

export function trackLinkedInClick(props: { location: AnalyticsLocation | string; page?: string }) {
  trackEvent("linkedin_click", props);
}

export function trackEmailClick(props: { location: AnalyticsLocation | string; page?: string }) {
  trackEvent("email_click", props);
}

export function trackSelectedWorkClick(props?: { page?: string }) {
  trackEvent("selected_work_click", { location: "hero", ...props });
}
