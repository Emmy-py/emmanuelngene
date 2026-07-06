import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cur = cursorRef.current;
    const ring = ringRef.current;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let frame;

    function onMouseMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }

    function tick() {
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      frame = requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", onMouseMove);
    tick();

    function grow() {
      cur.style.width = "16px";
      cur.style.height = "16px";
      ring.style.width = "48px";
      ring.style.height = "48px";
    }
    function shrink() {
      cur.style.width = "10px";
      cur.style.height = "10px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    }

    const targets = document.querySelectorAll("a,button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[width_0.2s,height_0.2s,background_0.35s]"
        id="cursor"
        ref={cursorRef}
      ></div>
      <div
        className="pointer-events-none fixed z-[9998] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-border-accent transition-[width_0.2s,height_0.2s,border-color_0.35s]"
        id="cursorRing"
        ref={ringRef}
      ></div>
    </>
  );
}
