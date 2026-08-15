# Marie-Louise Müller — personal site

Next.js (App Router) + Tailwind CSS v4 + TypeScript, statically generated,
deployed on Vercel.

**Status: skeleton.** The site currently serves a holding page and nothing
else. An earlier version of this repository contained a full multi-page
portfolio, but all of its copy was placeholder text written by an assistant
rather than by Marie-Louise, so it has been removed instead of being edited
in place. It remains in git history at commit `485c248` if any of it is
wanted back.

## Planned structure

| Route | Contents |
|---|---|
| `/` | Short self-introduction, then a personal section — hobbies and life outside work |
| `/scoping` | A worked example of how she scopes an agent |
| `/graphs` | Embedded charts |

Content is written by Marie-Louise and gathered section by section. Nothing
about her goes on the site unless she said it.

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
    layout.tsx     Root layout; contains the no-flash dark-mode script
    page.tsx       Holding page
    globals.css    Design tokens (provisional) and Tailwind import
  lib/
    site.ts        Site-wide values. Only her name so far
    use-theme.ts   Reads the current theme from the DOM
```

Dark mode is class-based and applied by an inline script before first paint,
so there is no flash of the wrong theme; the choice falls back to the OS
setting.
