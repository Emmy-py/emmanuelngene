const STEPS = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "30 minutes. Your requirements, constraints, goals. I ask the right questions so nothing is left to guesswork.",
  },
  {
    num: "02",
    title: "Proposal + Fixed Quote",
    desc: "Within 24 hours: clear scope, timeline, and fixed price. No hidden fees, no surprise invoices.",
  },
  {
    num: "03",
    title: "Development Sprints",
    desc: "1–2 week sprints with regular updates. You always know where your project stands.",
  },
  {
    num: "04",
    title: "Delivery + Handover",
    desc: "Full docs, GitHub handover, video walkthrough, and 30 days post-launch support — every time.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="border-t border-border px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // Process
      </p>
      <h2 className="reveal mb-5 font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
        From idea to live product &mdash; in weeks.
      </h2>
      <div className="reveal mt-13 grid grid-cols-4 gap-px bg-border max-[900px]:grid-cols-1">
        {STEPS.map(({ num, title, desc }) => (
          <div
            className="bg-bg px-6 py-8.5 transition-[background] duration-250 hover:bg-card-hover"
            key={num}
          >
            <div className="mb-4 font-syne text-[2.8rem] font-extrabold tracking-[-0.06em] text-border-accent leading-none">
              {num}
            </div>
            <h3 className="mb-2.25 font-syne text-[0.98rem] font-bold tracking-[-0.02em] text-fg">
              {title}
            </h3>
            <p className="text-[0.84rem] text-fg2 leading-[1.7]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
