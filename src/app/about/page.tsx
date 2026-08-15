import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ArrowRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { skillGroups } from "@/lib/cv";

export const metadata: Metadata = {
  title: "About",
  description:
    "How I think about automation work: the problems I take on, the way I scope them, and what I have learned about where systems should stop.",
};

const principles = [
  {
    title: "The spec is the hard part",
    body: "Given a clear statement of what the system decides and what it must never decide, the implementation is usually the easy half. Most of the projects I have seen fail were mis-scoped, not mis-built.",
  },
  {
    title: "Abstaining is a feature",
    body: "An agent that says \"I am not confident, here is what I saw\" is worth more than one that is right slightly more often and silent when it is wrong. I design the hand-back path first.",
  },
  {
    title: "Measure before you widen",
    body: "Scope grows on evidence, not enthusiasm. Abstain rate, override rate and time-to-decision tell you whether the boundary you drew is still the right one.",
  },
  {
    title: "Write it down",
    body: "Tacit process knowledge is the real blocker. A lot of my job is sitting with the person who does the work and turning what they know into something testable.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="I work where messy processes meet the systems meant to replace them"
        lead="My background is in operations analysis, which is a useful place to start from: I spent years mapping how work actually gets done before I started building things to do it automatically."
      />

      <Container className="pb-16">
        <div className="prose-custom max-w-2xl">
          <p>
            Most of what I do now sits under the heading of agent-based automation, but the
            useful version of that job is less glamorous than it sounds. It is interviewing
            the person who has been doing a task for six years, finding the four edge cases
            they handle without thinking about it, and deciding — explicitly, in writing —
            which of those a system is allowed to touch.
          </p>
          <p>
            I care a lot about the boundary. Automation that is scoped too narrowly is a
            waste of everyone&apos;s time; automation scoped too broadly is a liability that
            shows up months later. Getting that boundary right, and building the
            instrumentation that tells you when it has moved, is the part of this work I
            find genuinely interesting.
          </p>
          <p>
            Before this I worked as a business analyst in finance operations. That is where
            I learned to be suspicious of process diagrams and to go and watch the work
            instead.
          </p>
        </div>
      </Container>

      {/* Principles */}
      <Container className="border-t border-border py-16">
        <p className="eyebrow">How I work</p>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="border-l-2 border-accent pl-5">
              <h2 className="text-base font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Skills */}
      <Container className="border-t border-border py-16">
        <p className="eyebrow">Toolkit</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h2 className="text-sm font-semibold text-ink">{group.label}</h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/writing">
            How I scope automation
            <ArrowRightIcon />
          </Button>
          <Button href="/personal" variant="secondary">
            The non-work version
          </Button>
        </div>
      </Container>
    </>
  );
}
