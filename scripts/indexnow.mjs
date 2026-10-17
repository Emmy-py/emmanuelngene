// Pings IndexNow (Bing, Yandex, Seznam, ...) with every URL in the live sitemap.
// Run after a production deploy: `npm run indexnow`. Also runs from
// .github/workflows/indexnow.yml when Vercel reports a successful production deployment.
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "emmycodes.site";
const SITE_URL = `https://${HOST}`;

// The key is the name of the 32-hex-character .txt file in public/ (its content is the key too).
const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public");
const keyFile = readdirSync(publicDir).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file not found in public/");
const key = keyFile.replace(".txt", "");

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`).then((res) => {
  if (!res.ok) throw new Error(`Fetching sitemap failed: ${res.status}`);
  return res.text();
});
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE_URL}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 400) process.exit(1);
