const PAIN_POINTS = [
  {
    title: "APIs that crash under load",
    text: "Built without scalability in mind — they fail on launch day.",
  },
  {
    title: "Databases not designed to grow",
    text: "Early schema decisions become expensive problems later.",
  },
  {
    title: "Security gaps and auth vulnerabilities",
    text: "Exposing user data and creating legal liability from day one.",
  },
  {
    title: "Developers who disappear post-delivery",
    text: "Undocumented code no one can maintain or build on.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-border px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <div className="grid grid-cols-2 items-start gap-20 max-[900px]:grid-cols-1 max-sm:gap-11">
        <div>
          <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
            // About
          </p>
          <h2 className="reveal mb-5 font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
            Your startup deserves a backend that doesn't break.
          </h2>
          <div className="reveal space-y-4.5 text-base text-fg2 leading-[1.82]">
            <p>
              I'm a backend and full-stack developer specializing in{" "}
              <strong className="font-medium text-fg">
                Node.js, NestJS, FastAPI, scalable database architecture, API design,
                microservices, distributed systems, Docker, Kubernetes, and CI/CD pipelines
              </strong>
              . I build the systems that keep your product running — under load, at launch, and
              long after.
            </p>
            <p>
              With proven expertise in <strong className="font-medium text-fg">backend engineering</strong>, I integrate
              intelligent workflows, robust data pipelines, and performance optimization into
              backend systems across diverse industries.
            </p>
            <p>
              Whether you're a founder with a sketch or a team needing a senior hand, I deliver
              clean, documented, handover-ready code — every time.
            </p>
          </div>
        </div>
        <div className="reveal">
          <p className="mb-3.25 font-mono text-[0.66rem] tracking-[0.15em] text-accent uppercase">
            // Most startups struggle with
          </p>
          <ul className="mt-8.5 flex list-none flex-col gap-2.75">
            {PAIN_POINTS.map(({ title, text }) => (
              <li
                className="flex items-start gap-3.5 border border-border bg-card px-4.25 py-3.75 transition-[border-color,background] duration-200 hover:border-border-accent hover:bg-card-hover"
                key={title}
              >
                <span className="mt-1.75 h-1.75 w-1.75 rounded-[1px] bg-accent"></span>
                <span className="text-[0.9rem] text-fg2 leading-[1.6]">
                  <strong className="mb-0.5 block text-[0.86rem] text-fg">{title}</strong>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
