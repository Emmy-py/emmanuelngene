import { useEffect, useRef } from "react";

// Stat with a count-up when it scrolls into view. The final value is what's prerendered; the
// animation rewrites the number's text directly so React's hydrated output is untouched.
export default function StatTile({ value, suffix = "", label, Icon }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el || value === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / 1400, 1);
          el.textContent = Math.round(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        el.textContent = "0";
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5.5 backdrop-blur-sm transition-[transform,border-color,background] duration-300 hover:-translate-y-1 hover:border-border-accent hover:bg-card-hover">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-2 to-accent text-white shadow-[0_8px_20px_-8px_var(--glow)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div>
        <div className="font-display text-[1.9rem] font-extrabold tracking-[-0.03em] text-fg leading-none">
          <span ref={numRef}>{value}</span>
          {suffix}
        </div>
        <div className="mt-1.5 text-[0.86rem] text-fg2 leading-[1.4]">{label}</div>
      </div>
    </div>
  );
}
