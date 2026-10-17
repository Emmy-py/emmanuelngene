import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import SectionIntro from "./SectionIntro";
import { PROJECTS } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionIntro
          center
          badge="Featured projects"
          title="Some of my recent work."
          lead="Scalable applications built for startups and organizations, across React, Next.js and React Native interfaces, Node.js and NestJS APIs, and AI-integrated systems."
        />
        <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
        <div className="reveal mt-12 text-center">
          <a
            href="https://github.com/Emmy-py"
            target="_blank"
            rel="me noopener"
            className="group inline-flex items-center gap-2 rounded-xl border border-border-accent px-6 py-3 text-[0.9rem] font-medium text-fg no-underline transition-[border-color,background] duration-200 hover:border-accent hover:bg-accent-muted"
          >
            More on my GitHub profile
            <ArrowUpRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
