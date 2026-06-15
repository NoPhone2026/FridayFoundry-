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
  return (
    <div>
      <Reveal className="shell">
        <div className="grid grid-cols-[1fr_auto] items-start gap-8">
          {/* Left: title, description, ticket — description sits tight under the title */}
          <div>
            <h3
              className={`text-[clamp(2.2rem,4vw,3.9rem)] font-medium leading-[0.85] ${
                isDark ? "text-ff-gray-2" : "text-ff-orange"
              }`}
            >
              {event.title}
            </h3>

            <p
              className={`mt-8 max-w-[1000px] text-[clamp(0.95rem,1.05vw,1.125rem)] leading-relaxed ${
                isDark ? "text-ff-gray-2/75" : "text-ff-ink/75"
              }`}
            >
              {event.description}
            </p>

            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-block rounded-full bg-ff-lavender px-7 py-3 text-[15px] font-medium text-ff-gray-2 transition-transform hover:-translate-y-0.5"
            >
              Buy your ticket
            </a>
          </div>

          {/* Right: date + location, pinned top-right (own column, no effect on the body) */}
          <div className="shrink-0 text-right text-ff-orange">
            <p className="text-[clamp(1.3rem,2.5vw,2.75rem)] font-medium leading-none">
              {event.dates}
            </p>
            <p className="mt-2 text-[clamp(1.3rem,2.5vw,2.75rem)] font-medium leading-none">
              {event.location}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <SpeakerCarousel speakers={event.speakers} variant={variant} />
      </Reveal>
    </div>
  );
}
