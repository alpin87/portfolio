import Layout from "@/components/Layout";
import { portfolioData } from "@/lib/data";
import FadeInSection from "@/components/FadeInSection";

export default function Experience() {
  return (
    <Layout>
      <div className="space-y-12 overflow-hidden">
        <FadeInSection direction="up">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">경력 사항</h2>
            <p className="text-muted-foreground text-lg">
              다양한 기업과 프로젝트를 통해 쌓아온 실무 경험입니다.
            </p>
          </div>
        </FadeInSection>

        <div className="space-y-8">
          {portfolioData.experience.map((exp, idx) => (
            <FadeInSection key={idx} direction="up" delay={idx * 100}>
              <div className="border-l-4 border-primary pl-6 py-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                  <h3 className="text-2xl font-bold">{exp.company}</h3>
                  <span className="text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 w-fit">
                    {exp.period}
                  </span>
                </div>
                <p className="text-primary font-medium mb-2">{exp.position}</p>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </Layout>
  );
}
