const SERVICES = [
  {
    num: "01",
    icon: "⚡",
    title: "API Architecture & Development",
    desc: "REST & GraphQL APIs with Node.js and NestJS. Modular, tested, documented, and built to scale under real traffic.",
  },
  {
    num: "02",
    icon: "\u{1F5C4}",
    title: "Database Design & Optimization",
    desc: "PostgreSQL and MongoDB schemas optimized from day one — smart indexing, query tuning, migrations, and data modeling.",
  },
  {
    num: "03",
    icon: "\u{1F510}",
    title: "Authentication & Security",
    desc: "JWT, OAuth2, role-based access, session management, and encrypted storage. Your users' data stays protected.",
  },
  {
    num: "04",
    icon: "\u{1F310}",
    title: "Full Web Development",
    desc: "End-to-end web applications from backend to frontend. React, Next.js, and Node.js for complete, production-ready product builds.",
  },
  {
    num: "05",
    icon: "\u{1F4BB}",
    title: "Custom Software Development",
    desc: "Bespoke software tailored to your workflows — admin dashboards, internal tools, SaaS platforms, and business automation systems.",
  },
  {
    num: "06",
    icon: "\u{1F9E9}",
    title: "Third-Party Integrations",
    desc: "Stripe, Twilio, SendGrid, Paystack, AI APIs — cleanly integrated so your product works end-to-end right out of the box.",
  },
  {
    num: "07",
    icon: "\u{1F916}",
    title: "AI-Upskilled Backend Features",
    desc: "Smart systems with AI/ML integration — intelligent verification, recommendation engines, and workflow automation.",
  },
  {
    num: "08",
    icon: "☁",
    title: "Cloud & DevOps",
    desc: "AWS & GCP deployment, Docker containers, CI/CD pipelines, and infrastructure for production-ready systems.",
  },
  {
    num: "09",
    icon: "\u{1F4CA}",
    title: "Code Audits & Performance Fixes",
    desc: "Slow app? I'll find the bottleneck — N+1 queries, memory leaks, unoptimized endpoints — and fix it fast.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="border-t border-border bg-bg2 px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // Services
      </p>
      <h2 className="reveal mb-5 font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
        Everything you need to ship.
      </h2>
      <p className="reveal mb-14 max-w-[620px] text-[0.97rem] text-fg2 leading-[1.8]">
        From complete product backends to single API integrations &mdash; I offer end-to-end
        development for startups, SMEs, and organizations. Here's what I build:
      </p>
      <div className="reveal grid grid-cols-3 gap-px bg-border max-[900px]:grid-cols-1">
        {SERVICES.map(({ num, icon, title, desc }) => (
          <div
            className="relative overflow-hidden bg-bg px-7 py-8.5 transition-[background] duration-250 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-300 before:content-[''] hover:bg-card-hover hover:before:scale-x-100"
            key={num}
          >
            <div className="mb-3.5 font-mono text-[0.62rem] tracking-[0.1em] text-accent">{num}</div>
            <span className="mb-3.5 block text-2xl">{icon}</span>
            <h3 className="mb-2.75 font-syne text-[1.02rem] font-bold tracking-[-0.02em] text-fg">
              {title}
            </h3>
            <p className="text-[0.86rem] text-fg2 leading-[1.7]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
