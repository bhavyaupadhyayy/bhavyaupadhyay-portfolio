import Image from "next/image";
import { about } from "@/lib/data";
import { Section } from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <Section id="about" title="Honest systems, end to end">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.85fr] lg:items-start lg:gap-16">
        <Reveal>
          <p className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-fg sm:text-2xl">
            {about.lead}
          </p>
          <div className="mt-6 max-w-prose space-y-4">
            {about.body.map((para) => (
              <p key={para.slice(0, 24)} className="text-[15px] leading-relaxed text-muted sm:text-base">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
            <Image
              src="/bhavya-hero.jpg"
              alt="Bhavya Upadhyay"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover [object-position:50%_18%] [filter:brightness(.92)_contrast(1.04)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/65 via-transparent to-transparent"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-8 border-t border-line/70 pt-12 sm:grid-cols-3 sm:gap-10">
        {about.values.map((v, i) => (
          <Reveal key={v.title} delay={i * 80}>
            <span aria-hidden className="block h-px w-8 bg-accent/70" />
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-fg">
              {v.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
