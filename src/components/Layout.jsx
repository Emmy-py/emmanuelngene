import Cursor from "./Cursor";
import ThemeSwitcher from "./ThemeSwitcher";
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
      <ThemeSwitcher theme={theme} onChange={setTheme} />
      <Nav activeSection={activeSection} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
