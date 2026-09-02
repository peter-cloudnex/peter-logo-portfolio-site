import Link from "next/link";
import { useRouter } from "next/router";
import { NewTabHint } from "@/components/text-link";
import {
  trackEmailClick,
  trackGitHubClick,
  trackLinkedInClick,
  trackResumeDownload,
  type AnalyticsLocation,
} from "@/lib/analytics";
import { SITE_EMAIL_HREF, SITE_URLS } from "@/lib/site-config";

type RecruiterActionsProps = {
  /** When true, include the internal /resume page alongside the download. */
  includeResumePage?: boolean;
  /** Analytics location prop — where this action cluster sits on the page. */
  location?: AnalyticsLocation;
  className?: string;
};

const linkClass =
  "inline-flex min-h-11 items-center font-medium text-foreground-muted no-underline transition-colors duration-150 ease-out hover:text-foreground";

function Separator() {
  return (
    <span aria-hidden className="text-border-strong">
      /
    </span>
  );
}

// Compact text actions for recruiters — email, profiles, résumé — without stacking primary buttons.
export function RecruiterActions({
  includeResumePage = false,
  location = "footer",
  className = "",
}: RecruiterActionsProps) {
  const { pathname } = useRouter();

  return (
    <nav aria-label="Recruiter actions" className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-meta ${className}`}>
      <a
        href={SITE_EMAIL_HREF}
        className={linkClass}
        onClick={() => trackEmailClick({ location, page: pathname })}
      >
        Email
      </a>
      <Separator />
      <a
        href={SITE_URLS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={() => trackLinkedInClick({ location, page: pathname })}
      >
        LinkedIn
        <NewTabHint />
      </a>
      <Separator />
      <a
        href={SITE_URLS.github}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={() => trackGitHubClick({ location, page: pathname })}
      >
        GitHub
        <NewTabHint />
      </a>
      <Separator />
      <a
        href={SITE_URLS.resume}
        download
        className={linkClass}
        onClick={() => trackResumeDownload({ location, format: "pdf", page: pathname })}
      >
        Download résumé
      </a>
      {includeResumePage ? (
        <>
          <Separator />
          <Link href="/resume" className={linkClass}>
            View résumé
          </Link>
        </>
      ) : null}
    </nav>
  );
}
