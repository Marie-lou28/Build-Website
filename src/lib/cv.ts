/* ---------------------------------------------------------------------------
 * CV DATA
 *
 * This is the single source of truth for both the /cv page and the downloadable
 * PDF — `npm run cv:pdf` prints the rendered page to public/cv/. Edit here and
 * regenerate; the page and the PDF can never drift apart.
 * ------------------------------------------------------------------------- */

export type Role = {
  company: string;
  title: string;
  period: string;
  location?: string;
  /** Bullet points. Lead with the outcome, not the responsibility. */
  points: string[];
};

export const summary =
  "Automation and AI solutions specialist. I take operational processes that are expensive because they are judgement-heavy, work out which parts of the judgement a system can safely own, and ship the system together with the evidence that it is working.";

export const experience: Role[] = [
  {
    company: "Company Name",
    title: "AI Solutions Lead",
    period: "2024 — Present",
    location: "Berlin",
    points: [
      "Scoped and delivered three agent-based automations across claims, procurement and support, each with an explicit abstain path and human review stage.",
      "Introduced a shared evaluation harness that made regression a blocking condition for deployment; adopted by four teams.",
      "Ran the intake process that decided which processes were worth automating — and wrote up the ones that were not.",
    ],
  },
  {
    company: "Company Name",
    title: "Automation Consultant",
    period: "2022 — 2024",
    location: "Remote",
    points: [
      "Delivered document-extraction pipelines over 34,000 legacy supplier contracts with field-level provenance.",
      "Worked directly with operations teams to turn tacit routing rules into testable specifications.",
    ],
  },
  {
    company: "Company Name",
    title: "Business Analyst",
    period: "2020 — 2022",
    points: [
      "Process mapping and requirements work across finance operations.",
      "Built the reporting layer that later became the baseline for measuring automation impact.",
    ],
  },
];

export const education: Role[] = [
  {
    company: "University Name",
    title: "M.Sc. — Field of Study",
    period: "2018 — 2020",
    points: ["Thesis topic or a one-line highlight."],
  },
  {
    company: "University Name",
    title: "B.A. — Field of Study",
    period: "2015 — 2018",
    points: [],
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Automation & AI",
    items: [
      "Agent scoping & specification",
      "LLM tool-use design",
      "Evaluation harnesses",
      "Human-in-the-loop design",
      "Prompt engineering",
    ],
  },
  {
    label: "Engineering",
    items: ["Python", "TypeScript", "SQL", "Next.js", "Git / CI"],
  },
  {
    label: "Ways of working",
    items: [
      "Process mapping",
      "Stakeholder interviewing",
      "Written specification",
      "Risk & blast-radius analysis",
    ],
  },
];

export const languages = [
  { name: "German", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "French", level: "Conversational" },
];
