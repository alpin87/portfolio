export const FLOORS = [1, 2, 3, 4, 5, 6] as const;
export type FloorId = (typeof FLOORS)[number];

/** 문이 열리거나 닫히는 데 걸리는 시간 */
export const DOOR_MS = 700;
/** 한 층을 지나는 데 걸리는 시간 */
export const TRAVEL_MS_PER_FLOOR = 850;
/** 층 하나의 높이(월드 단위) */
export const FLOOR_HEIGHT = 4;

export type ElevatorPhase = "open" | "closing" | "traveling" | "opening";

export type ElevatorState = {
  current: FloorId;
  target: FloorId;
  phase: ElevatorPhase;
  /** 현재 단계의 진행도 0~1 */
  progress: number;
  /** 이동을 시작한 층 — 보간의 출발점 */
  from: FloorId;
};

export function createElevator(): ElevatorState {
  return { current: 1, target: 1, phase: "open", progress: 1, from: 1 };
}

function isFloor(value: number): value is FloorId {
  return (FLOORS as readonly number[]).includes(value);
}

/** 문이 완전히 열려 있을 때만 새 층을 받는다. 이동 중 요청은 무시한다. */
export function requestFloor(state: ElevatorState, floor: FloorId): ElevatorState {
  if (!isFloor(floor)) {
    throw new Error(`requestFloor: ${floor} is not a floor in this building`);
  }
  if (state.phase !== "open") return state;
  if (floor === state.current) return state;
  return { ...state, target: floor, from: state.current, phase: "closing", progress: 0 };
}

function travelDuration(state: ElevatorState): number {
  return Math.abs(state.target - state.from) * TRAVEL_MS_PER_FLOOR;
}

/**
 * 경과 시간만큼 단계를 진행시킨다. 남는 시간은 다음 단계로 넘겨,
 * 탭이 멈췄다 돌아와 큰 델타가 들어와도 중간 단계에 갇히지 않는다.
 */
export function advance(state: ElevatorState, deltaMs: number): ElevatorState {
  if (state.phase === "open") return state;

  let next = state;
  let remaining = Math.max(0, deltaMs);

  for (let guard = 0; guard < 8; guard++) {
    const duration =
      next.phase === "traveling" ? travelDuration(next) : DOOR_MS;

    if (duration <= 0) {
      next = stepPhase(next);
      if (next.phase === "open") return next;
      continue;
    }

    const consumed = (1 - next.progress) * duration;
    if (remaining < consumed) {
      return { ...next, progress: next.progress + remaining / duration };
    }

    remaining -= consumed;
    next = stepPhase({ ...next, progress: 1 });
    if (next.phase === "open") return next;
  }

  return next;
}

function stepPhase(state: ElevatorState): ElevatorState {
  switch (state.phase) {
    case "closing":
      return { ...state, phase: "traveling", progress: 0 };
    case "traveling":
      return { ...state, phase: "opening", progress: 0, current: state.target };
    case "opening":
      return { ...state, phase: "open", progress: 1 };
    default:
      return state;
  }
}

/** 승강기 칸의 월드 Y 좌표. 1F 가 0 이다. */
export function carY(state: ElevatorState): number {
  const base = (state.from - 1) * FLOOR_HEIGHT;
  const destination = (state.target - 1) * FLOOR_HEIGHT;
  if (state.phase !== "traveling") {
    return (state.current - 1) * FLOOR_HEIGHT;
  }
  return base + (destination - base) * ease(state.progress);
}

/** 출발과 정지가 부드럽도록 가감속을 준다 — 실제 승강기처럼 느껴지는 부분. */
function ease(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped < 0.5
    ? 2 * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 2) / 2;
}

/** 문이 얼마나 열려 있는지 0(닫힘)~1(열림). */
export function doorOpening(state: ElevatorState): number {
  switch (state.phase) {
    case "open":
      return 1;
    case "closing":
      return 1 - state.progress;
    case "opening":
      return state.progress;
    default:
      return 0;
  }
}
