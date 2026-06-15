import { previousEvents } from "@/lib/content";
import Reveal from "./Reveal";

export default function PreviousEvents() {
  return (
    <section className="bg-ff-gray py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <h2 className="display-xl text-ff-orange">Previous Events</h2>
        </Reveal>

        <ul className="mt-12">
          {previousEvents.map((e, i) => (
            <Reveal
              as="li"
              key={e.title}
              delay={i * 0.05}
              className="group flex items-baseline justify-between gap-4 border-t border-ff-ink/10 py-2 first:border-t-0"
            >
              <span className="text-[clamp(2rem,4.6vw,4.35rem)] font-semibold uppercase leading-tight text-ff-gray-4 transition-colors group-hover:text-ff-orange">
                {e.title}
              </span>
              <span className="shrink-0 text-sm text-ff-ink/80 md:text-base">
                {e.date}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
