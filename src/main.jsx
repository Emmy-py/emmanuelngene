import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
// Self-hosted fonts (latin subset, font-display: swap) — only the weights the site uses.
import "@fontsource/syne/latin-600.css";
import "@fontsource/syne/latin-700.css";
import "@fontsource/syne/latin-800.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-400-italic.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-mono/latin-400.css";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Production pages are prerendered (scripts/prerender.mjs), so hydrate them; the dev server
// serves an empty #root, so render from scratch there.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
