export default function ProjectCard({
  number,
  logo,
  logoAlt,
  logoClass,
  tags,
  title,
  description,
  links,
  outcomeLabel,
  outcomes,
  stack,
}) {
  return (
    <div className="reveal group relative mb-0.5 overflow-hidden border border-border transition-colors duration-250 hover:border-border-accent">
      <div className="grid min-h-[400px] grid-cols-2 max-[900px]:grid-cols-1">
        <div className="flex flex-col justify-between border-r border-border px-10.5 py-11.5 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-border max-[900px]:px-7 max-[900px]:py-8.5 max-sm:px-5 max-sm:py-6.5">
          <div>
            <div className="mb-4.5 flex items-start gap-4">
              <img src={logo} alt={logoAlt} className={logoClass} />
              <div className="flex flex-wrap gap-1.75">
                {tags.map(({ tagClass, label }) => (
                  <span className={tagClass} key={label}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mb-3.25 font-syne text-[clamp(1.3rem,2vw,1.8rem)] font-extrabold tracking-[-0.04em] leading-[1.1] text-fg">
              {title}
            </h3>
            <p className="flex-1 text-[0.88rem] text-fg2 leading-[1.75]">{description}</p>
          </div>
          <div className="mt-6.5 flex flex-wrap gap-2.5">
            {links.map(({ href, label, primary }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={
                  primary
                    ? "inline-flex items-center gap-1.75 border border-accent bg-accent px-4.5 py-2.5 font-mono text-[0.68rem] tracking-[0.07em] text-bg uppercase no-underline transition-all duration-200 hover:opacity-85"
                    : "inline-flex items-center gap-1.75 border border-border px-4.5 py-2.5 font-mono text-[0.68rem] tracking-[0.07em] text-fg2 uppercase no-underline transition-all duration-200 hover:border-border-accent hover:text-accent"
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between bg-card px-10.5 py-11.5 max-[900px]:px-7 max-[900px]:py-8.5 max-sm:px-5 max-sm:py-6.5">
          <div>
            <p className="mb-2.75 font-mono text-[0.6rem] tracking-[0.15em] text-accent uppercase">
              {outcomeLabel}
            </p>
            <ul className="mb-6 flex list-none flex-col gap-2">
              {outcomes.map((item) => (
                <li
                  className="flex gap-2.5 text-[0.85rem] text-fg2 leading-[1.5] before:mt-px before:shrink-0 before:font-mono before:text-[0.76rem] before:text-accent before:content-['→']"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border pt-5.5">
            {stack.map((item) => (
              <span
                className="border border-border bg-card px-2 py-1 font-mono text-[0.63rem] tracking-[0.04em] text-fg2 transition-colors duration-200 group-hover:border-border-accent group-hover:text-fg"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-4.5 right-7 font-syne text-[5.5rem] font-extrabold leading-none text-border select-none max-sm:bottom-3 max-sm:right-4.5 max-sm:text-[3.6rem]">
        {number}
      </div>
    </div>
  );
}
