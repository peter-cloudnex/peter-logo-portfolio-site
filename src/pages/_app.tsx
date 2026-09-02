import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteShell } from "@/components/layout/site-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  // /dev pages (design-system playgrounds, stripped from production builds) render their own isolated chrome.
  const isDevPage = pathname.startsWith("/dev");

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <ThemeProvider>
        {isDevPage ? <Component {...pageProps} /> : (
          <SiteShell>
            <Component {...pageProps} />
          </SiteShell>
        )}
      </ThemeProvider>
    </div>
  );
}
