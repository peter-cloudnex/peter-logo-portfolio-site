import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonClasses } from "@/components/button";

const NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
] as const;

function NavLink({ href, label, className = "", onClick }: { href: string; label: string; className?: string; onClick?: () => void }) {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={`no-underline font-medium text-body transition-colors hover:text-foreground ${
        isActive ? "text-foreground" : "text-foreground-muted"
      } ${className}`}
    >
      {label}
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const controller = new AbortController();
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeydown, { signal: controller.signal });
    document.addEventListener("pointerdown", onPointerDown, { signal: controller.signal });
    return () => controller.abort();
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container width="wide" className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="no-underline text-body-lg font-semibold tracking-tight text-foreground">
          Peter <span className="text-brand">Logo</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link href="/contact" className={buttonClasses("primary", "text-meta px-4 py-2")}>
            Contact
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <MenuIcon open={menuOpen} />
        </button>
      </Container>

      <div id="mobile-nav" ref={panelRef} hidden={!menuOpen} className="border-t border-border bg-background md:hidden">
        <Container width="wide" className="flex flex-col gap-1 py-4">
          <nav aria-label="Primary" className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} {...item} className="block py-3 text-body-lg" onClick={() => setMenuOpen(false)} />
            ))}
          </nav>
          <div className="mt-2 flex items-center justify-between gap-4 border-t border-border pt-4">
            <ThemeToggle />
            <Link href="/contact" onClick={() => setMenuOpen(false)} className={buttonClasses("primary", "text-meta px-4 py-2")}>
              Contact
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
