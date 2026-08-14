export type Point = { x: number; z: number };
export type Bounds = { minX: number; maxX: number; minZ: number; maxZ: number };
export type MoveInput = { forward: number; strafe: number };

/** 벽에 코를 박지 않도록 두는 여유 */
const PAD = 0.42;

const CAR_W = 2.9;
const CAR_D = 2.7;
const ROOM_W = 16;
const ROOM_D = 20;

/** 승강기 문이 놓인 z. 이 선을 넘어야 층으로 나간다. */
export const THRESHOLD_Z = CAR_D / 2;
/** 문틀 개구부 절반 너비 — 이 폭 안에서만 드나들 수 있다. */
export const DOORWAY_HALF = CAR_W / 2 - 0.25;

/**
 * 칸의 앞 경계는 문턱과 정확히 맞닿아야 한다.
 * 사이에 틈을 두면 한 프레임 이동 거리가 그 틈보다 작은 고주사율 화면에서
 * 영원히 문턱을 넘지 못한다.
 */
export const CAR_BOUNDS: Bounds = {
  minX: -CAR_W / 2 + PAD,
  maxX: CAR_W / 2 - PAD,
  minZ: -CAR_D / 2 + PAD,
  maxZ: THRESHOLD_Z,
};

/** 문이 닫혀 있을 때 서 있을 수 있는 가장 앞자리 */
const CLOSED_MAX_Z = THRESHOLD_Z - 0.06;

export const ROOM_BOUNDS: Bounds = {
  minX: -ROOM_W / 2 + PAD,
  maxX: ROOM_W / 2 - PAD,
  minZ: THRESHOLD_Z,
  maxZ: THRESHOLD_Z + ROOM_D - PAD,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function clampInto(point: Point, bounds: Bounds): Point {
  return {
    x: clamp(point.x, bounds.minX, bounds.maxX),
    z: clamp(point.z, bounds.minZ, bounds.maxZ),
  };
}

/**
 * 승강기 칸과 층 실내는 문틀 하나로만 이어져 있다.
 * 문이 닫혀 있으면 칸 안에, 열려 있어도 문틀 폭을 벗어난 자리에서는 넘어갈 수 없다.
 */
export function clampToBuilding(point: Point, doorsOpen: boolean): Point {
  // 문이 닫혀 있으면 밖에 있었더라도 칸 안으로 되돌린다.
  if (!doorsOpen) {
    return {
      x: clamp(point.x, CAR_BOUNDS.minX, CAR_BOUNDS.maxX),
      z: clamp(point.z, CAR_BOUNDS.minZ, CLOSED_MAX_Z),
    };
  }

  if (point.z < THRESHOLD_Z) return clampInto(point, CAR_BOUNDS);

  // 문턱 언저리에서는 문틀 폭 안에서만 드나들 수 있다. 방 안쪽까지 들어간 뒤에는 자유롭다.
  if (Math.abs(point.x) > DOORWAY_HALF && point.z < THRESHOLD_Z + PAD) {
    return {
      x: clamp(point.x, CAR_BOUNDS.minX, CAR_BOUNDS.maxX),
      z: CLOSED_MAX_Z,
    };
  }

  return clampInto(point, ROOM_BOUNDS);
}

/**
 * 바라보는 방향 기준으로 한 걸음 옮긴다.
 * 대각선이 더 빠르지 않도록 입력 벡터를 정규화한다.
 */
export function stepPosition(
  point: Point,
  yaw: number,
  input: MoveInput,
  deltaSec: number,
  speed: number,
  doorsOpen: boolean,
): Point {
  const magnitude = Math.hypot(input.forward, input.strafe);
  if (magnitude === 0) return point;

  const forward = input.forward / magnitude;
  const strafe = input.strafe / magnitude;

  // yaw = PI 일 때 카메라는 +Z 를 본다.
  const sin = Math.sin(yaw);
  const cos = Math.cos(yaw);
  const dirX = -sin;
  const dirZ = -cos;
  // 카메라의 오른쪽 = 앞 × 위. (x, z) 를 Y 축으로 -90도 돌린 (-dirZ, dirX) 다.
  const rightX = cos;
  const rightZ = -sin;

  const distance = speed * deltaSec;
  const next = {
    x: point.x + (dirX * forward + rightX * strafe) * distance,
    z: point.z + (dirZ * forward + rightZ * strafe) * distance,
  };

  return clampToBuilding(next, doorsOpen);
}
