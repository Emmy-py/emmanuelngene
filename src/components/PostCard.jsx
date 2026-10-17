import { ArrowUpRight } from "lucide-react";
import { formatDate, postPath } from "../data/posts";

// Blog post card for the homepage and /blog. `headingLevel` keeps the outline correct: h3 under
// the homepage section's h2, h2 under the /blog page's h1.
export default function PostCard({ post, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-[transform,border-color,background,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-border-accent hover:bg-card-hover hover:shadow-[0_24px_50px_-28px_var(--glow)] max-sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-2.5 font-mono text-[0.64rem] tracking-[0.1em] uppercase">
        <span className="rounded-full border border-border-accent bg-accent-muted px-2.5 py-1 text-accent">{post.category}</span>
        <time dateTime={post.datePublished} className="text-fg2">
          {formatDate(post.datePublished)}
        </time>
        <span className="text-fg2">&middot; {post.readMinutes} min read</span>
      </div>
      <Heading className="mb-3 font-display text-[1.15rem] font-bold tracking-[-0.02em] text-fg leading-[1.3]">
        {/* Stretched link: the whole card is clickable, with the title as the accessible name. */}
        <a href={postPath(post)} className="text-fg no-underline after:absolute after:inset-0 after:rounded-2xl">
          {post.title}
        </a>
      </Heading>
      <p className="mb-6 flex-1 text-[0.9rem] text-fg2 leading-[1.7]">{post.description}</p>
      <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-accent" aria-hidden="true">
        Read article
        <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </article>
  );
}
