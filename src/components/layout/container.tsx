import type { ReactNode } from "react";

// Reuses Tailwind's built-in max-w-* scale instead of inventing parallel width tokens.
export const CONTAINER_WIDTHS = {
  wide: "max-w-7xl",
  default: "max-w-6xl",
  "case-study": "max-w-4xl",
  reading: "max-w-prose",
} as const;

export type ContainerWidth = keyof typeof CONTAINER_WIDTHS;

export function Container({
  width = "default",
  className = "",
  children,
}: {
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${CONTAINER_WIDTHS[width]} ${className}`}>{children}</div>;
}
