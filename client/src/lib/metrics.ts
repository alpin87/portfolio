import { portfolioData } from "@/lib/data";

export type MetricKind = "reduction" | "multiple";

export type Metric = {
  projectId: string;
  projectTitle: string;
  label: string;
  before: string;
  after: string;
  kind: MetricKind;
  /** reduction이면 감소율(%), multiple이면 배수 */
  value: number;
};

/** "-97.7%" → 97.7 감소, "12.3배" → 12.3배. 그 외 표기는 차트에 올리지 않는다. */
function parseDelta(delta: string): { kind: MetricKind; value: number } | null {
  const percent = delta.match(/^-(\d+(?:\.\d+)?)%$/);
  if (percent) return { kind: "reduction", value: Number(percent[1]) };

  const multiple = delta.match(/^(\d+(?:\.\d+)?)배$/);
  if (multiple) return { kind: "multiple", value: Number(multiple[1]) };

  return null;
}

function collect(): Metric[] {
  const out: Metric[] = [];
  for (const project of portfolioData.projects) {
    for (const item of project.troubleshooting ?? []) {
      for (const row of item.results ?? []) {
        if (!row.delta || !row.before) continue;
        const parsed = parseDelta(row.delta);
        if (!parsed) continue;
        out.push({
          projectId: project.id,
          projectTitle: project.title,
          label: row.label,
          before: row.before,
          after: row.after,
          ...parsed,
        });
      }
    }
  }
  return out;
}

export const metrics = collect();

export const reductionMetrics = metrics
  .filter(m => m.kind === "reduction")
  .sort((a, b) => b.value - a.value);

export const multipleMetrics = metrics
  .filter(m => m.kind === "multiple")
  .sort((a, b) => b.value - a.value);

/** delta가 없더라도 전후 값이 적힌 행은 전부 "측정한 것"으로 센다. */
export const measuredRowCount = portfolioData.projects.reduce(
  (sum, project) =>
    sum +
    (project.troubleshooting ?? []).reduce(
      (inner, item) => inner + (item.results ?? []).filter(row => row.before !== undefined).length,
      0
    ),
  0
);

export const troubleshootingCount = portfolioData.projects.reduce(
  (sum, project) => sum + (project.troubleshooting?.length ?? 0),
  0
);

export const liveProjectCount = portfolioData.projects.filter(
  p => p.status?.label === "운영 중"
).length;

export const skillCount = [...portfolioData.skills.now, ...portfolioData.skills.previously].reduce(
  (sum, group) => sum + group.items.length,
  0
);

export const nowSkillCount = portfolioData.skills.now.reduce(
  (sum, group) => sum + group.items.length,
  0
);

/** 개발 경력만 — [비개발] 표기된 이력은 제외한다. */
export const devExperience = portfolioData.experience.filter(
  exp => !exp.description.includes("[비개발]") && exp.company !== "제 11 기계화 보병사단 정보통신대대"
);
