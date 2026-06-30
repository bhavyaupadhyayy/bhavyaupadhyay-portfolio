import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

// `eyebrow` is accepted for compatibility but intentionally not rendered —
// per-section uppercase kickers are an AI scaffold. Cadence comes from the
// heading scale and spacing rhythm instead.
export function Section({ id, title, intro, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        {title && (
          <Reveal as="header" className="mb-14 max-w-2xl sm:mb-20">
            <h2 className="font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-fg sm:text-[2.75rem]">
              {title}
            </h2>
            {intro && (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-lg">
                {intro}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function TechTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line-strong/60 bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </span>
  );
}
