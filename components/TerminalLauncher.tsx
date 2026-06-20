"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const TerminalModal = dynamic(() => import("./TerminalModal"), { ssr: false });

export default function TerminalLauncher() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Open interactive terminal"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-2/50 px-4 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/60 hover:text-accent"
      >
        <span aria-hidden className="font-mono text-accent">
          &gt;_
        </span>
        terminal
      </button>
      {open && (
        <TerminalModal
          onClose={() => {
            setOpen(false);
            btnRef.current?.focus();
          }}
        />
      )}
    </>
  );
}
