"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { clsx } from "@/lib/clsx";
import { site } from "@/lib/site";

/** Add a route here and it appears in the nav. Home is handled separately. */
const links = [{ href: "/scoping", label: "Scoping" }] as const;

/**
 * Sticky top bar. Client-side only because it reads the current path to mark
 * the active link; the theme toggle it contains is a client component anyway.
 *
 * The bar is translucent rather than solid so the hero, which is sized to the
 * full viewport, still reads as full-height behind it.
 */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[var(--nav-h)] w-full max-w-3xl items-center gap-6 px-6 sm:px-8"
      >
        <Link
          href="/"
          className={clsx(
            "text-sm font-medium transition-colors",
            pathname === "/" ? "text-ink" : "text-ink-muted hover:text-ink",
          )}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          {site.name}
        </Link>

        <ul className="flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "text-sm transition-colors",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ms-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
