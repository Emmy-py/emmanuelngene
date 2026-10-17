import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import { resolveRoute } from "./routes";

export default function App({ path }) {
  const route = resolveRoute(path);

  return (
    <Layout>
      {route.page === "home" && <Home />}
      {route.page === "project" && <ProjectPage project={route.project} />}
      {route.page === "notFound" && <NotFound />}
    </Layout>
  );
}
