// Badge + heading + optional lead paragraph used at the top of each homepage section.
export default function SectionIntro({ badge, title, lead, center = false }) {
  return (
    <div className={`reveal mb-14 ${center ? "mx-auto max-w-[680px] text-center" : "max-w-[680px]"}`}>
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-accent bg-accent-muted px-3.5 py-1.5 font-mono text-[0.66rem] tracking-[0.14em] text-accent uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
        {badge}
      </span>
      <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold tracking-[-0.03em] text-fg leading-[1.1]">
        {title}
      </h2>
      <span
        className={`mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-accent-2 to-accent ${center ? "mx-auto" : ""}`}
        aria-hidden="true"
      ></span>
      {lead && <p className="mt-5 text-[1rem] text-fg2 leading-[1.8]">{lead}</p>}
    </div>
  );
}
