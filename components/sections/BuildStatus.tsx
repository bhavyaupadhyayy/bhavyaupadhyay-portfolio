import { Section } from "@/components/Section";

type StateKind = "passing" | "failing" | "neutral";
type CIState = { kind: StateKind; label: string };
type RepoDef = { repo: string; name: string; meta: string };

const REPOS: RepoDef[] = [
  { repo: "EDGAR-X", name: "EDGAR-X", meta: "124 tests · 93% coverage · 75 dbt tests" },
  {
    repo: "Flightline-End-to-End-Flight-Data-Pipeline",
    name: "Flightline",
    meta: "26 / 26 dbt tests · CI on every push",
  },
];

// Fetch latest GitHub Actions run per repo. Cached hourly (ISR) so we don't hit
// the unauthenticated 60/hr limit per visitor. Never invents a green state.
async function fetchState(repo: string): Promise<CIState> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const res = await fetch(
      `https://api.github.com/repos/bhavyaupadhyayy/${repo}/actions/runs?per_page=1&branch=main`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) return { kind: "neutral", label: "unavailable" };

    const data = (await res.json()) as {
      workflow_runs?: { status?: string; conclusion?: string | null }[];
    };
    const run = data.workflow_runs?.[0];
    if (!run) return { kind: "neutral", label: "no CI" };
    if (run.status && run.status !== "completed")
      return { kind: "neutral", label: run.status.replace(/_/g, " ") };
    if (run.conclusion === "success") return { kind: "passing", label: "passing" };
    if (run.conclusion === "failure") return { kind: "failing", label: "failing" };
    return { kind: "neutral", label: run.conclusion ?? "unavailable" };
  } catch {
    return { kind: "neutral", label: "unavailable" };
  }
}

const PILL: Record<StateKind, { color: string; bg: string; border: string }> = {
  passing: { color: "#3fb950", bg: "rgba(63,185,80,0.12)", border: "rgba(63,185,80,0.30)" },
  failing: { color: "#f85149", bg: "rgba(248,81,73,0.12)", border: "rgba(248,81,73,0.32)" },
  neutral: { color: "#9aa4b2", bg: "rgba(154,164,178,0.10)", border: "rgba(154,164,178,0.25)" },
};

function StatusPill({ state }: { state: CIState }) {
  const s = PILL[state.kind];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px]"
      style={{ color: s.color, background: s.bg, borderColor: s.border }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
      {state.label}
    </span>
  );
}

export default async function BuildStatus() {
  const repos = await Promise.all(
    REPOS.map(async (r) => ({ ...r, state: await fetchState(r.repo) })),
  );

  const allPassing = repos.every((r) => r.state.kind === "passing");
  const failing = repos.filter((r) => r.state.kind === "failing").length;
  const indicator = allPassing
    ? { dot: "#3fb950", text: "all systems green", pulse: true }
    : failing > 0
      ? { dot: "#f85149", text: `${failing} check${failing > 1 ? "s" : ""} failing`, pulse: false }
      : { dot: "#d29922", text: "status unavailable", pulse: false };

  return (
    <Section
      id="build"
      eyebrow="Reliability"
      title="Build status, live"
      intro="Real GitHub Actions results for my CI-gated repos, fetched hourly — reported honestly, red and all. Not a badge I drew."
    >
      <div className="overflow-hidden rounded-xl border border-line bg-surface/60">
        {/* Panel header */}
        <div className="flex items-center justify-between gap-3 border-b border-line/70 px-5 py-3.5">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
            build status
          </span>
          <span className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${indicator.pulse ? "status-pulse" : ""}`}
              style={{ background: indicator.dot }}
              aria-hidden
            />
            <span className="font-mono text-xs" style={{ color: indicator.dot }}>
              {indicator.text}
            </span>
          </span>
        </div>

        {/* Repo rows */}
        <ul className="divide-y divide-line/70">
          {repos.map((r) => (
            <li key={r.repo} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <a
                  href={`https://github.com/bhavyaupadhyayy/${r.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-semibold tracking-tight text-fg transition-colors hover:text-accent"
                >
                  {r.name}
                </a>
                <p className="mt-0.5 truncate font-mono text-[11px] text-faint">{r.meta}</p>
              </div>
              <StatusPill state={r.state} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
