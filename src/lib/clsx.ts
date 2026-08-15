/** Tiny conditional-className helper — avoids pulling in a dependency. */
export function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
