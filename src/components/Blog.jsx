import { ArrowRight } from "lucide-react";
import PostCard from "./PostCard";
import SectionIntro from "./SectionIntro";
import { POSTS } from "../data/posts";

// Homepage teaser: the three latest posts, plus a link to the full list at /blog.
export default function Blog() {
  return (
    <section id="blog" className="bg-bg2 px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionIntro
          center
          badge="Blog"
          title="Notes on building software."
          lead="Practical guides on APIs, databases, security and performance for web and mobile apps."
        />
        <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
          {POSTS.slice(0, 3).map((post) => (
            <div key={post.slug} className="reveal">
              <PostCard post={post} />
            </div>
          ))}
        </div>
        <div className="reveal mt-12 text-center">
          <a
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-xl border border-border-accent px-6 py-3 text-[0.9rem] font-medium text-fg no-underline transition-[border-color,background] duration-200 hover:border-accent hover:bg-accent-muted"
          >
            All articles
            <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
