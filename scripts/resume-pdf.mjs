// Prints dist/resume.html (written by `npm run build`) to public/emmanuel-ngene-resume.pdf with a
// locally installed Chrome or Edge. The PDF is committed, so Vercel serves it without a browser.
// Run via `npm run resume` whenever projects, roles or skills change. Set CHROME_PATH to override.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = resolve(root, "dist", "resume.html");
const output = resolve(root, "public", "emmanuel-ngene-resume.pdf");

const browser = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((path) => path && existsSync(path));

if (!existsSync(input)) throw new Error("dist/resume.html is missing; run `npm run build` first");
if (!browser) throw new Error("Chrome or Edge not found; set CHROME_PATH");

// A throwaway profile keeps headless Chrome separate from an already-open browser, so it exits
// once the PDF is written instead of lingering.
const profileDir = mkdtempSync(join(tmpdir(), "resume-pdf-"));
try {
  execFileSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      `--user-data-dir=${profileDir}`,
      "--no-pdf-header-footer",
      `--print-to-pdf=${output}`,
      pathToFileURL(input).href,
    ],
    { stdio: ["ignore", "ignore", "pipe"], timeout: 120_000 },
  );
} finally {
  rmSync(profileDir, { recursive: true, force: true });
}
console.log(`wrote public/emmanuel-ngene-resume.pdf (${Math.round(statSync(output).size / 1024)} KB)`);
