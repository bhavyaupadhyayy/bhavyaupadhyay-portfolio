import { site, nav } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold text-fg">
            {site.name}<span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-faint">Data Engineer · {site.location}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-xs text-muted hover:text-fg">
              {item.label}
            </a>
          ))}
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-fg">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-fg">
            LinkedIn
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-8 w-full max-w-5xl text-[11px] text-faint">
        © {new Date().getFullYear()} {site.name}. Built with Next.js &amp; Tailwind. No trackers.
      </p>
    </footer>
  );
}
