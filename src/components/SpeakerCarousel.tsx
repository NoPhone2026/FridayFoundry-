"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Speaker } from "@/lib/content";

// One fixed card size (no hover-grow). Full-width when stacked on mobile,
// a fixed reading width in the desktop scroller — big enough for the flipped
// bio either way. aspect-[4/5] drives the height.
const CARD_W = "w-full md:w-[clamp(344px,27vw,410px)]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Per-speaker face layout — name + title positioned to match each card design.
// Geometry lifted from Figma (card ~367×458): all labels are dark ink text on a
// subtle gray-2 box. The card is a @container, so cqw font sizes + em padding
// scale everything with the card. Names ≈ 12.15cqw, titles ≈ 4.25cqw.
const NAME =
  "absolute whitespace-nowrap bg-ff-gray-2 px-[0.35em] py-[0.18em] text-[12.15cqw] font-medium leading-none text-ff-ink";
const TITLE =
  "absolute bg-ff-gray-2 px-[0.55em] py-[0.3em] text-[4.25cqw] font-medium leading-[1.12] text-ff-ink";

const FACE: Record<string, { name: string; title: string }> = {
  odile: {
    title: `${TITLE} left-[22.1%] top-[17.7%] max-w-[40%]`,
    name: `${NAME} bottom-[10.9%] left-[16.6%]`,
  },
  jolyon: {
    name: `${NAME} top-[8.7%] left-[13.9%]`,
    title: `${TITLE} bottom-[11.1%] left-[49.9%] max-w-[45%]`,
  },
  farah: {
    name: `${NAME} top-[17.7%] left-[5.4%]`,
    title: `${TITLE} top-[31.2%] left-[33.2%] whitespace-pre-line`,
  },
};
const DEFAULT_FACE = {
  name: `${NAME} bottom-[8%] left-[6%]`,
  title: `${TITLE} left-[6%] top-[7%] max-w-[55%]`,
};

export default function SpeakerCarousel({
  speakers,
  variant = "light",
}: {
  speakers: Speaker[];
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const liRefs = useRef<Array<HTMLLIElement | null>>([]);
  const cardBg = variant === "dark" ? "bg-ff-ink" : "bg-ff-gray";

  const toggle = (i: number) => {
    const willOpen = open !== i;
    setOpen(willOpen ? i : null);
    if (!willOpen) return;
    const el = liRefs.current[i];
    requestAnimationFrame(() =>
      el?.scrollIntoView({ inline: "center", block: "center", behavior: "smooth" }),
    );
  };

  return (
    <div className="mt-12">
      {/* Stacked on mobile; a horizontal scroller on md+. The -my/py pair gives
          the 3D flip vertical room inside the (otherwise clipping) scroller. */}
      <ul className="no-scrollbar flex flex-col gap-6 px-[var(--spacing-gutter)] md:-my-10 md:flex-row md:items-center md:gap-5 md:overflow-x-auto md:py-10">
        {speakers.map((s, i) => {
          const flipped = open === i;
          const face = FACE[s.slug] ?? DEFAULT_FACE;
          const hasLinks = Boolean(s.website || s.handle);
          return (
            <li
              key={`${s.name}-${i}`}
              ref={(el) => {
                liRefs.current[i] = el;
              }}
              className={`group relative ${CARD_W} [perspective:2400px] md:shrink-0 ${
                flipped ? "z-10" : ""
              }`}
            >
              {/* Flipping card — same box front & back, rotates in place */}
              <div
                className={`@container relative aspect-[4/5] w-full transition-transform duration-[600ms] [transform-style:preserve-3d] ${EASE}`}
                style={{
                  transform: flipped ? "rotateY(180deg)" : undefined,
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                {/* FRONT — collage + labels; whole face opens */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={flipped}
                  aria-hidden={flipped}
                  aria-label={`Open ${s.name} details`}
                  tabIndex={flipped ? -1 : 0}
                  style={{ pointerEvents: flipped ? "none" : "auto" }}
                  className={`absolute inset-0 cursor-pointer overflow-hidden text-left shadow-sm shadow-black/5 transition-shadow [backface-visibility:hidden] [-webkit-backface-visibility:hidden] group-hover:shadow-xl group-hover:shadow-black/15 ${cardBg}`}
                >
                  <Image src={s.image} alt="" fill sizes="420px" className="object-cover" />
                  <span className={`pointer-events-none ${face.title}`}>{s.title}</span>
                  <span className={`pointer-events-none ${face.name}`}>{s.name}</span>

                  {/* + cue — bottom-right. Always shown on touch; hover-only on desktop */}
                  <span
                    className={`absolute bottom-0 right-0 grid h-11 w-11 place-items-center bg-ff-gray-2 text-ff-ink transition-opacity duration-200 ${
                      flipped
                        ? "opacity-0"
                        : "[@media(hover:none)]:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* BACK — "About the speaker & session" (gray-2 text panel) */}
                <div
                  aria-hidden={!flipped}
                  style={{ pointerEvents: flipped ? "auto" : "none" }}
                  className="absolute inset-0 overflow-hidden bg-ff-gray-2 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                  <div className="flex h-full flex-col justify-between p-[6.8cqw]">
                    <div className="flex flex-col gap-[5.6cqw]">
                      <h4 className="whitespace-pre-line text-[6.43cqw] font-semibold leading-none text-ff-orange">
                        {"About the\nspeaker & session"}
                      </h4>
                      <p className="whitespace-pre-line text-[3.95cqw] leading-[1.33] text-ff-ink">
                        {s.bio}
                      </p>
                    </div>
                    {hasLinks && (
                      <div className="flex flex-col gap-[1.1cqw] text-[3.95cqw] leading-[1.33] text-ff-ink">
                        {s.website && (
                          <a
                            href={`https://${s.website.replace(/^https?:\/\//, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-fit underline underline-offset-2"
                          >
                            {s.website}
                          </a>
                        )}
                        {s.handle &&
                          (s.instagram ? (
                            <a
                              href={s.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="w-fit underline underline-offset-2"
                            >
                              {s.handle}
                            </a>
                          ) : (
                            <span className="w-fit underline underline-offset-2">{s.handle}</span>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* close × */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-label={`Close ${s.name} details`}
                    tabIndex={flipped ? 0 : -1}
                    className="absolute right-0 top-0 grid h-11 w-11 place-items-center text-ff-ink/60 transition-colors hover:text-ff-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
