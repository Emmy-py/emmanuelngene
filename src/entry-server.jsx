import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { PROJECTS } from "./data/projects";
import { PERSON, SITE_URL } from "./site";
import { homeMeta, notFoundMeta, projectMeta, projectPath, renderHead } from "./seo";

// Every page written to dist/ at build time. `file` is relative to dist/; vercel.json's
// cleanUrls serves projects/<slug>.html at /projects/<slug>, and Vercel serves 404.html for
// unknown paths.
export function getPages(lastmod) {
  return [
    { path: "/", file: "index.html", meta: homeMeta(lastmod), inSitemap: true },
    ...PROJECTS.map((project) => ({
      path: projectPath(project),
      file: `projects/${project.slug}.html`,
      meta: projectMeta(project),
      inSitemap: true,
    })),
    { path: "/404", file: "404.html", meta: notFoundMeta(), inSitemap: false },
  ];
}

export function render(path) {
  return renderToString(<App path={path} />);
}

export { SITE_URL, renderHead };

export function llmsTxt() {
  const projects = PROJECTS.map(
    (project) => `- [${project.title}](${SITE_URL}${projectPath(project)}): ${project.summary}`,
  ).join("\n");
  return `# Emmanuel Ngene (Emmy) — emmycodes

> ${PERSON.description}

Emmanuel Ngene, also known as Ngene Emmanuel Somto or "Emmy" (brand: emmycodes / Emmy.codes), is a full-stack developer based in Nigeria, currently a software engineer at Dawnily Technology and MindTheGap, and a former intern at Genesys Tech Hub. Some of his work is under NDA, including a government app with more than 300 screens. He builds production-ready web and mobile products end to end: React, Next.js and React Native on the frontend; Node.js, NestJS, Python and FastAPI on the backend; PostgreSQL and MongoDB for data. He is available for freelance work.

## Key pages

- [Home / portfolio](${SITE_URL}/): about, services, projects, process and contact
- [About](${SITE_URL}/#about)
- [Projects](${SITE_URL}/#projects)
- [Contact](${SITE_URL}/#contact)

## Projects

${projects}

## Profiles

- GitHub: https://github.com/Emmy-py
- LinkedIn: https://www.linkedin.com/in/emmanuel-ngene-708337263
- X (Twitter): https://x.com/_devemmy
- TikTok: https://www.tiktok.com/@_devemmy
- Instagram (portfolio): https://www.instagram.com/_devemmy
- Email: ${PERSON.email}
`;
}
