import { portfolioData } from "@/lib/data";
import type { FloorId } from "./elevator";

export type FloorKind = "lobby" | "project" | "roof";

export type Floor = {
  id: FloorId;
  /** 층 안내판에 찍히는 이름 */
  name: string;
  kind: FloorKind;
  /** 프로젝트 층이면 data.ts 의 project id */
  projectId?: string;
  /** 실내 조명과 사인의 색 */
  accent: string;
};

const project = (id: string) => portfolioData.projects.find((p) => p.id === id);

/** 아래에서 위로 갈수록 최신 — 커리어가 층으로 쌓인다. */
export const FLOOR_PLAN: Floor[] = [
  { id: 1, name: "로비", kind: "lobby", accent: "#e8e3d9" },
  { id: 2, name: "Danum", kind: "project", projectId: "danum", accent: project("danum")?.accent ?? "#6d28d9" },
  {
    id: 3,
    name: "동양미래대 숲",
    kind: "project",
    projectId: "dongyang-forest",
    accent: project("dongyang-forest")?.accent ?? "#15803d",
  },
  {
    id: 4,
    name: "Tempick",
    kind: "project",
    projectId: "tempick",
    accent: project("tempick")?.accent ?? "#1d4ed8",
  },
  {
    id: 5,
    name: "Tempick 크롬 확장",
    kind: "project",
    projectId: "tempick-extension",
    accent: project("tempick-extension")?.accent ?? "#c2410c",
  },
  { id: 6, name: "옥상", kind: "roof", accent: "#e04b26" },
];

export function floorById(id: FloorId): Floor {
  const found = FLOOR_PLAN.find((floor) => floor.id === id);
  if (!found) throw new Error(`floorById: no floor ${id} in this building`);
  return found;
}
