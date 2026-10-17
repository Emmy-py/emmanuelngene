import { PROJECTS } from "./data/projects";
import { OG_IMAGE, PERSON, PERSON_PHOTO, SITE_URL, SOCIAL_PROFILES, absoluteUrl } from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_ID = `${SITE_URL}/#greenverify`;

export const projectPath = (project) => `/projects/${project.slug}`;

function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.name,
    alternateName: PERSON.alternateNames,
    givenName: "Emmanuel",
    familyName: "Ngene",
    jobTitle: PERSON.jobTitle,
    description: PERSON.description,
    url: `${SITE_URL}/`,
    image: absoluteUrl(PERSON_PHOTO),
    email: `mailto:${PERSON.email}`,
    nationality: { "@type": "Country", name: "Nigeria" },
    address: { "@type": "PostalAddress", addressCountry: "NG" },
    knowsAbout: PERSON.knowsAbout,
    worksFor: { "@id": ORG_ID },
    sameAs: SOCIAL_PROFILES,
  };
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: PERSON.company.name,
    url: PERSON.company.url,
    founder: { "@id": PERSON_ID },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: PERSON.name,
    alternateName: "emmycodes",
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

function projectNode(project) {
  const url = absoluteUrl(projectPath(project));
  const live = project.links.find((link) => link.primary);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: project.title,
    description: project.summary,
    url,
    ...(live && { sameAs: live.href }),
    // Small logos are inlined by Vite as data: URIs, which aren't valid schema image URLs.
    ...(!project.logo.startsWith("data:") && { image: absoluteUrl(project.logo) }),
    keywords: project.stack.join(", "),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
  };
}

const graph = (nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

// Head metadata for every prerendered route. `path` is the self-referencing canonical
// (null for the 404 page, which has no URL of its own).
export function homeMeta(lastmod) {
  return {
    title: "Emmanuel Ngene (Emmy) — Software Developer | emmycodes",
    description:
      "Emmanuel Ngene (Emmy) is a full-stack software developer in Nigeria building scalable web and mobile apps with React, Next.js, React Native, Node.js and Python.",
    path: "/",
    preloadImage: PERSON_PHOTO,
    jsonLd: graph([
      websiteNode(),
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: `${SITE_URL}/`,
        name: "Emmanuel Ngene (Emmy) — Software Developer",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
        ...(lastmod && { dateModified: lastmod }),
        hasPart: PROJECTS.map((project) => ({ "@id": `${absoluteUrl(projectPath(project))}#project` })),
      },
      personNode(),
      organizationNode(),
      ...PROJECTS.map(projectNode),
    ]),
  };
}

export function projectMeta(project) {
  const url = absoluteUrl(projectPath(project));
  return {
    title: `${project.title} | Emmanuel Ngene`,
    description: project.summary,
    path: projectPath(project),
    ogType: "article",
    jsonLd: graph([
      websiteNode(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: project.title,
        description: project.summary,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": `${url}#project` },
        author: { "@id": PERSON_ID },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Emmanuel Ngene", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
            { "@type": "ListItem", position: 3, name: project.name, item: url },
          ],
        },
      },
      projectNode(project),
      personNode(),
      organizationNode(),
    ]),
  };
}

export function notFoundMeta() {
  return {
    title: "Page Not Found | Emmanuel Ngene",
    description:
      "This page doesn't exist. Head back to the portfolio of Emmanuel Ngene (Emmy), full-stack software developer in Nigeria.",
    path: null,
    jsonLd: null,
  };
}

const escapeAttr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function renderHead({ title, description, path, ogType = "website", preloadImage, jsonLd }) {
  const url = path ? absoluteUrl(path) : null;
  const image = absoluteUrl(OG_IMAGE);
  const tags = [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    url && `<link rel="canonical" href="${url}" />`,
    preloadImage && `<link rel="preload" as="image" href="${preloadImage}" fetchpriority="high" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="Emmanuel Ngene" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Emmanuel Ngene — Software Developer · emmycodes.site" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@_devemmy" />`,
    `<meta name="twitter:creator" content="@_devemmy" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="Emmanuel Ngene — Software Developer · emmycodes.site" />`,
    jsonLd &&
      `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
}
