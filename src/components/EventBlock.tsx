import type { EventItem } from "@/lib/content";
import SpeakerCarousel from "./SpeakerCarousel";
import Reveal from "./Reveal";

export default function EventBlock({
  event,
  variant = "light",
}: {
  event: EventItem;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const paras = event.description.split(/\n\s*\n/);
  return (
    <div>
      <Reveal className="shell">
        {/* Header: title (left) + date/location (top-right) share a row on every
            width; the description below always spans full width */}
        <div className="grid grid-cols-[1fr_auto] items-start gap-6 md:gap-8">
          <h3 className="text-[clamp(2.2rem,4vw,3.9rem)] font-medium leading-[0.85] text-ff-orange">
            {event.title}
          </h3>
          <div className="shrink-0 text-right text-ff-orange">
            <p className="text-[clamp(1.3rem,2.5vw,2.75rem)] font-medium leading-none">
              {event.dates}
            </p>
            <p className="mt-2 text-[clamp(1.3rem,2.5vw,2.75rem)] font-medium leading-none">
              {event.location}
            </p>
          </div>
        </div>

        <div
          className={`mt-8 max-w-[1000px] space-y-4 text-[clamp(0.95rem,1.05vw,1.125rem)] leading-relaxed ${
            isDark ? "text-ff-gray-2/75" : "text-ff-ink/75"
          }`}
        >
          {paras.map((para, i) => (
            <p
              key={i}
              className={paras.length > 1 && i === 0 ? "font-semibold" : undefined}
            >
              {para}
            </p>
          ))}
        </div>

        <a
          href={event.ticketUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-block rounded-full bg-ff-lavender px-7 py-3 text-[15px] font-medium text-ff-gray-2 transition-transform hover:-translate-y-0.5"
        >
          Buy your ticket
        </a>
      </Reveal>

      <Reveal>
        <SpeakerCarousel speakers={event.speakers} variant={variant} />
      </Reveal>
    </div>
  );
}
