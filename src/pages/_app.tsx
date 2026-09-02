import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteShell } from "@/components/layout/site-shell";
import { analytics } from "@/lib/analytics";

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
  useEffect(() => {
    analytics.init();
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <ThemeProvider>
        <SiteShell>
          <Component {...pageProps} />
        </SiteShell>
      </ThemeProvider>
    </div>
  );
}
