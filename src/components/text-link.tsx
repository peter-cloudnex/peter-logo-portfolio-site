import Link from "next/link";
import type { ReactNode } from "react";

const CLASSES =
  "group inline-flex items-center gap-1 font-medium text-foreground no-underline underline-offset-4 hover:text-brand hover:underline";

function Arrow() {
  return (
    <span aria-hidden className="transition-transform motion-reduce:transition-none group-hover:translate-x-0.5">
      →
    </span>
  );
}

// For internal routes, mailto:/tel:, and external URLs alike — the caller decides target/rel if it ever needs them.
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={CLASSES}>
        {children}
        <Arrow />
      </Link>
    );
  }
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  return (
    <a
      href={href}
      className={CLASSES}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Arrow />
    </a>
  );
}
