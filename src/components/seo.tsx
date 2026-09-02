import Head from "next/head";
import { SITE_URLS } from "@/lib/site-config";

// First place metadata is set anywhere on the site — no page had a <title> before this.
// Pages Router uses next/head per-page; there is no generateMetadata here (that's App Router only).
export function Seo({ title, description, path }: { title: string; description: string; path: string }) {
  const url = `${SITE_URLS.origin}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URLS.origin}/Peter-Logo-Photo.jpg`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
