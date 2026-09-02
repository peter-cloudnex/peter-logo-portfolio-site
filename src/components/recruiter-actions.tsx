import Link from "next/link";
import { SITE_EMAIL_HREF, SITE_URLS } from "@/lib/site-config";

type RecruiterActionsProps = {
  /** When true, include the internal /resume page alongside the download. */
  includeResumePage?: boolean;
  className?: string;
};

const linkClass =
  "font-medium text-foreground-muted no-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function Separator() {
  return (
    <span aria-hidden className="text-border-strong">
      /
    </span>
  );
}

// Compact text actions for recruiters — email, profiles, résumé — without stacking primary buttons.
export function RecruiterActions({ includeResumePage = false, className = "" }: RecruiterActionsProps) {
  return (
    <nav aria-label="Recruiter actions" className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-meta ${className}`}>
      <a href={SITE_EMAIL_HREF} className={linkClass}>
        Email
      </a>
      <Separator />
      <a href={SITE_URLS.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
        LinkedIn
      </a>
      <Separator />
      <a href={SITE_URLS.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
        GitHub
      </a>
      <Separator />
      <a href={SITE_URLS.resume} download className={linkClass}>
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
