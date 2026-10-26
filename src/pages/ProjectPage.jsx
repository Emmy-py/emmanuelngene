import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/projects";

const SECTION_LABEL = "mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase";
const SECTION_HEADING =
  "mb-4 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-extrabold tracking-[-0.03em] leading-[1.15] text-fg";

export default function ProjectPage({ project }) {
  const {
    slug,
    name,
    logo,
    logoAlt,
    logoClass,
    logoSize = 46,
    screenshot,
    tags,
    title,
    overview,
    contribution,
    links,
    outcomeLabel,
    outcomes,
    stack,
    contributionOnly,
  } = project;
  const others = PROJECTS.filter((p) => p.slug !== slug);
  const live = links.find((link) => link.primary);
  const secondary = links.filter((link) => !link.primary);

  return (
    <article className="px-[max(20px,5vw)] pt-36 pb-27.5 max-sm:px-[max(22px,6vw)] max-sm:pt-28 max-sm:pb-20">
      <nav
        aria-label="Breadcrumb"
        className="mb-10 font-mono text-[0.66rem] tracking-[0.1em] text-fg2 uppercase"
      >
        <a href="/" className="text-fg2 no-underline hover:text-accent">
          Emmanuel Ngene
        </a>
        <span className="mx-2">/</span>
        <a href="/#projects" className="text-fg2 no-underline hover:text-accent">
          Projects
        </a>
        <span className="mx-2">/</span>
        <span className="text-fg">{name}</span>
      </nav>

      <header className="mb-14 max-w-[860px]">
        <div className="mb-5 flex items-start gap-4">
          <img
            src={logo}
            alt={`${logoAlt} logo`}
            width={logoSize}
            height={logoSize}
            className={logoClass}
          />
          <div className="flex flex-wrap gap-1.75">
            {tags.map(({ tagClass, label }) => (
              <span className={tagClass} key={label}>
                {label}
              </span>
            ))}
          </div>
        </div>
        <h1 className="mb-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold tracking-[-0.04em] leading-[1.05]">
          {title}
        </h1>
        <p className="text-base text-fg2 leading-[1.8]">
          {contributionOnly ? "A project " : "A project by "}
          <a
            href="/"
            className="text-fg underline decoration-accent underline-offset-3 hover:text-accent"
          >
            Emmanuel Ngene
          </a>
          {contributionOnly ? " contributed to as a collaborating developer." : ", full-stack developer."}
        </p>

        {/* The live site is the point of the page: offer it before any reading, not only in the sidebar. */}
        {live && (
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={live.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-2 px-6 py-3.5 font-display text-[0.95rem] font-bold text-on-accent no-underline shadow-[0_16px_40px_-16px_var(--glow)] transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              {live.label}
              <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <span className="font-mono text-[0.72rem] tracking-[0.04em] text-fg2">{new URL(live.href).host}</span>
            {secondary.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 text-[0.88rem] text-fg2 underline decoration-border-accent underline-offset-4 hover:text-accent"
              >
                {label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </header>

      {screenshot && (
        <div className="mb-16 overflow-hidden rounded-2xl border border-border-accent shadow-[0_30px_70px_-30px_var(--glow)]">
          {live ? (
            // The screenshot opens the live site too: it's what people instinctively click.
            <a href={live.href} target="_blank" rel="noopener" className="block">
              <img
                src={screenshot}
                alt={`${name} website home page (opens the live site)`}
                width="800"
                height="500"
                fetchpriority="high"
                className="block h-auto w-full animate-[riseIn_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
              />
            </a>
          ) : (
            <img
              src={screenshot}
              alt={`${name} website home page`}
              width="800"
              height="500"
              fetchpriority="high"
              className="block h-auto w-full animate-[riseIn_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
            />
          )}
        </div>
      )}

      <div className="grid grid-cols-[1fr_340px] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <div className="max-w-[720px] space-y-12">
          <section>
            <p className={SECTION_LABEL}>// Overview</p>
            <h2 className={SECTION_HEADING}>What {name} is</h2>
            <p className="text-[0.97rem] text-fg2 leading-[1.85]">{overview}</p>
          </section>
          <section>
            <p className={SECTION_LABEL}>// My role</p>
            <h2 className={SECTION_HEADING}>What I built</h2>
            <p className="text-[0.97rem] text-fg2 leading-[1.85]">{contribution}</p>
          </section>
          <section>
            <p className={SECTION_LABEL}>{outcomeLabel}</p>
            <h2 className={SECTION_HEADING}>Highlights</h2>
            <ul className="flex list-none flex-col gap-2.5">
              {outcomes.map((item) => (
                <li
                  className="flex gap-2.5 text-[0.95rem] text-fg2 leading-[1.6] before:mt-px before:shrink-0 before:font-mono before:text-[0.8rem] before:text-accent before:content-['→']"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="border border-border bg-card px-7 py-8 max-sm:px-5 max-sm:py-6.5">
          <h2 className="mb-4 font-mono text-[0.66rem] tracking-[0.15em] text-accent uppercase">
            // Tech stack
          </h2>
          <ul className="mb-8 flex list-none flex-wrap gap-1.5">
            {stack.map((item) => (
              <li
                className="border border-border bg-card px-2 py-1 font-mono text-[0.68rem] tracking-[0.04em] text-fg2"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
          <h2 className="mb-4 font-mono text-[0.66rem] tracking-[0.15em] text-accent uppercase">
            // Links
          </h2>
          <div className="flex flex-col gap-2.5">
            {links.map(({ href, label, primary }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener"
                className={
                  primary
                    ? "inline-flex items-center justify-center gap-1.75 rounded-xl border border-accent-2 bg-accent-2 px-4.5 py-2.5 font-mono text-[0.68rem] tracking-[0.07em] text-on-accent uppercase no-underline transition-all duration-200 hover:opacity-85"
                    : "inline-flex items-center justify-center gap-1.75 rounded-xl border border-border px-4.5 py-2.5 font-mono text-[0.68rem] tracking-[0.07em] text-fg2 uppercase no-underline transition-all duration-200 hover:border-border-accent hover:text-accent"
                }
              >
                {label}
              </a>
            ))}
          </div>
        </aside>
      </div>

      <section className="mt-24 border-t border-border pt-14">
        <p className={SECTION_LABEL}>// More work</p>
        <h2 className={SECTION_HEADING}>More projects by Emmanuel Ngene</h2>
        <ul className="mt-6 grid list-none grid-cols-2 gap-px bg-border max-[900px]:grid-cols-1">
          {others.map((p) => (
            <li key={p.slug} className="bg-bg">
              <a
                href={`/projects/${p.slug}`}
                className="block h-full px-6 py-6 no-underline transition-colors duration-200 hover:bg-card-hover"
              >
                <span className="mb-1.5 block font-display text-[1.02rem] font-bold tracking-[-0.02em] text-fg">
                  {p.title}
                </span>
                <span className="block text-[0.86rem] text-fg2 leading-[1.6]">{p.summary}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/#contact"
          className="mt-12 inline-flex items-center gap-2 rounded-xl bg-accent-2 px-8.5 py-3.75 font-mono text-[0.75rem] tracking-[0.1em] text-on-accent uppercase no-underline transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-85"
        >
          Hire Emmanuel for your project →
        </a>
      </section>
    </article>
  );
}
