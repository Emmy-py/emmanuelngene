// Minimal Markdown parser for blog posts: just the syntax the posts use (## / ### headings,
// paragraphs, - and 1. lists, fenced code blocks). Inline syntax (`code`, **bold**, [links](url))
// is handled by components/Markdown.jsx. Shared by the renderer and the prerender checks so the
// table of contents and word count always match what's on the page.

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[`*]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function parseMarkdown(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      blocks.push({ type: "code", lang, text: code.join("\n") });
      i += 1;
      continue;
    }

    const heading = line.match(/^(##|###) (.+)$/);
    if (heading) {
      const text = heading[2].trim();
      blocks.push({ type: heading[1] === "##" ? "h2" : "h3", text, id: slugify(text) });
      i += 1;
      continue;
    }

    const listMatch = line.match(/^(- |\d+\. )/);
    if (listMatch) {
      const ordered = listMatch[1] !== "- ";
      const pattern = ordered ? /^\d+\. / : /^- /;
      const items = [];
      while (i < lines.length && pattern.test(lines[i])) items.push(lines[i++].replace(pattern, ""));
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^(```|##|- |\d+\. )/.test(lines[i])) {
      para.push(lines[i++].trim());
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }

  return blocks;
}

// Words of prose (code blocks excluded), for the schema wordCount and the reading time.
export function countWords(md) {
  return parseMarkdown(md)
    .filter((block) => block.type !== "code")
    .flatMap((block) => block.items ?? [block.text])
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split(/\s+/)
    .filter((word) => /[a-z0-9]/i.test(word)).length;
}

export const readingMinutes = (md) => Math.max(1, Math.round(countWords(md) / 220));
