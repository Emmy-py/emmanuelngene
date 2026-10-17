import Cursor from "./Cursor";
import Nav from "./Nav";
import Footer from "./Footer";
import useTheme from "../hooks/useTheme";
import useActiveSection from "../hooks/useActiveSection";

export default function Layout({ children }) {
  const [theme, setTheme] = useTheme();
  const activeSection = useActiveSection();

  return (
    <>
      <Cursor />
      <Nav activeSection={activeSection} theme={theme} onThemeChange={setTheme} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
