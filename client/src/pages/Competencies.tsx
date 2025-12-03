import Layout from "@/components/Layout";
import { portfolioData } from "@/lib/data";
import FadeInSection from "@/components/FadeInSection";

export default function Competencies() {
  return (
    <Layout>
      <div className="space-y-12 overflow-hidden">
        <FadeInSection direction="up">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">핵심 역량</h2>
            <p className="text-muted-foreground text-lg">
              안정적인 서비스 구축과 비효율 자동화를 위한 기술적 역량입니다.
            </p>
          </div>
        </FadeInSection>

        <div className="grid gap-8">
          {portfolioData.competencies.map((comp, idx) => (
            <FadeInSection key={idx} direction="up" delay={idx * 100}>
              <div className="border border-border bg-card p-8 hover:border-primary/50 transition-colors">
                <h3 className="text-2xl font-bold mb-2">{comp.title}</h3>
                <p className="text-primary font-medium mb-6">{comp.subtitle}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {comp.description}
                </p>
                <ul className="space-y-3">
                  {comp.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </Layout>
  );
}
