import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Quote } from "lucide-react";
import SocialIcon from "./SocialIcon";
import { EMAIL, SOCIALS } from "../data/social";

const TESTIMONIALS = [
  {
    text: "Emmanuel was a reliable collaborator who grasped our goals quickly and contributed meaningfully to every sprint. Professional throughout.",
    author: "Client — Event Tech Platform",
    role: "LetDap",
  },
  {
    text: "Solid architecture from day one. Secure, scalable, and the team can build on it with full confidence. Would hire again without hesitation.",
    author: "Client — FinTech Organization",
    role: "GreenVerify",
  },
];

export default function Contact() {
  const [active, setActive] = useState(0);

  // Rotate the quotes; pauses if the user prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-bg2 px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-glow opacity-25 blur-[120px]"></div>
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-[1.1fr_1.2fr_0.9fr] items-start gap-10 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
        <div className="reveal">
          <p className="mb-3 font-mono text-[0.68rem] tracking-[0.14em] text-accent uppercase">Let's work together</p>
          <h2 className="mb-4 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.03em] text-fg leading-[1.1]">
            Have a project in mind?
          </h2>
          <p className="mb-7 text-[0.95rem] text-fg2 leading-[1.75]">
            I'm open to new projects and collaborations. Email me or connect on LinkedIn &mdash; I reply
            within 4 hours on business days.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-2 to-[#8b5cf6] px-6.5 py-3.25 font-medium text-white no-underline shadow-[0_12px_32px_-10px_var(--glow)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_var(--glow)]"
          >
            Get in touch
            <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="mt-6 flex items-center gap-2 text-[0.82rem] text-fg2">
            <span className="h-2 w-2 animate-[pulse_2s_infinite] rounded-full bg-[#4ade80]"></span>
            Available for new projects
          </p>
        </div>

        <figure className="reveal relative m-0 rounded-2xl border border-border-accent bg-card p-7 backdrop-blur-sm">
          <Quote size={34} aria-hidden="true" className="mb-4 text-accent" />
          <div className="grid">
            {TESTIMONIALS.map(({ text, author, role }, i) => (
              <div
                key={role}
                aria-hidden={i !== active}
                className={`[grid-area:1/1] transition-[opacity,transform,filter] duration-700 ${
                  i === active ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-3 opacity-0 blur-[4px]"
                }`}
              >
                <blockquote className="m-0 mb-5 text-[0.98rem] text-fg italic leading-[1.75]">&ldquo;{text}&rdquo;</blockquote>
                <figcaption>
                  <div className="text-[0.88rem] font-semibold text-fg">{author}</div>
                  <div className="text-[0.8rem] text-accent">{role}</div>
                </figcaption>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            {TESTIMONIALS.map(({ role }, i) => (
              <button
                key={role}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${role}`}
                aria-pressed={i === active}
                className={`h-2 cursor-none rounded-full border-0 p-0 transition-[width,background] duration-300 ${
                  i === active ? "w-7 bg-accent" : "w-2 bg-border-accent"
                }`}
              ></button>
            ))}
          </div>
        </figure>

        <div className="reveal max-[1000px]:col-span-2 max-sm:col-span-1">
          <p className="mb-4 font-mono text-[0.68rem] tracking-[0.14em] text-accent uppercase">Follow me</p>
          <div className="mb-7 flex flex-wrap gap-3">
            {SOCIALS.map((social) => (
              <SocialIcon key={social.label} social={social} size={44} />
            ))}
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2.5 text-[0.9rem] break-all text-fg2 no-underline transition-colors duration-200 hover:text-accent"
          >
            <Mail size={17} aria-hidden="true" className="shrink-0 text-accent" />
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
