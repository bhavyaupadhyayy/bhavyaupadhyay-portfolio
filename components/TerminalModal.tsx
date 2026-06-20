"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Line = { id: number; node: ReactNode };

function Link({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-accent underline underline-offset-2 hover:text-fg"
    >
      {children}
    </a>
  );
}

function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-[#3fb950]">visitor@bhavyaupadhyay</span>
      <span className="text-muted">:</span>
      <span className="text-accent">~</span>
      <span className="text-muted">$</span>
    </span>
  );
}

const HELP = (
  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
    <span className="text-accent">whoami</span><span className="text-muted">who is Bhavya</span>
    <span className="text-accent">ls projects</span><span className="text-muted">list projects</span>
    <span className="text-accent">cat &lt;name&gt;</span><span className="text-muted">show a project</span>
    <span className="text-accent">skills</span><span className="text-muted">tech stack</span>
    <span className="text-accent">stats</span><span className="text-muted">headline numbers</span>
    <span className="text-accent">contact</span><span className="text-muted">how to reach me</span>
    <span className="text-accent">open resume</span><span className="text-muted">download résumé</span>
    <span className="text-accent">clear</span><span className="text-muted">clear the screen</span>
  </div>
);

const PROJECTS: Record<string, ReactNode> = {
  "edgar-x": (
    <>
      EDGAR-X — 7-layer financial intelligence system. 498 S&amp;P 500 companies into Snowflake, dbt
      (75 tests), XGBoost ranked screen (ROC-AUC 0.726), multi-agent LLM memos with LLM-as-judge.{" "}
      <Link href="https://github.com/bhavyaupadhyayy/EDGAR-X">github.com/bhavyaupadhyayy/EDGAR-X</Link>
    </>
  ),
  flightline: (
    <>
      Flightline — end-to-end flight data pipeline. Airflow + Snowflake + dbt (26/26 tests) +
      Streamlit. Idempotent loads, CI on every push.{" "}
      <Link href="https://github.com/bhavyaupadhyayy/Flightline-End-to-End-Flight-Data-Pipeline">
        github.com/bhavyaupadhyayy/Flightline-End-to-End-Flight-Data-Pipeline
      </Link>
    </>
  ),
  "signal-miner": (
    <>
      Signal Miner — LLM market-intelligence pipeline. LangChain prompt chaining + RAG, Supabase
      vector store, Dockerized.{" "}
      <Link href="https://github.com/bhavyaupadhyayy/saas-signal-miner">
        github.com/bhavyaupadhyayy/saas-signal-miner
      </Link>
    </>
  ),
  "duplicate-detection": (
    <>
      Duplicate Detection — semantic dedup over 250K+ job postings. Precision 68% → 92%, ~3× faster
      matching via optimized ANN indexing.{" "}
      <Link href="https://github.com/bhavyaupadhyayy/bayesian-duplicate-detection">
        github.com/bhavyaupadhyayy/bayesian-duplicate-detection
      </Link>
    </>
  ),
  "skin-lesion": (
    <>
      Skin Lesion Classification — EfficientNet-B0 + CBAM attention on ISIC 2019 (8 classes).
      Ablation across 4 variants, Grad-CAM, served via FastAPI.{" "}
      <Link href="https://github.com/bhavyaupadhyayy/skin-lesion-classification">
        github.com/bhavyaupadhyayy/skin-lesion-classification
      </Link>
    </>
  ),
};

function runCommand(raw: string): { clear?: boolean; node?: ReactNode } {
  const input = raw.trim();
  if (!input) return {};
  const lower = input.toLowerCase();
  const parts = input.split(/\s+/);
  const cmd = parts[0].toLowerCase();

  if (lower === "help") return { node: HELP };
  if (lower === "whoami")
    return {
      node: "Bhavya Upadhyay — Data Engineer & ML practitioner. Builds end-to-end data & ML systems. MS Data Science @ UC Irvine. 1 year shipping AWS ETL at scale @ TCS (Air Canada).",
    };
  if (lower === "ls" || lower === "ls projects")
    return { node: "edgar-x   flightline   signal-miner   duplicate-detection   skin-lesion" };
  if (cmd === "cat") {
    const name = parts[1]?.toLowerCase();
    if (name && PROJECTS[name]) return { node: PROJECTS[name] };
    return { node: "no such project. try 'ls projects'" };
  }
  if (lower === "skills")
    return {
      node: "Languages: Python, SQL, R, Bash | Data Eng: AWS, Airflow, dbt, Snowflake, Kafka, Docker, Terraform | ML/AI: PyTorch, scikit-learn, XGBoost, LangChain",
    };
  if (lower === "stats")
    return {
      node: "10M+ records/month · 99.9% pipeline SLA · 498 S&P 500 companies modeled · MS Data Science @ UC Irvine",
    };
  if (lower === "contact")
    return {
      node: (
        <>
          email: <Link href="mailto:officiallybhavya@gmail.com">officiallybhavya@gmail.com</Link> |
          github: <Link href="https://github.com/bhavyaupadhyayy">github.com/bhavyaupadhyayy</Link> |
          linkedin:{" "}
          <Link href="https://linkedin.com/in/bhavyaupadhyay">linkedin.com/in/bhavyaupadhyay</Link>
        </>
      ),
    };
  if (lower === "open resume") {
    if (typeof document !== "undefined") {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "Bhavya_Upadhyay_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    return { node: "opening résumé…" };
  }
  if (lower === "clear") return { clear: true };
  return { node: `command not found: ${parts[0]}. try 'help'` };
}

const CHIPS: { label: string; cmd: string }[] = [
  { label: "help", cmd: "help" },
  { label: "projects", cmd: "ls projects" },
  { label: "skills", cmd: "skills" },
  { label: "contact", cmd: "contact" },
];

export default function TerminalModal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<string[]>([]);
  const histPos = useRef(-1);
  const idRef = useRef(0);

  const run = useCallback((raw: string) => {
    if (!raw.trim()) return;
    historyRef.current = [...historyRef.current, raw];
    histPos.current = -1;
    const res = runCommand(raw);
    if (res.clear) {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      {
        id: idRef.current++,
        node: (
          <>
            <Prompt /> {raw}
          </>
        ),
      },
      ...(res.node !== undefined ? [{ id: idRef.current++, node: res.node }] : []),
    ]);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = value;
    setValue("");
    run(raw);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const hist = historyRef.current;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.length) return;
      histPos.current = histPos.current === -1 ? hist.length - 1 : Math.max(0, histPos.current - 1);
      setValue(hist[histPos.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histPos.current === -1) return;
      const next = histPos.current + 1;
      if (next >= hist.length) {
        histPos.current = -1;
        setValue("");
      } else {
        histPos.current = next;
        setValue(hist[next]);
      }
    }
  };

  // Open: focus input, lock scroll, Esc to close.
  useEffect(() => {
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Keep latest output in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  // Focus trap on Tab.
  const onTrapKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = dialogRef.current;
    if (!root) return;
    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const focusInput = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    inputRef.current?.focus();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="presentation"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close terminal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        tabIndex={-1}
      />

      {/* Window */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Interactive terminal"
        onKeyDown={onTrapKey}
        onMouseDown={focusInput}
        className="term-pop relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-line-strong bg-[#0a0c12] shadow-2xl shadow-black/60"
      >
        {/* Title bar */}
        <div className="flex shrink-0 items-center gap-2 border-b border-line/80 bg-surface-2/60 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </span>
          <span className="flex-1 text-center font-mono text-xs text-muted">
            visitor@bhavyaupadhyay: ~
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="rounded px-1 font-mono text-sm text-faint hover:text-fg"
          >
            ✕
          </button>
        </div>

        {/* Output + input (scrollable) */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-fg"
        >
          <p className="mb-2 text-muted">
            Welcome. Type <span className="text-accent">help</span> to explore
            <span className="hidden sm:inline">, or tap a command below</span>.
          </p>
          {lines.map((l) => (
            <div key={l.id} className="whitespace-pre-wrap break-words">
              {l.node}
            </div>
          ))}

          <form onSubmit={onSubmit} className="flex items-baseline gap-2">
            <Prompt />
            <span className="relative inline-flex min-w-0 flex-1">
              <span aria-hidden className="whitespace-pre-wrap break-words text-fg">
                {value}
                <span className="term-caret" />
              </span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onInputKey}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="Terminal input — type a command"
                className="term-input absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
              />
            </span>
          </form>
        </div>

        {/* Command chips */}
        <div className="flex shrink-0 flex-wrap gap-2 border-t border-line/80 bg-surface-2/40 px-4 py-2.5">
          {CHIPS.map((c) => (
            <button
              key={c.cmd}
              type="button"
              onClick={() => {
                run(c.cmd);
                inputRef.current?.focus();
              }}
              className="rounded-md border border-line-strong bg-surface px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
