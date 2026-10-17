import { findProject } from "./data/projects";

// Maps a URL path to the page to render. Shared by the client entry and the prerenderer
// so both always pick the same page (required for hydration to match).
export function resolveRoute(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/index.html") return { page: "home" };
  const match = path.match(/^\/projects\/([a-z0-9-]+)$/);
  const project = match && findProject(match[1]);
  if (project) return { page: "project", project };
  return { page: "notFound" };
}
