import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { POSTS, formatDate, loadPost, postBody, postPath } from "./data/posts";
import { PROJECTS } from "./data/projects";
import { countWords, readingMinutes } from "./lib/markdown";
import { PERSON, SITE_URL } from "./site";
import { blogMeta, homeMeta, notFoundMeta, postMeta, projectMeta, projectPath, renderHead } from "./seo";

// Loads every post body so the pages below can render synchronously. Fails the build if a post's
// stated reading time no longer matches its text.
export async function preparePosts() {
  for (const post of POSTS) {
    const body = await loadPost(post.slug);
    const minutes = readingMinutes(body);
    if (minutes !== post.readMinutes) {
      throw new Error(`${post.slug}: readMinutes is ${post.readMinutes}, but the text reads in ${minutes} min`);
    }
  }
}

// Every page written to dist/ at build time. `file` is relative to dist/; vercel.json's
// cleanUrls serves projects/<slug>.html at /projects/<slug>, and Vercel serves 404.html for
// unknown paths. `lastmod` overrides the site-wide date in the sitemap. Call preparePosts() first.
export function getPages(lastmod) {
  return [
    { path: "/", file: "index.html", meta: homeMeta(lastmod), inSitemap: true },
    ...PROJECTS.map((project) => ({
      path: projectPath(project),
      file: `projects/${project.slug}.html`,
      meta: projectMeta(project),
      inSitemap: true,
    })),
    { path: "/blog", file: "blog.html", meta: blogMeta(), inSitemap: true },
    ...POSTS.map((post) => ({
      path: postPath(post),
      file: `blog/${post.slug}.html`,
      meta: postMeta(post, countWords(loadedBody(post))),
      inSitemap: true,
      lastmod: post.dateModified,
    })),
    { path: "/404", file: "404.html", meta: notFoundMeta(), inSitemap: false },
  ];
}

export function render(path) {
  return renderToString(<App path={path} />);
}

function loadedBody(post) {
  const body = postBody(post.slug);
  if (!body) throw new Error(`call preparePosts() before getPages(): ${post.slug} is not loaded`);
  return body;
}

export { SITE_URL, renderHead };

const escapeXml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function rssXml() {
  const items = POSTS.map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}${postPath(post)}</link>
      <guid isPermaLink="true">${SITE_URL}${postPath(post)}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(`${post.datePublished}T09:00:00Z`).toUTCString()}</pubDate>
      <author>${PERSON.email} (${PERSON.name})</author>
    </item>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Emmy.codes Blog — Emmanuel Ngene</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Guides by Emmanuel Ngene on building web and mobile apps that hold up in production.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
}

export function llmsTxt() {
  const projects = PROJECTS.map(
    (project) => `- [${project.title}](${SITE_URL}${projectPath(project)}): ${project.summary}`,
  ).join("\n");
  const posts = POSTS.map(
    (post) => `- [${post.title}](${SITE_URL}${postPath(post)}) (${formatDate(post.datePublished)}): ${post.description}`,
  ).join("\n");
  return `# Emmanuel Ngene (Emmy) — emmycodes

> ${PERSON.description}

Emmanuel Ngene, also known as Ngene Emmanuel Somto or "Emmy" (brand: emmycodes / Emmy.codes), is a full-stack developer based in Nigeria, currently a software engineer at Dawnily Technology and MindTheGap, and a former intern at Genesys Tech Hub. Some of his work is under NDA, including a government app with more than 300 screens. He builds production-ready web and mobile products end to end: React, Next.js and React Native on the frontend; Node.js, NestJS, Python and FastAPI on the backend; PostgreSQL and MongoDB for data. He is available for freelance work.

## Key pages

- [Home / portfolio](${SITE_URL}/): about, services, projects, process and contact
- [About](${SITE_URL}/#about)
- [Projects](${SITE_URL}/#projects)
- [Blog](${SITE_URL}/blog): guides on APIs, databases, authentication and performance
- [Contact](${SITE_URL}/#contact)

## Projects

${projects}

## Blog

${posts}

## Profiles

- GitHub: https://github.com/Emmy-py
- LinkedIn: https://www.linkedin.com/in/emmanuel-ngene-708337263
- X (Twitter): https://x.com/_devemmy
- TikTok: https://www.tiktok.com/@_devemmy
- Instagram (portfolio): https://www.instagram.com/_devemmy
- Email: ${PERSON.email}
`;
}
