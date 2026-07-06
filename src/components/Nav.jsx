import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ activeSection }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-border bg-nav-bg px-[max(20px,5vw)] py-4.5 backdrop-blur-[16px] transition-[background,border-color] duration-[400ms]">
      <a
        href="#hero"
        className="font-syne text-[1.1rem] font-extrabold tracking-[-0.02em] text-fg no-underline"
        onClick={() => setOpen(false)}
      >
        EN<span className="text-accent">.</span>dev
      </a>
      <button
        className="z-[101] hidden h-9 w-9 flex-col justify-center gap-1.25 border-0 bg-transparent p-0 max-[900px]:flex"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={`h-0.5 w-full bg-fg transition-[transform,opacity] duration-250 ${
            open ? "translate-y-1.75 rotate-45" : ""
          }`}
        ></span>
        <span
          className={`h-0.5 w-full bg-fg transition-[transform,opacity] duration-250 ${
            open ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`h-0.5 w-full bg-fg transition-[transform,opacity] duration-250 ${
            open ? "-translate-y-1.75 -rotate-45" : ""
          }`}
        ></span>
      </button>
      <div
        className={`hidden max-[900px]:z-[99] max-[900px]:block max-[900px]:fixed max-[900px]:inset-x-0 max-[900px]:top-0 max-[900px]:h-screen max-[900px]:bg-black/45 max-[900px]:transition-opacity max-[900px]:duration-300 ${
          open
            ? "max-[900px]:pointer-events-auto max-[900px]:opacity-100"
            : "max-[900px]:pointer-events-none max-[900px]:opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      ></div>
      <ul
        className={`flex list-none gap-6.5 max-[900px]:fixed max-[900px]:top-0 max-[900px]:right-0 max-[900px]:z-[100] max-[900px]:m-0 max-[900px]:h-screen max-[900px]:flex-col max-[900px]:items-start max-[900px]:justify-center max-[900px]:gap-7 max-[900px]:border-l max-[900px]:border-border max-[900px]:bg-bg2 max-[900px]:px-8.5 max-[900px]:py-10 max-[900px]:shadow-[-20px_0_40px_rgba(0,0,0,0.25)] max-[900px]:transition-transform max-[900px]:duration-350 max-[900px]:w-[min(78vw,300px)] ${
          open ? "max-[900px]:translate-x-0" : "max-[900px]:translate-x-full"
        }`}
      >
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              onClick={() => setOpen(false)}
              className={`font-mono text-[0.7rem] tracking-[0.08em] uppercase no-underline transition-colors duration-200 hover:text-accent max-[900px]:text-[0.82rem] ${
                href === `#${activeSection}` ? "text-accent" : "text-fg2"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
        <li className="hidden max-[900px]:mt-2 max-[900px]:block">
          <a
            href="#contact"
            className="inline-block bg-accent px-5.5 py-2.5 font-mono text-[0.72rem] tracking-[0.08em] text-bg uppercase no-underline transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-85"
            onClick={() => setOpen(false)}
          >
            Hire Me
          </a>
        </li>
      </ul>
      <a
        href="#contact"
        className="inline-block bg-accent px-5.5 py-2.5 font-mono text-[0.72rem] tracking-[0.08em] text-bg uppercase no-underline transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-85 max-[900px]:hidden"
      >
        Hire Me
      </a>
    </nav>
  );
}
