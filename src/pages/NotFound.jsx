import { PROJECTS } from "../data/projects";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] px-[max(20px,5vw)] pt-40 pb-27.5 max-sm:px-[max(22px,6vw)] max-sm:pt-32">
      <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // 404
      </p>
      <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
        Page not found.
      </h1>
      <p className="mb-9 max-w-[560px] text-[0.97rem] text-fg2 leading-[1.8]">
        The page you're looking for doesn't exist or has moved. Head back to Emmanuel Ngene's
        portfolio, or jump straight to one of the projects below.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-accent-2 px-8.5 py-3.75 font-mono text-[0.75rem] tracking-[0.1em] text-on-accent uppercase no-underline transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-85"
      >
        Back to the homepage →
      </a>
      <h2 className="mt-16 mb-4 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // Projects
      </h2>
      <ul className="flex list-none flex-col gap-2.5">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <a href={`/projects/${project.slug}`} className="text-fg2 hover:text-accent">
              {project.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
