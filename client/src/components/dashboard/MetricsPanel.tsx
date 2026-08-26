import { useState } from "react";
import { Link } from "wouter";
import { multipleMetrics, reductionMetrics, type Metric } from "@/lib/metrics";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type View = "reduction" | "multiple";

const VIEWS: Record<View, { label: string; description: string; data: Metric[] }> = {
  reduction: {
    label: "감소율",
    description: "응답 시간과 쿼리 수, 요청 수가 줄어든 비율입니다.",
    data: reductionMetrics,
  },
  multiple: {
    label: "처리량",
    description: "같은 작업에서 처리량이 늘어난 배수입니다.",
    data: multipleMetrics,
  },
};

function MetricRow({ metric, ratio }: { metric: Metric; ratio: number }) {
  const delta = metric.kind === "reduction" ? `-${metric.value}%` : `${metric.value}배`;

  return (
    <Link
      href={`/projects/${metric.projectId}`}
      className="hover:bg-accent/40 -mx-2 block space-y-2 rounded-md px-2 py-1.5 transition-colors"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm leading-snug font-medium">{metric.label}</p>
        <span className="shrink-0 font-mono text-xs tabular-nums">{delta}</span>
      </div>
      <p className="text-muted-foreground font-mono text-xs">
        {metric.before} <span className="text-foreground">→ {metric.after}</span>
      </p>
      <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
        <div
          className="bg-foreground/75 h-full rounded-full"
          style={{ width: `${Math.max(2, ratio * 100)}%` }}
        />
      </div>
    </Link>
  );
}

export default function MetricsPanel() {
  const [view, setView] = useState<View>("reduction");
  const current = VIEWS[view];

  // 감소율은 0–100%가 곧 눈금이고, 배수는 절대 기준이 없어 최댓값에 맞춰 상대 비교한다.
  const scale =
    view === "reduction" ? 100 : Math.max(...current.data.map(m => m.value), 1);
  const sourceProjects = Array.from(new Set(current.data.map(m => m.projectTitle))).join(" · ");

  return (
    <div className="px-4 lg:px-6">
      <Card className="@container/metrics">
        <CardHeader>
          <CardTitle>측정된 개선폭</CardTitle>
          <CardDescription>{current.description}</CardDescription>
          <CardAction>
            <ToggleGroup
              type="single"
              value={view}
              onValueChange={v => v && setView(v as View)}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:!px-4 @[540px]/metrics:flex"
            >
              <ToggleGroupItem value="reduction">감소율</ToggleGroupItem>
              <ToggleGroupItem value="multiple">처리량</ToggleGroupItem>
            </ToggleGroup>
            <Select value={view} onValueChange={v => setView(v as View)}>
              <SelectTrigger
                className="flex w-28 @[540px]/metrics:hidden"
                size="sm"
                aria-label="지표 선택"
              >
                <SelectValue placeholder="감소율" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reduction">감소율</SelectItem>
                <SelectItem value="multiple">처리량</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="grid gap-x-10 gap-y-4 @3xl/metrics:grid-cols-2">
            {current.data.map(metric => (
              <MetricRow
                key={`${metric.projectId}-${metric.label}`}
                metric={metric}
                ratio={metric.value / scale}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-muted-foreground text-xs">
            {sourceProjects}에서 실측한 값입니다. 측정하지 못한 항목을 포함한 전체 기록은 각
            프로젝트 상세에 있습니다.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
