import { site, stats } from "@/lib/data";
import TerminalLauncher from "@/components/TerminalLauncher";
import PipelineHero from "@/components/PipelineHero";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36"
    >
      {/* Static backdrop — no JS, no animation, GPU-cheap.
         Accent glow is biased to the text side (see .hero-aurora @ ≥781px). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-aurora min-[781px]:right-[56%]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />

      {/* Live data pipeline — the hero centerpiece. Right 60% on desktop,
         faint animated full-bleed backdrop on mobile. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45] min-[781px]:inset-auto min-[781px]:right-0 min-[781px]:top-0 min-[781px]:h-full min-[781px]:w-[60%] min-[781px]:opacity-100"
      >
        <PipelineHero />
      </div>

      {/* Film grain — unifies the canvas with the background. */}
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p
          className="hero-fade mb-5 inline-flex items-center gap-2 rounded-full border border-line-strong/70 bg-surface-2/50 px-3 py-1 font-mono text-xs text-muted"
          style={{ animationDelay: "0ms" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Open to Data Engineer roles · US
        </p>

        <h1
          className="hero-fade font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "60ms" }}
        >
          {site.name}
        </h1>
        <p
          className="hero-fade mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-accent sm:text-3xl"
          style={{ animationDelay: "120ms" }}
        >
          Data Engineer
        </p>

        <p
          className="hero-fade mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "180ms" }}
        >
          {site.subhead}
        </p>

        <div
          className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink shadow-[0_8px_30px_-14px_rgba(244,168,58,0.55)] transition-transform hover:-translate-y-0.5"
          >
            View flagship projects
            <span aria-hidden>→</span>
          </a>
          <a
            href={site.resume}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-2/50 px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/60 hover:text-accent"
          >
            Download résumé
          </a>
          <TerminalLauncher />
        </div>

        {/* Verified numbers as an instrument readout — not a card grid. */}
        <dl
          className="hero-fade mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line/70 pt-9 sm:mt-14 sm:flex sm:flex-wrap sm:gap-x-14"
          style={{ animationDelay: "320ms" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="max-w-[15rem]">
              <dt className="font-mono text-[11px] leading-snug text-faint">{s.label}</dt>
              <dd className="mt-1.5 font-display text-[1.7rem] font-semibold leading-none tracking-[-0.01em] text-accent sm:text-[2rem]">
                {s.value}
              </dd>
              <dd className="mt-1 font-mono text-[11px] text-faint">{s.sub}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
