import SectionIntro from "./SectionIntro";

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
    <section id="process" className="px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20">
      <div className="mx-auto max-w-[1240px]">
        <SectionIntro center badge="Process" title="From idea to live product, in weeks." />
        <ol className="relative grid list-none grid-cols-4 gap-5 p-0 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
          {STEPS.map(({ num, title, desc }) => (
            <li
              key={num}
              className="reveal group relative rounded-2xl border border-border bg-card p-6 transition-[transform,border-color,background] duration-300 hover:-translate-y-1.5 hover:border-border-accent hover:bg-card-hover"
            >
              <div className="mb-5 bg-gradient-to-br from-accent to-accent-2 bg-clip-text font-display text-[2.6rem] font-extrabold tracking-[-0.05em] text-transparent leading-none transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                {num}
              </div>
              <h3 className="mb-2 font-display text-[1rem] font-bold tracking-[-0.02em] text-fg">{title}</h3>
              <p className="text-[0.86rem] text-fg2 leading-[1.7]">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
