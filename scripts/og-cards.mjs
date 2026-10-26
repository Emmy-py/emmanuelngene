// Draws one 1200×630 link-preview card per project (name, labels, stack and its screenshot) into
// public/og/<slug>.jpg, which each project page's og:image points at (projectOgImage in src/seo.js).
// Needs the output of `npm run build` and a local Chrome or Edge; run via `npm run og` whenever a
// project is added or its name, tags, stack or screenshot change. The JPEGs are committed, so
// Vercel serves them without a browser. Set CHROME_PATH to override the browser.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const outDir = resolve(root, "public", "og");
// The build deletes its SSR bundle once prerendered, so build a private one for the card data.
const ssrDir = resolve(root, "node_modules", ".og-ssr");

const browser = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((path) => path && existsSync(path));

if (!existsSync(resolve(dist, "assets"))) throw new Error("dist/ is missing; run `npm run build` first");
if (!browser) throw new Error("Chrome or Edge not found; set CHROME_PATH");

execFileSync(process.execPath, [resolve(root, "node_modules/vite/bin/vite.js"), "build", "--ssr", "src/entry-server.jsx", "--outDir", ssrDir, "--logLevel", "warn"], { cwd: root, stdio: "inherit" });
const { ogCards } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
rmSync(ssrDir, { recursive: true, force: true });
const fileUrl = (path) => pathToFileURL(path).href;
const font = (pkg, file) => fileUrl(resolve(root, "node_modules/@fontsource", pkg, "files", file));
const escape = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function cardHtml({ number, name, labels, stack, screenshot, liveHost }) {
  // Long names step down so they stay on two lines beside the screenshot.
  const nameSize = name.length > 16 ? 58 : 72;
  return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  @font-face { font-family: "Jakarta"; font-weight: 800; src: url(${font("plus-jakarta-sans", "plus-jakarta-sans-latin-800-normal.woff2")}); }
  @font-face { font-family: "DM Sans"; font-weight: 400; src: url(${font("dm-sans", "dm-sans-latin-400-normal.woff2")}); }
  @font-face { font-family: "DM Mono"; font-weight: 400; src: url(${font("dm-mono", "dm-mono-latin-400-normal.woff2")}); }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative; background: #000; color: #f5f3ff; font-family: "DM Sans";
    background-image: radial-gradient(55% 75% at 80% 50%, rgba(124, 92, 255, 0.42), transparent 70%),
      radial-gradient(40% 50% at 0% 100%, rgba(124, 92, 255, 0.18), transparent 70%);
  }
  .text { position: absolute; left: 64px; top: 60px; bottom: 56px; width: 470px; display: flex; flex-direction: column; }
  .eyebrow { font-family: "DM Mono"; font-size: 17px; letter-spacing: 0.18em; line-height: 1.6; text-transform: uppercase; color: #a78bfa; }
  h1 { margin-top: 26px; font-family: "Jakarta"; font-weight: 800; font-size: ${nameSize}px; line-height: 1.02; letter-spacing: -0.04em; }
  .labels { margin-top: 22px; font-family: "DM Mono"; font-size: 17px; letter-spacing: 0.08em; text-transform: uppercase; color: #c4b5fd; }
  .stack { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 8px; }
  .stack span { border: 1px solid rgba(167, 139, 250, 0.35); border-radius: 8px; padding: 6px 11px; font-family: "DM Mono"; font-size: 15px; color: #d4d0e6; }
  .foot { margin-top: auto; display: flex; align-items: center; gap: 14px; font-size: 19px; color: #d4d0e6; }
  .foot img { width: 42px; height: 42px; border-radius: 10px; }
  .foot b { color: #f5f3ff; font-weight: 400; }
  .shot {
    position: absolute; left: 580px; top: 95px; width: 680px; height: 425px; overflow: hidden;
    border: 1px solid rgba(167, 139, 250, 0.35); border-radius: 18px; box-shadow: 0 30px 80px -20px rgba(124, 92, 255, 0.6);
  }
  .shot img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
</style></head>
<body>
  <div class="text">
    <p class="eyebrow">Project ${escape(number)}${liveHost ? `<br />${escape(liveHost)}` : ""}</p>
    <h1>${escape(name)}</h1>
    ${labels.length ? `<p class="labels">${labels.map(escape).join(" · ")}</p>` : ""}
    <div class="stack">${stack.map((item) => `<span>${escape(item)}</span>`).join("")}</div>
    <p class="foot"><img src="${fileUrl(resolve(root, "public/logo-mark.png"))}" alt="" /><span><b>Emmanuel Ngene</b> · emmycodes.site</span></p>
  </div>
  <div class="shot"><img src="${fileUrl(resolve(dist, "." + screenshot))}" alt="" /></div>
</body></html>`;
}

mkdirSync(outDir, { recursive: true });
// A throwaway profile keeps headless Chrome separate from an already-open browser.
const work = mkdtempSync(join(tmpdir(), "og-cards-"));
try {
  for (const card of ogCards()) {
    const html = join(work, `${card.slug}.html`);
    const png = join(work, `${card.slug}.png`);
    writeFileSync(html, cardHtml(card));
    execFileSync(
      browser,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--hide-scrollbars",
        "--allow-file-access-from-files",
        `--user-data-dir=${join(work, "profile")}`,
        "--window-size=1200,630",
        "--virtual-time-budget=3000",
        `--screenshot=${png}`,
        pathToFileURL(html).href,
      ],
      { stdio: ["ignore", "ignore", "pipe"], timeout: 120_000 },
    );
    // JPEG and small: WhatsApp drops preview images much over 300 KB.
    const out = resolve(outDir, `${card.slug}.jpg`);
    await sharp(png).resize(1200, 630).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    console.log(`wrote public/og/${card.slug}.jpg (${Math.round(statSync(out).size / 1024)} KB)`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
