import { portfolioData } from "@/lib/data";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import NotFound from "./NotFound";
import FadeInSection from "@/components/FadeInSection";
import TopNav from "@/components/TopNav";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");
  const project = portfolioData.projects.find((p) => p.id === params?.id);

  if (!match || !project || !project.hasDetail) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
        {/* Header */}
        <FadeInSection direction="up">
          <div className="space-y-6">
            <Link href="/#projects">
              <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 bg-transparent border-0 cursor-pointer p-0">
                <ArrowLeft className="w-4 h-4" /> Back to Projects
              </button>
            </Link>
            
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
                <div className="flex gap-3">
                  {project.links.site && (
                    <a href={`https://${project.links.site}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                      <ExternalLink className="w-4 h-4" /> 사이트 방문
                    </a>
                  )}
                  {project.links.github && (
                    <a href={`https://${project.links.github}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium hover:bg-secondary transition-colors">
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                  )}
                  {project.links.android && (
                    <a href={`https://${project.links.android}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                      <ExternalLink className="w-4 h-4" /> android
                    </a>
                  )}
                  {project.links.ios && (
                    <a href={`https://${project.links.ios}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                      <ExternalLink className="w-4 h-4" /> ios
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xl text-primary font-medium">{project.subtitle}</p>
            </div>
          </div>
        </FadeInSection>

        {/* Main Image */}
        {project.image && (
          <FadeInSection direction="up" delay={100}>
            <div className="aspect-video w-full overflow-hidden bg-secondary/20 border border-border">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          </FadeInSection>
        )}

        {/* Overview Grid */}
        <FadeInSection direction="up" delay={200}>
          <div className="grid md:grid-cols-3 gap-8 py-8 border-y border-border">
            <div>
              <h3 className="font-bold mb-2">Role</h3>
              <p className="text-muted-foreground">{project.role}</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Period</h3>
              <p className="text-muted-foreground font-mono">{project.period}</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs font-mono border border-border px-2 py-1 text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Description & Features */}
        <div className="space-y-12">
          <FadeInSection direction="up" delay={300}>
            <div className="space-y-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* Overview Image */}
              {project.id === "danum" && (
                <div className="w-full overflow-hidden bg-secondary/20 border border-border rounded">
                  <img src="/images/danum-overview.webp" alt="Danum Overview" className="w-full h-auto object-cover" />
                </div>
              )}
              {project.id === "dongyang-forest" && (
                <div className="w-full overflow-hidden bg-secondary/20 border border-border rounded">
                  <img src="/images/dongyang-forest-overview.webp" alt="Dongyang Forest Overview" className="w-full h-auto object-cover" />
                </div>
              )}
              {project.id === "tempick-extension" && (
                <div className="w-full overflow-hidden bg-secondary/20 border border-border rounded">
                  <img src="/images/tempick-extension-overview.png" alt="Tempick Extension Overview" className="w-full h-auto object-cover" />
                </div>
              )}
            </div>
          </FadeInSection>

          {project.troubleshooting && project.troubleshooting.length > 0 && (
            <FadeInSection direction="up" delay={350}>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">개선사항 · 트러블슈팅</h3>
                  <p className="text-sm text-muted-foreground">
                    문제 → 원인 → 해결 순으로 정리했습니다. 전후 값은 실측이며, 측정하지 못한 것은 그대로 표시했습니다.
                  </p>
                </div>
                <div className="grid gap-6">
                  {project.troubleshooting.map((item, idx) => (
                    <FadeInSection key={item.title} direction="up" delay={350 + idx * 50}>
                      <div className="bg-card border border-border p-6 hover:border-primary/50 transition-colors">
                        <h4 className="text-lg font-bold mb-5">{item.title}</h4>
                        <div className="space-y-4">
                          {[
                            { label: "문제", text: item.problem },
                            { label: "원인", text: item.cause },
                            { label: "해결", text: item.solution }
                          ].map((line) => (
                            <div key={line.label} className="grid sm:grid-cols-[3rem_1fr] gap-1 sm:gap-5">
                              <p className="font-mono text-xs text-primary tracking-wider sm:pt-1">{line.label}</p>
                              <p className="text-muted-foreground leading-relaxed">{line.text}</p>
                            </div>
                          ))}
                        </div>
                        {item.results && item.results.length > 0 && (
                          <div className="mt-6 pt-5 border-t border-border space-y-3">
                            {item.results.map((row) => (
                              <div key={row.label} className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                                  <p className="text-sm">{row.label}</p>
                                  <p className="font-mono text-xs text-muted-foreground sm:text-right">
                                    {row.before} → <span className="text-foreground">{row.after}</span>
                                    {row.delta && <span className="text-primary ml-2">{row.delta}</span>}
                                  </p>
                                </div>
                                {row.note && <p className="text-xs text-muted-foreground">{row.note}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </FadeInSection>
          )}

          {project.features.length > 0 && (
            <FadeInSection direction="up" delay={400}>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">Key Features & Technical Challenges</h3>
                <div className="grid gap-6">
                  {project.features.map((feature, idx) => (
                    <FadeInSection key={idx} direction="up" delay={400 + idx * 50}>
                      <div className="bg-card border border-border p-6 hover:border-primary/50 transition-colors">
                        <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </FadeInSection>
          )}
        </div>
      </div>
      </main>
    </div>
  );
}
