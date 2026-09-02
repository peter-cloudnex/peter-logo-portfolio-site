import { Html, Head, Main, NextScript } from "next/document";
import { DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY } from "@/lib/theme";

// Runs synchronously before paint so the resolved theme is on <html> before
// React hydrates — this is what prevents a flash of the wrong theme.
const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var m=(s==="light"||s==="dark"||s==="system")?s:"${DEFAULT_THEME_PREFERENCE}";var d=m==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):m;var e=document.documentElement;e.setAttribute("data-theme",d);e.setAttribute("data-theme-preference",m);}catch(t){}})();`;

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning data-theme="light" data-theme-preference="light">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
