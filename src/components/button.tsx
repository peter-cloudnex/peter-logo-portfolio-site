import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-brand text-white hover:bg-brand-hover dark:text-slate-950",
  secondary: "border border-border text-foreground hover:bg-surface-muted hover:border-border-strong",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-body font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
