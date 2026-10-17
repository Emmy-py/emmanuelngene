import { POSTS, postPath } from "./data/posts";
import { PROJECTS } from "./data/projects";
import { HERO_PORTRAIT, OG_IMAGE, PERSON, PERSON_PHOTO, SITE_URL, SOCIAL_PROFILES, absoluteUrl } from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BLOG_ID = `${SITE_URL}/blog#blog`;

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
    worksFor: PERSON.worksFor.map(({ name, url }) => ({ "@type": "Organization", name, url })),
    sameAs: SOCIAL_PROFILES,
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
    preloadImage: HERO_PORTRAIT,
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
    ]),
  };
}

const postRef = (post) => ({ "@id": `${absoluteUrl(postPath(post))}#article` });

export function blogMeta() {
  const url = absoluteUrl("/blog");
  return {
    title: "Blog: Guides on APIs, Databases & Performance | Emmanuel Ngene",
    description:
      "Practical guides by Emmanuel Ngene (Emmy) on building web and mobile apps that hold up in production: API design, databases, authentication, performance and handovers.",
    path: "/blog",
    jsonLd: graph([
      websiteNode(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Blog by Emmanuel Ngene",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": BLOG_ID },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Emmanuel Ngene", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: url },
          ],
        },
      },
      {
        "@type": "Blog",
        "@id": BLOG_ID,
        url,
        name: "Emmy.codes Blog",
        description: "Guides on building web and mobile apps that hold up in production.",
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        blogPost: POSTS.map((post) => ({
          "@type": "BlogPosting",
          ...postRef(post),
          headline: post.title,
          url: absoluteUrl(postPath(post)),
          datePublished: post.datePublished,
        })),
      },
      personNode(),
    ]),
  };
}

export function postMeta(post, wordCount) {
  const url = absoluteUrl(postPath(post));
  return {
    title: `${post.title} | Emmanuel Ngene`,
    description: post.description,
    path: postPath(post),
    ogType: "article",
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      section: post.category,
      tags: post.keywords,
    },
    jsonLd: graph([
      websiteNode(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: post.title,
        description: post.description,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: postRef(post),
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Emmanuel Ngene", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        },
      },
      {
        "@type": "BlogPosting",
        ...postRef(post),
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        isPartOf: { "@id": BLOG_ID },
        image: absoluteUrl(OG_IMAGE),
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        author: { "@id": PERSON_ID, "@type": "Person", name: PERSON.name, url: `${SITE_URL}/` },
        publisher: { "@id": PERSON_ID },
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        wordCount,
        inLanguage: "en",
      },
      personNode(),
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

export function renderHead({ title, description, path, ogType = "website", article, preloadImage, jsonLd }) {
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
    ...(article
      ? [
          `<meta name="author" content="${PERSON.name}" />`,
          `<meta property="article:published_time" content="${article.publishedTime}" />`,
          `<meta property="article:modified_time" content="${article.modifiedTime}" />`,
          `<meta property="article:author" content="${SITE_URL}/" />`,
          `<meta property="article:section" content="${escapeAttr(article.section)}" />`,
          ...article.tags.map((tag) => `<meta property="article:tag" content="${escapeAttr(tag)}" />`),
        ]
      : []),
    `<link rel="alternate" type="application/rss+xml" title="Emmy.codes Blog" href="${SITE_URL}/rss.xml" />`,
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
