import { ThemeToggle } from "@/components/theme-toggle";
import { analogy, facts, intro, likes, outsideWork } from "@/lib/content";
import { site } from "@/lib/site";

/** Shared content column. Everything on the page lines up to this width. */
function Column({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">{children}</div>;
}

function Hero() {
  return (
    <header className="flex min-h-svh flex-col justify-center py-24">
      <Column>
        <h1 className="text-[clamp(2.25rem,8vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty sm:text-xl">
          {intro.tagline}
        </p>
        <a
          href="#approach"
          className="mt-12 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          How I work
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </a>
      </Column>
    </header>
  );
}

/** The centrepiece: her analogy, given the full width of the page. */
function Approach() {
  return (
    <section id="approach" className="scroll-mt-8 border-t border-border py-20 sm:py-28">
      <Column>
        <p className="eyebrow">How I work</p>
        <p className="mt-5 text-[clamp(1.6rem,4.6vw,2.5rem)] font-medium leading-[1.2] tracking-tight text-balance">
          {analogy.headline}
        </p>

        <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {analogy.steps.map((step, i) => (
            <li key={step.verb}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">{step.verb}</h2>
              {/* flex-wrap rather than a fixed row: the longest pairing wraps on
                  a narrow screen instead of pushing the page sideways. */}
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                <span className="text-ink-faint">{step.from}</span>
                <span aria-hidden="true" className="text-ink-faint">
                  &rarr;
                </span>
                <span className="font-medium text-accent">{step.to}</span>
              </p>
              <p className="mt-3 leading-relaxed text-ink-muted text-pretty">{step.body}</p>
            </li>
          ))}
        </ol>
      </Column>
    </section>
  );
}

function Likes() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Column>
        <p className="eyebrow">{likes.heading}</p>
        <ul className="mt-8 space-y-4">
          {likes.items.map((item) => (
            <li key={item} className="flex gap-4 text-lg leading-relaxed text-pretty">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <blockquote className="mt-14 border-l-2 border-accent bg-accent-soft/60 py-6 pl-6 pr-5 sm:pl-8">
          <p className="text-lg leading-relaxed text-pretty sm:text-xl">{likes.pullQuote}</p>
        </blockquote>
      </Column>
    </section>
  );
}

function Facts() {
  return (
    <section className="border-t border-border py-12">
      <Column>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-2 font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Column>
    </section>
  );
}

function OutsideWork() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Column>
        <p className="eyebrow">{outsideWork.heading}</p>
        <div className="mt-8 space-y-6">
          {outsideWork.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-ink-muted text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </Column>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* Floats above the content rather than sitting in a header bar, since
          there is no nav to put it in yet. */}
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <Hero />
      <Approach />
      <Likes />
      <Facts />
      <OutsideWork />

      <footer className="border-t border-border py-10">
        <Column>
          <p className="text-sm text-ink-faint">
            {site.name} &middot; {new Date().getFullYear()}
          </p>
        </Column>
      </footer>
    </>
  );
}
