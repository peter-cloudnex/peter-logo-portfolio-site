import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClasses } from "@/components/button";
import { RecruiterActions } from "@/components/recruiter-actions";
import { SITE_EMAIL_HREF } from "@/lib/site-config";

export function FinalCta() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <div className="flex max-w-2xl flex-col gap-6">
          <div>
            <h2 className="text-h2 font-semibold tracking-tight text-foreground">
              Looking for a full-stack engineer?
            </h2>
            <p className="mt-3 text-body-lg text-foreground-muted">
              I am open to software engineering opportunities focused on backend systems, AI-native
              applications, and cloud infrastructure. If that matches a role you are hiring for, get
              in touch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href={SITE_EMAIL_HREF} className={buttonClasses("primary")}>
              Email me
            </a>
            <Link href="/resume" className={buttonClasses("secondary")}>
              View résumé
            </Link>
          </div>

          <RecruiterActions />
        </div>
      </Container>
    </Section>
  );
}
