import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-border px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // Projects
      </p>
      <h2 className="reveal mb-5 font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
        Shipped. Live. Scalable.
      </h2>
      <p className="reveal mb-15 max-w-[640px] text-[0.97rem] text-fg2 leading-[1.8]">
        Explore my portfolio of scalable applications built for startups and organizations. Each
        project reflects my expertise across the stack: React, Next.js and React Native
        interfaces, Node.js and NestJS APIs, database design, and AI-integrated systems.
      </p>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
      <div className="reveal mt-8.5 text-center">
        <a
          href="https://github.com/Emmy-py"
          target="_blank"
          rel="me noopener"
          className="inline-flex items-center gap-2 border border-border px-8.5 py-3.75 font-mono text-[0.75rem] tracking-[0.1em] text-fg2 uppercase no-underline transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-accent hover:text-accent"
        >
          View Full GitHub Profile →
        </a>
      </div>
    </section>
  );
}
