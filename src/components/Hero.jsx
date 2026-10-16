import heroPhoto from "../assets/emmanuel-ngene.jpg";
import { LIVE_PROJECT_COUNT } from "./Projects";

const STATS = [
  { num: `${LIVE_PROJECT_COUNT}+`, label: "Live Products" },
  { num: "0", label: "Missed Deadlines" },
  { num: "30%+", label: "Avg. Perf. Gain" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative grid min-h-screen grid-cols-[1fr_400px] items-center gap-15 overflow-hidden px-[max(20px,5vw)] pt-30 pb-20 max-lg:grid-cols-1 max-lg:pt-27.5 max-sm:px-[max(22px,6vw)] max-sm:pt-25 max-sm:pb-15"
    >
      <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] opacity-50 [background-size:60px_60px]"></div>
      <div className="pointer-events-none absolute top-[-10%] left-[35%] h-[700px] w-[700px] bg-[radial-gradient(circle,var(--card-hover)_0%,transparent_65%)]"></div>
      <div className="relative z-1 min-w-0">
        <p className="mb-6 animate-[fadeUp_0.7s_0.15s_forwards] font-mono text-[0.7rem] tracking-[0.16em] text-accent uppercase opacity-0">
          Available for Freelance &middot; React &middot; Next.js &middot; React Native &middot;
          Node.js &middot; NestJS &middot; Python
        </p>
        <h1 className="mb-7 max-w-full animate-[fadeUp_0.7s_0.3s_forwards] font-syne font-extrabold tracking-[-0.04em] opacity-0 leading-[0.95]">
          <span className="block whitespace-nowrap text-[clamp(1.6rem,5.4vw,5.6rem)] max-lg:text-[clamp(1.6rem,7.4vw,5.6rem)]">
            Emmy
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--fg)]">.codes</span>
            <span className="ml-[0.15em] align-middle text-[0.55em]" aria-hidden>
              🛠️
            </span>
          </span>
          <span className="mt-3 block text-[clamp(1.6rem,4.2vw,4.2rem)] tracking-[-0.03em] text-accent max-lg:text-[clamp(1.6rem,7vw,4.2rem)]">
            Full-Stack Developer
          </span>
        </h1>
        <p className="mb-11 max-w-[500px] animate-[fadeUp_0.7s_0.45s_forwards] text-[1.05rem] text-fg2 opacity-0 leading-[1.75]">
          I build <strong className="font-medium text-fg">scalable, production-ready web and mobile apps</strong> for
          startups and organizations, end to end: React, Next.js &amp; React Native on the front,
          Node.js, NestJS, Python &amp; FastAPI, PostgreSQL &amp; MongoDB on the back. Clean code. Full
          documentation. Zero missed deadlines.
        </p>
        <div className="flex animate-[fadeUp_0.7s_0.6s_forwards] flex-wrap gap-3.5 opacity-0 max-sm:flex-col max-sm:items-stretch">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-accent px-8.5 py-3.75 font-mono text-[0.75rem] tracking-[0.1em] text-bg uppercase no-underline transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-85 max-sm:justify-center"
          >
            View Projects &#x2193;
          </a>
          <a
            href="https://github.com/Emmy-py"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-8.5 py-3.75 font-mono text-[0.75rem] tracking-[0.1em] text-fg2 uppercase no-underline transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-accent hover:text-accent max-sm:justify-center"
          >
            GitHub &#x2192;
          </a>
        </div>
        <div className="mt-12.5 flex animate-[fadeUp_0.7s_0.75s_forwards] gap-10 border-t border-border pt-9 opacity-0 max-sm:mt-9.5 max-sm:flex-wrap max-sm:gap-7 max-sm:pt-7">
          {STATS.map(({ num, label }) => (
            <div key={label}>
              <div className="font-syne text-[2.2rem] font-extrabold tracking-[-0.04em] text-accent leading-none">
                {num}
              </div>
              <div className="mt-1 font-mono text-[0.6rem] tracking-[0.1em] text-fg2 uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-1 animate-[fadeLeft_0.8s_0.5s_forwards] opacity-0 max-lg:max-w-[260px]">
        <div className="relative mx-auto w-full max-w-[360px]">
          <img
            src={heroPhoto}
            alt="Emmy.codes (Emmanuel Ngene)"
            className="aspect-square block w-full border border-border object-cover [object-position:center_top]"
          />
          <div className="absolute -bottom-3.5 -left-3.5 bg-accent px-4 py-2.75 font-mono text-[0.62rem] tracking-[0.1em] text-bg uppercase">
            &#x25CF;&nbsp; Open to Work
          </div>
          <div className="absolute top-4.5 -right-3.5 border border-border bg-bg3 px-3 py-1.75 font-mono text-[0.6rem] tracking-[0.08em] text-fg">
            React &middot; Next.js &middot; Node.js
          </div>
        </div>
      </div>
    </section>
  );
}
