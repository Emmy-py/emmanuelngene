import {
  Bot,
  Cloud,
  Cpu,
  Database,
  Gauge,
  Layers,
  Monitor,
  Network,
  Plug,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import SectionIntro from "./SectionIntro";

const SERVICES = [
  {
    num: "01",
    Icon: Network,
    title: "API Architecture & Development",
    desc: "REST & GraphQL APIs with Node.js and NestJS. Modular, tested, documented, and built to scale under real traffic.",
  },
  {
    num: "02",
    Icon: Database,
    title: "Database Design & Optimization",
    desc: "PostgreSQL and MongoDB schemas optimized from day one — smart indexing, query tuning, migrations, and data modeling.",
  },
  {
    num: "03",
    Icon: ShieldCheck,
    title: "Authentication & Security",
    desc: "JWT, OAuth2, role-based access, session management, and encrypted storage. Your users' data stays protected.",
  },
  {
    num: "04",
    Icon: Layers,
    title: "Full-Stack Web & Mobile Apps",
    desc: "End-to-end products from database to UI. React, Next.js, React Native, and Node.js for complete, production-ready web and mobile builds.",
  },
  {
    num: "05",
    Icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform iOS and Android apps with React Native — smooth UX, offline support, push notifications, and APIs built to match.",
  },
  {
    num: "06",
    Icon: Monitor,
    title: "Website Development",
    desc: "Fast, responsive, SEO-friendly websites and landing pages with Next.js and React — from Figma design to live deployment.",
  },
  {
    num: "07",
    Icon: ShoppingCart,
    title: "E-Commerce Development",
    desc: "Online stores with product catalogs, carts, checkout, Paystack/Stripe payments, order management, and admin dashboards.",
  },
  {
    num: "08",
    Icon: Cpu,
    title: "Custom Software Development",
    desc: "Bespoke software tailored to your workflows — admin dashboards, internal tools, SaaS platforms, and business automation systems.",
  },
  {
    num: "09",
    Icon: Plug,
    title: "Third-Party Integrations",
    desc: "Stripe, Twilio, SendGrid, Paystack, AI APIs — cleanly integrated so your product works end-to-end right out of the box.",
  },
  {
    num: "10",
    Icon: Bot,
    title: "AI-Powered Features",
    desc: "Smart systems with AI/ML integration — intelligent verification, recommendation engines, and workflow automation.",
  },
  {
    num: "11",
    Icon: Cloud,
    title: "Cloud & DevOps",
    desc: "AWS & GCP deployment, Docker containers, CI/CD pipelines, and infrastructure for production-ready systems.",
  },
  {
    num: "12",
    Icon: Gauge,
    title: "Code Audits & Performance Fixes",
    desc: "Slow app? I'll find the bottleneck — N+1 queries, memory leaks, unoptimized endpoints — and fix it fast.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-bg2 px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionIntro
          center
          badge="My services"
          title="What I can do for you."
          lead="From complete products to single API integrations, I offer end-to-end development for startups, SMEs, and organizations."
        />
        <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
          {SERVICES.map(({ num, Icon, title, desc }) => (
            <div
              key={num}
              className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-[transform,border-color,background,box-shadow] duration-300 before:absolute before:-top-16 before:-right-16 before:h-32 before:w-32 before:rounded-full before:bg-glow before:opacity-0 before:blur-2xl before:transition-opacity before:duration-500 hover:-translate-y-1.5 hover:border-border-accent hover:bg-card-hover hover:shadow-[0_18px_40px_-20px_var(--glow)] hover:before:opacity-60"
            >
              <span className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border-accent bg-accent-muted text-accent transition-[transform,background,color] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent-2 group-hover:text-white">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="relative mb-2 font-display text-[1rem] font-bold tracking-[-0.02em] text-fg">
                {title}
              </h3>
              <p className="relative text-[0.86rem] text-fg2 leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
