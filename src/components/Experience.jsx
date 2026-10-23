import { ArrowUpRight, Briefcase, GraduationCap } from "lucide-react";
import SectionIntro from "./SectionIntro";

// Roles and dates as stated by Emmanuel; no details beyond that.
export const ROLES = [
  { role: "Software Engineer", org: "Dawnily", href: "https://www.dawnily.com/", period: "May 2026 – Present", Icon: Briefcase },
  { role: "Software Engineer", org: "MindTheGap", href: "https://mindthegap.ng/", period: "May 2026 – Present", Icon: Briefcase },
  {
    role: "Software Engineering Intern",
    org: "Genesys Tech Hub",
    href: "https://genesystechhub.com/",
    period: "Internship · 2025",
    Icon: GraduationCap,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-bg2 px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionIntro
          badge="Experience"
          title="Where I've been building."
          lead="Alongside my freelance work."
        />
        <ol className="reveal relative ml-5 list-none border-0 p-0">
          <span
            className="absolute top-2 bottom-2 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-accent-2 via-accent to-transparent transition-transform delay-200 duration-[1400ms] ease-out [.visible_&]:scale-y-100"
            aria-hidden="true"
          ></span>
          {ROLES.map(({ role, org, href, period, Icon }, i) => (
            <li
              key={org}
              className="relative pb-10 pl-12 opacity-0 transition-[opacity,transform] duration-700 last:pb-0 [.visible_&]:translate-x-0 [.visible_&]:opacity-100 -translate-x-4"
              style={{ transitionDelay: `${0.3 + i * 0.2}s` }}
            >
              <span className="absolute top-0 -left-5 flex h-10 w-10 items-center justify-center rounded-full border border-border-accent bg-bg text-accent shadow-[0_0_20px_-4px_var(--glow)]">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="group rounded-2xl border border-border bg-card px-6 py-5 transition-[border-color,background,transform] duration-300 hover:translate-x-1 hover:border-border-accent hover:bg-card-hover">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.02em] text-fg">
                    {role}{" "}
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className="group/link inline-flex items-center gap-0.5 text-accent no-underline hover:underline hover:underline-offset-4"
                    >
                      @ {org}
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  </h3>
                  <span className="rounded-full border border-border-accent bg-accent-muted px-3 py-1 font-mono text-[0.66rem] tracking-[0.1em] text-accent uppercase">
                    {period}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
