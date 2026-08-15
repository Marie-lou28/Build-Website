/* ---------------------------------------------------------------------------
 * PROJECTS
 *
 * Add, remove or reorder entries here — /projects and the home page both read
 * from this array. Set `featured: true` on the two or three you want on the
 * home page.
 *
 * The placeholder entries below show the shape and the level of detail that
 * reads well. Replace the copy with your own; keep the "outcome" line, it is
 * the part people actually read.
 * ------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  title: string;
  /** One line: what it is, for whom. */
  summary: string;
  /** Two or three sentences: the problem and how you approached it. */
  description: string;
  /** The measurable result. Keep it honest and specific. */
  outcome: string;
  /** Technologies / methods. Rendered as small pills. */
  stack: string[];
  year: string;
  featured?: boolean;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "claims-triage-agent",
    title: "Claims triage agent",
    summary: "An LLM agent that routes inbound insurance claims to the right queue.",
    description:
      "Claims arrived as free-text email with inconsistent attachments, and a team of six spent the first two hours of every day sorting them. I scoped the agent to own only the routing decision — never the payout decision — and defined an explicit abstain path for anything below a confidence threshold, which went to a human queue with the agent's reasoning attached.",
    outcome:
      "78% of claims routed without human touch, 0 mis-routes to the payout queue over the first quarter, and triage time down from ~2h to ~20 min per day.",
    stack: ["Python", "LLM tool-use", "Evaluation harness", "Human-in-the-loop"],
    year: "2025",
    featured: true,
    links: [{ label: "Read the scoping notes", href: "/writing" }],
  },
  {
    slug: "supplier-doc-extraction",
    title: "Supplier document extraction",
    summary: "Structured data out of 12 years of inconsistent supplier PDFs.",
    description:
      "A procurement team needed contract terms in a database before they could negotiate renewals. Rather than a single extraction pass, I built a two-stage pipeline: a deterministic layout classifier first, then a field-level extractor per document class, with every field carrying a provenance pointer back to the page and bounding box it came from.",
    outcome:
      "34,000 documents processed; field-level accuracy of 96% on the audited sample, with provenance making the remaining 4% cheap to correct rather than dangerous.",
    stack: ["Python", "OCR", "Structured output", "Provenance tracking"],
    year: "2024",
    featured: true,
  },
  {
    slug: "internal-eval-harness",
    title: "Internal evaluation harness",
    summary: "The thing every automation project needed before it was allowed to ship.",
    description:
      "Teams kept shipping agents with no way to tell whether a prompt change made things better or worse. I built a small harness that pins a labelled case set per workflow, scores each run, and blocks a deploy on regression — deliberately boring, deliberately hard to skip.",
    outcome:
      "Adopted by four teams; two prompt regressions caught before release that would otherwise have reached production.",
    stack: ["TypeScript", "CI/CD", "Regression testing"],
    year: "2024",
  },
  {
    slug: "ops-dashboard",
    title: "Operations reporting dashboard",
    summary: "One place to see whether the automations were still behaving.",
    description:
      "Automation without observability is just a faster way to be wrong. This dashboard tracked abstain rate, human-override rate and time-to-decision per workflow — the three numbers that tell you whether an agent's scope is still the right scope.",
    outcome:
      "Made a drifting workflow visible within a week of the drift starting, instead of at the next quarterly review.",
    stack: ["Next.js", "SQL", "Data visualisation"],
    year: "2023",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
