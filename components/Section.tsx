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

export function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-line/70 px-5 py-20 sm:px-8 sm:py-28 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        {(eyebrow || title) && (
          <Reveal as="header" className="mb-12 max-w-2xl sm:mb-16">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
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
