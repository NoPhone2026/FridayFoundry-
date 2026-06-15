import { contact } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-ff-gray pt-20 md:pt-28">
      <div className="shell">
        <Reveal>
          <h2 className="text-[clamp(2rem,3.8vw,3.4rem)] font-semibold uppercase leading-none text-ff-orange">
            {contact.heading}
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Tagline + body */}
          <div className="max-w-[420px]">
            <p className="text-lg font-semibold text-ff-ink">{contact.tagline}</p>
            <p className="mt-4 text-[clamp(0.95rem,1vw,1.05rem)] leading-relaxed text-ff-ink/80">
              {contact.body}
            </p>
          </div>

          {/* Contact columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {contact.columns.map((col) => (
              <div key={col.label}>
                <p className="text-sm text-ff-lavender">{col.label}</p>
                <div className="mt-2 space-y-0.5 text-ff-ink">
                  {col.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
