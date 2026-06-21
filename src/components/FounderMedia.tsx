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
  if (!founder.video || reduce) {
    return (
      <Image
        src={founder.video?.poster ?? founder.image}
        alt={founder.name}
        fill
        sizes={sizes}
        className="object-cover"
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
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={founder.video.webm} type="video/webm" />
      <source src={founder.video.mp4} type="video/mp4" />
    </video>
  );
}
