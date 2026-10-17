import { ArrowUpRight } from "lucide-react";

// 3D tilt toward the pointer; mouse-like pointers only (touch scrolls straight through).
function tilt(e) {
  if (e.pointerType !== "mouse") return;
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-6px)`;
}
function untilt(e) {
  e.currentTarget.style.transform = "";
}

export default function ProjectCard({
  number,
  slug,
  logo,
  logoAlt,
  logoSize = 46,
  screenshot,
  tags,
  title,
  summary,
  stack,
}) {
  const status = tags[0]?.label;

  return (
    <div className="reveal">
      <article
        onPointerMove={tilt}
        onPointerLeave={untilt}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow,transform] duration-300 ease-out hover:border-border-accent hover:shadow-[0_24px_50px_-24px_var(--glow)]"
      >
        <div className="relative aspect-[8/5] overflow-hidden border-b border-border bg-bg3">
          {screenshot ? (
            <img
              src={screenshot}
              alt={`${logoAlt} website screenshot`}
              width="800"
              height="500"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%),linear-gradient(135deg,var(--bg3),var(--bg2))]">
              <img
                src={logo}
                alt={`${logoAlt} logo`}
                width={logoSize}
                height={logoSize}
                loading="lazy"
                decoding="async"
                className="h-20 w-20 rounded-2xl bg-white object-contain p-2.5 shadow-[0_16px_40px_-12px_var(--glow)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
          )}
          <span className="absolute top-3 left-3 rounded-lg bg-bg/80 px-2.5 py-1 font-mono text-[0.7rem] text-fg backdrop-blur-sm">
            {number}
          </span>
          {status && (
            <span className="absolute top-3 right-3 rounded-lg bg-bg/80 px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.08em] text-accent uppercase backdrop-blur-sm">
              {status}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5.5">
          <h3 className="mb-2 font-display text-[1.08rem] font-bold tracking-[-0.02em] text-fg leading-[1.3]">
            <a
              href={`/projects/${slug}`}
              className="text-fg no-underline after:absolute after:inset-0 after:content-['']"
            >
              {title}
            </a>
          </h3>
          <p className="mb-4 flex-1 text-[0.86rem] text-fg2 leading-[1.65]">{summary}</p>
          <ul className="mb-4 flex list-none flex-wrap gap-1.5">
            {stack.slice(0, 4).map((item) => (
              <li
                key={item}
                className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.66rem] text-fg2"
              >
                {item}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-1 text-[0.85rem] font-medium text-accent">
            View case study
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </article>
    </div>
  );
}
