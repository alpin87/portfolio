import Layout from "@/components/Layout";
import { portfolioData } from "@/lib/data";
import FadeInSection from "@/components/FadeInSection";

export default function Skills() {
  const skillCategories = [
    { label: "Backend", items: portfolioData.skills.backend },
    { label: "Database", items: portfolioData.skills.database },
    { label: "DevOps", items: portfolioData.skills.devops },
    { label: "Tools", items: portfolioData.skills.tools },
  ];

  return (
    <Layout>
      <div className="space-y-12 overflow-hidden">
        <FadeInSection direction="up">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">기술 스택</h2>
            <p className="text-muted-foreground text-lg">
              실무에서 활용하고 있는 기술들입니다.
            </p>
          </div>
        </FadeInSection>

        <div className="grid gap-8">
          {skillCategories.map((category, idx) => (
            <FadeInSection key={idx} direction="up" delay={idx * 100}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">{category.label}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-4 py-2 bg-secondary text-secondary-foreground border border-border rounded font-mono text-sm hover:border-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </Layout>
  );
}
