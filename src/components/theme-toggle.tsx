import { useTheme } from "@/components/theme-provider";
import type { ThemePreference } from "@/lib/theme";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  return (
    <div className="inline-flex rounded-md border border-border p-0.5" role="group" aria-label="Theme">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={preference === option.value}
          onClick={() => setPreference(option.value)}
          className={`cursor-pointer rounded-sm px-3 min-h-11 text-meta font-medium transition-colors duration-150 ease-out ${
            preference === option.value ? "bg-brand-soft text-brand" : "text-foreground-muted hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
