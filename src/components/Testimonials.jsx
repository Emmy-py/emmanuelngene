const TESTIMONIALS = [
  {
    text: "Delivered on time and exceeded expectations. The API was clean, well-documented, and ready to deploy on day one. Exactly what we needed.",
    author: "Client — EdTech Startup",
    role: "Byway LMS",
  },
  {
    text: "Emmanuel was a reliable collaborator who grasped our goals quickly and contributed meaningfully to every sprint. Professional throughout.",
    author: "Client — Event Tech Platform",
    role: "LetDap",
  },
  {
    text: "Solid architecture from day one. Secure, scalable, and the team can build on it with full confidence. Would hire again without hesitation.",
    author: "Client — FinTech Organization",
    role: "GreenVerify",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-border bg-bg2 px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // Testimonials
      </p>
      <h2 className="reveal mb-5 font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
        Results clients trust.
      </h2>
      <div className="reveal mt-13 grid grid-cols-3 gap-px bg-border max-[900px]:grid-cols-1">
        {TESTIMONIALS.map(({ text, author, role }) => (
          <div
            className="bg-bg px-7.5 py-8.5 transition-colors duration-200 hover:bg-card-hover"
            key={author}
          >
            <div className="mb-4 font-syne text-[2.8rem] leading-[0.8] text-accent opacity-50">
              &ldquo;
            </div>
            <p className="mb-5.5 text-[0.9rem] text-fg2 italic leading-[1.8]">{text}</p>
            <div className="font-mono text-[0.66rem] tracking-[0.1em] text-fg uppercase">
              {author}
            </div>
            <div className="mt-0.75 font-mono text-[0.6rem] tracking-[0.05em] text-accent">
              {role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
