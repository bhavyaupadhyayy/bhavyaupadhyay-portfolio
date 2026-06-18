import type { ReactNode } from "react";

/* Lightweight, dependency-free architecture-diagram primitives.
   Stacks vertically on mobile, flows horizontally from sm:. */

export function Node({
  children,
  accent,
  store,
  terminal,
}: {
  children: ReactNode;
  accent?: boolean;
  store?: boolean;
  terminal?: boolean;
}) {
  const base =
    "flex min-h-[3.25rem] flex-1 items-center justify-center rounded-lg border px-3 py-2 text-center font-mono text-[11px] leading-tight sm:text-xs";
  const tone = accent
    ? "border-accent/40 bg-accent/10 text-fg"
    : store
      ? "border-line-strong bg-surface-2 text-fg"
      : terminal
        ? "border-accent-2/40 bg-[rgba(129,140,248,0.08)] text-fg"
        : "border-line-strong bg-surface text-muted";
  return <div className={`${base} ${tone}`}>{children}</div>;
}

export function Arrow({ label, vertical }: { label?: string; vertical?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center gap-1 text-faint ${
        vertical ? "flex-col py-1" : "px-1"
      }`}
      aria-hidden
    >
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{label}</span>
      )}
      <span className="text-sm leading-none">{vertical ? "↓" : "→"}</span>
    </div>
  );
}

export function Lane({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{label}</span>
      )}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">{children}</div>
    </div>
  );
}

export function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface/40 p-4 sm:p-6">
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="flex flex-col gap-4">{children}</div>
    </figure>
  );
}
