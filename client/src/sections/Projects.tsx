import { Link } from "wouter";
import { ArrowUpRight, Github } from "lucide-react";
import { portfolioData, type Project } from "@/lib/data";
import SectionHeading from "@/sections/SectionHeading";
import FadeInSection from "@/components/FadeInSection";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: NonNullable<Project["status"]> }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 border",
        status.tone === "success" ? "text-success border-success/40" : "text-primary border-primary/40"
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border border-border bg-card p-8 hover:border-primary/50 transition-colors">
      <p className="font-mono text-xs text-muted-foreground tracking-wider">
        {project.category} · {project.period}
      </p>
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
        {project.status && <StatusBadge status={project.status} />}
      </div>
      <p className="font-medium mt-4">{project.summary}</p>
      <ul className="mt-4 space-y-2">
        {project.highlights.map(h => (
          <li key={h} className="text-sm text-muted-foreground flex gap-2">
            <span className="text-primary shrink-0">▷</span>
            {h}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-6">
        {project.techStack.map(tech => (
          <span key={tech} className="font-mono text-xs border border-border px-2 py-1 text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {project.hasDetail && (
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            자세히 보기 <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
        {project.links.site && (
          <a href={`https://${project.links.site}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
            사이트 방문 <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
        {project.links.github && (
          <a href={`https://${project.links.github}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
            <Github className="w-4 h-4" /> GitHub
          </a>
        )}
        {project.links.android && (
          <a href={`https://${project.links.android}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
            Play Store <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
        {project.links.ios && (
          <a href={`https://${project.links.ios}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
            App Store <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <>
      <SectionHeading index="01" title="PROJECTS" />
      <div className="space-y-8">
        {portfolioData.projects.map((project, i) => (
          <FadeInSection key={project.id} direction="up" delay={i * 80}>
            <ProjectCard project={project} />
          </FadeInSection>
        ))}
      </div>

      <FadeInSection direction="up">
        <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] mt-16 mb-6 border-b border-border pb-3">
          그 외 작업들
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioData.miniProjects.map(mini => (
            <a
              key={mini.name}
              href={`https://${mini.github}`}
              target="_blank"
              rel="noreferrer"
              className="group border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-bold">{mini.name}</h4>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{mini.description}</p>
              <p className="font-mono text-xs text-muted-foreground mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                {mini.language}
                <span className="border border-border px-1.5 py-0.5">{mini.tag}</span>
              </p>
            </a>
          ))}
        </div>
      </FadeInSection>
    </>
  );
}
