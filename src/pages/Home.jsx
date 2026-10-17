import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Process from "../components/Process";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import useReveal from "../hooks/useReveal";

export default function Home() {
  useReveal();

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Projects />
      <Process />
      <Blog />
      <Contact />
    </>
  );
}
