import Link from "next/link";
import { clsx } from "@/lib/clsx";

const variants = {
  primary:
    "bg-accent text-on-accent border border-transparent hover:bg-accent-hover",
  secondary:
    "bg-surface text-ink border border-border hover:border-border-strong",
} as const;

const shared =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  external?: boolean;
  download?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  className,
}: Props) {
  const classes = clsx(shared, variants[variant], className);

  // Downloads and off-site links use a plain anchor; internal navigation uses
  // next/link so it stays a client-side transition.
  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(download ? { download: "" } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
