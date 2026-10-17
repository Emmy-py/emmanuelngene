import PostCard from "../components/PostCard";
import { POSTS } from "../data/posts";

export default function BlogIndex() {
  return (
    <section className="px-[max(20px,5vw)] pt-36 pb-27.5 max-sm:px-[max(22px,6vw)] max-sm:pt-28 max-sm:pb-20">
      <div className="mx-auto max-w-[1240px]">
        <nav aria-label="Breadcrumb" className="mb-10 font-mono text-[0.66rem] tracking-[0.1em] text-fg2 uppercase">
          <a href="/" className="text-fg2 no-underline hover:text-accent">
            Emmanuel Ngene
          </a>
          <span className="mx-2">/</span>
          <span className="text-fg">Blog</span>
        </nav>

        <header className="mb-14 max-w-[760px] animate-[fadeUp_0.6s_ease-out_both]">
          <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold tracking-[-0.04em] leading-[1.05]">
            Blog
          </h1>
          <p className="text-[1.05rem] text-fg2 leading-[1.8]">
            Practical guides by{" "}
            <a href="/" className="text-fg underline decoration-accent underline-offset-3 hover:text-accent">
              Emmanuel Ngene
            </a>{" "}
            on building web and mobile apps that hold up in production: API design, databases,
            authentication, performance and clean handovers.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
          {POSTS.map((post, i) => (
            <div key={post.slug} className="animate-[fadeUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.05 + i * 0.06}s` }}>
              <PostCard post={post} headingLevel={2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
