import { Link, useRoute } from "wouter";
import { ArrowLeft, CircleDot, ExternalLink, GitMerge, GitPullRequest } from "lucide-react";
import { portfolioData } from "@/lib/data";
import NotFound from "./NotFound";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OpenSourceDetail() {
  const [match, params] = useRoute("/opensource/:id");
  const entry = portfolioData.openSource.find(o => o.id === params?.id);

  if (!match || !entry || !entry.hasDetail || !entry.article) return <NotFound />;

  const merged = entry.kind === "pr" && entry.state.startsWith("Merged");
  const Icon = entry.kind === "issue" ? CircleDot : merged ? GitMerge : GitPullRequest;
  // 완료 상태(머지된 PR·해결된 이슈)는 GitHub 과 같은 보라로 통일한다
  const badgeColor = entry.tone === "success" ? "text-merged size-3" : "text-muted-foreground size-3";
  const { article } = entry;

  return (
    <DashboardLayout title={entry.repo}>
      <div className="space-y-4 px-4 lg:px-6">
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link href="/opensource">
            <ArrowLeft /> Open Source
          </Link>
        </Button>

        <Card>
          <CardContent className="space-y-6">
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="font-mono">{entry.repo}</span>
              <span aria-hidden>·</span>
              <span className="font-mono">{entry.ref}</span>
              <span aria-hidden>·</span>
              <span>{entry.date}</span>
              <Badge variant="outline" className="ml-1">
                <Icon className={badgeColor} />
                {entry.kind === "issue" ? "이슈" : "PR"} · {entry.state}
              </Badge>
            </div>

            <h2 className="text-3xl leading-tight font-semibold tracking-tight">
              {entry.title}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {article.lead}
            </p>

            <Button size="sm" variant="outline" asChild>
              <a href={entry.url} target="_blank" rel="noreferrer">
                {entry.kind === "issue" ? "이슈 원문 보기" : "PR 원문 보기"} <ExternalLink />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-10">
            {article.sections.map((section, i) => (
              <section key={section.heading} className="space-y-4">
                {i > 0 && <Separator className="mb-10" />}
                <h3 className="text-xl leading-snug font-semibold tracking-tight">
                  {section.heading}
                </h3>
                {section.body.map(paragraph => (
                  <p key={paragraph} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.code && (
                  <figure className="space-y-2">
                    <pre className="bg-muted overflow-x-auto rounded-lg border p-4">
                      <code className="font-mono text-xs leading-relaxed whitespace-pre">
                        {section.code.content}
                      </code>
                    </pre>
                    {section.code.caption && (
                      <figcaption className="text-muted-foreground text-xs">
                        {section.code.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {section.after?.map(paragraph => (
                  <p key={paragraph} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </CardContent>
        </Card>

        {entry.results && entry.results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>정리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {entry.results.map(row => (
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
                  {row.note && <p className="text-muted-foreground text-xs">{row.note}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
