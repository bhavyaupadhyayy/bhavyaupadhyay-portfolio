import { flagships, secondaryProjects, type Flagship } from "@/lib/data";
import { Section, TechTag } from "@/components/Section";
import Reveal from "@/components/Reveal";
import EdgarDiagram from "@/components/diagrams/EdgarDiagram";
import FlightlineDiagram from "@/components/diagrams/FlightlineDiagram";

const diagrams: Record<string, React.ReactNode> = {
  "edgar-x": <EdgarDiagram />,
  flightline: <FlightlineDiagram />,
};

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function FlagshipCase({ p, index }: { p: Flagship; index: number }) {
  return (
    <Reveal
      as="article"
      className="overflow-hidden rounded-2xl border border-line bg-surface/50"
    >
      <div className="border-b border-line/70 p-6 sm:p-8">
        <div className="flex items-center gap-2 font-mono text-xs text-faint">
          <span className="text-accent">Flagship {index + 1}</span>
          <span aria-hidden>·</span>
          <span>Case study</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {p.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-accent sm:text-base">{p.tagline}</p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">{p.oneLine}</p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                l.primary
                  ? "bg-accent text-accent-ink hover:bg-accent/90"
                  : "border border-line-strong bg-surface-2/60 text-fg hover:border-accent/50 hover:text-accent"
              }`}
            >
              {l.label}
              <ArrowIcon />
            </a>
          ))}
        </div>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div>
            <h4 className="mb-2 font-mono text-[11px] tracking-tight text-faint">
              Problem &amp; constraint
            </h4>
            <p className="text-[15px] leading-relaxed text-muted">{p.problem}</p>
          </div>

          <div>
            <h4 className="mb-3 font-mono text-[11px] tracking-tight text-faint">
              Architecture
            </h4>
            {diagrams[p.slug]}
          </div>

          <div>
            <h4 className="mb-3 font-mono text-[11px] tracking-tight text-faint">
              Challenges &amp; solutions
            </h4>
            <ul className="space-y-4">
              {p.challenges.map((c) => (
                <li key={c.title}>
                  <p className="flex gap-2 text-sm font-semibold text-fg">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {c.title}
                  </p>
                  <p className="mt-1 pl-3 text-sm leading-relaxed text-muted">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="mb-3 font-mono text-[11px] tracking-tight text-faint">
              Results
            </h4>
            <dl className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
              {p.results.map((r) => (
                <div key={r.label} className="bg-surface px-4 py-3.5">
                  <dt className="font-display text-xl font-semibold tracking-tight text-accent">
                    {r.value}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-relaxed text-muted">{r.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h4 className="mb-3 font-mono text-[11px] tracking-tight text-faint">
              Tech stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <TechTag key={t}>{t}</TechTag>
              ))}
            </div>
          </div>

          {p.honesty && (
            <div className="rounded-xl border border-accent/25 bg-[rgba(244,168,58,0.06)] p-4">
              <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] tracking-tight text-accent">
                <span aria-hidden>◆</span> Deployment status
              </p>
              <p className="text-[13px] leading-relaxed text-muted">{p.honesty}</p>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Two systems, built and tested end-to-end"
      intro="Each is a real pipeline over messy source data, with the evaluation reported honestly. Deployment status is always stated plainly — nothing is dressed up as running in production when it isn't."
    >
      <div className="space-y-10">
        {flagships.map((p, i) => (
          <FlagshipCase key={p.slug} p={p} index={i} />
        ))}
      </div>

      {/* Secondary grid */}
      <div className="mt-16">
        <Reveal>
          <h3 className="mb-6 font-display text-xl font-semibold tracking-tight text-fg">
            More projects
          </h3>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-line bg-surface/50 p-5 transition-colors hover:border-accent/40 hover:bg-surface-2/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-base font-semibold tracking-tight text-fg">
                      {p.name}
                    </h4>
                    <p className="mt-0.5 text-xs font-medium text-accent">{p.tagline}</p>
                  </div>
                  <span className="text-faint transition-colors group-hover:text-accent">
                    <ArrowIcon />
                  </span>
                </div>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{p.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
