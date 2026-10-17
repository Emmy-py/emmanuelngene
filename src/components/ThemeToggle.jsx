import { Moon, Sparkles } from "lucide-react";

// Nav toggle between the two themes: "dark" (pure black) and "purple" (deep indigo).
export default function ThemeToggle({ theme, onChange }) {
  const isPurple = theme === "purple";
  const next = isPurple ? "dark" : "purple";
  const nextLabel = isPurple ? "black" : "purple";

  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
      className="relative flex h-9 w-16 shrink-0 cursor-none items-center rounded-full border border-border-accent bg-accent-muted p-1 transition-colors duration-300"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent-2 to-accent text-white shadow-[0_0_16px_var(--glow)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isPurple ? "translate-x-7 rotate-[360deg]" : "translate-x-0 rotate-0"
        }`}
      >
        {isPurple ? <Sparkles size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
      </span>
    </button>
  );
}
