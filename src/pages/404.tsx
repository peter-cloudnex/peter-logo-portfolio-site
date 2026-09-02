import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClasses } from "@/components/button";
import { Seo } from "@/components/seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found — Peter Logo"
        description="That page is not on this site. Go to the homepage or browse selected work."
        path="/404"
        noIndex
      />
      <Section>
        <Container width="reading">
          <h1 className="text-h1 font-semibold tracking-tight text-foreground">Page not found</h1>
          <p className="mt-4 text-body-lg text-foreground-muted">That URL is not part of this site.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/" className={buttonClasses("primary")}>
              Home
            </Link>
            <Link href="/work" className={buttonClasses("secondary")}>
              Selected work
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
