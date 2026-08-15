import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Personal",
  description: "The non-CV version — what I do when I am not scoping automation.",
};

/* --------------------------------------------------------------------------
 * Edit these three lists and the paragraphs below. Everything on this page is
 * meant to be swapped out for the real thing — it is the one page where the
 * specificity is the point. "I bake sourdough badly" beats "passionate about
 * food" every time.
 * ------------------------------------------------------------------------ */

const currently = [
  { label: "Reading", value: "Seeing Like a State — James C. Scott" },
  { label: "Listening to", value: "Anything with a double bass in it" },
  { label: "Learning", value: "Enough Rust to be dangerous" },
  { label: "Somewhere near", value: "Berlin, mostly" },
];

const things = [
  {
    title: "Long-distance walking",
    body: "I plan holidays around footpaths. Two weeks a year on a trail with no reception is the single best thing I do for my thinking.",
  },
  {
    title: "Bad film club",
    body: "A standing monthly appointment with friends to watch something genuinely terrible and argue about it afterwards. Attendance is mandatory. Quality is not.",
  },
  {
    title: "Cooking from constraints",
    body: "I like the version of cooking where you open the fridge and work with what is there. It is the same puzzle as scoping a project, with a better failure mode.",
  },
  {
    title: "Second-hand bookshops",
    body: "I have a rule that I am allowed one book per shop and I have never once obeyed it.",
  },
];

const beliefs = [
  "Ask the person who does the job. They already know.",
  "Being clear is a kindness, not a personality flaw.",
  "Most disagreements are about definitions.",
  "If it cannot be measured, say so out loud rather than pretending.",
];

export default function PersonalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Personal"
        title="Who I am when I am not doing this"
        lead="A CV tells you what I have been paid to do. This page is the rest of it — which, in my experience, is the part that actually predicts whether people enjoy working together."
      />

      {/* Narrative */}
      <Container className="pb-14">
        <div className="prose-custom max-w-2xl">
          <p>
            I grew up somewhere small enough that the library was the interesting building,
            which probably explains most of what follows. I read constantly and
            indiscriminately, I am happiest walking, and I have a low tolerance for
            meetings that could have been three sentences.
          </p>
          <p>
            The thing I would want a future colleague to know is that I am direct. If I
            think a plan will not survive contact with reality I will say so early, in
            writing, with a reason. I would much rather have the uncomfortable conversation
            in week one than the expensive one in month six. In return I am genuinely happy
            to be argued out of a position — being wrong quickly is a good outcome.
          </p>
          <p>
            I am also, for what it is worth, someone who likes the unglamorous parts of a
            project. Writing the documentation, labelling the evaluation set, sitting with
            the operations team for a day. That work compounds and almost nobody wants to
            do it.
          </p>
        </div>
      </Container>

      {/* Currently */}
      <Container className="border-t border-border py-14">
        <p className="eyebrow">Currently</p>
        <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {currently.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="font-mono text-[11px] tracking-wide text-ink-faint uppercase">
                {item.label}
              </dt>
              <dd className="text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Things I do */}
      <Container className="border-t border-border py-14">
        <p className="eyebrow">Outside work</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {things.map((thing) => (
            <div
              key={thing.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h2 className="text-base font-semibold text-ink">{thing.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{thing.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Beliefs */}
      <Container className="border-t border-border py-14">
        <p className="eyebrow">Things I believe about working together</p>
        <ul className="mt-8 flex flex-col gap-4">
          {beliefs.map((belief) => (
            <li key={belief} className="flex gap-4 text-lg text-pretty text-ink">
              <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-accent" />
              {belief}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
