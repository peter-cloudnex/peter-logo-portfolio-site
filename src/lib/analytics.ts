import { init, track } from "@plausible-analytics/tracker";

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() ?? "";
const TRACK_LOCALHOST = process.env.NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST === "true";

let initialized = false;

function isEnabled() {
  if (!DOMAIN) return false;
  if (process.env.NODE_ENV !== "production" && !TRACK_LOCALHOST) return false;
  return true;
}

function initAnalytics() {
  if (initialized || typeof window === "undefined" || !isEnabled()) return;
  initialized = true;
  try {
    init({
      domain: DOMAIN,
      autoCapturePageviews: true,
      outboundLinks: true,
      fileDownloads: true,
      captureOnLocalhost: TRACK_LOCALHOST,
    });
  } catch {
    // Init errors (missing APIs, a second call) must never break the site.
  }
}

function trackCustomEvent(name: string) {
  try {
    if (typeof window === "undefined" || !initialized) return;
    track(name, {});
  } catch {
    // Tracking is observational only — never block recruiter actions.
  }
}

export const analytics = {
  init: initAnalytics,
  trackSelectedWork() {
    trackCustomEvent("Selected Work");
  },
  trackEmailClick() {
    trackCustomEvent("Email Click");
  },
};
