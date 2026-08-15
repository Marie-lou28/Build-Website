import type { Metadata } from "next";
import { Container } from "@/components/container";
import { socialLinks } from "@/components/footer";
import { ExternalIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email, LinkedIn and GitHub.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lead="Email is the most reliable way to reach me and I answer everything that is not obviously automated. If you are writing about a role, a line about what the work actually involves goes a long way."
      />

      <Container className="pb-16">
        <ul className="grid gap-4 sm:grid-cols-3">
          {socialLinks.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    {label}
                    {external && <ExternalIcon className="size-3 text-ink-faint" />}
                  </span>
                  <span className="mt-1 block text-sm break-words text-ink-muted">
                    {href.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "")}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <dl className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
          <div>
            <dt className="eyebrow">Based in</dt>
            <dd className="mt-2 text-ink">{site.location}</dd>
          </div>
          <div>
            <dt className="eyebrow">Availability</dt>
            <dd className="mt-2 text-ink">
              {site.availableForWork
                ? site.availabilityNote
                : "Not currently taking on new work."}
            </dd>
          </div>
        </dl>
      </Container>
    </>
  );
}
