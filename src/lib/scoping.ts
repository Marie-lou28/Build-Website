/* ---------------------------------------------------------------------------
 * SCOPING PAGE CONTENT
 *
 * Marie-Louise's blueprint and worked example, lightly edited for reading on
 * a page. Nothing here is invented — same rule as `content.ts`. If a claim
 * isn't in this file, it isn't on the site, and this is the only file to edit
 * when the wording should change.
 * ------------------------------------------------------------------------- */

export type StepType = "deterministic" | "judgement" | "human";

export type BlueprintStage = {
  n: number;
  name: string;
  body: string;
  /** Questions she puts to the people who own the process. */
  ask: string[] | null;
  /** A principle worth pulling out of the body text. Rendered with emphasis. */
  note: string | null;
};

export type ProcessStep = { n: number; label: string; type: StepType };
export type LabelledList = { heading: string; items: string[] };
export type LabelledNote = { label: string; body: string };

export type AlertOutput = {
  marker: string;
  title: string;
  fields: { label: string; body: string }[];
  mention: string;
  mentionBody: string;
};

export type ExampleStage = {
  n: number;
  name: string;
  paragraphs: string[];
  lists: LabelledList[] | null;
  steps: ProcessStep[] | null;
  stepsSummary: string | null;
  output: AlertOutput | null;
  notes: LabelledNote[] | null;
};

export const page = {
  title: "Scoping an agentic workflow",
  lede: "A blueprint for deciding where an agent earns its place — and a worked example.",
};

export const blueprint = {
  eyebrow: "Part one",
  heading: "The blueprint",
  lede: "Eight stages. Each one has a question I have to answer, and questions I put to the people who own the process.",
  stages: [
    {
      n: 1,
      name: "Problem and cost of the status quo",
      body: "What breaks today, whose day it makes worse, and what it costs in hours, error rate, delay or revenue.",
      ask: [
        "Walk me through the last time this went wrong.",
        "How often does it happen?",
        "Who picks up the pieces?",
        "What's the current workaround?",
      ],
      note: "Without a baseline here, stage 7 has nothing to measure against.",
    },
    {
      n: 2,
      name: "Why agentic",
      body: "The gate, not a formality. An agent earns its place only where the input is unstructured or variable, the decision branches on context, or the work spans tools. Deterministic and repeatable means script it.",
      ask: [
        "What makes this hard to automate with a rule?",
        "What does the person have to read before they can decide?",
      ],
      note: null,
    },
    {
      n: 3,
      name: "Decompose the process",
      body: "Map every step, then label each one: deterministic, judgement, or human-owned. Most workflows come out mostly deterministic with two or three judgement steps.",
      ask: null,
      note: "That's the point — the aim is to scope the model down to the part only a model can do.",
    },
    {
      n: 4,
      name: "Boundaries",
      body: "Inputs, tools the agent can touch, actions it must never take, explicit non-triggers, escalation path.",
      ask: [
        "What's the worst thing this could do with write access?",
        "What looks like a problem but isn't?",
      ],
      note: null,
    },
    {
      n: 5,
      name: "Definition of done",
      body: "Concrete examples of good output, written before anything is built — including negative cases, where the agent should stay quiet.",
      ask: ["Who signs off, and against what standard?"],
      note: null,
    },
    {
      n: 6,
      name: "Failure modes and blast radius",
      body: "How I'd notice it was wrong, how reversible the mistake is, where the human checkpoint sits. Reversibility decides whether this needs approval-in-the-loop or just monitoring.",
      ask: null,
      note: "Some failures are technically reversible but socially expensive — those are the ones to name.",
    },
    {
      n: 7,
      name: "Pilot and measure",
      body: "Narrow first scope, a named owner, and the stage 1 metric re-measured.",
      ask: null,
      note: "Precision alone isn't enough; something has to check what the agent missed.",
    },
    {
      n: 8,
      name: "What I'd change",
      body: "Honest retrospective. What the pilot exposed that the design didn't anticipate.",
      ask: null,
      note: null,
    },
  ] satisfies BlueprintStage[],
};

/** Labels and ordering for the three step types, used by the flow and its key. */
export const stepTypes: { type: StepType; label: string; plural: string }[] = [
  { type: "deterministic", label: "Deterministic", plural: "deterministic" },
  { type: "judgement", label: "Judgement", plural: "judgement" },
  { type: "human", label: "Human-owned", plural: "human" },
];

export const example = {
  eyebrow: "Part two",
  heading: "Project Risk Agent",
  lede: "The same eight stages, applied.",
  stages: [
    {
      n: 1,
      name: "Problem and cost of the status quo",
      paragraphs: [
        "Project risks are spotted late or not at all. Today the team relies on someone noticing that something is off — usually in standup or a weekly review, and usually after the fact. Risks sit undetected for days.",
        "Twice in a six-month period this caused a project to slip into the following quarter, deferring roughly 200k of revenue each time. The cost is not only revenue: late detection creates internal bottlenecks and erodes customer confidence in delivery dates.",
      ],
      lists: null,
      steps: null,
      stepsSummary: null,
      output: null,
      notes: null,
    },
    {
      n: 2,
      name: "Why agentic",
      paragraphs: [
        "The workflow splits in two, and only one half needs a model.",
        "Detection is deterministic. A scheduled query finds tasks whose due date has moved, or that are still in To Do with a deadline inside 48 hours. No reasoning required.",
        "Interpretation is not. The signals that matter most are buried in comments, threads, linked issues and attached documents — an engineer noting a dependency is blocked, a comment saying required evidence is missing. Reading that context, judging whether it constitutes a real risk, and articulating the impact is the part that needs a model.",
        "Scoping it this way keeps the system cheap and predictable, and makes wrong decisions easy to trace.",
      ],
      lists: null,
      steps: null,
      stepsSummary: null,
      output: null,
      notes: null,
    },
    {
      n: 3,
      name: "Decompose the process",
      paragraphs: [],
      lists: null,
      steps: [
        { n: 1, label: "Detect trigger (date change, approaching deadline, blocked dependency)", type: "deterministic" },
        { n: 2, label: "Gather task context: description, comments, linked issues", type: "deterministic" },
        { n: 3, label: "Judge whether this is a genuine risk", type: "judgement" },
        { n: 4, label: "Assess impact", type: "judgement" },
        { n: 5, label: "Identify owner (assignee, else reporter)", type: "deterministic" },
        { n: 6, label: "Write the summary", type: "judgement" },
        { n: 7, label: "Write to the board: set custom field, create risk register item, post comment", type: "deterministic" },
        { n: 8, label: "Notify the owner", type: "deterministic" },
        { n: 9, label: "Decide and take the resolving action", type: "human" },
      ],
      stepsSummary: "Nine steps: five deterministic, three judgement, one human.",
      output: null,
      notes: null,
    },
    {
      n: 4,
      name: "Boundaries",
      paragraphs: [],
      lists: [
        { heading: "Scope", items: ["Monitors tasks in one specified project location only."] },
        {
          heading: "Triggers",
          items: [
            "Deadline slips.",
            "Work not started with a deadline inside 48 hours (milestones excluded — they mark completion, not work).",
            "A dependency blocking a task.",
          ],
        },
        {
          heading: "Non-triggers",
          items: [
            "A deadline being changed is not itself a risk; only an approaching deadline with no work started is.",
            "A blocked dependency where the plan carries enough slack to absorb the delay is not a risk.",
          ],
        },
        {
          heading: "Never",
          items: [
            "Never creates more risk items than there are tasks in the project.",
            "Never creates duplicates: before writing, it checks the task's custom field state and searches the risk register for an existing item linked to that task key.",
            "Where one task carries several risks, they are grouped into a single item and listed, not split across items.",
            "Never changes task status, assignee or dates.",
          ],
        },
      ],
      steps: null,
      stepsSummary: null,
      output: null,
      notes: null,
    },
    {
      n: 5,
      name: "Definition of done",
      paragraphs: [
        "Every flag states its reason first, so a human can judge in seconds whether the agent read the situation correctly.",
        "The test set includes negative cases as well as positive ones — a moved deadline with work already underway, and a blocked dependency with slack in the plan. Both must produce silence. False positives are the dangerous direction, so the near-misses are the examples that matter most.",
        "Sign-off: during the pilot, I review every flag.",
      ],
      lists: null,
      steps: null,
      stepsSummary: null,
      output: {
        marker: "🔴",
        title: "SOC 2 RISK ALERT",
        fields: [
          {
            label: "Reason",
            body: "The task remains To Do, and the description and comment state that evidence is missing to pass the vendor-risk test; the description warns this may stall the SOC 2 deadline.",
          },
          {
            label: "Potential impact",
            body: "Missing evidence could prevent the test from passing and delay SOC 2 evidence collection and readiness.",
          },
          {
            label: "Recommended action",
            body: "Identify and attach the missing evidence required to pass the test.",
          },
        ],
        mention: "@Sanni Cooper",
        mentionBody: "Please review and provide an update or take the recommended action.",
      },
      notes: null,
    },
    {
      n: 6,
      name: "Failure modes and blast radius",
      paragraphs: [
        "The agent writes to the board: it sets a custom field, creates a risk register item, posts a comment and sends a notification. It does not change task status, assignees or dates, and every write it makes can be undone in seconds. The technical blast radius is low by design.",
        "The failure that isn't reversible is alert fatigue. Enough false positives and people stop reading the flags — at which point the team is worse off than before, because they now believe something is watching. Deleting a bad risk item doesn't recover that trust.",
        "So precision is the metric that matters, and it needs a measurement loop rather than an assumption. Each risk register item carries a resolution field: Valid, False positive, or Already handled. Closing a risk means picking one. That costs the human a single click, gives me a running precision figure, and turns every disagreement into a new test case.",
        "The human checkpoint sits at resolution — the agent surfaces and explains, a person decides and acts. Nothing the agent does requires pre-approval, because nothing it does is hard to undo.",
      ],
      lists: null,
      steps: null,
      stepsSummary: null,
      output: null,
      notes: null,
    },
    {
      n: 7,
      name: "Pilot and measure",
      paragraphs: [],
      lists: null,
      steps: null,
      stepsSummary: null,
      output: null,
      notes: [
        {
          label: "Scope",
          body: "One project, four weeks. Two weeks in shadow mode — writing to the risk register but sending no notifications — so I can review output volume and quality before anyone else is interrupted. Two weeks live.",
        },
        { label: "Owner", body: "Me." },
        { label: "Precision", body: "Flags raised per week, and the share resolved as Valid." },
        {
          label: "Recall",
          body: "At the end of each sprint, ask the project lead what actually slipped or blocked, then check whether the agent had flagged it. Manual and rough, but it's the only measure that speaks to the original problem — risks that go unnoticed.",
        },
        {
          label: "Baseline to beat",
          body: "Risks currently surface days after they emerge, or not at all.",
        },
      ],
    },
    {
      n: 8,
      name: "What I'd change",
      paragraphs: [],
      lists: null,
      steps: null,
      stepsSummary: null,
      output: null,
      notes: [
        {
          label: "Notification volume",
          body: "Per-risk direct messages don't scale. A daily digest per owner, with immediate messaging reserved for the highest-severity flags, would hold attention better.",
        },
        {
          label: "Duplicate detection",
          body: "“No duplicates” was underspecified. The same underlying problem can surface across several linked tasks and produce several flags that are technically distinct and practically identical. This needs a rule at the problem level, not just the task-key level.",
        },
        {
          label: "Wrong calls",
          body: "The instructive failures are the ones where the agent flagged something the team had already accounted for. Working through those individually is what tightened the non-trigger rules in stage 4 — and it's why the resolution field exists rather than a subjective sense of whether the agent is doing well.",
        },
      ],
    },
  ] satisfies ExampleStage[],
};
