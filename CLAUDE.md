# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, single-page portfolio site for Emmanuel Ngene (backend software developer). No build
tooling, no package manager, no framework — it's plain HTML/CSS/JS served as-is.

## Commands

There is no build, lint, or test tooling in this repo (no `package.json`). To preview changes,
just open `index.html` directly in a browser, or serve the directory statically, e.g.:

```
npx serve .
```

## Architecture

- **`index.html`** is the entire site. All CSS lives in the `<style>` block in `<head>` (~lines
  14-1135) and all JS lives in a single inline `<script>` at the end of `<body>` (~line 1891
  onward). There is no build step that assembles this — edits are made directly in this file.
- **`style.css`** and **`script.js`** at the repo root are *not* referenced by `index.html` and are
  effectively dead/leftover files — the real styles and script are inline as described above.
- **Theming**: implemented via a `data-theme` attribute on `<html>` (`dark` / `white` / `blue`),
  each defining a block of CSS custom properties (`--bg`, `--fg`, `--accent`, etc.) at the top of
  the `<style>` block. The theme switcher buttons (`.theme-btn`, `data-t` attribute) toggle this
  attribute and persist the choice to `localStorage` under the `pf-theme` key.
- **Page sections** (in DOM order, all inside `<body>`): `#hero`, `#about`, `#services`,
  `#projects`, `#testimonials`, `#process`, `#contact`. Nav links highlight the active section on
  scroll by comparing `window.scrollY` against each section's `offsetTop`.
- **Inline script behaviors**: custom cursor (dot + trailing ring following the mouse), theme
  switching/persistence, scroll-triggered reveal animations via `IntersectionObserver` on
  `.reveal` elements, and active-nav-link highlighting on scroll. All wrapped in a single IIFE.
- **`assets/`** holds project screenshot(s) referenced from the `#projects` section (e.g.
  `cryptotracker.png`).
- **`favicon.svg`** is the site favicon, referenced directly from `<head>`.

## Notes

- `git`, `main`, and `updating-cv` at the repo root are empty, untracked-looking files (likely
  accidental artifacts) — not part of the site.
