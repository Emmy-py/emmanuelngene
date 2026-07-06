function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

const THEMES = [
  { t: "dark", title: "Dark", Icon: MoonIcon },
  { t: "white", title: "Light", Icon: SunIcon },
  { t: "blue", title: "Blue", Icon: DropletIcon },
];

export default function ThemeSwitcher({ theme, onChange }) {
  const activeIndex = Math.max(
    0,
    THEMES.findIndex((th) => th.t === theme),
  );

  return (
    <div className="fixed right-7 bottom-7 z-[200] max-[900px]:right-4.5 max-[900px]:bottom-4.5 max-sm:right-3.5 max-sm:bottom-3.5">
      <div
        className="relative flex gap-1 rounded-full border border-border bg-bg2 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-[16px] transition-[background,border-color] duration-[400ms] [--step:38px] max-sm:[--step:34px]"
        style={{ "--active-index": activeIndex }}
      >
        <span
          className="absolute top-1 left-1 h-8.5 w-8.5 translate-x-[calc(var(--active-index)*var(--step))] rounded-full border border-border-accent bg-accent-muted transition-transform duration-350 ease-[cubic-bezier(0.65,0,0.35,1)] max-sm:h-7.5 max-sm:w-7.5"
          aria-hidden="true"
        ></span>
        {THEMES.map(({ t, title, Icon }) => (
          <button
            key={t}
            type="button"
            className={`relative z-1 flex h-8.5 w-8.5 cursor-none items-center justify-center rounded-full border-0 bg-transparent transition-colors duration-250 max-sm:h-7.5 max-sm:w-7.5 ${
              theme === t ? "text-accent" : "text-fg2 hover:text-fg"
            }`}
            onClick={() => onChange(t)}
            title={`${title} theme`}
            aria-label={`Switch to ${title} theme`}
            aria-pressed={theme === t}
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  );
}
