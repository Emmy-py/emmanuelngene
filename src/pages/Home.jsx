import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Process from "../components/Process";
import Contact from "../components/Contact";
import useReveal from "../hooks/useReveal";

export default function Home() {
  useReveal();

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Process />
      {/* <Blog /> is hidden until the posts are written (component kept in src/components/Blog.jsx). */}
      <Contact />
    </>
  );
}
