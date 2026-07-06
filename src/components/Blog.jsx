const POSTS = [
  {
    category: "Backend",
    date: "Jan 2026",
    title: "Designing APIs That Don't Break Under Load",
    excerpt:
      "Most APIs fail not because of bad code, but bad assumptions about traffic. Here's how I design endpoints that hold up on launch day.",
  },
  {
    category: "Databases",
    date: "Dec 2025",
    title: "Why Your Database Schema Will Bite You Later",
    excerpt:
      "Early schema shortcuts feel harmless — until you're migrating a live table with a million rows. A few principles that save you the pain.",
  },
  {
    category: "Process",
    date: "Nov 2025",
    title: "From Sketch to Production: My Backend Delivery Process",
    excerpt:
      "A look at the discovery-to-handover workflow I use to ship backends startups can actually build on.",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="border-t border-border bg-bg2 px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // Blog
      </p>
      <h2 className="reveal mb-5 font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
        Thoughts on building better backends.
      </h2>
      <p className="reveal mb-14 max-w-[620px] text-[0.97rem] text-fg2 leading-[1.8]">
        Notes on APIs, databases, and shipping backend systems that hold up in production.
      </p>
      <div className="reveal grid grid-cols-3 gap-px bg-border max-[900px]:grid-cols-1">
        {POSTS.map(({ category, date, title, excerpt }) => (
          <div
            key={title}
            className="flex flex-col bg-bg px-7.5 py-8.5 transition-colors duration-200 hover:bg-card-hover"
          >
            <div className="mb-3.5 flex items-center gap-2.5">
              <span className="border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase">
                {category}
              </span>
              <span className="font-mono text-[0.62rem] tracking-[0.05em] text-fg2 uppercase">
                {date}
              </span>
            </div>
            <h3 className="mb-2.75 font-syne text-[1.05rem] font-bold tracking-[-0.02em] leading-[1.3] text-fg">
              {title}
            </h3>
            <p className="mb-4 flex-1 text-[0.86rem] text-fg2 leading-[1.7]">{excerpt}</p>
            <span className="font-mono text-[0.65rem] tracking-[0.08em] text-fg2/60 uppercase">
              Full post coming soon
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
