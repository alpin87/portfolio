import { portfolioData } from "@/lib/data";
import SectionHeading from "@/sections/SectionHeading";
import FadeInSection from "@/components/FadeInSection";

function SkillGroup({ heading, groups }: { heading: string; groups: { category: string; items: string[] }[] }) {
  return (
    <div>
      <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-6 border-b border-border pb-3">{heading}</p>
      <div className="space-y-6">
        {groups.map(group => (
          <div key={group.category}>
            <p className="font-mono text-xs text-primary tracking-wider mb-3">{group.category}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map(item => (
                <span key={item} className="font-mono text-xs border border-border px-2.5 py-1.5 text-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <>
      <SectionHeading index="04" title="SKILLS" />
      <FadeInSection direction="up">
        <div className="grid md:grid-cols-2 gap-12">
          <SkillGroup heading="NOW" groups={portfolioData.skills.now} />
          <SkillGroup heading="PREVIOUSLY" groups={portfolioData.skills.previously} />
        </div>
      </FadeInSection>
    </>
  );
}
