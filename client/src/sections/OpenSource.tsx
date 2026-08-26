import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, CircleDot, GitMerge, GitPullRequest } from "lucide-react";
import { portfolioData, type OpenSourceEntry } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function StateBadge({ entry }: { entry: OpenSourceEntry }) {
  const Icon =
    entry.kind === "issue" ? CircleDot : entry.state === "Merged" ? GitMerge : GitPullRequest;

  return (
    <Badge variant="outline">
      <Icon
        className={
          entry.tone === "success" ? "text-success size-3" : "text-muted-foreground size-3"
        }
      />
      {entry.kind === "issue" ? "이슈" : "PR"} · {entry.state}
    </Badge>
  );
}

export default function OpenSource() {
  return (
    <div className="grid gap-4">
      {portfolioData.openSource.map(entry => (
        <Card key={entry.id} className="gap-4">
          <CardHeader>
            <CardDescription className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono">{entry.repo}</span>
              <span aria-hidden>·</span>
              <span className="font-mono">{entry.ref}</span>
              <span aria-hidden>·</span>
              <span>{entry.date}</span>
            </CardDescription>
            <CardTitle className="max-w-[42ch] text-lg leading-snug">{entry.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <StateBadge entry={entry} />
            <p className="text-muted-foreground max-w-[70ch] text-sm leading-relaxed">
              {entry.description}
            </p>
          </CardContent>

          <CardFooter className="flex-wrap gap-2">
            {entry.hasDetail ? (
              <>
                <Button size="sm" asChild>
                  <Link href={`/opensource/${entry.id}`}>
                    글 읽기 <ArrowRight />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={entry.url} target="_blank" rel="noreferrer">
                    원문 보기 <ArrowUpRight />
                  </a>
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" asChild>
                <a href={entry.url} target="_blank" rel="noreferrer">
                  원문 보기 <ArrowUpRight />
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
