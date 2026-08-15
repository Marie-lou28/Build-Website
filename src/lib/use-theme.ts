"use client";

import { useSyncExternalStore } from "react";

/**
 * Reads the current theme straight from the DOM, which is the source of truth
 * — the inline script in `layout.tsx` sets the `dark` class before React ever
 * runs, so there is no React state to keep in sync with it.
 *
 * Returns `null` during server render and the first hydration pass, then
 * "light" | "dark" once the DOM can be read.
 */
export type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): null {
  return null;
}

export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
