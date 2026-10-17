import { ArrowUpRight } from "lucide-react";
import Markdown from "../components/Markdown";
import PostCard from "../components/PostCard";
import { POSTS, formatDate, postBody } from "../data/posts";
import { parseMarkdown } from "../lib/markdown";
import { PERSON_PHOTO } from "../site";

export default function BlogPost({ post }) {
  const body = postBody(post.slug);
  const toc = parseMarkdown(body).filter((block) => block.type === "h2");
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="px-[max(20px,5vw)] pt-36 pb-27.5 max-sm:px-[max(22px,6vw)] max-sm:pt-28 max-sm:pb-20">
      <div className="mx-auto max-w-[1160px]">
        <nav aria-label="Breadcrumb" className="mb-10 font-mono text-[0.66rem] tracking-[0.1em] text-fg2 uppercase">
          <a href="/" className="text-fg2 no-underline hover:text-accent">
            Emmanuel Ngene
          </a>
          <span className="mx-2">/</span>
          <a href="/blog" className="text-fg2 no-underline hover:text-accent">
            Blog
          </a>
          <span className="mx-2">/</span>
          <span className="text-fg">{post.category}</span>
        </nav>

        <header className="mb-12 max-w-[820px] animate-[fadeUp_0.6s_ease-out_both]">
          <span className="mb-5 inline-flex rounded-full border border-border-accent bg-accent-muted px-3 py-1 font-mono text-[0.64rem] tracking-[0.12em] text-accent uppercase">
            {post.category}
          </span>
          <h1 className="mb-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold tracking-[-0.04em] leading-[1.08]">
            {post.title}
          </h1>
          <div className="flex items-center gap-3.5">
            <img src={PERSON_PHOTO} alt="" width="44" height="44" className="h-11 w-11 rounded-full border border-border-accent object-cover" />
            <div className="text-[0.88rem] leading-[1.5]">
              <a href="/" rel="author" className="font-semibold text-fg no-underline hover:text-accent">
                Emmanuel Ngene
              </a>
              <div className="text-fg2">
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time> &middot; {post.readMinutes} min read
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-[minmax(0,1fr)_260px] items-start gap-16 max-[1000px]:grid-cols-1 max-[1000px]:gap-0">
          <div className="max-w-[720px] min-w-0 border-t border-border pt-2">
            <Markdown source={body} />
          </div>

          <aside className="sticky top-28 max-[1000px]:hidden" aria-label="Table of contents">
            <h2 className="mb-4 font-mono text-[0.66rem] tracking-[0.15em] text-accent uppercase">On this page</h2>
            <ol className="list-none space-y-2.5 border-l border-border pl-4">
              {toc.map(({ id, text }) => (
                <li key={id}>
                  <a href={`#${id}`} className="block text-[0.84rem] text-fg2 no-underline leading-[1.45] transition-colors duration-200 hover:text-accent">
                    {text.replace(/`/g, "")}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <aside className="mt-16 flex max-w-[720px] items-start gap-5 rounded-2xl border border-border-accent bg-card p-7 max-sm:flex-col max-sm:p-6">
          <img src={PERSON_PHOTO} alt="Emmanuel Ngene" width="72" height="72" loading="lazy" className="h-18 w-18 shrink-0 rounded-full object-cover" />
          <div>
            <p className="mb-1 font-mono text-[0.64rem] tracking-[0.14em] text-accent uppercase">Written by</p>
            <p className="mb-2 font-display text-[1.15rem] font-bold text-fg">Emmanuel Ngene (Emmy)</p>
            <p className="mb-4 text-[0.92rem] text-fg2 leading-[1.7]">
              Full-stack developer in Nigeria, building fast, scalable web and mobile apps for startups and
              organizations with React, Next.js, React Native, Node.js and Python.
            </p>
            <a
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-2 to-[var(--grad-a)] px-5.5 py-2.75 text-[0.88rem] font-medium text-on-accent no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              Work with me
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </aside>

        <section className="mt-24 border-t border-border pt-14">
          <h2 className="mb-8 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-extrabold tracking-[-0.03em] text-fg">
            More articles
          </h2>
          <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
            {others.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
