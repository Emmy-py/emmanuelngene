import SectionIntro from "./SectionIntro";
import TechIcon from "./TechIcon";
import { SKILL_GROUPS, TECH } from "../data/tech";

export default function Skills() {
  return (
    <section id="skills" className="px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionIntro center badge="My skills" title="Technologies I work with." />
        <div className="grid grid-cols-2 gap-5 max-[900px]:grid-cols-1">
          {SKILL_GROUPS.map(({ title, items }) => (
            <div key={title} className="reveal rounded-2xl border border-border bg-card p-6.5">
              <h3 className="mb-5 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-fg">{title}</h3>
              <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2.5">
                {items.map((key, i) => (
                  <li
                    key={key}
                    className="group flex translate-y-3 items-center gap-2.5 rounded-xl border border-border bg-bg/50 px-3 py-2.5 opacity-0 transition-[transform,opacity,border-color,box-shadow] duration-500 hover:!-translate-y-1 hover:border-border-accent hover:shadow-[0_10px_24px_-12px_var(--glow)] [.visible_&]:translate-y-0 [.visible_&]:opacity-100"
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[-8deg]">
                      <TechIcon tech={TECH[key]} size={20} />
                    </span>
                    <span className="text-[0.86rem] text-fg">{TECH[key].name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
