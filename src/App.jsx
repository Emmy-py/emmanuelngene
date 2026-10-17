import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import { resolveRoute } from "./routes";

export default function App({ path }) {
  const route = resolveRoute(path);

  return (
    <Layout page={route.page}>
      {route.page === "home" && <Home />}
      {route.page === "project" && <ProjectPage project={route.project} />}
      {route.page === "blog" && <BlogIndex />}
      {route.page === "post" && <BlogPost post={route.post} />}
      {route.page === "notFound" && <NotFound />}
    </Layout>
  );
}
