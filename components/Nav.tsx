"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line/80 bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight text-fg">
          Bhavya Upadhyay<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resume}
              className="rounded-md border border-line-strong bg-surface-2/70 px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:border-accent/60 hover:text-accent"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line-strong text-fg md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/80 bg-bg/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex w-full max-w-5xl flex-col px-5 py-3 sm:px-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resume}
                onClick={() => setOpen(false)}
                className="mt-1 block py-2.5 text-sm font-medium text-accent"
              >
                Download résumé →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
