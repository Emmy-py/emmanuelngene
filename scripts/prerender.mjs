// Runs after `vite build` and the SSR build (see package.json). Renders every route to static
// HTML in dist/, then writes the build-time files that depend on the route list: sitemap.xml
// llms.txt and rss.xml. Fails the build if any JSON-LD block is not valid JSON.
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");

const { SITE_URL, getPages, ogCards, preparePosts, render, renderHead, renderResume, llmsTxt, rssXml } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);

// Last commit date touching site content; falls back to the build date when git history isn't
// available (e.g. a build environment without the .git directory).
function lastModified() {
  try {
    const date = execSync("git log -1 --format=%cs -- src public index.html", {
      cwd: root,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {
    // no git available
  }
  return new Date().toISOString().slice(0, 10);
}

const lastmod = lastModified();
// Inline the (small) stylesheet so it doesn't block first paint with an extra request.
// Fonts used above the fold are preloaded so they arrive with first paint instead of
// swapping in later and shifting the layout.
const PRELOAD_FONTS = [/plus-jakarta-sans-latin-800-normal/, /dm-sans-latin-400-normal/, /dm-mono-latin-400-normal/];
const template = readFileSync(resolve(dist, "index.html"), "utf8").replace(
  /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/,
  (_, href) => {
    const css = readFileSync(resolve(dist, "." + href), "utf8");
    const fonts = [...css.matchAll(/url\((\/assets\/[^)]+\.woff2)\)/g)]
      .map((m) => m[1])
      .filter((url) => PRELOAD_FONTS.some((re) => re.test(url)));
    const preloads = [...new Set(fonts)].map(
      (url) => `<link rel="preload" as="font" type="font/woff2" href="${url}" crossorigin />`,
    );
    return [...preloads, `<style>${css}</style>`].join("\n    ");
  },
);
// Every project page points its og:image at its own card (projectOgImage in src/seo.js).
const missingCards = ogCards().filter(({ slug }) => !existsSync(resolve(root, "public", "og", `${slug}.jpg`)));
if (missingCards.length) {
  throw new Error(`No share card for ${missingCards.map(({ slug }) => slug).join(", ")}: run "npm run og"`);
}

await preparePosts();
const pages = getPages(lastmod);

for (const page of pages) {
  const html = template
    .replace("<!--head-->", renderHead(page.meta))
    .replace("<!--app-->", render(page.path));

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch (err) {
      throw new Error(`Invalid JSON-LD in ${page.file}: ${err.message}`);
    }
  }
  if (/noindex/i.test(html)) throw new Error(`${page.file} contains "noindex"`);

  const out = resolve(dist, page.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`prerendered ${page.path} -> dist/${page.file}`);
}

// Print-only resume page (not in the sitemap): no theme or app scripts, A4 page box, and asset
// URLs made relative so the fonts also load when Chrome prints it from file:// (npm run resume).
const resume = template
  .replace("<!--head-->", "<title>Emmanuel Ngene — Resume</title>\n    <style>@page { size: A4; margin: 12mm 0 }</style>")
  .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex" />')
  .replace(/ data-theme="dark"/, "")
  .replace(/<script>[\s\S]*?<\/script>/, "")
  .replace(/<script type="module"[\s\S]*?<\/script>/, "")
  .replace(/<link rel="preload"[^>]*>\s*/g, "")
  .replace(/<body class="[^"]*">/, '<body class="bg-white">')
  .replace("<!--app-->", renderResume())
  .replaceAll("url(/assets/", "url(assets/");
writeFileSync(resolve(dist, "resume.html"), resume);
console.log("prerendered resume -> dist/resume.html");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((page) => page.inSitemap)
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${page.lastmod ?? lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(resolve(dist, "sitemap.xml"), sitemap);
writeFileSync(resolve(dist, "llms.txt"), llmsTxt());
writeFileSync(resolve(dist, "rss.xml"), rssXml());
console.log(`wrote sitemap.xml (lastmod ${lastmod}), llms.txt and rss.xml`);

rmSync(ssrDir, { recursive: true, force: true });
