import letdapLogo from "../assets/letdap-logo.jpg";
import greenverifyLogo from "../assets/greenverify-logo.jpg";
import cryptotrackerLogo from "../assets/cryptotracker.png";
import foreverbuyLogo from "../assets/foreverbuy-logo.png";
import learnableLogo from "../assets/learnable-logo.png";
import edgeLogisticsLogo from "../assets/edge-logistics-logo.png";
import letdapScreen from "../assets/screens/letdap.webp";
import greenverifyScreen from "../assets/screens/greenverify.webp";
import edgeLogisticsScreen from "../assets/screens/edge-logistics.webp";
import learnableScreen from "../assets/screens/learnable.webp";
import foreverbuyScreen from "../assets/screens/foreverbuy.webp";
import cryptotrackerScreen from "../assets/screens/cryptotracker.webp";
// import bywayLogo from "../assets/byway-logo.jpg"; — re-enable along with the Byway entry below

// Each project gets a card on the homepage and its own page at /projects/<slug>.
// `summary` is plain text, used for the project page's meta description and structured data.
// `screenshot` (800x500 WebP of the live site; mobile-only captures are framed in a phone) is
// optional; cards fall back to the logo.
export const PROJECTS = [
  {
    number: "01",
    slug: "letdap",
    screenshot: letdapScreen,
    name: "LetDap",
    summary:
      "LetDap is a social event management platform. Emmanuel Ngene contributed as a backend engineer: NestJS APIs, event scheduling and MongoDB optimization.",
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
    overview: (
      <>
        LetDap is a social event management platform empowering organizers to plan, promote, and
        manage events while enabling users to connect through shared experiences.
      </>
    ),
    contribution: (
      <>
        I collaborated as a backend engineer on the platform's core infrastructure &mdash;
        contributing to server-side feature development, API design, and MongoDB optimization
        within the engineering team.
      </>
    ),
    links: [{ href: "https://letsdap.com", label: "Visit the LetDap site →", primary: true }],
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
    slug: "greenverify",
    screenshot: greenverifyScreen,
    name: "GreenVerify",
    summary:
      "GreenVerify is an identity verification and business compliance platform in Nigeria (NIN, BVN, CAC, SCUML, Tax ID), built full-stack by Emmanuel Ngene.",
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
        label: "KYC & Compliance",
      },
      {
        tagClass:
          "border border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.05)] px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-[#60a5fa] uppercase",
        label: "Full-Stack",
      },
    ],
    title: "GreenVerify Identity & Business Compliance Platform",
    overview: (
      <>
        GreenVerify is a one-stop platform for identity verification and business compliance in
        Nigeria. Individuals and businesses can verify NIN, BVN and phone records, print NIN
        slips and request NIN modifications. They can also register businesses and companies with
        CAC, handle post-incorporation filings, get EFCC SCUML certification, register
        trademarks, sort out Tax ID and TaxPro Max, and pay bills and airtime from one wallet.
      </>
    ),
    contribution: (
      <>
        I'm building GreenVerify full-stack: the React frontend (user dashboards, service request
        and tracking flows, and an admin console for requests, pricing and teams) and the backend
        architecture, with encrypted data storage, verification workflow APIs, a developer API,
        and AI-powered identity verification. Every layer is built with compliance and data
        privacy as non-negotiables.
      </>
    ),
    links: [{ href: "https://greenverify.com.ng", label: "Visit the GreenVerify site →", primary: true }],
    outcomeLabel: "// Services Delivered",
    outcomes: [
      "NIN, BVN, phone & demographics verification, NIN slips and modifications",
      "CAC business name & company registration, plus post-incorporation filings",
      "EFCC SCUML registration and trademark & IP registration",
      "Tax ID / TaxPro Max, bills & airtime (VTU), and a developer verification API",
      "Wallet payments, request tracking, and an admin console for pricing & fulfilment",
    ],
    stack: ["React", "Material UI", "Node.js", "NestJS", "PostgreSQL", "AI Integration", "KYC APIs"],
  },
  {
    number: "03",
    slug: "edge-logistics",
    screenshot: edgeLogisticsScreen,
    name: "Edge Logistics",
    summary:
      "Edge Logistics is a shipping and freight website built by Emmanuel Ngene in Next.js from a Figma design, with quote, contact and shipment tracking flows.",
    logo: edgeLogisticsLogo,
    logoAlt: "Edge Logistics",
    logoClass:
      "h-11.5 w-11.5 shrink-0 rounded-lg border border-border bg-white object-contain p-1",
    tags: [
      {
        tagClass:
          "border border-accent bg-accent/14 px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "● Live",
      },
      {
        tagClass:
          "border border-border-accent bg-accent-muted px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-accent uppercase",
        label: "Logistics",
      },
      {
        tagClass:
          "border border-border px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-fg2 uppercase",
        label: "Concept Brand",
      },
    ],
    title: "Edge Logistics Shipping & Freight Website",
    overview: (
      <>
        Edge Logistics is a logistics company I imagined and own on paper: a shipping and freight
        brand offering express delivery, freight shipping, customs clearance and warehousing.
      </>
    ),
    contribution: (
      <>
        I built its website in Next.js from a Figma design: Home, About, Contact, Get a Quote and
        Track Shipment pages, with validated contact, quote and newsletter forms, success
        popups, a shipment tracking demo, and scroll-driven animations &mdash; responsive across
        phone, iPad and desktop.
      </>
    ),
    links: [
      {
        href: "https://edge-logistics.vercel.app/",
        label: "Visit the Edge Logistics site →",
        primary: true,
      },
    ],
    outcomeLabel: "// Key Features",
    outcomes: [
      "Five pages built pixel-close to the Figma design",
      "Quote, contact and newsletter forms with validation and success popups",
      "Shipment tracking flow with a map result view",
      "Scroll reveals, count-up stats and motion that respects reduced-motion settings",
      "Responsive layouts for phone, tablet/iPad and desktop",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "04",
    slug: "learnable",
    screenshot: learnableScreen,
    name: "Learnable",
    summary:
      "A Next.js UI redesign of the website for Learnable, Genesys Tech Hub's tech training programme, by Emmanuel Ngene: carousels, FAQ and responsive layouts.",
    logo: learnableLogo,
    logoAlt: "Learnable",
    logoClass:
      "h-11.5 w-11.5 shrink-0 rounded-lg border border-border bg-white object-contain p-1",
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
          "border border-border px-2.25 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-fg2 uppercase",
        label: "Redesign",
      },
    ],
    title: "Learnable Website UI Redesign",
    overview: (
      <>
        Learnable is Genesys Tech Hub's 6&ndash;9 month, project-based tech training programme
        that turns beginners into job-ready professionals.
      </>
    ),
    contribution: (
      <>
        A UI redesign of the Learnable website, built in Next.js: a draggable curved portrait
        hero, swipeable programme and project carousels, an FAQ accordion, a mobile menu, and a
        custom 404 page &mdash; responsive from phone to desktop.
      </>
    ),
    links: [
      {
        href: "https://learnable-landing-page.vercel.app/",
        label: "Visit the Learnable site →",
        primary: true,
      },
      { href: "https://github.com/Emmy-py/learnable-landing-page", label: "Learnable source on GitHub" },
    ],
    outcomeLabel: "// Key Features",
    outcomes: [
      "Fresh UI for the Home and 404 pages",
      "Fully responsive layouts with a mobile navigation menu",
      "Draggable, curved hero portrait strip and swipeable carousels",
      "Static, prerendered pages for fast loading",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "05",
    slug: "foreverbuy",
    screenshot: foreverbuyScreen,
    name: "ForeverBuy",
    summary:
      "ForeverBuy is a fashion and lifestyle e-commerce storefront. Emmanuel Ngene built the React frontend: product pages, search, cart, wishlist and auth.",
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
    overview: (
      <>
        ForeverBuy is a fashion and lifestyle storefront for discovering the latest trends, best
        sellers, and exclusive collections at unbeatable prices &mdash; built for fast browsing and
        a smooth checkout experience.
      </>
    ),
    contribution: (
      <>
        I built the full frontend: product listing and detail pages, search, cart, wishlist, and
        auth flows, with a Node.js/Express/MongoDB backend in progress for order management and
        payments.
      </>
    ),
    links: [
      {
        href: "https://forever-buy-ecommerce.vercel.app/",
        label: "Visit the ForeverBuy site →",
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
  {
    number: "06",
    slug: "cryptotracker",
    screenshot: cryptotrackerScreen,
    name: "CryptoTracker",
    summary:
      "CryptoTracker is a real-time cryptocurrency market analytics app by Emmanuel Ngene, with live price tracking, WebSocket updates and candlestick charts.",
    logo: cryptotrackerLogo,
    logoAlt: "CryptoTracker",
    logoClass: "h-14 w-14 shrink-0 rounded-md object-contain",
    logoSize: 56,
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
    overview: (
      <>
        Traders need accurate, real-time cryptocurrency market data to make informed decisions.
        CryptoTracker provides live price tracking, interactive chart visualization, and
        historical market insights in a clean, performance-focused interface.
      </>
    ),
    contribution: (
      <>
        I built the data integration and real-time update architecture, handling live market
        feeds, chart rendering logic, and scalable API structures designed for high-frequency
        financial data environments.
      </>
    ),
    links: [
      { href: "https://crypto-traccker.netlify.app/", label: "Try CryptoTracker live →", primary: true },
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
    overview: (
      <>
        A growing edtech team needed a robust, scalable backend for a full-featured LMS &mdash;
        handling user authentication, course management, content delivery, and real-time
        interactions without bottlenecks.
      </>
    ),
    contribution: (
      <>
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

// Projects tagged "Live" (any case); the hero stat counts these, so it updates as projects are added.
export const LIVE_PROJECT_COUNT = PROJECTS.filter((project) =>
  project.tags.some((tag) => /\blive\b/i.test(tag.label)),
).length;

export function findProject(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}
