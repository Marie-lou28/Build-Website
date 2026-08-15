"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalIcon } from "@/components/icons";
import type { Graph } from "@/lib/graphs";
import { useTheme } from "@/lib/use-theme";

/**
 * Embeds a standalone HTML graph in a sandboxed iframe and keeps two things
 * in sync with the parent site:
 *
 *  - **Theme.** The current theme is posted into the frame once it loads, and
 *    again whenever the site's toggle flips. A graph that ignores those
 *    messages still renders fine — it just follows the OS theme instead.
 *  - **Height.** If the graph posts `{ type: "graph-height", height }` we size
 *    the frame to it, so there is no inner scrollbar. Otherwise the configured
 *    fallback height is used.
 */
export function GraphEmbed({ graph }: { graph: Graph }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(graph.height ?? 460);
  const theme = useTheme();

  // Push the theme into the frame, and prompt it to re-report its height.
  // The frame usually finishes loading before this page hydrates, so its first
  // height report goes unheard — this handshake recovers it.
  function syncFrame() {
    frameRef.current?.contentWindow?.postMessage(
      { type: theme ? "theme" : "sync", theme },
      "*",
    );
  }

  // Runs on mount and again whenever the theme changes.
  useEffect(syncFrame, [theme]);

  // Accept height reports, but only from this frame.
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source !== frameRef.current?.contentWindow) return;
      const data = event.data as { type?: string; height?: number };
      if (data?.type === "graph-height" && typeof data.height === "number") {
        const next = Math.min(Math.max(data.height, 200), 1600);
        // Ignore sub-pixel churn so a graph that re-measures itself on every
        // resize cannot drive an endless resize loop.
        setHeight((current) => (Math.abs(current - next) > 2 ? next : current));
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <figcaption className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-6 py-5">
        <div className="max-w-2xl">
          <h2 className="text-base font-semibold text-ink">{graph.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{graph.description}</p>
          {graph.source && (
            <p className="mt-2 font-mono text-[11px] text-ink-faint">Source: {graph.source}</p>
          )}
        </div>
        <a
          href={graph.file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          Open full size
          <ExternalIcon />
        </a>
      </figcaption>

      <iframe
        ref={frameRef}
        src={graph.file}
        title={graph.title}
        loading="lazy"
        onLoad={syncFrame}
        // No allow-same-origin: the graph runs in its own opaque origin and
        // cannot reach into this page.
        sandbox="allow-scripts"
        style={{ height }}
        className="w-full border-0 bg-surface"
      />
    </figure>
  );
}
