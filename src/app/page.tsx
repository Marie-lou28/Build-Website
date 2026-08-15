import Link from "next/link";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ArrowRightIcon, DownloadIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/lib/projects";
import { site } from "@/lib/site";

const capabilities = [
  {
    title: "Scoping",
    body: "Working out which decision an agent should own, and — more often — which one it should hand back. The spec is the deliverable that matters most.",
  },
  {
    title: "Building",
    body: "Pipelines and agents in Python and TypeScript, with tool-use, structured output and provenance built in rather than bolted on.",
  },
  {
    title: "Proving",
    body: "Evaluation harnesses, abstain rates, override rates. If you cannot show the automation is working, you have not finished it.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Container className="pt-20 pb-16 sm:pt-32 sm:pb-24">
        {site.availableForWork && (
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-ink-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.availabilityNote}
          </p>
        )}

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl">
          {site.name}
        </h1>
        <p className="mt-4 font-mono text-sm tracking-wide text-accent sm:text-base">
          {site.role}
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/projects">
            See the work
            <ArrowRightIcon />
          </Button>
          <Button href={site.cvPdf} variant="secondary" download>
            <DownloadIcon />
            Download CV
          </Button>
        </div>
      </Container>

      {/* What I do */}
      <Container className="border-t border-border py-16 sm:py-20">
        <p className="eyebrow">What I do</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.title}>
              <h2 className="text-base font-semibold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Featured work */}
      <Container className="border-t border-border py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Things I have shipped
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-accent hover:underline sm:inline-flex"
          >
            All projects
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>

      {/* Pull to the essay — this is the piece worth reading. */}
      <Container className="border-t border-border py-16 sm:py-20">
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <p className="eyebrow">Writing</p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-balance text-ink sm:text-3xl">
            How I scope agent-based automation
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
            Most failed automation projects were mis-scoped before anyone wrote a line of
            code. This is the method I use to decide what a system should own, where a
            human stays in the loop, and what evidence justifies widening the scope.
          </p>
          <div className="mt-8">
            <Button href="/writing" variant="secondary">
              Read the piece
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
