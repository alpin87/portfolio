import { Link } from "wouter";
import { Activity, Layers, TrendingDown, Wrench } from "lucide-react";
import { portfolioData } from "@/lib/data";
import {
  liveProjectCount,
  measuredRowCount,
  nowSkillCount,
  reductionMetrics,
  skillCount,
  troubleshootingCount,
} from "@/lib/metrics";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const companyProjects = portfolioData.projects.filter(p =>
  p.category.startsWith("회사")
).length;
const personalProjects = portfolioData.projects.filter(p =>
  p.category.startsWith("개인")
).length;
const schoolProjects = portfolioData.projects.length - companyProjects - personalProjects;

const topReduction = reductionMetrics[0];
const nowStackHeads = portfolioData.skills.now.map(g => g.items[0]).slice(0, 3).join(" · ");
const pastStackHeads = portfolioData.skills.previously.map(g => g.items[0]).join(" · ");

const CARDS = [
  {
    href: "/projects",
    label: "프로젝트",
    value: String(portfolioData.projects.length),
    badge: { icon: Activity, text: `운영 중 ${liveProjectCount}` },
    line: "커머스 · 크롬 확장 · 토스 미니앱",
    lineIcon: Activity,
    sub: `회사 ${companyProjects} · 학교 ${schoolProjects} · 개인 ${personalProjects}`,
  },
  {
    href: "/projects",
    label: "트러블슈팅 기록",
    value: String(troubleshootingCount),
    badge: { icon: Wrench, text: `측정값 ${measuredRowCount}` },
    line: "문제와 원인, 해결로 남긴 기록",
    lineIcon: Wrench,
    sub: "다시 측정하지 못한 항목은 미검증으로 표시했습니다",
  },
  {
    href: topReduction ? `/projects/${topReduction.projectId}` : "/projects",
    label: "최대 감소폭",
    value: `-${topReduction?.value ?? 0}%`,
    badge: { icon: TrendingDown, text: topReduction?.projectTitle ?? "없음" },
    line: topReduction ? `${topReduction.before} → ${topReduction.after}` : "측정값 없음",
    lineIcon: TrendingDown,
    sub: topReduction?.label ?? "아직 측정한 항목이 없습니다",
  },
  {
    href: "/skills",
    label: "기술 스택",
    value: String(skillCount),
    badge: { icon: Layers, text: `지금 쓰는 것 ${nowSkillCount}` },
    line: nowStackHeads,
    lineIcon: Layers,
    sub: `이전에 쓰던 것: ${pastStackHeads}`,
  },
];

export default function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 lg:px-6">
      {CARDS.map(card => (
        <Link key={card.label} href={card.href} className="block">
        <Card className="@container/card hover:bg-accent/40 h-full transition-colors">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="max-w-[9rem]">
                <card.badge.icon />
                <span className="truncate">{card.badge.text}</span>
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex items-start gap-2 leading-snug font-medium">
              <span>{card.line}</span>
              <card.lineIcon className="mt-0.5 size-4 shrink-0" />
            </div>
            <div className="text-muted-foreground leading-snug">{card.sub}</div>
          </CardFooter>
        </Card>
        </Link>
      ))}
    </div>
  );
}
