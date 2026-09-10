import type { Metadata } from "next";
import Link from "next/link";
import { Column } from "@/components/column";
import { brief, closing, page, stages } from "@/lib/scoping";

export const metadata: Metadata = {
  title: `${page.title} — Marie-Louise Müller`,
  description: page.lede,
};

/* The three stages have genuinely different shapes — a set of questions, a
   workflow, a scope — so they are destructured and rendered explicitly rather
   than mapped over. Keeps the tuple types intact and each section honest to
   its own content. */
const [ask, map, treat] = stages;

/** Matches the numbered step treatment on the home page. */
function StageHeading({
  index,
  verb,
  lede,
}: {
  index: number;
  verb: string;
  lede: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-ink-faint">
          {String(index).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{verb}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty">
        {lede}
      </p>
    </>
  );
}

/** Shown until the copy is Marie-Louise's own. One flag in `scoping.ts`. */
function DraftBanner() {
  return (
    <div
      role="note"
      className="mt-10 rounded-lg border border-dashed border-accent/50 bg-accent-soft/50 px-5 py-4"
    >
      <p className="eyebrow eyebrow-accent">Draft</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted text-pretty">
        {page.draftNote}
      </p>
    </div>
  );
}

function Intro() {
  return (
    <header className="pt-16 pb-16 sm:pt-24">
      <Column>
        <p className="eyebrow">How I work</p>
        <h1 className="mt-5 text-[clamp(2rem,6.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-balance">
          {page.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty sm:text-xl">
          {page.lede}
        </p>
        {page.isDraft && <DraftBanner />}
      </Column>
    </header>
  );
}

function Brief() {
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Column>
        <p className="eyebrow">{brief.eyebrow}</p>
        <blockquote className="mt-8 border-l-2 border-accent pl-6 sm:pl-8">
          <p className="text-[clamp(1.4rem,4vw,2rem)] font-medium leading-[1.25] tracking-tight text-balance">
            &ldquo;{brief.quote}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-ink-faint">{brief.attribution}</footer>
        </blockquote>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty">
          {brief.body}
        </p>
      </Column>
    </section>
  );
}

function Ask() {
  return (
    <section id="ask" className="scroll-mt-[var(--nav-h)] border-t border-border py-20 sm:py-24">
      <Column>
        <StageHeading index={1} verb={ask.verb} lede={ask.lede} />

        <div className="mt-12 space-y-10">
          {ask.groups.map((group) => (
            <div key={group.heading}>
              <h3 className="eyebrow">{group.heading}</h3>
              <ul className="mt-4 space-y-3">
                {group.questions.map((question) => (
                  <li
                    key={question}
                    className="flex gap-4 text-lg leading-relaxed text-pretty"
                  >
                    <span aria-hidden="true" className="font-mono text-accent">
                      ?
                    </span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Column>
    </section>
  );
}

function MapStage() {
  return (
    <section id="map" className="scroll-mt-[var(--nav-h)] border-t border-border py-20 sm:py-24">
      <Column>
        <StageHeading index={2} verb={map.verb} lede={map.lede} />

        {/* A rail down the left ties the steps into one workflow. The dot is
            filled for a painful step, but the "Pain point" label carries the
            same meaning for anyone not seeing the colour. */}
        <ol className="mt-12 space-y-8 border-l border-border pl-6 sm:pl-8">
          {map.steps.map((item) => (
            <li key={item.step} className="relative">
              {/* Centred on the rail: offset = list padding (24px, 32px at sm)
                  + half the 1px border + the dot's own radius. Vertically
                  centred on the first line of text (18px x 1.625 leading). */}
              <span
                aria-hidden="true"
                className={
                  item.hurts
                    ? "absolute -left-[29.5px] top-[9.6px] size-2.5 rounded-full bg-accent sm:-left-[37.5px]"
                    : "absolute -left-[27.5px] top-[11.6px] size-1.5 rounded-full bg-border sm:-left-[35.5px]"
                }
              />
              <p className="text-lg leading-relaxed text-pretty">{item.step}</p>
              {item.hurts && (
                <p className="eyebrow eyebrow-accent mt-2">Pain point</p>
              )}
              <p className="mt-1.5 leading-relaxed text-ink-muted text-pretty">
                {item.note}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-12 bg-surface-2 px-6 py-6 text-lg leading-relaxed text-pretty sm:px-8">
          {map.finding}
        </p>
      </Column>
    </section>
  );
}

function ScopeList({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: readonly string[];
  tone: "in" | "out";
}) {
  return (
    <div>
      <h3 className="eyebrow">{heading}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-pretty">
            <svg
              className={
                tone === "in"
                  ? "mt-1 size-4 shrink-0 text-accent"
                  : "mt-1 size-4 shrink-0 text-ink-faint"
              }
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {tone === "in" ? <path d="m5 12.5 4.5 4.5L19 7" /> : <path d="M6 6l12 12M18 6 6 18" />}
            </svg>
            <span className={tone === "out" ? "text-ink-muted" : undefined}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Treat() {
  return (
    <section id="treat" className="scroll-mt-[var(--nav-h)] border-t border-border py-20 sm:py-24">
      <Column>
        <StageHeading index={3} verb={treat.verb} lede={treat.lede} />

        <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8">
          <ScopeList heading="What it does" items={treat.inScope} tone="in" />
          <ScopeList heading="What it will not do" items={treat.outOfScope} tone="out" />
        </div>

        <h3 className="eyebrow mt-16">How we will know it worked</h3>
        <dl className="mt-6 space-y-6">
          {treat.measures.map((measure) => (
            <div key={measure.metric} className="border-t border-border pt-4">
              <dt className="font-medium">{measure.metric}</dt>
              <dd className="mt-1.5 leading-relaxed text-ink-muted text-pretty">
                {measure.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Column>
    </section>
  );
}

function Closing() {
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Column>
        <p className="eyebrow">{closing.heading}</p>
        <div className="mt-8 space-y-6">
          {closing.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-ink-muted text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-14">
          <Link
            href="/#approach"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
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
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back to how I work
          </Link>
        </p>
      </Column>
    </section>
  );
}

export default function ScopingPage() {
  return (
    <>
      <Intro />
      <Brief />
      <Ask />
      <MapStage />
      <Treat />
      <Closing />
    </>
  );
}
