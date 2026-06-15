import { events } from "@/lib/content";
import EventBlock from "./EventBlock";
import Reveal from "./Reveal";

export default function Events() {
  return (
    <>
      {/* Next events and speakers — light */}
      <section id="events" className="bg-ff-gray py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <h2 className="display-xl text-ff-orange">
              Next events
              <br />
              and speakers
            </h2>
          </Reveal>
        </div>
        <div className="mt-20">
          <EventBlock event={events[0]} variant="light" />
        </div>
      </section>

      {/* Next event — dark */}
      <section className="bg-ff-ink py-20 md:py-28">
        <EventBlock event={events[1]} variant="dark" />
      </section>
    </>
  );
}
