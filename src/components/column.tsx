/**
 * The shared content column. Every section on every page lines up to this
 * width, so it lives here rather than being redeclared per page.
 */
export function Column({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">{children}</div>;
}
