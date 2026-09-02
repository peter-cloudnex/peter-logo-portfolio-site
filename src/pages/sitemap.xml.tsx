import type { GetServerSideProps } from "next";
import { PROJECTS } from "@/lib/portfolio";
import { SITE_ORIGIN, SITE_ORIGIN_CONFIGURED } from "@/lib/site-config";

function sitemapXml(origin: string) {
  const paths = [
    "/",
    "/work",
    ...PROJECTS.map((project) => `/work/${project.slug}`),
    "/experience",
    "/about",
    "/resume",
    "/contact",
  ];
  const urls = paths
    .map(
      (path) =>
        `  <url>\n    <loc>${origin}${path}</loc>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!SITE_ORIGIN_CONFIGURED) {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.write(sitemapXml(SITE_ORIGIN));
  res.end();
  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
