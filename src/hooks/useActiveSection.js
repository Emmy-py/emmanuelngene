import { useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "services",
  "projects",
  "testimonials",
  "process",
  "blog",
  "contact",
];

export default function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    function onScroll() {
      let current = "";
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      });
      setActive(current);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}
