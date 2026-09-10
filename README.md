# Marie-Louise Müller — personal site

Next.js (App Router) + Tailwind CSS v4 + TypeScript, statically generated,
deployed on Vercel.

**Status: two pages live on the branch.**

| Route | Contents | State |
|---|---|---|
| `/` | Self-introduction, how she works, and life outside work | Her words |
| `/scoping` | Her eight-stage blueprint for scoping an agentic workflow, and the Project Risk Agent worked example, including an end-to-end flow diagram of the agent | Her words |
| `/graphs` | Embedded charts | Not built |

An earlier version of this repository contained a full multi-page portfolio,
but all of its copy was placeholder text written by an assistant rather than
by Marie-Louise, so it was removed instead of being edited in place. It
remains in git history at commit `485c248` if any of it is wanted back.

### The content rule

Every word on both pages is Marie-Louise's, lightly edited for reading on a
page. Nothing about her goes on the site unless she said it.

This held once at cost: an earlier commit put an assistant-written worked
example on `/scoping` behind a draft banner. It was replaced wholesale by her
own blueprint rather than edited into shape. Ask her for the content first.

## Running it locally

Requires [Node.js 20 or newer](https://nodejs.org) (`node --version` to check).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build — run before pushing |
| `npm run lint` | ESLint |
| `npm start` | Serve a production build locally |

## Deployment

Pushes to `claude/personal-portfolio-nextjs-cwxo19` — the repository's default
branch — deploy automatically to production via Vercel.

## Layout

```
src/
  app/
    layout.tsx        Root layout: nav, footer, no-flash dark-mode script
    page.tsx          Home
    scoping/page.tsx  The worked example
    not-found.tsx     404
    globals.css       Design tokens and Tailwind import
  components/
    column.tsx        The shared content column every section lines up to
    site-nav.tsx      Sticky nav; marks the active route
    site-footer.tsx   Shared footer
    theme-toggle.tsx  Light/dark button, lives in the nav
  lib/
    site.ts           Site-wide values. Only her name so far
    content.ts        All copy for `/`
    scoping.ts        All copy for `/scoping`: the blueprint and the example
    use-theme.ts      Reads the current theme from the DOM
    clsx.ts           Tiny className helper
```

Copy lives in `lib/`, never in components, so the wording can be changed
without reading any JSX.

The nav's height is the `--nav-h` token in `globals.css`. The hero subtracts
it so "full height" means the viewport rather than the viewport plus a bar,
and in-page anchors use it as their scroll margin so headings don't land
underneath the nav. Change it in one place.

Dark mode is class-based and applied by an inline script before first paint,
so there is no flash of the wrong theme; the choice falls back to the OS
setting.
