import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, i * 70);
          }
        });
      },
      { threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
