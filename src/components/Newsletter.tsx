import { newsletter } from "@/lib/content";
import Reveal from "./Reveal";

export default function Newsletter() {
  return (
    <section className="bg-ff-orange py-16 text-ff-gray-2 md:py-20">
      <Reveal className="shell">
        <h2 className="text-[clamp(1.75rem,3.4vw,2.9rem)] font-semibold uppercase leading-none">
          {newsletter.title}
        </h2>
        <p className="mt-5 max-w-[640px] text-[clamp(0.95rem,1.1vw,1.15rem)] leading-relaxed">
          {newsletter.body}
        </p>

        <form
          className="mt-8 flex w-full max-w-[460px] items-center gap-2"
          action="#"
          aria-label="Newsletter signup"
        >
          <input
            type="email"
            required
            placeholder={newsletter.placeholder}
            className="h-12 flex-1 rounded-full bg-ff-gray-2 px-5 text-ff-ink placeholder:text-ff-ink/50 focus:outline-none focus:ring-2 focus:ring-ff-ink/20"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-ff-lavender px-7 font-medium text-ff-gray-2 transition-transform hover:-translate-y-0.5"
          >
            {newsletter.cta}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
