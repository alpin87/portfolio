import Layout from "@/components/Layout";
import { portfolioData } from "@/lib/data";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import NotFound from "./NotFound";
import FadeInSection from "@/components/FadeInSection";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");
  const project = portfolioData.projects.find((p) => p.id === params?.id);

  if (!match || !project) return <NotFound />;

  return (
    <Layout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
        {/* Header */}
        <FadeInSection direction="up">
          <div className="space-y-6">
            <Link href="/projects">
              <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 bg-transparent border-0 cursor-pointer p-0">
                <ArrowLeft className="w-4 h-4" /> Back to Projects
              </button>
            </Link>
            
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
                <div className="flex gap-3">
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
        <FadeInSection direction="up" delay={100}>
          <div className="aspect-video w-full overflow-hidden bg-secondary/20 border border-border">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </FadeInSection>

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
            </div>
          </FadeInSection>

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
        </div>
      </div>
    </Layout>
  );
}
