"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import type { Speaker } from "@/lib/content";

const T = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

// width states (literals so Tailwind picks them up)
const SMALL_W = "w-[clamp(240px,22vw,300px)]";
const BIG_W = "w-[clamp(300px,27vw,390px)]";
const HOVER_W = "group-hover:w-[clamp(300px,27vw,390px)]";

export default function SpeakerCarousel({
  speakers,
  variant = "light",
}: {
  speakers: Speaker[];
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const tag =
    variant === "dark" ? "bg-ff-ink text-ff-gray-2" : "bg-ff-gray-2 text-ff-ink";

  return (
    <div className="no-scrollbar mt-12 overflow-x-auto pb-2 pl-[var(--spacing-gutter)]">
      <ul className="flex items-stretch gap-4 pr-[var(--spacing-gutter)]">
        {speakers.map((s, i) => {
          const expanded = open === i;
          return (
            <li
              key={`${s.name}-${i}`}
              className="group relative flex h-[clamp(360px,36vw,460px)] shrink-0 items-stretch"
            >
              {/* Portrait — whole card toggles the panel; grows on hover */}
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                aria-label={
                  expanded ? `Close ${s.name} details` : `Open ${s.name} details`
                }
                className={`relative h-full shrink-0 cursor-pointer overflow-hidden text-left transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  expanded ? BIG_W : `${SMALL_W} ${HOVER_W}`
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="390px"
                  className="object-cover"
                />
                <span
                  className={`pointer-events-none absolute left-3 top-3 px-2 py-1 text-sm font-medium ${tag}`}
                >
                  {s.name}
                </span>

                {/* + box — appears on hover, rotates to × when open */}
                <span
                  className={`absolute bottom-0 right-0 grid h-11 w-11 place-items-center bg-ff-gray-2 text-ff-ink transition-opacity duration-200 ${
                    expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
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

              {/* Detail panel — reveals to the right */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="panel"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={T}
                    className="shrink-0 overflow-hidden"
                  >
                    <div className="flex h-full w-[clamp(300px,30vw,415px)] flex-col justify-between bg-ff-gray-2 p-8">
                      <div>
                        <h4 className="whitespace-pre-line text-2xl font-semibold leading-none text-ff-orange">
                          {"About the\nspeaker & session"}
                        </h4>
                        <p className="mt-6 text-base leading-snug text-ff-ink">
                          {s.bio}
                        </p>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
