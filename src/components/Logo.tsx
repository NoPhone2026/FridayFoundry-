"use client";

import { useEffect, useRef } from "react";

// Four 18×18 squares forming a plus (hollow centre), viewBox 0 0 54 54.
const SQUARES = [
  { x: 0, y: 18 }, // left
  { x: 18, y: 0 }, // top
  { x: 18, y: 36 }, // bottom
  { x: 36, y: 18 }, // right
];

const INK = "#222222";
const ORANGE = "#FF4800";
const LAVENDER = "#A883FF";

export default function Logo({ size = 34 }: { size?: number }) {
  const rects = useRef<Array<SVGRectElement | null>>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const reset = () => {
    rects.current.forEach((r) => {
      r?.setAttribute("transform", "translate(0 0)");
      r?.setAttribute("fill", INK);
    });
  };

  const start = () => {
    if (timer.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // accessible fallback: just a brand colour, no motion
      rects.current.forEach((r, i) =>
        r?.setAttribute("fill", i % 2 ? LAVENDER : ORANGE),
      );
      return;
    }
    const tick = () => {
      rects.current.forEach((r) => {
        if (!r) return;
        const jx = ((Math.random() * 2 - 1) * 6).toFixed(1);
        const jy = ((Math.random() * 2 - 1) * 6).toFixed(1);
        r.setAttribute("transform", `translate(${jx} ${jy})`);
        const n = Math.random();
        r.setAttribute("fill", n < 0.5 ? INK : n < 0.75 ? ORANGE : LAVENDER);
      });
    };
    tick();
    timer.current = setInterval(tick, 130);
  };

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    reset();
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 54 54"
      fill="none"
      style={{ overflow: "visible" }}
      onMouseEnter={start}
      onMouseLeave={stop}
      aria-hidden
    >
      {SQUARES.map((s, i) => (
        <rect
          key={i}
          ref={(el) => {
            rects.current[i] = el;
          }}
          x={s.x}
          y={s.y}
          width="18"
          height="18"
          fill={INK}
        />
      ))}
    </svg>
  );
}
