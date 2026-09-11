import { Link, useRoute } from "wouter";
import { ArrowLeft, CircleDot, ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/lib/data";
import NotFound from "./NotFound";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OVERVIEW_IMAGES: Record<string, string> = {
  danum: "/images/danum-overview.webp",
  "dongyang-forest": "/images/dongyang-forest-overview.webp",
  "tempick-extension": "/images/tempick-extension-overview.png",
};

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");
  const project = portfolioData.projects.find(p => p.id === params?.id);

  if (!match || !project || !project.hasDetail) return <NotFound />;

  const overviewImage = OVERVIEW_IMAGES[project.id];

  return (
    <DashboardLayout title={project.title}>
      <div className="space-y-4 px-4 lg:px-6">
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link href="/projects">
            <ArrowLeft /> Projects
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardDescription>
              {project.category} · {project.period}
            </CardDescription>
            <CardTitle className="text-2xl">{project.title}</CardTitle>
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

          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{project.subtitle}</p>

            <div className="flex flex-wrap gap-2">
              {project.links.toss && (
                <Button size="sm" asChild>
                  <a href={`https://${project.links.toss}`} target="_blank" rel="noreferrer">
                    토스에서 열기 <ExternalLink />
                  </a>
                </Button>
              )}
              {project.links.chrome && (
                <Button size="sm" asChild>
                  <a href={`https://${project.links.chrome}`} target="_blank" rel="noreferrer">
                    Chrome 웹스토어 <ExternalLink />
                  </a>
                </Button>
              )}
              {project.links.site && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`https://${project.links.site}`} target="_blank" rel="noreferrer">
                    {project.links.toss ? "웹 데모" : "사이트 방문"} <ExternalLink />
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
                    Play Store <ExternalLink />
                  </a>
                </Button>
              )}
              {project.links.ios && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`https://${project.links.ios}`} target="_blank" rel="noreferrer">
                    App Store <ExternalLink />
                  </a>
                </Button>
              )}
            </div>

            <Separator />

            <dl className="grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground text-xs">역할</dt>
                <dd className="mt-1 text-sm font-medium">{project.role}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">기간</dt>
                <dd className="mt-1 font-mono text-sm">{project.period}</dd>
              </div>
              <div className="sm:col-span-3">
                <dt className="text-muted-foreground text-xs">기술 스택</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="font-mono font-normal">
                      {tech}
                    </Badge>
                  ))}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {project.image && (
          <div className="bg-muted overflow-hidden rounded-xl border">
            <img
              src={project.image}
              alt={project.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>개요</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {project.description.split("\n\n").map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={
                    i === 0
                      ? "text-foreground text-lg leading-[1.8]"
                      : "text-muted-foreground leading-[1.8]"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {overviewImage && (
              <div className="bg-muted overflow-hidden rounded-lg border">
                <img
                  src={overviewImage}
                  alt={`${project.title} 개요`}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {project.techChoices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>왜 이렇게 만들었나</CardTitle>
              <CardDescription>기술을 고른 이유를 짧게 적었습니다.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 @3xl/main:grid-cols-2">
              {project.techChoices.map(choice => (
                <div key={choice.title} className="rounded-lg border p-5">
                  <h4 className="font-medium">{choice.title}</h4>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {choice.reason}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {project.troubleshooting && project.troubleshooting.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>개선사항 · 트러블슈팅</CardTitle>
              <CardDescription>
                문제와 원인, 해결 순으로 정리했습니다. 전후 값은 실측한 값이며, 측정하지 못한
                항목은 측정하지 못했다고 그대로 표시했습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.troubleshooting.map(item => (
                <div key={item.title} className="rounded-lg border p-5">
                  <h4 className="font-medium">{item.title}</h4>
                  <dl className="mt-4 space-y-3">
                    {[
                      { label: "문제", text: item.problem },
                      { label: "원인", text: item.cause },
                      { label: "해결", text: item.solution },
                    ].map(line => (
                      <div key={line.label} className="grid gap-1 sm:grid-cols-[3rem_1fr] sm:gap-4">
                        <dt className="text-muted-foreground font-mono text-xs sm:pt-0.5">
                          {line.label}
                        </dt>
                        <dd className="text-muted-foreground text-sm leading-relaxed">
                          {line.text}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {item.results && item.results.length > 0 && (
                    <div className="mt-5 space-y-3 border-t pt-4">
                      {item.results.map(row => (
                        <div key={row.label} className="space-y-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                            <p className="text-sm">{row.label}</p>
                            <p className="text-muted-foreground font-mono text-xs sm:text-right">
                              {row.before && <>{row.before} </>}
                              <span className="text-foreground">
                                {row.before ? "→ " : ""}
                                {row.after}
                              </span>
                              {row.delta && (
                                <Badge variant="secondary" className="ml-2 font-mono font-normal">
                                  {row.delta}
                                </Badge>
                              )}
                            </p>
                          </div>
                          {row.note && (
                            <p className="text-muted-foreground text-xs">{row.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {project.features.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>맡은 기능</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 @3xl/main:grid-cols-2">
              {project.features.map(feature => (
                <div key={feature.title} className="rounded-lg border p-5">
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
