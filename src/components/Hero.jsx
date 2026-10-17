import { useRef } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import TechIcon from "./TechIcon";
import { HERO_TECH, TECH } from "../data/tech";
import useParallax from "../hooks/useParallax";

// Lines of the floating code card. Each line is revealed left-to-right in turn (CSS steps), so
// the card looks typed out while the full text is still in the prerendered HTML.
const CODE = [
  [["k", "const "], ["v", "developer"], ["p", " = {"]],
  [["p", "  name: "], ["s", '"Emmanuel Ngene"'], ["p", ","]],
  [["p", "  alias: "], ["s", '"Emmy"'], ["p", ","]],
  [["p", "  stack: ["], ["s", '"React"'], ["p", ", "], ["s", '"Node"'], ["p", ", "], ["s", '"Python"'], ["p", "],"]],
  [["p", "  ships: "], ["s", '"web & mobile"'], ["p", ","]],
  [["p", "};"]],
];
const TOKEN_COLOR = { k: "text-[#c792ea]", v: "text-[#82aaff]", s: "text-[#f78c6c]", p: "text-fg2" };

// Layer offset driven by the --mx/--my pointer vars from useParallax.
const parallax = (depth) => ({
  transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
});

export default function Hero() {
  const ref = useRef(null);
  useParallax(ref);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-[min(100svh,980px)] items-center overflow-hidden px-[max(20px,5vw)] pt-32 pb-20 max-lg:pt-28 max-sm:px-[max(22px,6vw)] max-sm:pt-26 max-sm:pb-14"
    >
      {/* Background: Emmanuel's own desk setup in black and grey (the purple theme tints it). It sits
          behind the text only and fades to the page colour before it reaches the portrait. */}
      <div
        className="absolute -inset-8 -z-20 transition-transform duration-300 ease-out [mask-image:radial-gradient(ellipse_75%_85%_at_22%_25%,#000_40%,transparent_78%)] max-lg:[mask-image:linear-gradient(180deg,#000_38%,transparent_58%)]"
        style={parallax(-14)}
      >
        {/* Two pre-graded versions instead of a CSS blend (which repaints every frame); the purple
            one is lazy, so it only downloads when the purple theme shows it. Phones get the full,
            sharp portrait-orientation photo, since a wide crop squeezed onto a tall screen showed
            only dark wall. */}
        <picture>
          <source media="(max-width: 1023px)" srcSet="/hero-bg-mobile.webp" />
          <img src="/hero-bg.webp" alt="" aria-hidden="true" width="1600" height="1200" decoding="async" className="h-full w-full object-cover object-[30%_40%] max-lg:object-[center_35%] [[data-theme=purple]_&]:hidden" />
        </picture>
        <picture>
          <source media="(max-width: 1023px)" srcSet="/hero-bg-mobile-purple.webp" />
          <img src="/hero-bg-purple.webp" alt="" aria-hidden="true" width="1600" height="1200" loading="lazy" decoding="async" className="hidden h-full w-full object-cover object-[30%_40%] max-lg:object-[center_35%] [[data-theme=purple]_&]:block" />
        </picture>
      </div>
      {/* Darkens the photo behind the text so it stays readable. */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--bg)_72%,transparent)_0%,color-mix(in_srgb,var(--bg)_45%,transparent)_55%,transparent_80%)] max-lg:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg)_72%,transparent)_0%,color-mix(in_srgb,var(--bg)_55%,transparent)_45%,color-mix(in_srgb,var(--bg)_20%,transparent)_75%,var(--bg)_100%)]"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent"></div>
      <div className="pointer-events-none absolute -top-40 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-glow opacity-25 blur-[120px]"></div>

      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[1.1fr_1fr] items-center gap-12 max-lg:grid-cols-1 max-lg:gap-14">
        <div className="min-w-0">
          <p className="mb-6 inline-flex animate-[blurIn_0.6s_ease-out_both] items-center gap-2 rounded-full border border-border-accent bg-accent-muted px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-accent uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-[pulse_2s_infinite] rounded-full bg-accent"></span>
            Available for freelance
          </p>

          <h1 className="mb-6 font-display font-extrabold tracking-[-0.035em] text-fg leading-[1.05]">
            <span className="block animate-[blurIn_0.6s_0.08s_ease-out_both] text-[clamp(2rem,5.6vw,4.4rem)]">
              Hi, I&rsquo;m{" "}
              <span className="animate-[shimmer_2.4s_0.7s_ease-in-out_1_both] bg-[linear-gradient(90deg,#8b5cf6,#c4b5fd,#6d4aff,#8b5cf6)] bg-[length:200%_auto] bg-clip-text whitespace-nowrap text-transparent">
                Emmanuel Ngene
              </span>
            </span>
            <span className="mt-2 block animate-[blurIn_0.6s_0.16s_ease-out_both] text-[clamp(1.5rem,3.4vw,2.7rem)] tracking-[-0.025em]">
              Full-stack developer building for web &amp; mobile.
            </span>
          </h1>

          <p className="mb-9 max-w-[540px] animate-[blurIn_0.6s_0.24s_ease-out_both] text-[1.05rem] text-fg2 leading-[1.75]">
            I build <strong className="font-medium text-fg">fast, scalable web and mobile apps</strong> for
            startups and organizations, from the first screen to the database.
          </p>

          <div className="mb-11 flex animate-[blurIn_0.6s_0.32s_ease-out_both] flex-wrap gap-3.5 max-sm:flex-col">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent-2 to-[#8b5cf6] px-7 py-3.5 font-medium text-white no-underline shadow-[0_12px_32px_-10px_var(--glow)] transition-[transform,box-shadow] duration-200 before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_var(--glow)] hover:before:translate-x-full"
            >
              View My Work
              <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-accent bg-bg/40 px-7 py-3.5 font-medium text-fg no-underline backdrop-blur-sm transition-[transform,border-color,background] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-muted"
            >
              <Mail size={17} aria-hidden="true" />
              Contact Me
            </a>
          </div>

          <p className="mb-4 animate-[blurIn_0.6s_0.4s_ease-out_both] font-mono text-[0.68rem] tracking-[0.14em] text-fg2 uppercase">
            Technologies I work with
          </p>
          <ul className="flex list-none flex-wrap gap-3">
            {HERO_TECH.map((key, i) => (
              <li
                key={key}
                title={TECH[key].name}
                className="flex h-11 w-11 animate-[popIn_0.5s_ease-out_both] items-center justify-center rounded-xl border border-border bg-card backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-border-accent hover:shadow-[0_8px_20px_-8px_var(--glow)]"
                style={{ animationDelay: `${0.45 + i * 0.06}s` }}
              >
                <TechIcon tech={TECH[key]} />
                <span className="sr-only">{TECH[key].name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[5/6] w-full max-w-[500px] max-lg:max-w-[400px] max-sm:max-w-[330px]">
          {/* Glow circle with a slowly spinning conic ring. */}
          <div className="absolute inset-x-[6%] top-[10%] aspect-square transition-transform duration-300 ease-out" style={parallax(10)}>
            <div className="absolute inset-0 animate-[scaleIn_0.8s_0.1s_cubic-bezier(0.22,1,0.36,1)_both] rounded-full bg-[radial-gradient(circle_at_35%_30%,#a78bfa,#6d4aff_45%,#2e1a7a_80%)] shadow-[0_0_120px_-10px_var(--glow)]"></div>
            <div className="absolute -inset-3 animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#a78bfa_70deg,transparent_140deg,transparent_220deg,#6d4aff_290deg,transparent_360deg)] opacity-70 [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]"></div>
          </div>
          <div
            className="absolute top-[4%] right-0 h-24 w-24 bg-[radial-gradient(var(--accent)_1.2px,transparent_1.2px)] [background-size:12px_12px] opacity-40"
            style={parallax(18)}
            aria-hidden="true"
          ></div>

          <div className="absolute inset-x-0 bottom-0 flex justify-center transition-transform duration-300 ease-out" style={parallax(4)}>
            <img
              src="/hero-portrait.webp"
              alt="Emmanuel Ngene, software developer"
              width="578"
              height="800"
              fetchpriority="high"
              decoding="async"
              className="relative h-auto w-[86%] animate-[riseIn_0.9s_0.15s_cubic-bezier(0.22,1,0.36,1)_both] [mask-image:linear-gradient(to_bottom,#000_82%,transparent)]"
            />
          </div>

          <div
            className="absolute top-[55%] -right-[6%] w-[62%] min-w-[230px] transition-transform duration-300 ease-out max-sm:-right-[2%] max-sm:top-[58%] max-sm:w-[72%] max-sm:min-w-0"
            style={parallax(22)}
          >
            <div className="animate-[float_6s_ease-in-out_1.2s_infinite]">
              <div className="animate-[blurIn_0.6s_0.6s_ease-out_both] rounded-xl border border-border-accent bg-bg2/80 p-4 font-mono text-[0.72rem] leading-[1.7] shadow-[0_20px_50px_-20px_var(--glow)] backdrop-blur-md max-sm:p-3 max-sm:text-[0.6rem]">
                <div className="mb-2.5 flex items-center justify-between border-b border-border pb-2 text-fg2">
                  <span>&lt;/&gt; developer.ts</span>
                  <span className="h-2 w-2 animate-[pulse_2s_infinite] rounded-full bg-[#4ade80]"></span>
                </div>
                <pre className="m-0 overflow-hidden whitespace-pre font-mono">
                  {CODE.map((tokens, i) => {
                    const chars = tokens.reduce((n, [, text]) => n + text.length, 0);
                    return (
                      <span
                        key={i}
                        className="block w-fit animate-[type_var(--d)_steps(var(--n))_both] [clip-path:inset(0_0_0_0)]"
                        style={{ "--n": chars, "--d": `${chars * 0.035}s`, animationDelay: `${1 + i * 0.45}s` }}
                      >
                        {tokens.map(([kind, text], j) => (
                          <span key={j} className={TOKEN_COLOR[kind]}>
                            {text}
                          </span>
                        ))}
                        {i === CODE.length - 1 && (
                          <span className="ml-0.5 inline-block h-[1em] w-[6px] translate-y-[2px] animate-[blink_1s_steps(1)_infinite] bg-accent"></span>
                        )}
                      </span>
                    );
                  })}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
