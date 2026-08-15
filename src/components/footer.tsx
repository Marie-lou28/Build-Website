import Link from "next/link";
import { Container } from "@/components/container";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { navItems, site } from "@/lib/site";

/** Social links, derived from site config so removing one removes it here. */
export const socialLinks = [
  site.links.linkedin && {
    label: "LinkedIn",
    href: site.links.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  site.links.github && {
    label: "GitHub",
    href: site.links.github,
    Icon: GitHubIcon,
    external: true,
  },
  site.links.email && {
    label: "Email",
    href: `mailto:${site.links.email}`,
    Icon: MailIcon,
    external: false,
  },
].filter(Boolean) as Array<{
  label: string;
  href: string;
  Icon: (props: { className?: string }) => React.ReactElement;
  external: boolean;
}>;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{site.name}</p>
          <p className="mt-1 max-w-xs text-sm text-ink-muted">{site.role}</p>
          <div className="mt-4 flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="grid size-9 place-items-center rounded-full border border-border text-ink-muted transition-colors hover:border-border-strong hover:text-accent"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      <Container className="border-t border-border py-6">
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
