# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page portfolio site for Emmanuel Ngene, branded as Emmy.codes🛠️ (full-stack developer), live at
https://emmycodes.site and deployed on Vercel. Built with React 18 + Vite 5 + Tailwind CSS v4 (via
`@tailwindcss/vite`).

## Commands

```
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the built dist/
```

There is no lint or test tooling.

## Architecture

- **`index.html`** is the Vite entry. It holds all SEO metadata (title, description, canonical, Open
  Graph/Twitter tags, JSON-LD Person/WebSite schema) and a `<noscript>` fallback, then mounts
  `src/main.jsx` into `#root`.
- **`src/App.jsx`** composes the page from `src/components/` in DOM order: `Hero`, `About`,
  `Services`, `Projects`, `Testimonials`, `Process`, `Blog`, `Contact`, plus `Nav`, `Footer`,
  `Cursor` (custom dot + ring cursor) and `ThemeSwitcher`.
- **Styling**: Tailwind utility classes written inline on each component. `src/index.css` defines the
  theme tokens (`--bg`, `--fg`, `--accent`, ...) per `data-theme` (`dark` / `white` / `blue`) on `<html>`.
- **Hooks** (`src/hooks/`): `useTheme` (sets `data-theme`, persists to `localStorage` key `pf-theme`),
  `useActiveSection` (nav highlighting on scroll), `useReveal` (`IntersectionObserver` reveal
  animations on `.reveal` elements).
- **Projects**: data lives in `src/components/Projects.jsx`; `LIVE_PROJECT_COUNT` is derived from it
  and shown in the hero stats.
- **`src/assets/`** holds images imported by components (hero photo, project logos/screenshots).
- **`public/`** is copied as-is to the site root: `favicon.svg`, `og-image.png` (1200×630 social
  preview), `robots.txt`, `sitemap.xml`, `site.webmanifest`. Update `<lastmod>` in `sitemap.xml` when
  content changes meaningfully.
- **`screenshots/`** holds images used only by `README.md`.

## Notes

- `git`, `main`, and `updating-cv` at the repo root are empty, accidental files — not part of the site.
