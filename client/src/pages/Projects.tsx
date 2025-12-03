import Layout from "@/components/Layout";
import { portfolioData } from "@/lib/data";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

export default function Projects() {
  return (
    <Layout>
      <div className="space-y-12 overflow-hidden">
        <FadeInSection direction="up">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="text-muted-foreground text-lg">
              문제를 해결하고 가치를 만들어낸 프로젝트 경험입니다.
            </p>
          </div>
        </FadeInSection>

        <div className="grid gap-12">
          {portfolioData.projects.map((project, idx) => (
            <FadeInSection key={project.id} direction="up" delay={idx * 100}>
              <div className="group relative border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-border bg-secondary/20">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Tech Stack Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="text-xs font-mono bg-primary text-white px-3 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1">{project.period}</span>
                      </div>
                      <p className="text-primary font-medium mb-4">{project.subtitle}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span key={tech} className="text-xs font-mono border border-border px-2 py-1 text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 5 && (
                          <span className="text-xs font-mono border border-border px-2 py-1 text-muted-foreground">
                            +{project.techStack.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link href={`/projects/${project.id}`}>
                      <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline bg-transparent border-0 cursor-pointer p-0">
                        자세히 보기 <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </Layout>
  );
}
