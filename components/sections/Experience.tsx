import { experience, education } from "@/lib/data";
import { Section } from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've shipped">
      <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.org} delay={i * 80} className="relative">
            <span
              className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg sm:-left-[2.15rem]"
              aria-hidden
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
                {job.role}
                {"note" in job && job.note && (
                  <span className="ml-2 align-middle font-mono text-[11px] font-normal text-faint">
                    ({job.note})
                  </span>
                )}
              </h3>
              <span className="font-mono text-xs text-faint">{job.period}</span>
            </div>
            <p className="mt-0.5 text-sm font-medium text-accent">{job.org}</p>
            <ul className="mt-3 space-y-2">
              {job.bullets.map((b) => (
                <li key={b.slice(0, 28)} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <h3 className="mb-5 mt-14 font-display text-xl font-semibold tracking-tight text-fg">
          Education
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((e) => (
            <div key={e.school} className="rounded-xl border border-line bg-surface/50 p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="font-display text-base font-semibold tracking-tight text-fg">
                  {e.school}
                </h4>
                <span className="shrink-0 font-mono text-[11px] text-faint">{e.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{e.degree}</p>
              <p className="mt-0.5 text-[13px] text-faint">{e.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
