import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

const BASE = "inline-flex items-center justify-center rounded-md px-4 py-2 text-body font-medium no-underline transition-colors";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover dark:text-slate-950",
  secondary: "border border-border text-foreground hover:bg-surface-muted hover:border-border-strong",
};

// Shared with Link-as-button usages (e.g. the header's Contact CTA) so both stay visually identical.
export function buttonClasses(variant: ButtonVariant = "primary", className = "") {
  return `${BASE} ${VARIANTS[variant]} ${className}`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}
