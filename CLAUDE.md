# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page portfolio site for Emmanuel Ngene, branded as Emmy.codes🛠️ (full-stack developer), live at
https://emmycodes.site and deployed on Vercel. Built with React 18 + Vite 5 + Tailwind CSS v4 (via
`@tailwindcss/vite`).

## Commands

```
npm install
npm run dev       # local dev server (client-rendered, no SEO head tags)
npm run build     # client build + SSR build + scripts/prerender.mjs -> static pages in dist/
npm run preview   # serve the built dist/
npm run resume    # build, then print dist/resume.html to public/emmanuel-ngene-resume.pdf with local Chrome/Edge
npm run indexnow  # ping IndexNow with the live sitemap (also runs via GitHub Actions after prod deploys)
```

There is no lint or test tooling.

## Architecture

- **Prerendered SPA.** `npm run build` builds the client, then an SSR bundle of
  `src/entry-server.jsx`, then `scripts/prerender.mjs` renders every route to static HTML
  (`dist/index.html`, `dist/projects/<slug>.html`, `dist/blog.html`, `dist/blog/<slug>.html`,
  `dist/404.html`), injects per-page head tags, inlines the CSS, preloads above-the-fold fonts,
  validates JSON-LD, and writes `sitemap.xml`, `llms.txt` and `rss.xml`. `src/main.jsx` hydrates the prerendered markup. `vercel.json` sets `cleanUrls`.
- **Routing** is `src/routes.js` (`/`, `/projects/<slug>`, `/blog`, `/blog/<slug>`, everything else = 404), shared by client
  and prerenderer. Navigation between pages is plain `<a>` links (full page loads); nav links are
  `/#section` so they work from any page.
- **`index.html`** is the template: `<!--head-->` and `<!--app-->` placeholders, static icon/manifest
  tags, and an inline script applying the saved theme before paint.
- **SEO**: `src/site.js` holds the canonical domain (`https://emmycodes.site`, never www/vercel.app)
  and personal facts; `src/seo.js` builds titles, descriptions, OG/Twitter tags and JSON-LD
  (WebSite, ProfilePage, Person, CreativeWork per project, BreadcrumbList).
- **Projects** live in `src/data/projects.jsx` (`slug`, `summary`, `overview`, `contribution`, ...).
  Adding one there adds its homepage card, its `/projects/<slug>` page, sitemap entry, JSON-LD and
  llms.txt line. `LIVE_PROJECT_COUNT` feeds the "Live products shipped" stat in `About.jsx`.
- **Live project count must always be correct.** It counts every project in `PROJECTS` with a
  primary link (a live site), including ones tagged "In Development" (e.g. GreenVerify). Whenever a
  project is added, removed, hidden or gets/loses its live link, keep it that way: give live projects
  a `primary: true` link, then build and confirm the stat in `dist/index.html` equals the number of
  live projects (8 as of 2026-10-25). Never hardcode the number.
- **Pages/components**: `src/App.jsx` -> `Layout` (Cursor, Nav with `ThemeToggle`, Footer) +
  `src/pages/{Home,ProjectPage,NotFound}.jsx`. Home composes `src/components/` sections: `Hero`,
  `About`, `Experience`, `Skills`, `Services`, `Projects`, `Process`, `Blog` (latest 3 posts), `Contact`
  (includes the rotating testimonials). `SectionIntro` is the shared badge + heading.
- **Blog**: post metadata in `src/data/posts.js`, bodies in `src/content/blog/<slug>.md` (a small
  Markdown subset parsed by `src/lib/markdown.js`, rendered by `components/Markdown.jsx`). Each
  body is its own lazy chunk: `main.jsx` loads it before hydrating a post page, and
  `entry-server.jsx` `preparePosts()` loads all of them before prerendering. The build fails if a
  post's `readMinutes` doesn't match its text. Pages: `pages/BlogIndex.jsx`, `pages/BlogPost.jsx`
  (BlogPosting JSON-LD, article meta tags, per-post sitemap `lastmod` from `dateModified`).
- **Resume**: `src/pages/Resume.jsx` renders a light, A4 resume from the same data (`PROJECTS`,
  `SKILL_GROUPS`, `About.jsx` `STATS`, `Experience.jsx` `ROLES`; phone, education and role dates
  were supplied by Emmanuel). `prerender.mjs` writes it to `dist/resume.html` (not in the sitemap) and
  `scripts/resume-pdf.mjs` prints it to `public/emmanuel-ngene-resume.pdf`, which is committed and
  linked from the Hero's "Download Resume" button. Vercel can't print it, so re-run `npm run resume`
  and commit the PDF whenever projects, roles or skills change.
- **Content facts** live in data files, never invented: `src/data/projects.jsx`, `src/data/tech.js`
  (skills; brand icons from `simple-icons`, generic icons from `lucide-react`), `src/data/social.js`,
  roles in `Experience.jsx`, stats in `About.jsx`.
- **Styling**: Tailwind v4 utility classes inline on each component; `src/index.css` defines theme
  tokens per `data-theme` (`dark` = black + violet, `black` = all black/grey) plus the keyframes. `accent` is for text on the
  background, `accent-2` is the fill behind white text. Fonts are self-hosted via `@fontsource`
  (Plus Jakarta Sans = `font-display`, DM Sans, DM Mono; imported in `src/main.jsx`).
- **Animation** is CSS keyframes + small hooks (`useReveal`, `useParallax`, `StatTile` count-up,
  `ProjectCard` tilt); all disabled under `prefers-reduced-motion`. No animation library.
- **Hooks** (`src/hooks/`): `useTheme` (persists to `localStorage` key `pf-theme`; starts at "dark"
  to match prerendered HTML), `useActiveSection`, `useReveal`, `useParallax`.
- **`public/`** is copied to the site root: icons (`favicon.ico`, `apple-touch-icon.png`,
  `icon-*.png`, all cut from the neon ">|" glass-icon render), `og-image.png`, `hero-portrait.webp` (background-removed hero photo),
  `hero-bg.webp` / `hero-bg-mobile.webp` (grayscale desk photo, wide crop for desktop,
  full portrait crop for phones; shown only behind the hero text),
  `emmanuel-ngene.jpg` (schema photo), `emmanuel-ngene-resume.pdf` (generated, see Resume), `robots.txt`,
  `site.webmanifest`, and the IndexNow key file (`<32 hex>.txt`).
- **`src/assets/screens/`** holds 800x500 WebP screenshots of live project sites.
- **`screenshots/`** holds images used only by `README.md`.

## Notes

- `git`, `main`, and `updating-cv` at the repo root are empty, accidental files — not part of the site.
