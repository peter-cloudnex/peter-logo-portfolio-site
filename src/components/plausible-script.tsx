import Script from "next/script";

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() ?? "";
const SCRIPT_SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC?.trim() || "https://plausible.io/js/script.js";
const TRACK_LOCALHOST = process.env.NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST === "true";

export function isPlausibleEnabled() {
  if (!DOMAIN) return false;
  if (process.env.NODE_ENV !== "production" && !TRACK_LOCALHOST) return false;
  return true;
}

// Queues events fired before the deferred script finishes loading.
const PLAUSIBLE_QUEUE = `window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`;

/**
 * Global Plausible loader for the Pages Router.
 * Loads after hydration (`afterInteractive`) so it does not block first paint.
 * Skips entirely when domain is unset or when running locally without TRACK_LOCALHOST.
 */
export function PlausibleScript() {
  if (!isPlausibleEnabled()) return null;

  return (
    <>
      <Script id="plausible-queue" strategy="afterInteractive">
        {PLAUSIBLE_QUEUE}
      </Script>
      <Script
        defer
        data-domain={DOMAIN}
        src={SCRIPT_SRC}
        strategy="afterInteractive"
      />
    </>
  );
}
