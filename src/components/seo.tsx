import Head from "next/head";
import { SITE_ORIGIN, SITE_ORIGIN_CONFIGURED } from "@/lib/site-config";

type OgType = "website" | "article";

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
    </Head>
  );
}
