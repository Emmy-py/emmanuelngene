import { useEffect } from "react";

// The prerendered HTML shows every .reveal element straight away, so content never waits on
// this script. Once it runs, only elements still below the fold are hidden and faded in on scroll.
export default function useReveal() {
  useEffect(() => {
    const below = [...document.querySelectorAll(".reveal")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, Math.min(i, 5) * 70); // capped so a big batch (fast scroll) doesn't lag
          }
        });
      },
      { threshold: 0.08 },
    );
    below.forEach((el) => {
      el.classList.add("reveal-pending");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}
