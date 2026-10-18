import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav({ activeSection, theme, onThemeChange }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] flex animate-[fadeUp_0.6s_ease-out_both] items-center justify-between gap-4 px-[max(20px,5vw)] transition-[background,border-color,padding] duration-400 ${
        scrolled
          ? "border-b border-border bg-nav-bg py-3 backdrop-blur-[18px]"
          : "border-b border-transparent py-5"
      }`}
    >
      <a
        href="/"
        aria-label="Emmanuel Ngene, Emmy.codes home"
        className="group flex items-center gap-2 font-display text-[1.15rem] font-extrabold tracking-[-0.02em] text-fg no-underline"
        onClick={() => setOpen(false)}
      >
        <img
          src="/logo-mark.png"
          alt=""
          width="36"
          height="36"
          decoding="async"
          className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[360deg] [[data-theme=black]_&]:grayscale"
        />
        <span>
          Emmy<span className="text-accent">.codes</span>
        </span>
      </a>

      <div
        className={`hidden max-[1100px]:block max-[1100px]:fixed max-[1100px]:inset-0 max-[1100px]:z-[99] max-[1100px]:h-screen max-[1100px]:bg-black/55 max-[1100px]:transition-opacity max-[1100px]:duration-300 ${
          open ? "max-[1100px]:pointer-events-auto max-[1100px]:opacity-100" : "max-[1100px]:pointer-events-none max-[1100px]:opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      ></div>
      <ul
        className={`flex list-none items-center gap-7 max-[1100px]:fixed max-[1100px]:top-0 max-[1100px]:right-0 max-[1100px]:z-[100] max-[1100px]:m-0 max-[1100px]:h-screen max-[1100px]:w-[min(78vw,300px)] max-[1100px]:flex-col max-[1100px]:items-start max-[1100px]:justify-center max-[1100px]:gap-6 max-[1100px]:border-l max-[1100px]:border-border max-[1100px]:bg-bg2 max-[1100px]:px-8.5 max-[1100px]:py-10 max-[1100px]:transition-transform max-[1100px]:duration-350 ${
          open ? "max-[1100px]:translate-x-0" : "max-[1100px]:translate-x-full"
        }`}
      >
        {LINKS.map(({ href, label }) => {
          const active = href === `/#${activeSection}` || (href === "/blog" && activeSection === "blog");
          return (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className={`relative text-[0.9rem] no-underline transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-gradient-to-r after:from-accent-2 after:to-accent after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100 max-[1100px]:text-[1rem] ${
                  active ? "text-fg after:scale-x-100" : "text-fg2 after:scale-x-0"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} onChange={onThemeChange} />
        <a
          href="/#contact"
          className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-2 to-[var(--grad-a)] px-4.5 py-2.5 text-[0.85rem] font-medium text-on-accent no-underline shadow-[0_8px_24px_-8px_var(--glow)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-6px_var(--glow)] max-sm:hidden"
        >
          Hire Me
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <button
          className="z-[101] hidden h-9 w-9 flex-col justify-center gap-1.25 border-0 bg-transparent p-0 max-[1100px]:flex"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-0.5 w-full rounded bg-fg transition-[transform,opacity] duration-250 ${open ? "translate-y-1.75 rotate-45" : ""}`}></span>
          <span className={`h-0.5 w-full rounded bg-fg transition-[transform,opacity] duration-250 ${open ? "opacity-0" : ""}`}></span>
          <span className={`h-0.5 w-full rounded bg-fg transition-[transform,opacity] duration-250 ${open ? "-translate-y-1.75 -rotate-45" : ""}`}></span>
        </button>
      </div>
    </nav>
  );
}
