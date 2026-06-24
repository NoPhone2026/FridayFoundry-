"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { Founder } from "@/lib/content";

export default function FounderMedia({
  founder,
  sizes,
}: {
  founder: Founder;
  sizes: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  // Only play while the card is on screen (saves bandwidth/battery).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // No video, or the user prefers reduced motion -> static poster/placeholder.
  // object-contain so a non-matching aspect (e.g. the placeholder board photo)
  // is shown whole rather than cropped; same-aspect posters fill regardless.
  if (!founder.video || reduce) {
    return (
      <Image
        src={founder.video?.poster ?? founder.image}
        alt={founder.name}
        fill
        sizes={sizes}
        className="object-contain"
      />
    );
  }

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={founder.video.poster}
      aria-label={founder.name}
      // +1px height (clipped by the parent's overflow-hidden) closes the
      // subpixel rounding gap that otherwise shows a hairline of the orange
      // band beneath the figure.
      className="absolute inset-x-0 top-0 w-full h-[calc(100%+1px)] object-cover"
    >
      <source src={founder.video.webm} type="video/webm" />
      <source src={founder.video.mp4} type="video/mp4" />
    </video>
  );
}
