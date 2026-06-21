import Image from "next/image";
import { intro, founders } from "@/lib/content";
import FounderMedia from "./FounderMedia";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-ff-orange text-ff-gray-2">
      {/* top padding only — founder portraits bleed to the bottom of the band */}
      <div className="shell pt-16 md:pt-20">
        {/* Intro: photo (matches the paragraph height) + mission */}
        <Reveal className="flex flex-col gap-8 md:flex-row md:gap-10">
          <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden md:aspect-auto md:w-[300px] md:self-stretch">
            <Image
              src={intro.image}
              alt="Friday Foundry event"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <p className="max-w-[1100px] text-[clamp(1.35rem,2.2vw,2.45rem)] font-medium leading-[1.06]">
            {intro.body}
          </p>
        </Reveal>

        {/* Founders / board — centered labels, portraits flush to the bottom */}
        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-28 md:grid-cols-4 md:gap-x-8">
          {founders.map((f, i) => (
            <Reveal key={f.name} className="flex flex-col" delay={i * 0.07}>
              <div className="mb-5 text-center">
                <p className="text-[clamp(1.1rem,1.4vw,1.6rem)] font-semibold leading-none">
                  {f.role}
                </p>
                <p className="mt-1 text-[clamp(1.1rem,1.4vw,1.6rem)] leading-tight">
                  {f.name}
                </p>
                <p className="mt-1 text-sm italic opacity-90">{f.title}</p>
              </div>
              <div className="relative aspect-[3/5] w-full overflow-hidden">
                <FounderMedia
                  founder={f}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
