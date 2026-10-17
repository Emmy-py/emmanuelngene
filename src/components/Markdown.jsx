import { parseMarkdown } from "../lib/markdown";

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function Inline({ text }) {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
      return (
        <code key={i} className="rounded-md border border-border bg-bg3 px-1.5 py-0.5 font-mono text-[0.84em] text-fg">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:/.test(link[2]);
      return (
        <a
          key={i}
          href={link[2]}
          {...(external && { target: "_blank", rel: "noopener" })}
          className="text-fg underline decoration-accent underline-offset-3 hover:text-accent"
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

// Renders a blog post body. h2s get ids so the table of contents can link to them.
export default function Markdown({ source }) {
  return parseMarkdown(source).map((block, i) => {
    switch (block.type) {
      case "h2":
        return (
          <h2
            key={i}
            id={block.id}
            className="mt-14 mb-5 scroll-mt-28 font-display text-[clamp(1.4rem,2.6vw,1.8rem)] font-extrabold tracking-[-0.03em] text-fg leading-[1.2]"
          >
            <Inline text={block.text} />
          </h2>
        );
      case "h3":
        return (
          <h3 key={i} id={block.id} className="mt-9 mb-3.5 scroll-mt-28 font-display text-[1.18rem] font-bold tracking-[-0.02em] text-fg">
            <Inline text={block.text} />
          </h3>
        );
      case "ul":
      case "ol": {
        const List = block.type;
        return (
          <List
            key={i}
            className={`my-6 space-y-2.5 pl-6 text-[1.02rem] text-fg2 leading-[1.8] marker:text-accent ${
              block.type === "ol" ? "list-decimal" : "list-disc"
            }`}
          >
            {block.items.map((item, j) => (
              <li key={j} className="pl-1">
                <Inline text={item} />
              </li>
            ))}
          </List>
        );
      }
      case "code":
        return (
          <pre
            key={i}
            className="my-7 overflow-x-auto rounded-2xl border border-border bg-bg3 p-5 font-mono text-[0.84rem] text-fg leading-[1.7] max-sm:-mx-1 max-sm:p-4 max-sm:text-[0.78rem]"
          >
            <code>{block.text}</code>
          </pre>
        );
      default:
        return (
          <p key={i} className="my-5 text-[1.02rem] text-fg2 leading-[1.85]">
            <Inline text={block.text} />
          </p>
        );
    }
  });
}
