# Portfolio

A personal portfolio site: Next.js (App Router) + Tailwind CSS v4 + TypeScript.
Dark mode, fully responsive, statically generated.

**Pages:** Home · About · Projects · Writing · Graphs · Personal · CV · Contact

---

## 1. Get it running locally

You need [Node.js 20 or newer](https://nodejs.org). Check with `node --version`.

```bash
git clone https://github.com/marie-lou28/build-website.git
cd build-website
npm install
npm run dev
```

Open <http://localhost:3000>. Edits appear immediately — leave `npm run dev`
running in a terminal while you work.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build (run before deploying) |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run cv:pdf` | Regenerate the downloadable CV PDF |

---

## 2. Make it yours

Work through these in order. You do not need to touch any component code.

### Step 1 — `src/lib/site.ts`

The single most important file. Your name, role, tagline, location, email,
LinkedIn, GitHub, availability, and the nav order all live here. Change a value
and it updates everywhere — header, footer, page titles, social cards.

### Step 2 — `src/lib/projects.ts`

Your projects. Each entry has a `summary` (one line), a `description` (the
problem and your approach) and an `outcome` (the measurable result). Set
`featured: true` on two or three to surface them on the home page.

### Step 3 — `src/lib/cv.ts`

Experience, education, skills and languages. This feeds **both** the `/cv` page
and the downloadable PDF, so the two can never disagree.

### Step 4 — `src/app/personal/page.tsx`

The personal page. The lists (`currently`, `things`, `beliefs`) and the three
paragraphs are at the top of the file with comments. Be specific here — this is
the page where concrete detail beats polish.

### Step 5 — `src/app/writing/page.tsx`

The written piece, *How I scope agent-based automation*. It ships complete and
argued, but it is written in my framing of your work — read it as a draft and
make the judgement calls your own. The strongest version has one real example
from a project you actually did. If you change the section headings, update the
`contents` array at the top so the table of contents matches.

### Step 6 — colours and fonts

All colours are CSS variables at the top of `src/app/globals.css` — one block
for light, one for `.dark`. Change the `--accent` value in both to reskin the
whole site. Fonts are set in `src/app/layout.tsx`.

---

## 3. The CV PDF

The PDF is generated from the live `/cv` page, so it always matches the site.

```bash
npm run cv:pdf
```

This starts a temporary dev server, renders `/cv` through Chrome's print engine
using the `@media print` rules in `globals.css` (which hide the nav, footer and
download button and force a light theme), and writes
`public/cv/marie-lou-mueller-cv.pdf`.

It uses whatever Chrome or Chromium is already installed. If it cannot find one:

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run cv:pdf
```

**Re-run it whenever you edit `src/lib/cv.ts`, and commit the resulting PDF** —
it is served as a static file, so the version in the repo is the version people
download.

To rename the file, change `OUT_FILE` in `scripts/generate-cv-pdf.mjs` and
`cvPdf` in `src/lib/site.ts` to match.

---

## 4. Adding a graph

The Graphs page embeds standalone HTML files. Two steps:

1. Put your exported `.html` file in `public/graphs/`.
2. Add an entry to the `graphs` array in `src/lib/graphs.ts`.

That's it. Anything that exports self-contained HTML works — Plotly
(`fig.write_html("chart.html")`), Bokeh, Observable, D3, or a hand-written
chart like the included example.

Each graph renders in a sandboxed iframe, so it cannot interfere with the rest
of the site. Two optional niceties, both demonstrated in
`public/graphs/automation-coverage.html`:

- **Match the site's theme.** The page posts `{ type: "theme", theme }` into
  your frame on load and whenever the toggle flips. Listen for it and set your
  colours accordingly. Ignore it and your chart just follows the OS theme.
- **Size the frame to the content.** Post
  `{ type: "graph-height", height }` to `parent` and the iframe resizes to fit,
  so there is no inner scrollbar. If your graph doesn't, the `height` value in
  `graphs.ts` is used instead.

If your chart is a Plotly/Bokeh export that does neither, it still works —
just set a sensible `height`.

---

## 5. Deploy

The site is fully static, so anything that serves files will host it.

**Vercel** (easiest — made by the Next.js team):

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, import
   the repository.
3. Accept the defaults and deploy. Vercel detects Next.js automatically.
4. Every later push to your default branch redeploys.

To use your own domain, add it under **Project → Settings → Domains** and follow
the DNS instructions. Then set `url` in `src/lib/site.ts` to the real address so
link previews and canonical URLs are correct.

**Netlify** and **Cloudflare Pages** work too: build command `npm run build`.

---

## Project structure

```
src/
  app/
    layout.tsx          Shell: fonts, metadata, nav, footer, no-flash theme script
    globals.css         Design tokens (light + dark), print styles, prose styles
    page.tsx            Home
    about/ projects/ writing/ graphs/ personal/ cv/ contact/
  components/           Nav, footer, buttons, cards, theme toggle, graph embed
  lib/
    site.ts             ← your details, nav order, links
    projects.ts         ← your projects
    cv.ts               ← your CV (page + PDF)
    graphs.ts           ← your embedded graphs
public/
  graphs/               Standalone HTML charts
  cv/                   Generated CV PDF
scripts/
  generate-cv-pdf.mjs   Renders /cv to PDF via headless Chrome
```

## Notes

- Dark mode follows your OS by default; the toggle overrides it and the choice
  persists in `localStorage`. An inline script in `layout.tsx` applies the theme
  before first paint, so there is no flash of the wrong theme.
- All pages are statically prerendered at build time.
- Accessibility: skip-to-content link, keyboard-focusable controls with visible
  focus rings, labelled icon buttons, `prefers-reduced-motion` respected, and a
  data-table alternative under the example chart.
