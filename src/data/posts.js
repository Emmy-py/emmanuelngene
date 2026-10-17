// Blog posts. Each one gets a card on the homepage and /blog, its own page at /blog/<slug>, a
// sitemap entry, BlogPosting structured data, an RSS item and an llms.txt line.
// The body is src/content/blog/<slug>.md, loaded only on that post's page (see loadPost).
// `readMinutes` is checked against the body at build time (scripts/prerender.mjs).
// Dates are ISO (YYYY-MM-DD); bump `dateModified` when a post changes meaningfully.
export const POSTS = [
  {
    slug: "scalable-rest-api-design",
    title: "How to Design REST APIs That Don't Break Under Load",
    description:
      "Pagination, timeouts, idempotency keys, rate limiting and caching: the API design decisions that keep a Node.js or NestJS backend standing on launch day.",
    category: "Backend",
    keywords: ["REST API design", "scalable APIs", "Node.js", "NestJS", "rate limiting", "idempotency", "pagination"],
    datePublished: "2026-10-17",
    dateModified: "2026-10-17",
    readMinutes: 6,
  },
  {
    slug: "database-schema-design-mistakes",
    title: "8 Database Schema Mistakes That Hurt Startups Later",
    description:
      "Money as floats, timestamps without time zones, missing indexes and locking migrations: PostgreSQL and MongoDB schema mistakes, and the cheap fixes.",
    category: "Databases",
    keywords: ["database schema design", "PostgreSQL", "MongoDB", "indexes", "migrations", "data modelling"],
    datePublished: "2026-10-17",
    dateModified: "2026-10-17",
    readMinutes: 6,
  },
  {
    slug: "authentication-web-mobile-apps",
    title: "Authentication for Web and Mobile Apps: Sessions, JWTs and Refresh Tokens",
    description:
      "How to hash passwords, choose between sessions and JWTs, rotate refresh tokens and store them safely in browsers and React Native apps.",
    category: "Security",
    keywords: ["authentication", "JWT", "refresh tokens", "sessions", "React Native", "password hashing", "API security"],
    datePublished: "2026-10-17",
    dateModified: "2026-10-17",
    readMinutes: 5,
  },
  {
    slug: "core-web-vitals-react",
    title: "Core Web Vitals for React Apps: Fixing LCP, INP and CLS",
    description:
      "A practical guide to faster React, Next.js and Vite sites: what LCP, INP and CLS measure, and the fixes that improve each one.",
    category: "Frontend",
    keywords: ["Core Web Vitals", "React performance", "LCP", "INP", "CLS", "Next.js", "Vite", "SEO"],
    datePublished: "2026-10-17",
    dateModified: "2026-10-17",
    readMinutes: 5,
  },
  {
    slug: "handover-ready-code-checklist",
    title: "Handover-Ready Code: A Checklist for Developers and Startups",
    description:
      "README, environment variables, migrations, tests, CI, decision records and account ownership: what a clean software handover needs.",
    category: "Process",
    keywords: ["code handover", "documentation", "README", "software maintenance", "freelance developer", "startups"],
    datePublished: "2026-10-17",
    dateModified: "2026-10-17",
    readMinutes: 5,
  },
];

export const postPath = (post) => `/blog/${post.slug}`;
export const findPost = (slug) => POSTS.find((post) => post.slug === slug);

// Post bodies are split into their own chunks so the homepage doesn't download them.
const loaders = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default" });
const bodies = {};

export async function loadPost(slug) {
  bodies[slug] ??= await loaders[`../content/blog/${slug}.md`]();
  return bodies[slug];
}

// Synchronous read for rendering; the body must have been loaded first (main.jsx does this
// before hydrating, entry-server.jsx before prerendering).
export const postBody = (slug) => bodies[slug];

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const formatDate = (iso) => DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
