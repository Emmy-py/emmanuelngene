import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
// Self-hosted fonts (latin subset, font-display: swap) — only the weights the site uses.
import "@fontsource/plus-jakarta-sans/latin-600.css";
import "@fontsource/plus-jakarta-sans/latin-700.css";
import "@fontsource/plus-jakarta-sans/latin-800.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-400-italic.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-mono/latin-400.css";
import "./index.css";
import App from "./App.jsx";
import { loadPost } from "./data/posts";
import { resolveRoute } from "./routes";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Production pages are prerendered (scripts/prerender.mjs), so hydrate them; the dev server
// serves an empty #root, so render from scratch there. A blog post's body is its own chunk and
// must be loaded first so the client renders the same markup as the prerendered page.
const route = resolveRoute(window.location.pathname);
(route.page === "post" ? loadPost(route.post.slug) : Promise.resolve()).then(() => {
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);
});
