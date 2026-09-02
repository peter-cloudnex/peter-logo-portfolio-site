import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import type { ReactNode } from "react";
import { THEME_STORAGE_KEY, type ThemePreference, type ResolvedTheme } from "@/lib/theme";

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const ThemeContext = createContext<{
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  // Runs before paint so the toggle's own active state never flashes,
  // reading the attributes the pre-hydration script in _document.tsx already set.
  useLayoutEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme-preference") as ThemePreference | null;
    const initial = attr ?? "system";
    // One-time sync from the DOM attribute the pre-hydration script in _document.tsx
    // already set — can't be read during SSR, and this is what avoids a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreferenceState(initial);
    setResolvedTheme(resolveTheme(initial));
  }, []);

  useEffect(() => {
    if (preference !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolvedTheme(resolveTheme("system"));
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [preference]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.setAttribute("data-theme-preference", preference);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      // localStorage can throw in private-browsing/disabled-storage contexts.
    }
  }, [preference, resolvedTheme]);

  const setPreference = (next: ThemePreference) => {
    setPreferenceState(next);
    setResolvedTheme(resolveTheme(next));
  };

  return (
    <ThemeContext.Provider value={{ preference, resolvedTheme, setPreference }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
