import bywayLogo from "../assets/byway-logo.jpg";
import letdapLogo from "../assets/letdap-logo.jpg";
import greenverifyLogo from "../assets/greenverify-logo.jpg";
import cryptotrackerLogo from "../assets/cryptotracker.png";
import foreverbuyLogo from "../assets/foreverbuy-logo.png";
import ProjectCard from "./ProjectCard";

const PROJECTS = [

    {
    number: "01",
    logo: letdapLogo,
    logoAlt: "LetDap",
    logoClass:
      "h-11.5 w-11.5 shrink-0 rounded-lg border border-border bg-[#1a8cff] object-contain p-1",
    tags: [
      {
        tagClass:
          "border border-accent bg-accent/14 px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "● Live",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "Event Tech",
      },
      {
        tagClass:
          "border border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.05)] px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-[#60a5fa] uppercase",
        label: "Collaborator",
      },
    ],
    title: "LetDap Event Management Platform",
    description: (
      <>
        LetDap is a social event management platform empowering organizers to plan, promote, and
        manage events while enabling users to connect through shared experiences.
        <br />
        <br />
        I collaborated as a backend engineer on the platform's core infrastructure &mdash;
        contributing to server-side feature development, API design, and MongoDB optimization
        within the engineering team.
      </>
    ),
    links: [{ href: "https://letsdap.com", label: "Live Site →", primary: true }],
    outcomeLabel: "// Contributions",
    outcomes: [
      "Core backend modules for event scheduling & user management",
      "API optimization improving overall platform responsiveness",
      "Scalable MongoDB models for real-time user interactions",
      "Delivered sprint features consistently and on schedule",
    ],
    stack: ["Node.js", "NestJS", "MongoDB", "REST API", "Real-Time"],
  },

  {
    number: "02",
    logo: greenverifyLogo,
    logoAlt: "GreenVerify",
    logoClass:
      "h-11.5 w-11.5 shrink-0 rounded-lg border border-border bg-white object-contain p-1",
    tags: [
      {
        tagClass:
          "border border-border px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-fg2 uppercase",
        label: "\u{1F504} In Development",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "FinTech",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "KYC",
      },
    ],
    title: "GreenVerify Digital Verification Platform",
    description: (
      <>
        Organizations need a reliable, secure way to verify customer identities (KYC) and reduce
        fraud without slow, manual compliance processes.
        <br />
        <br />
        I'm leading the full backend architecture: encrypted data storage, multi-step
        verification workflow APIs, and AI-powered identity verification. Every layer is built
        with compliance and data privacy as non-negotiables.
      </>
    ),
    links: [{ href: "https://greenverify.com.ng", label: "View Site →", primary: true }],
    outcomeLabel: "// In Progress",
    outcomes: [
      "Scalable infrastructure for high-volume verifications",
      "Encrypted storage & secure APIs for sensitive personal data",
      "AI integration roadmap for enhanced verification accuracy",
      "Audit-ready architecture for fintech & regulatory clients",
    ],
    stack: ["Node.js", "NestJS", "PostgreSQL", "AI Integration", "KYC APIs"],
  },
  {
    number: "03",
    logo: cryptotrackerLogo,
    logoAlt: "CryptoTracker",
    logoClass: "h-14 w-14 shrink-0 rounded-md object-contain",
    tags: [
      {
        tagClass:
          "border border-border px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-fg2 uppercase",
        label: "\u{1F504} LIVE",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "FinTech",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "Crypto Analytics",
      },
    ],
    title: "CryptoTracker Real-Time Market Analytics Platform",
    description: (
      <>
        Traders need accurate, real-time cryptocurrency market data to make informed decisions.
        CryptoTracker provides live price tracking, interactive chart visualization, and
        historical market insights in a clean, performance-focused interface.
        <br />
        <br />
        I built the data integration and real-time update architecture, handling live market
        feeds, chart rendering logic, and scalable API structures designed for high-frequency
        financial data environments.
      </>
    ),
    links: [
      { href: "https://crypto-traccker.netlify.app/", label: "View Site →", primary: true },
    ],
    outcomeLabel: "// KEY OUTCOMES",
    outcomes: [
      "Real-time cryptocurrency price tracking",
      "WebSocket-powered live market updates",
      "Historical candlestick chart visualization",
      "Scalable API-ready architecture for future trading tools",
    ],
    stack: ["JavaScript", "WebSocket", "REST APIs", "Market Data APIs", "Charting Libraries"],
  },
  {
    number: "04",
    logo: foreverbuyLogo,
    logoAlt: "ForeverBuy",
    logoClass: "h-11.5 w-11.5 shrink-0 rounded-full object-contain",
    tags: [
      {
        tagClass:
          "border border-accent bg-accent/14 px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "● Live",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "E-Commerce",
      },
      {
        tagClass:
          "border border-border px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-fg2 uppercase",
        label: "Frontend",
      },
    ],
    title: "ForeverBuy E-Commerce Platform",
    description: (
      <>
        ForeverBuy is a fashion and lifestyle storefront for discovering the latest trends, best
        sellers, and exclusive collections at unbeatable prices &mdash; built for fast browsing and
        a smooth checkout experience.
        <br />
        <br />
        I built the full frontend: product listing and detail pages, search, cart, wishlist, and
        auth flows, with a Node.js/Express/MongoDB backend in progress for order management and
        payments.
      </>
    ),
    links: [
      {
        href: "https://forever-buy-ecommerce.vercel.app/",
        label: "View Site →",
        primary: true,
      },
    ],
    outcomeLabel: "// Key Features",
    outcomes: [
      "Product listing, detail pages, and search",
      "Shopping cart and wishlist functionality",
      "User authentication and order management",
      "Payment integration and admin dashboard",
    ],
    stack: ["React", "React Router DOM", "Tailwind CSS", "Vite", "Node.js", "MongoDB"],
  },
  /* Byway — temporarily removed from display, re-enable by uncommenting
  {
    number: "05",
    logo: bywayLogo,
    logoAlt: "Byway",
    logoClass:
      "h-11.5 w-11.5 shrink-0 rounded-lg border border-border bg-white object-contain p-1.5",
    tags: [
      {
        tagClass:
          "border border-accent bg-accent/14 px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "● Live",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "EdTech",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "Backend Lead",
      },
    ],
    title: "Byway Learning Management System",
    description: (
      <>
        A growing edtech team needed a robust, scalable backend for a full-featured LMS &mdash;
        handling user authentication, course management, content delivery, and real-time
        interactions without bottlenecks.
        <br />
        <br />
        As backend lead within <strong style={{ color: "var(--fg)" }}>DevSquad042</strong>, I
        architected the full server-side infrastructure from scratch: secure auth flows, RESTful
        course &amp; progress APIs, and a database layer optimized for concurrent learners.
      </>
    ),
    links: [
      { href: "https://byway1.netlify.app", label: "Live Demo →", primary: true },
      { href: "https://github.com/DevSquad042/lmsBackend", label: "GitHub Repo" },
    ],
    outcomeLabel: "// Key Outcomes",
    outcomes: [
      "Robust API powering seamless React frontend integration",
      "Scalable architecture supporting growing learner bases",
      "Secure auth protecting student & instructor data",
      "Clean docs enabling fast future developer onboarding",
    ],
    stack: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "JWT", "REST API"],
  },
  */
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-border px-[max(20px,5vw)] py-27.5 max-sm:px-[max(22px,6vw)] max-sm:py-20"
    >
      <p className="mb-3.5 font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">
        // Projects
      </p>
      <h2 className="reveal mb-5 font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.035em] leading-[1.05]">
        Shipped. Live. Scalable.
      </h2>
      <p className="reveal mb-15 max-w-[640px] text-[0.97rem] text-fg2 leading-[1.8]">
        Explore my portfolio of scalable applications built for startups and organizations. Each
        project reflects my expertise in Node.js, NestJS, database management, and AI-integrated
        backend systems.
      </p>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.number} {...project} />
      ))}
      <div className="reveal mt-8.5 text-center">
        <a
          href="https://github.com/Emmy-py"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-border px-8.5 py-3.75 font-mono text-[0.75rem] tracking-[0.1em] text-fg2 uppercase no-underline transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-accent hover:text-accent"
        >
          View Full GitHub Profile →
        </a>
      </div>
    </section>
  );
}
