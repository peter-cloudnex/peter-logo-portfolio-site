import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClasses } from "@/components/button";
import { RecruiterActions } from "@/components/recruiter-actions";
import { Seo } from "@/components/seo";
import { SITE_EMAIL_HREF, SITE_URLS } from "@/lib/site-config";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact — Peter Logo"
        description="Reach Peter Logo by email, LinkedIn, or GitHub. Download the résumé or review selected work."
        path="/contact"
      />
      <Section>
        <Container width="reading">
          <h1 className="text-h1 font-semibold tracking-tight text-foreground">Contact</h1>
          <p className="mt-4 text-body-lg text-foreground-muted">
            Open to software engineering roles — especially backend-leaning full-stack work on AI-native
            products, APIs, and cloud systems.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <a href={SITE_EMAIL_HREF} className={buttonClasses("primary", "self-start")}>
              Email {SITE_URLS.email}
            </a>
            <RecruiterActions includeResumePage className="mt-2" />
          </div>

          <p className="mt-10 max-w-prose text-body text-foreground-muted">
            Prefer context first? Start with{" "}
            <Link href="/work" className="font-medium text-foreground no-underline transition-colors duration-150 ease-out hover:text-brand">
              selected work
            </Link>{" "}
            or the{" "}
            <Link href="/resume" className="font-medium text-foreground no-underline transition-colors duration-150 ease-out hover:text-brand">
              résumé
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
