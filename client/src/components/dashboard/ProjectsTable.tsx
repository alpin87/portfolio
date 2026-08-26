import type { MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, CircleDashed, CircleDot, ExternalLink } from "lucide-react";
import { portfolioData, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const projects = portfolioData.projects;

const TABS = [
  { value: "all", label: "전체", rows: projects },
  { value: "live", label: "운영 중", rows: projects.filter(p => p.status?.label === "운영 중") },
  {
    value: "wip",
    label: "개발 중",
    rows: projects.filter(p => p.status && p.status.label !== "운영 중"),
  },
  { value: "done", label: "종료", rows: projects.filter(p => !p.status) },
  // 데이터에 없는 상태의 빈 탭은 띄우지 않는다
].filter(tab => tab.rows.length > 0);

function StatusCell({ status }: { status: Project["status"] }) {
  if (!status) {
    return (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        <CircleDashed className="size-3" />
        종료
      </Badge>
    );
  }

  const live = status.tone === "success";
  return (
    <Badge variant="outline" className="px-1.5">
      <CircleDot className={live ? "text-success size-3" : "text-muted-foreground size-3"} />
      {status.label}
    </Badge>
  );
}

function ProjectRows({ rows }: { rows: Project[] }) {
  const [, navigate] = useLocation();

  function openProject(project: Project, event: MouseEvent<HTMLTableRowElement>) {
    // 행 안의 링크·버튼을 직접 눌렀으면 그쪽 목적지를 그대로 둔다
    if ((event.target as HTMLElement).closest("a, button")) return;
    if (project.hasDetail) navigate(`/projects/${project.id}`);
    else if (project.links.site) window.open(`https://${project.links.site}`, "_blank", "noopener");
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="min-w-[13rem]">프로젝트</TableHead>
            <TableHead className="hidden md:table-cell">구분</TableHead>
            <TableHead className="hidden lg:table-cell">기간</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="hidden lg:table-cell text-right">스택</TableHead>
            <TableHead className="text-right">보기</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(project => (
            <TableRow
              key={project.id}
              onClick={event => openProject(project, event)}
              className="hover:bg-accent/50 cursor-pointer"
            >
              <TableCell>
                {project.hasDetail ? (
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-medium hover:underline"
                  >
                    {project.title}
                  </Link>
                ) : (
                  <span className="font-medium">{project.title}</span>
                )}
                <div className="text-muted-foreground line-clamp-1 text-xs">
                  {project.subtitle}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground hidden md:table-cell text-sm">
                {project.category}
              </TableCell>
              <TableCell className="text-muted-foreground hidden lg:table-cell font-mono text-xs">
                {project.period}
              </TableCell>
              <TableCell>
                <StatusCell status={project.status} />
              </TableCell>
              <TableCell className="text-muted-foreground hidden lg:table-cell text-right tabular-nums">
                {project.techStack.length}
              </TableCell>
              <TableCell className="text-right">
                {project.hasDetail ? (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/projects/${project.id}`}>
                      자세히 <ArrowUpRight />
                    </Link>
                  </Button>
                ) : project.links.site ? (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`https://${project.links.site}`} target="_blank" rel="noreferrer">
                      사이트 <ExternalLink />
                    </a>
                  </Button>
                ) : (
                  <span className="text-muted-foreground text-xs">없음</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function ProjectsTable() {
  return (
    <Tabs defaultValue="all" className="w-full flex-col gap-4">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList>
          {TABS.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
              <Badge variant="secondary" className="ml-1.5 px-1.5">
                {tab.rows.length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
        <Button variant="outline" size="sm" asChild className="hidden sm:flex">
          <Link href="/projects">
            카드로 보기 <ArrowUpRight />
          </Link>
        </Button>
      </div>

      {TABS.map(tab => (
        <TabsContent key={tab.value} value={tab.value} className="px-4 lg:px-6">
          <ProjectRows rows={tab.rows} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
