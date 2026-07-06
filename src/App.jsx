import Cursor from "./components/Cursor";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Process from "./components/Process";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useTheme from "./hooks/useTheme";
import useActiveSection from "./hooks/useActiveSection";
import useReveal from "./hooks/useReveal";

export default function App() {
  const [theme, setTheme] = useTheme();
  const activeSection = useActiveSection();
  useReveal();

  return (
    <>
      <Cursor />
      <ThemeSwitcher theme={theme} onChange={setTheme} />
      <Nav activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Process />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
