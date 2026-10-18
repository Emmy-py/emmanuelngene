import { ArrowRight, CalendarCheck, Gauge, Landmark, Rocket } from "lucide-react";
import SectionIntro from "./SectionIntro";
import StatTile from "./StatTile";
import { LIVE_PROJECT_COUNT } from "../data/projects";

const STATS = [
  { value: LIVE_PROJECT_COUNT, suffix: "+", label: "Live products shipped", Icon: Rocket },
  { value: 0, label: "Missed deadlines", Icon: CalendarCheck },
  { value: 30, suffix: "%+", label: "Average performance gain", Icon: Gauge },
  { value: 300, suffix: "+", label: "Screens on a confidential government app", Icon: Landmark },
];

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
      className="relative px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-2 items-start gap-16 max-[900px]:grid-cols-1 max-sm:gap-11">
          <div>
            <SectionIntro badge="About me" title="I build products that don't break." />
            <div className="reveal -mt-6 space-y-4.5 text-base text-fg2 leading-[1.82]">
              <p>
                I'm <strong className="font-medium text-fg">Emmanuel Ngene (Emmy)</strong>, a full-stack
                developer in Nigeria. I take products from idea to launch and build them to hold up
                under load, with clean, documented, handover-ready code.
              </p>
              <p>
                Some of my biggest work is covered by a non-disclosure agreement, including a
                government app with <strong className="font-medium text-fg">more than 300 screens</strong>{" "}
                that I built with my team, so it isn't shown here.
              </p>
            </div>
            <a
              href="#experience"
              className="reveal group mt-8 inline-flex items-center gap-2 rounded-xl border border-border-accent px-5.5 py-3 text-[0.9rem] font-medium text-fg no-underline transition-[border-color,background] duration-200 hover:border-accent hover:bg-accent-muted"
            >
              See my experience
              <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="reveal grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            {STATS.map((stat) => (
              <StatTile key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <div className="reveal mt-20">
          <h3 className="mb-6 font-mono text-[0.7rem] tracking-[0.15em] text-accent uppercase">
            Most startups struggle with
          </h3>
          <ul className="grid list-none grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
            {PAIN_POINTS.map(({ title, text }) => (
              <li
                key={title}
                className="rounded-2xl border border-border bg-card p-5.5 transition-[transform,border-color,background] duration-300 hover:-translate-y-1 hover:border-border-accent hover:bg-card-hover"
              >
                <span className="mb-3 block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--glow)]"></span>
                <strong className="mb-1 block text-[0.92rem] font-semibold text-fg">{title}</strong>
                <span className="text-[0.86rem] text-fg2 leading-[1.6]">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
