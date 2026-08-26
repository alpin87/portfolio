import { Link } from "wouter";
import { ArrowUpRight, CircleDot, Github } from "lucide-react";
import { portfolioData, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>
          {project.category} · {project.period}
        </CardDescription>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        {project.status && (
          <CardAction>
            <Badge variant="outline">
              <CircleDot
                className={
                  project.status.tone === "success"
                    ? "text-success size-3"
                    : "text-muted-foreground size-3"
                }
              />
              {project.status.label}
            </Badge>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        <p className="font-medium">{project.summary}</p>

        <ul className="space-y-2">
          {project.highlights.map(h => (
            <li key={h} className="text-muted-foreground flex gap-2.5 text-sm">
              <span className="bg-muted-foreground/50 mt-2 size-1 shrink-0 rounded-full" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map(tech => (
            <Badge key={tech} variant="secondary" className="font-mono font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex-wrap justify-start gap-2">
        {project.hasDetail && (
          <Button size="sm" asChild>
            <Link href={`/projects/${project.id}`}>
              자세히 보기 <ArrowUpRight />
            </Link>
          </Button>
        )}
        {project.links.toss && (
          <Button size="sm" asChild>
            <a href={`https://${project.links.toss}`} target="_blank" rel="noreferrer">
              토스에서 열기 <ArrowUpRight />
            </a>
          </Button>
        )}
        {project.links.chrome && (
          <Button size="sm" asChild>
            <a href={`https://${project.links.chrome}`} target="_blank" rel="noreferrer">
              Chrome 웹스토어 <ArrowUpRight />
            </a>
          </Button>
        )}
        {project.links.site && (
          <Button size="sm" variant="outline" asChild>
            <a href={`https://${project.links.site}`} target="_blank" rel="noreferrer">
              {project.links.toss ? "웹 데모" : "사이트 방문"} <ArrowUpRight />
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button size="sm" variant="outline" asChild>
            <a href={`https://${project.links.github}`} target="_blank" rel="noreferrer">
              <Github /> GitHub
            </a>
          </Button>
        )}
        {project.links.android && (
          <Button size="sm" variant="outline" asChild>
            <a href={`https://${project.links.android}`} target="_blank" rel="noreferrer">
              Play Store <ArrowUpRight />
            </a>
          </Button>
        )}
        {project.links.ios && (
          <Button size="sm" variant="outline" asChild>
            <a href={`https://${project.links.ios}`} target="_blank" rel="noreferrer">
              App Store <ArrowUpRight />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="grid items-stretch gap-4 @4xl/main:grid-cols-2">
        {portfolioData.projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-muted-foreground text-sm font-medium">그 외 작업들</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.miniProjects.map(mini => (
            <a key={mini.name} href={mini.url} target="_blank" rel="noreferrer" className="group">
              <Card className="hover:bg-accent/40 h-full gap-3 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 text-base">
                    {mini.name}
                    <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
                  </CardTitle>
                  <CardDescription className="leading-relaxed">{mini.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex-wrap gap-2">
                  <Badge variant="secondary" className="font-mono font-normal">
                    {mini.language}
                  </Badge>
                  <Badge variant="outline">{mini.tag}</Badge>
                  <span className="text-muted-foreground ml-auto text-xs">
                    {mini.linkLabel}
                  </span>
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
