import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = {
  spacing?: "default" | "compact";
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function Section({ spacing = "default", className = "", children, ...rest }: SectionProps) {
  const spacingClasses = spacing === "compact" ? "py-8 sm:py-10" : "py-16 sm:py-20 lg:py-24";
  return (
    <section className={`${spacingClasses} ${className}`} {...rest}>
      {children}
    </section>
  );
}
