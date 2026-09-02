import { Html, Head, Main, NextScript } from "next/document";
import { THEME_STORAGE_KEY } from "@/lib/theme";

// Runs synchronously before paint so the resolved theme is on <html> before
// React hydrates — this is what prevents a flash of the wrong theme.
const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var m=(s==="light"||s==="dark")?s:"system";var d=m==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):m;var e=document.documentElement;e.setAttribute("data-theme",d);e.setAttribute("data-theme-preference",m);}catch(t){}})();`;

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
