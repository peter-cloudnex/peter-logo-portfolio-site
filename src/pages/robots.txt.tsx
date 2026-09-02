import type { GetServerSideProps } from "next";
import { SITE_ORIGIN, SITE_ORIGIN_CONFIGURED } from "@/lib/site-config";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = SITE_ORIGIN_CONFIGURED
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}
