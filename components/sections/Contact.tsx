import { site } from "@/lib/data";
import { Section } from "@/components/Section";
import Reveal from "@/components/Reveal";

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "GitHub", value: `github.com/${site.githubHandle}`, href: site.github },
  { label: "LinkedIn", value: "in/bhavyaupadhyay", href: site.linkedin },
];

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <Reveal>
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Looking for a Data Engineer who&apos;ll tell you how the pipeline actually works?
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            I&apos;m open to Data Engineer roles in the US. The fastest way to a yes is the résumé and
            the EDGAR-X case study — happy to walk through either on a call.
          </p>
          <p className="mt-3 font-mono text-sm text-faint">{site.location}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={site.resume}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              Download résumé
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-2/50 px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/60 hover:text-accent"
            >
              Email me
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="overflow-hidden rounded-xl border border-line bg-line">
            {links.map((l) => (
              <div key={l.label} className="bg-surface">
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2/50"
                >
                  <dt className="font-mono text-xs tracking-tight text-faint">
                    {l.label}
                  </dt>
                  <dd className="truncate text-sm text-fg transition-colors group-hover:text-accent">
                    {l.value}
                  </dd>
                </a>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
