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

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, label, className = "", onClick }: { href: string; label: string; className?: string; onClick?: () => void }) {
  const { pathname } = useRouter();
  const isActive = isNavActive(pathname, href);
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={`no-underline font-medium text-body transition-colors duration-150 ease-out hover:text-foreground ${
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
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstInPanel = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstInPanel?.focus();

    const controller = new AbortController();
    const getCycle = () => {
      const inPanel = panelRef.current
        ? Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        : [];
      const toggle = menuButtonRef.current;
      return toggle ? [toggle, ...inPanel] : inPanel;
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const cycle = getCycle();
      if (cycle.length === 0) return;
      const first = cycle[0];
      const last = cycle[cycle.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeydown, { signal: controller.signal });
    document.addEventListener("pointerdown", onPointerDown, { signal: controller.signal });
    return () => {
      controller.abort();
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container width="wide" className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="no-underline text-body-lg font-semibold tracking-tight text-foreground transition-colors duration-150 ease-out"
        >
          Peter <span className="text-brand">Logo</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link href="/contact" className={buttonClasses("primary", "min-h-11 text-meta")}>
            Contact
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors duration-150 ease-out hover:bg-surface-muted md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <MenuIcon open={menuOpen} />
        </button>
      </Container>

      <div
        id="mobile-nav"
        ref={panelRef}
        inert={!menuOpen}
        className={`grid border-border bg-background transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none md:hidden ${
          menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <Container width="wide" className="flex flex-col gap-1 py-4">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <NavLink {...item} className="block py-3 text-body-lg" onClick={() => setMenuOpen(false)} />
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
              <ThemeToggle />
              <Link href="/contact" onClick={() => setMenuOpen(false)} className={buttonClasses("primary", "min-h-11 text-meta")}>
                Contact
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
