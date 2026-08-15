import Link from "next/link";
import { ExternalIcon } from "@/components/icons";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-ink-faint">{project.year}</span>
      </div>

      <p className="mt-2 text-sm font-medium text-ink-muted">{project.summary}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{project.description}</p>

      <div className="mt-5 rounded-xl bg-accent-soft px-4 py-3">
        <p className="eyebrow">Outcome</p>
        <p className="mt-1 text-sm leading-relaxed text-ink">{project.outcome}</p>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-ink-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      {project.links && project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4">
          {project.links.map((link) => {
            const isExternal = link.href.startsWith("http");
            const className =
              "inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline";

            return isExternal ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {link.label}
                <ExternalIcon />
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </article>
  );
}
