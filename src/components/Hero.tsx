/* eslint-disable @next/next/no-img-element */
import HeroGlitch from "./HeroGlitch";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-ff-gray"
    >
      {/* Real heading for SEO / screen readers — present in the DOM, hidden visually */}
      <h1 className="sr-only">Friday Foundry</h1>

      <div className="shell relative z-10 w-full">
        <Reveal y={30}>
          {/* Decorative wordmark (the accessible name comes from the h1 above) */}
          <div className="translate-y-[6vh]">
            <img
              src="/images/wordmark.svg"
              alt=""
              aria-hidden
              className="w-[min(90vw,1320px)] select-none"
              draggable={false}
            />
          </div>
        </Reveal>
      </div>

      {/* Interactive glitch reveal — sits above the wordmark */}
      <HeroGlitch />
    </section>
  );
}
