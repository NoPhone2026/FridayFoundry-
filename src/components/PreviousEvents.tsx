import { previousEvents } from "@/lib/content";
import Reveal from "./Reveal";

export default function PreviousEvents() {
  return (
    <section className="bg-ff-gray py-28 md:py-[120px]">
      <div className="shell">
        <Reveal>
          <h2 className="display-xl text-ff-orange">Previous Events</h2>
        </Reveal>

        <ul className="mt-[clamp(64px,9vw,120px)] flex flex-col gap-12">
          {previousEvents.map((e, i) => (
            <Reveal
              as="li"
              key={e.title}
              delay={i * 0.05}
              className="group flex items-start gap-3"
            >
              <span className="text-[clamp(3rem,8vw,7rem)] font-semibold uppercase leading-[0.78] text-white/60 transition-colors group-hover:text-ff-orange">
                {e.title}
              </span>
              <span className="mt-3 shrink-0 text-[clamp(1rem,1.4vw,1.5rem)] uppercase leading-none text-ff-ink">
                {e.date}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
