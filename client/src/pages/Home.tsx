import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { portfolioData } from "@/lib/data";
import FadeInSection from "@/components/FadeInSection";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-12 overflow-hidden">
        {/* Main Hero Section */}
        <FadeInSection className="space-y-6" direction="up">
          <h2 className="text-5xl font-bold tracking-tight leading-tight">
            안정적인 서비스를 구축하고
            <br />
            <span className="text-primary">비효율을 자동화</span>하는
            <br />
            개발자 백승민입니다.
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
            {portfolioData.profile.bio}
          </p>

          <div className="flex gap-4">
            <Link href="/competencies">
              <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors border-0 cursor-pointer">
                핵심 역량 보기 <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/experience">
              <button className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 text-sm font-medium hover:bg-secondary/80 transition-colors border-0 cursor-pointer">
                경력 사항
              </button>
            </Link>
          </div>
        </FadeInSection>

        {/* Education & Certs Grid */}
        <FadeInSection className="grid md:grid-cols-2 gap-8" direction="up" delay={100}>
          <div>
            <h3 className="text-xl font-bold mb-6">Education</h3>
            <div className="space-y-4">
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold">{edu.school}</h4>
                  <p className="text-sm text-muted-foreground">{edu.major}</p>
                  {edu.gpa && <p className="text-xs text-muted-foreground mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Certifications</h3>
            <div className="space-y-4">
              {portfolioData.certifications.map((cert, idx) => (
                <div key={idx} className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </Layout>
  );
}
