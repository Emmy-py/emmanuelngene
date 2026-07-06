function TikTokIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" fill="currentColor" />
    </svg>
  );
}

const CONTACT_ITEMS = [
  {
    href: "mailto:emmanuelngene145@gmail.com",
    icon: "@",
    platform: "Email",
    label: "emmanuelngene145@gmail.com",
  },
  {
    href: "https://github.com/Emmy-py",
    external: true,
    icon: "⚪",
    iconStyle: { fontSize: "1.1rem" },
    platform: "GitHub",
    label: "github.com/Emmy-py",
  },
  {
    href: "https://www.linkedin.com/in/emmanuel-ngene-708337263",
    external: true,
    icon: "in",
    iconStyle: { fontWeight: 700, fontSize: "0.88rem" },
    platform: "LinkedIn",
    label: "Emmanuel Ngene",
  },
  {
    href: "https://x.com/_devemmy",
    external: true,
    icon: "\u{1D54F}",
    iconStyle: { fontWeight: 700 },
    platform: "Twitter / X",
    label: "@_devemmy",
  },
  {
    href: "https://www.tiktok.com/@_devemmy?_r=1&_t=ZS-948NFvLYoey",
    external: true,
    icon: <TikTokIcon />,
    iconStyle: { display: "inline-flex", alignItems: "center", justifyContent: "center" },
    platform: "TikTok",
    label: "@_devemmy",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // Contact
      </p>
      <h2 className="reveal mb-5 font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
        Let's build something great.
      </h2>
      <div className="mt-13 grid grid-cols-2 items-start gap-20 max-[900px]:grid-cols-1 max-sm:gap-11">
        <div className="reveal flex flex-col">
          {CONTACT_ITEMS.map(({ href, external, icon, iconStyle, platform, label }) => (
            <a
              key={platform}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group flex items-center gap-4.5 border-b border-border py-5 text-fg no-underline transition-[padding-left] duration-200 first:border-t hover:pl-2.5"
            >
              <span
                className="w-7 shrink-0 text-center font-mono text-[0.78rem] text-fg2 transition-colors duration-200 group-hover:text-accent"
                style={iconStyle}
              >
                {icon}
              </span>
              <div className="flex-1">
                <div className="mb-0.75 font-mono text-[0.6rem] tracking-[0.12em] text-fg2 uppercase">
                  {platform}
                </div>
                <div className="font-syne text-[0.95rem] font-semibold tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent">
                  {label}
                </div>
              </div>
              <span className="text-base text-fg2 transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </a>
          ))}
        </div>
        <div className="reveal border border-border-accent bg-card px-9 py-10.5 max-sm:px-6 max-sm:py-7.5">
          <h3 className="mb-3.5 font-syne text-[1.7rem] font-extrabold tracking-[-0.03em] leading-[1.2] text-fg">
            Ready to build your
            <br />
            next <span className="text-accent">scalable app?</span>
          </h3>
          <p className="mb-7.5 text-[0.9rem] text-fg2 leading-[1.7]">
            Custom development starting at $1K&ndash;$2K. Drop me an email or connect on LinkedIn
            &mdash; I reply within 4 hours on business days.
          </p>
          <div className="mb-6.5 flex items-center gap-2.25 font-mono text-[0.66rem] tracking-[0.08em] text-fg2">
            <span className="h-1.75 w-1.75 shrink-0 animate-[pulse_2s_infinite] rounded-full bg-accent"></span>
            Available for new projects &mdash; Feb 2026
          </div>
          <a
            href="mailto:emmanuelngene145@gmail.com"
            className="inline-flex items-center gap-2 bg-accent px-8.5 py-3.75 font-mono text-[0.75rem] tracking-[0.1em] text-bg uppercase no-underline transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-85"
          >
            Send a Message →
          </a>
        </div>
      </div>
    </section>
  );
}
