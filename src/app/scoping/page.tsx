import type { Metadata } from "next";
import Link from "next/link";
import { Column } from "@/components/column";
import { clsx } from "@/lib/clsx";
import {
  blueprint,
  example,
  page,
  stepTypes,
  type AlertOutput,
  type LabelledList,
  type LabelledNote,
  type ProcessStep,
  type StepType,
} from "@/lib/scoping";

export const metadata: Metadata = {
  title: `${page.title} — Marie-Louise Müller`,
  description: page.lede,
};

/* One source of truth for how each step type looks. The key, the proportion
   bar and the step rows all read from it, so a colour cannot come to mean
   "judgement" in one place and something else in another. */
const typeStyles: Record<StepType, { chip: string; bar: string }> = {
  deterministic: { chip: "border-border text-ink-muted", bar: "bg-border" },
  judgement: { chip: "border-accent/50 text-accent", bar: "bg-accent" },
  human: { chip: "border-dashed border-ink-faint/60 text-ink-muted", bar: "bg-ink-faint" },
};

const typeLabel = Object.fromEntries(stepTypes.map((t) => [t.type, t.label])) as Record<
  StepType,
  string
>;

function Intro() {
  return (
    <header className="pt-16 pb-16 sm:pt-24">
      <Column>
        <p className="eyebrow">Case study</p>
        <h1 className="mt-5 text-[clamp(2rem,6.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-balance">
          {page.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty sm:text-xl">
          {page.lede}
        </p>

        {/* Doubles as a table of contents and as a picture of the method:
            eight stages, in order, before any of the prose. */}
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {blueprint.stages.map((stage) => (
            <li key={stage.n}>
              <a
                href={`#stage-${stage.n}`}
                className="flex h-full flex-col gap-1.5 bg-bg p-4 transition-colors hover:bg-surface-2"
              >
                <span className="font-mono text-xs text-ink-faint">
                  {String(stage.n).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium leading-snug text-pretty">{stage.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </Column>
    </header>
  );
}

function PartHeader({
  eyebrow,
  heading,
  lede,
}: {
  eyebrow: string;
  heading: string;
  lede: string;
}) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-balance">
        {heading}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty">{lede}</p>
    </>
  );
}

/** Shared by both parts so a stage looks the same wherever it appears. */
function StageHeading({ n, name, id }: { n: number; name: string; id?: string }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-ink-faint">{String(n).padStart(2, "0")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h3
        id={id}
        className="mt-4 scroll-mt-[calc(var(--nav-h)+1rem)] text-xl font-semibold tracking-tight sm:text-2xl"
      >
        {name}
      </h3>
    </>
  );
}

function Blueprint() {
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Column>
        <PartHeader
          eyebrow={blueprint.eyebrow}
          heading={blueprint.heading}
          lede={blueprint.lede}
        />

        <div className="mt-14 space-y-14">
          {blueprint.stages.map((stage) => (
            <div key={stage.n}>
              <StageHeading n={stage.n} name={stage.name} id={`stage-${stage.n}`} />
              <p className="mt-4 leading-relaxed text-ink-muted text-pretty">{stage.body}</p>

              {stage.ask && (
                <div className="mt-6">
                  <p className="eyebrow">What I ask</p>
                  <ul className="mt-3 space-y-2.5">
                    {stage.ask.map((question) => (
                      <li key={question} className="flex gap-3 leading-relaxed text-pretty">
                        <span aria-hidden="true" className="font-mono text-accent">
                          ?
                        </span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {stage.note && (
                <p className="mt-6 border-l-2 border-accent pl-5 leading-relaxed text-pretty">
                  {stage.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </Column>
    </section>
  );
}

/** The decomposition, drawn. The proportion bar is the point of the picture:
    judgement is the minority, and it sits in the middle of the run. */
function ProcessFlow({ steps, summary }: { steps: ProcessStep[]; summary: string | null }) {
  return (
    <div className="mt-6">
      <div aria-hidden="true" className="flex gap-1">
        {steps.map((step) => (
          <span
            key={step.n}
            className={clsx("h-2 flex-1 rounded-full", typeStyles[step.type].bar)}
          />
        ))}
      </div>

      {summary && <p className="mt-4 leading-relaxed text-pretty">{summary}</p>}

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {stepTypes.map((t) => (
          <li key={t.type} className="flex items-center gap-2">
            {/* Same fill as the bar segments above: the key is only a key if
                it is painted in the colours it is explaining. */}
            <span
              aria-hidden="true"
              className={clsx("h-2 w-5 rounded-full", typeStyles[t.type].bar)}
            />
            <span className="text-sm text-ink-muted">{t.label}</span>
          </li>
        ))}
      </ul>

      <ol className="mt-8">
        {steps.map((step) => (
          <li
            key={step.n}
            className="grid grid-cols-[1.75rem_1fr] items-start gap-x-3 gap-y-2 border-t border-border py-3.5 sm:grid-cols-[1.75rem_1fr_auto] sm:gap-x-4"
          >
            <span className="pt-0.5 font-mono text-xs text-ink-faint">
              {String(step.n).padStart(2, "0")}
            </span>
            <span className="leading-relaxed text-pretty">{step.label}</span>
            {/* Sits beside the step on a wide screen and under it on a narrow
                one, rather than squeezing the step text into a column. */}
            <span
              className={clsx(
                "col-start-2 justify-self-start rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] sm:col-start-3 sm:mt-0.5",
                typeStyles[step.type].chip,
              )}
            >
              {typeLabel[step.type]}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Boundaries({ lists }: { lists: LabelledList[] }) {
  return (
    <div className="mt-6 grid gap-8 sm:grid-cols-2">
      {lists.map((list) => {
        const forbidding = list.heading === "Never" || list.heading === "Non-triggers";
        return (
          <div key={list.heading}>
            <p className="eyebrow">{list.heading}</p>
            <ul className="mt-3 space-y-3">
              {list.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-pretty">
                  <svg
                    className={clsx(
                      "mt-1.5 size-3.5 shrink-0",
                      forbidding ? "text-ink-faint" : "text-accent",
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {forbidding ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="m5 12.5 4.5 4.5L19 7" />}
                  </svg>
                  <span className={forbidding ? "text-ink-muted" : undefined}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** A real flag, shown as it appears to the person receiving it. */
function AlertCard({ output }: { output: AlertOutput }) {
  return (
    <figure className="mt-6 overflow-hidden rounded-lg border border-border bg-surface">
      <figcaption className="flex items-center gap-2 border-b border-border bg-surface-2 px-5 py-3">
        <span aria-hidden="true">{output.marker}</span>
        <span className="font-mono text-xs uppercase tracking-[0.12em]">{output.title}</span>
      </figcaption>
      <div className="space-y-3 px-5 py-4">
        {output.fields.map((field) => (
          <p key={field.label} className="leading-relaxed text-pretty">
            <span className="font-medium">{field.label}:</span>{" "}
            <span className="text-ink-muted">{field.body}</span>
          </p>
        ))}
        <p className="border-t border-border pt-3 leading-relaxed text-pretty">
          <span className="font-medium text-accent">{output.mention}</span>{" "}
          <span className="text-ink-muted">{output.mentionBody}</span>
        </p>
      </div>
    </figure>
  );
}

function NoteList({ notes }: { notes: LabelledNote[] }) {
  return (
    <dl className="mt-6 space-y-5">
      {notes.map((note) => (
        <div key={note.label} className="border-t border-border pt-4">
          <dt className="font-medium">{note.label}</dt>
          <dd className="mt-1.5 leading-relaxed text-ink-muted text-pretty">{note.body}</dd>
        </div>
      ))}
    </dl>
  );
}

function WorkedExample() {
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Column>
        <PartHeader eyebrow={example.eyebrow} heading={example.heading} lede={example.lede} />

        <div className="mt-14 space-y-14">
          {example.stages.map((stage) => (
            <div key={stage.n}>
              <StageHeading n={stage.n} name={stage.name} />

              {stage.paragraphs.length > 0 && (
                <div className="mt-4 space-y-4">
                  {stage.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed text-ink-muted text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {stage.steps && <ProcessFlow steps={stage.steps} summary={stage.stepsSummary} />}
              {stage.lists && <Boundaries lists={stage.lists} />}
              {stage.output && <AlertCard output={stage.output} />}
              {stage.notes && <NoteList notes={stage.notes} />}
            </div>
          ))}
        </div>

        <p className="mt-16">
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
      <Blueprint />
      <WorkedExample />
    </>
  );
}
