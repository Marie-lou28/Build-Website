import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { DownloadIcon } from "@/components/icons";
import { education, experience, languages, skillGroups, summary, type Role } from "@/lib/cv";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae for ${site.name} — experience, education and skills, with a downloadable PDF.`,
};

function RoleList({ roles }: { roles: Role[] }) {
  return (
    <ol className="flex flex-col gap-8">
      {roles.map((role) => (
        <li
          key={`${role.company}-${role.title}-${role.period}`}
          className="grid gap-x-8 gap-y-2 sm:grid-cols-[9rem_1fr]"
        >
          <div className="font-mono text-xs text-ink-faint sm:pt-1">
            {role.period}
            {role.location && <span className="block sm:mt-1">{role.location}</span>}
          </div>
          <div>
            <h3 className="font-semibold text-ink">{role.title}</h3>
            <p className="text-sm text-accent">{role.company}</p>
            {role.points.length > 0 && (
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4 text-sm leading-relaxed text-ink-muted">
                {role.points.map((point) => (
                  <li key={point} className="marker:text-ink-faint">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-10 break-inside-avoid">
      <h2 className="eyebrow mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default function CvPage() {
  return (
    <Container className="pt-16 pb-8 sm:pt-24">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-6 pb-10">
        <div className="max-w-xl">
          <p className="eyebrow">Curriculum vitae</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {site.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-accent">{site.role}</p>
          <p className="mt-5 leading-relaxed text-ink-muted">{summary}</p>

          {/* Contact line — matters most in the printed version. */}
          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
            <a href={`mailto:${site.links.email}`} className="hover:text-accent">
              {site.links.email}
            </a>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <span>{site.location}</span>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <a href={site.links.linkedin} className="hover:text-accent">
              {site.links.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </p>
        </div>

        <div className="print:hidden">
          <Button href={site.cvPdf} download>
            <DownloadIcon />
            Download PDF
          </Button>
        </div>
      </div>

      <Section title="Experience">
        <RoleList roles={experience} />
      </Section>

      <Section title="Education">
        <RoleList roles={education} />
      </Section>

      <Section title="Skills">
        <div className="grid gap-8 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-semibold text-ink">{group.label}</h3>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Languages">
        <ul className="flex flex-wrap gap-x-10 gap-y-2 text-sm">
          {languages.map((language) => (
            <li key={language.name}>
              <span className="text-ink">{language.name}</span>{" "}
              <span className="text-ink-muted">— {language.level}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
