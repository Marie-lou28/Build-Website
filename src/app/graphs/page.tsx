import type { Metadata } from "next";
import { Container } from "@/components/container";
import { GraphEmbed } from "@/components/graph-embed";
import { PageHeader } from "@/components/page-header";
import { graphs } from "@/lib/graphs";

export const metadata: Metadata = {
  title: "Graphs",
  description:
    "Interactive charts embedded straight from exported HTML — automation coverage, override rates and other operational measures.",
};

export default function GraphsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Graphs"
        title="Charts and analysis"
        lead="Each of these is a self-contained HTML file rendered in place. Hover for values, or open the data table underneath any chart."
      />

      <Container className="flex flex-col gap-10 pb-8">
        {graphs.map((graph) => (
          <GraphEmbed key={graph.slug} graph={graph} />
        ))}

        {graphs.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-ink-muted">
            No graphs yet. Drop an HTML file into <code>public/graphs/</code> and add an
            entry to <code>src/lib/graphs.ts</code>.
          </p>
        )}

        <p className="text-sm text-ink-faint">
          Adding one: export your chart as a standalone <code className="font-mono">.html</code>{" "}
          file, put it in <code className="font-mono">public/graphs/</code>, then add an entry
          to <code className="font-mono">src/lib/graphs.ts</code>. Nothing else needs to change.
        </p>
      </Container>
    </>
  );
}
