import { about } from "@/lib/data";
import { Section } from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <Section id="about" eyebrow="About">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
        <Reveal>
          <p className="font-display text-xl font-medium leading-snug tracking-tight text-fg sm:text-2xl">
            {about.lead}
          </p>
          <div className="mt-6 space-y-4">
            {about.body.map((para) => (
              <p key={para.slice(0, 24)} className="text-[15px] leading-relaxed text-muted sm:text-base">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="space-y-4">
            {about.values.map((v) => (
              <li
                key={v.title}
                className="rounded-xl border border-line bg-surface/50 p-5"
              >
                <p className="flex items-start gap-2 font-display text-base font-semibold text-fg">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {v.title}
                </p>
                <p className="mt-2 pl-3.5 text-sm leading-relaxed text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
