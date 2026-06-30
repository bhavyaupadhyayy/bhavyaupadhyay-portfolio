import { skills } from "@/lib/data";
import { Section, TechTag } from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I reach for">
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal
            key={group.group}
            delay={i * 60}
            className={`rounded-xl border border-line bg-surface/50 p-5 ${
              group.group === "Data & Analytics" ? "sm:col-span-2" : ""
            }`}
          >
            <h3 className="mb-3 font-mono text-xs tracking-tight text-accent">
              {group.group}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <TechTag key={item}>{item}</TechTag>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
