import Head from "next/head";
import {
  SITE_EMAIL_HREF,
  SITE_JOB_TITLE,
  SITE_ORIGIN,
  SITE_ORIGIN_CONFIGURED,
  SITE_URLS,
} from "@/lib/site-config";

type OgType = "website" | "article";

const OG_IMAGE_ALT = "Portrait of Peter Logo";
const OG_IMAGE_WIDTH = "200";
const OG_IMAGE_HEIGHT = "200";

function clipMetaDescription(text: string, max = 160) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const slice = normalized.slice(0, max - 1);
  const at = slice.lastIndexOf(" ");
  return `${slice.slice(0, at > 80 ? at : max - 1)}…`;
}

function personJsonLd() {
  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Peter Logo",
    jobTitle: SITE_JOB_TITLE,
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
  includePerson = false,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogType?: OgType;
  includePerson?: boolean;
  noIndex?: boolean;
}) {
  const indexable = SITE_ORIGIN_CONFIGURED && !noIndex;
  const url = indexable ? `${SITE_ORIGIN}${path}` : undefined;
  const image = SITE_ORIGIN_CONFIGURED ? `${SITE_ORIGIN}/Peter-Logo-Photo.jpg` : undefined;
  const metaDescription = clipMetaDescription(description);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content="Peter Logo" />
      {indexable ? null : <meta name="robots" content="noindex, nofollow" />}
      {url ? <link rel="canonical" href={url} /> : null}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Peter Logo" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      {url ? <meta property="og:url" content={url} /> : null}
      {image ? (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={OG_IMAGE_ALT} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
          <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
        </>
      ) : null}
      {ogType === "article" ? <meta property="article:author" content="Peter Logo" /> : null}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {image ? (
        <>
          <meta name="twitter:image" content={image} />
          <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
        </>
      ) : null}

      {includePerson ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      ) : null}
    </Head>
  );
}
