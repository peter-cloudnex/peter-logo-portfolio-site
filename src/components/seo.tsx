import Head from "next/head";
import {
  SITE_EMAIL_HREF,
  SITE_ORIGIN,
  SITE_ORIGIN_CONFIGURED,
  SITE_TITLE,
  SITE_URLS,
} from "@/lib/site-config";

type OgType = "website" | "article";

function personJsonLd() {
  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Peter Logo",
    jobTitle: SITE_TITLE,
    email: SITE_EMAIL_HREF,
    sameAs: [SITE_URLS.github, SITE_URLS.linkedin],
  };
  if (SITE_ORIGIN_CONFIGURED) {
    person.url = SITE_ORIGIN;
    person.image = `${SITE_ORIGIN}/Peter-Logo-Photo.jpg`;
  }
  return JSON.stringify(person).replace(/</g, "\\u003c");
}

export function Seo({
  title,
  description,
  path,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogType?: OgType;
}) {
  const url = SITE_ORIGIN_CONFIGURED ? `${SITE_ORIGIN}${path}` : undefined;
  const image = SITE_ORIGIN_CONFIGURED ? `${SITE_ORIGIN}/Peter-Logo-Photo.jpg` : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {SITE_ORIGIN_CONFIGURED ? null : <meta name="robots" content="noindex, nofollow" />}
      {url ? <link rel="canonical" href={url} /> : null}

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
    </Head>
  );
}
