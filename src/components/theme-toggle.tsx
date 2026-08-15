"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/lib/use-theme";

/**
 * Light/dark toggle.
 *
 * The *initial* theme is applied before paint by the inline script in
 * `layout.tsx`, so there is never a flash of the wrong theme. This component
 * only handles user-initiated changes; it reads the current value out of the
 * DOM rather than keeping a second copy of it in React state.
 */
export function ThemeToggle() {
  const theme = useTheme();

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* Private browsing / storage disabled — the toggle still works for this page view. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"
      }
      className="grid size-9 place-items-center rounded-full border border-border bg-surface text-ink-muted transition-colors hover:border-border-strong hover:text-ink"
    >
      {/* Both icons render; CSS picks the right one so the button shows the
          theme you would switch *to*, even before React hydrates. */}
      <MoonIcon className="size-4 dark:hidden" />
      <SunIcon className="hidden size-4 dark:block" />
    </button>
  );
}
