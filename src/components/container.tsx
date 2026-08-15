import { clsx } from "@/lib/clsx";

/** Standard page gutter. `narrow` is for long-form reading (essay, CV). */
export function Container({
  children,
  narrow = false,
  className,
}: {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-6 sm:px-8",
        narrow ? "max-w-2xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
