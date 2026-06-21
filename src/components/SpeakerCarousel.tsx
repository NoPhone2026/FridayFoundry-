"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { Speaker } from "@/lib/content";

// width states (literals so Tailwind picks them up); aspect-[4/5] makes the
// height follow, so the card grows in BOTH dimensions
const SMALL_W = "w-[clamp(264px,24vw,330px)]";
const BIG_W = "w-[clamp(320px,29vw,406px)]";
const PANEL_W = "w-[clamp(300px,30vw,415px)]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Per-speaker face layout — name + title positioned to match each card design.
// The card is a @container, so cqw font sizes scale the text with the card.
const FACE: Record<string, { name: string; title: string }> = {
  odile: {
    title:
      "absolute left-[6%] top-[7%] max-w-[58%] bg-ff-orange px-[3%] py-[1.5%] text-[3.4cqw] font-medium leading-tight text-ff-gray-2",
    name: "absolute bottom-[7%] left-[6%] bg-ff-ink px-[4%] py-[1.5%] text-[7.5cqw] font-medium leading-none text-ff-gray-2",
  },
  jolyon: {
    name: "absolute inset-x-[6%] top-[4%] text-[10cqw] font-medium leading-none text-ff-ink",
    title:
      "absolute bottom-[8%] left-1/2 w-[72%] -translate-x-1/2 bg-ff-ink px-[4%] py-[2.5%] text-[3.6cqw] font-medium leading-tight text-ff-gray-2",
  },
  farah: {
    name: "absolute inset-x-[6%] top-[15%] text-[9.5cqw] font-medium leading-none text-ff-ink",
    title:
      "absolute right-[6%] top-[31%] whitespace-pre-line text-right text-[3.6cqw] font-medium leading-tight text-ff-ink",
  },
};
const DEFAULT_FACE = {
  name: "absolute inset-x-[6%] top-[5%] text-[9cqw] font-medium leading-none text-ff-ink",
  title:
    "absolute bottom-[7%] left-[6%] bg-ff-ink px-[4%] py-[2%] text-[3.6cqw] font-medium leading-tight text-ff-gray-2",
};

export default function SpeakerCarousel({
  speakers,
  variant = "light",
}: {
  speakers: Speaker[];
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const liRefs = useRef<Array<HTMLLIElement | null>>([]);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardBg = variant === "dark" ? "bg-ff-ink" : "bg-ff-gray";

  const toggle = (i: number) => {
    const willOpen = open !== i;
    setOpen(willOpen ? i : null);
    if (!willOpen) return;
    const el = liRefs.current[i];
    if (!el) return;
    // nudge into view immediately, then again once the panel is full width
    requestAnimationFrame(() =>
      el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" }),
    );
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(
      () =>
        el.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" }),
      560,
    );
  };

  return (
    <div className="no-scrollbar mt-12 overflow-x-auto pb-2 pl-[var(--spacing-gutter)]">
      {/* min-h reserves the tall (popped) height; items-end -> cards rise from a baseline */}
      <ul className="flex min-h-[clamp(400px,36vw,508px)] items-end gap-4 pr-[var(--spacing-gutter)]">
        {speakers.map((s, i) => {
          const expanded = open === i;
          const enlarged = expanded || hovered === i;
          const face = FACE[s.slug] ?? DEFAULT_FACE;
          return (
            <li
              key={`${s.name}-${i}`}
              ref={(el) => {
                liRefs.current[i] = el;
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              className={`relative flex shrink-0 items-stretch ${
                enlarged ? "z-10" : ""
              }`}
            >
              {/* Portrait — whole card toggles; grows in width + height and pops up */}
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={expanded}
                aria-label={
                  expanded ? `Close ${s.name} details` : `Open ${s.name} details`
                }
                className={`@container relative aspect-[4/5] shrink-0 cursor-pointer overflow-hidden text-left transition-[width,box-shadow] duration-500 ${EASE} ${cardBg} ${
                  enlarged ? BIG_W : SMALL_W
                } ${hovered === i && !expanded ? "shadow-2xl shadow-black/25" : ""}`}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="406px"
                  className="object-cover"
                />
                <span className={`pointer-events-none ${face.title}`}>
                  {s.title}
                </span>
                <span className={`pointer-events-none ${face.name}`}>
                  {s.name}
                </span>

                {/* + box — appears when enlarged, rotates to × when open */}
                <span
                  className={`absolute bottom-0 right-0 grid h-11 w-11 place-items-center bg-ff-gray-2 text-ff-ink transition-opacity duration-200 ${
                    enlarged ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    animate={{ rotate: expanded ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    aria-hidden
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </button>

              {/* Detail panel — pure CSS width transition; content is absolutely
                  positioned so it fills the card height but never drives it */}
              <div
                aria-hidden={!expanded}
                className={`relative overflow-hidden transition-[width] duration-500 ${EASE} ${
                  expanded ? PANEL_W : "w-0"
                }`}
              >
                <div
                  className={`absolute inset-y-0 left-0 flex ${PANEL_W} flex-col justify-between bg-ff-gray-2 p-8`}
                >
                  <div>
                    <h4 className="whitespace-pre-line text-2xl font-semibold leading-none text-ff-orange">
                      {"About the\nspeaker & session"}
                    </h4>
                    <p className="mt-6 text-base leading-snug text-ff-ink">{s.bio}</p>
                    <p className="mt-7 whitespace-pre-line text-base leading-relaxed text-ff-ink underline">
                      {`${s.website}\n${s.handle}`}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <div className="relative h-[110px] w-[185px] shrink-0 overflow-hidden">
                      <Image
                        src={s.detailImage}
                        alt=""
                        fill
                        sizes="185px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
