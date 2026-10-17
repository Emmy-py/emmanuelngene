import { Bot, Cloud, Layers, Network, ShieldCheck, ShoppingCart } from "lucide-react";
import SectionIntro from "./SectionIntro";

const SERVICES = [
  {
    num: "01",
    Icon: Layers,
    title: "Web & Mobile Apps",
    desc: "Complete products from database to UI: Next.js and React web apps, and React Native apps for iOS and Android.",
  },
  {
    num: "02",
    Icon: Network,
    title: "APIs & Databases",
    desc: "REST and GraphQL APIs with Node.js, NestJS and Python, on PostgreSQL and MongoDB schemas built to grow.",
  },
  {
    num: "03",
    Icon: ShieldCheck,
    title: "Authentication & Security",
    desc: "JWT, OAuth2, role-based access and encrypted storage, so your users' data stays protected.",
  },
  {
    num: "04",
    Icon: ShoppingCart,
    title: "E-Commerce & Custom Software",
    desc: "Online stores with Paystack/Stripe checkout, plus admin dashboards, internal tools and SaaS platforms.",
  },
  {
    num: "05",
    Icon: Bot,
    title: "Integrations & AI",
    desc: "Payments, messaging and AI APIs wired in cleanly, plus AI-powered verification and workflow automation.",
  },
  {
    num: "06",
    Icon: Cloud,
    title: "Cloud, DevOps & Performance",
    desc: "AWS and GCP deployment, Docker and CI/CD, and audits that find and fix slow queries and endpoints.",
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
          lead="End-to-end development for startups, SMEs and organizations."
        />
        <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
          {SERVICES.map(({ num, Icon, title, desc }) => (
            <div
              key={num}
              className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-[transform,border-color,background,box-shadow] duration-300 before:absolute before:-top-16 before:-right-16 before:h-32 before:w-32 before:rounded-full before:bg-glow before:opacity-0 before:blur-2xl before:transition-opacity before:duration-500 hover:-translate-y-1.5 hover:border-border-accent hover:bg-card-hover hover:shadow-[0_18px_40px_-20px_var(--glow)] hover:before:opacity-60"
            >
              <span className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border-accent bg-accent-muted text-accent transition-[transform,background,color] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent-2 group-hover:text-on-accent">
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
