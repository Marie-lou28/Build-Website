/* ---------------------------------------------------------------------------
 * GRAPHS
 *
 * To add a graph:
 *   1. Drop your exported .html file into `public/graphs/`.
 *   2. Add an entry to the array below.
 *
 * That is the whole workflow — no component changes. Anything that exports a
 * self-contained HTML file works: Plotly (`fig.write_html`), Bokeh, Observable
 * embeds, D3, matplotlib via mpld3, or a hand-written chart like the example.
 *
 * Note: the file must be self-contained (charts that load a library from a CDN
 * work too, as long as the visitor is online). It is rendered in a sandboxed
 * iframe, so it cannot touch the rest of the site.
 * ------------------------------------------------------------------------- */

export type Graph = {
  slug: string;
  title: string;
  /** What the reader should take away. Say the finding, not the chart type. */
  description: string;
  /** Path under /public. */
  file: string;
  /** Fallback height in px, used until the graph reports its own. */
  height?: number;
  /** Optional: where the data came from. */
  source?: string;
};

export const graphs: Graph[] = [
  {
    slug: "automation-coverage",
    title: "Automation coverage by workflow",
    description:
      "Share of volume handled without human touch across two workflows through 2025. The interesting part is the plateau in months 7–8, which is where each workflow hit the edge of its original scope.",
    file: "/graphs/automation-coverage.html",
    height: 560,
    source: "Illustrative data",
  },
];
