import { STATS } from "../components/About";
import { ROLES } from "../components/Experience";
import { PROJECTS } from "../data/projects";
import { EMAIL, SOCIALS } from "../data/social";
import { SKILL_GROUPS, TECH } from "../data/tech";
import { PERSON, SITE_URL } from "../site";

// Printable resume, rendered at build time to dist/resume.html and printed to
// public/emmanuel-ngene-resume.pdf by scripts/resume-pdf.mjs. Always light (fixed colours, not
// theme tokens) so it prints cleanly; plain single-column text so applicant tracking systems can read it.
// Phone, dates and education were supplied by Emmanuel; everything else comes from the site's data.
const PHONE = "+234 806 800 2341";
const EDUCATION = { degree: "BSc Computer Science", school: "Enugu State University of Science and Technology (ESUT)", year: "2024" };

const linkText = (href) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const profile = (label) => SOCIALS.find((social) => social.label === label);

function Section({ title, children }) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 flex items-center gap-3 font-mono text-[9pt] font-medium tracking-[0.04em] text-[#6d4aff] uppercase after:h-px after:flex-1 after:bg-[#e4dfff]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Resume() {
  const contacts = [
    { label: EMAIL, href: `mailto:${EMAIL}` },
    { label: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
    { label: "Nigeria" },
    { label: linkText(SITE_URL), href: SITE_URL },
    { label: linkText(profile("GitHub").href), href: profile("GitHub").href },
    { label: "LinkedIn", href: profile("LinkedIn").href },
  ];
  const roles = [...ROLES, { role: "Freelance Full-Stack Developer", org: "Self-employed", period: "Present" }];

  return (
    <main className="mx-auto w-[210mm] bg-white px-[15mm] font-sans text-[9.5pt] leading-[1.55] text-[#2b2838] [print-color-adjust:exact]">
      <header className="border-b-2 border-[#6d4aff] pb-4">
        <h1 className="font-display text-[26pt] leading-none font-extrabold tracking-[-0.03em] text-[#14121f]">
          {PERSON.name}
        </h1>
        <p className="mt-2 font-display text-[12pt] font-semibold text-[#6d4aff]">{PERSON.jobTitle}</p>
        <ul className="mt-3 flex list-none flex-wrap gap-x-2 p-0 text-[8.5pt] text-[#4b4860]">
          {contacts.map(({ label, href }, i) => (
            <li key={label} className="flex items-center gap-2">
              {i > 0 && <span className="text-[#c4b8ff]" aria-hidden="true">|</span>}
              {href ? (
                <a href={href} className="text-inherit no-underline">
                  {label}
                </a>
              ) : (
                label
              )}
            </li>
          ))}
        </ul>
      </header>

      <Section title="Profile">
        <p>
          Full-stack developer building fast, scalable web and mobile apps for startups and organizations, from
          the first screen to the database. Takes products from idea to launch, builds them to hold up under load,
          and hands over clean, documented code. Co-built a confidential government app of more than 300 screens
          as part of a team (under a non-disclosure agreement).
        </p>
        <ul className="mt-3.5 grid list-none grid-cols-4 gap-2.5 p-0">
          {STATS.map(({ value, suffix = "", label }) => (
            <li key={label} className="rounded-lg border border-[#e4dfff] bg-[#f6f4ff] px-3 py-2">
              <strong className="block font-display text-[14pt] leading-tight font-extrabold text-[#6d4aff]">
                {value}
                {suffix}
              </strong>
              <span className="text-[7.5pt] leading-tight text-[#4b4860]">{label}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        <ul className="list-none space-y-1.5 p-0">
          {roles.map(({ role, org, href, period }) => (
            <li key={org} className="flex items-baseline justify-between gap-4">
              <span>
                <strong className="font-display font-bold text-[#14121f]">{role}</strong>
                {" · "}
                {href ? (
                  <a href={href} className="text-[#6d4aff] no-underline">
                    {org}
                  </a>
                ) : (
                  org
                )}
              </span>
              <span className="font-mono text-[8pt] tracking-[0.08em] text-[#6b6880] uppercase">{period}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Selected projects">
        <div className="space-y-3.5">
          {PROJECTS.map((project) => {
            const live = project.links.find((link) => link.primary);
            return (
              <article key={project.slug} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[10.5pt] font-bold text-[#14121f]">{project.title}</h3>
                  {live && (
                    <a href={live.href} className="shrink-0 text-[8pt] text-[#6d4aff] no-underline">
                      {linkText(live.href)}
                    </a>
                  )}
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-[#a78bfa]">
                  {project.outcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
                <p className="mt-1 font-mono text-[7.5pt] text-[#6b6880]">{project.stack.join(" · ")}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
          {SKILL_GROUPS.map(({ title, items }) => (
            <div key={title} className="contents">
              <dt className="font-display font-bold text-[#14121f]">{title}</dt>
              <dd className="m-0">{items.map((key) => TECH[key].name).join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Education">
        <p className="flex items-baseline justify-between gap-4">
          <span>
            <strong className="font-display font-bold text-[#14121f]">{EDUCATION.degree}</strong>
            {" · "}
            {EDUCATION.school}
          </span>
          <span className="font-mono text-[8pt] tracking-[0.08em] text-[#6b6880] uppercase">{EDUCATION.year}</span>
        </p>
      </Section>
    </main>
  );
}
