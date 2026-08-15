"use client";

import { useTheme } from "@/lib/use-theme";

/**
 * Light/dark toggle.
 *
 * The *initial* theme is applied before paint by the inline script in
 * `layout.tsx`, so there is never a flash of the wrong theme. This component
 * only handles user-initiated changes; it reads the current value out of the
 * DOM rather than keeping a second copy of it in React state.
 *
 * `useTheme` returns null on the server and during the first hydration pass,
 * which is why the label falls back to a neutral string until then.
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
        theme === null
          ? "Switch theme"
          : `Switch to ${theme === "dark" ? "light" : "dark"} theme`
      }
      className="rounded-full border border-border bg-surface p-2.5 text-ink-muted transition-colors hover:text-ink"
    >
      {/* Both icons are rendered and swapped with CSS, so the button is correct
          on the very first paint — before React has hydrated and can know the
          theme. Toggling the class on <html> flips them instantly. */}
      <svg
        className="size-4 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg
        className="hidden size-4 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4 17 7M7 17l-1.6 1.6M18.6 18.6 17 17M7 7 5.4 5.4" />
      </svg>
    </button>
  );
}
