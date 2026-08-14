import { describe, expect, it } from "vitest";
import {
  CAR_BOUNDS,
  clampToBuilding,
  DOORWAY_HALF,
  ROOM_BOUNDS,
  stepPosition,
  THRESHOLD_Z,
} from "./movement";

const at = (x: number, z: number) => ({ x, z });

describe("clampToBuilding", () => {
  it("keeps the visitor inside the car while the doors are shut", () => {
    const out = clampToBuilding(at(0, THRESHOLD_Z + 3), false);
    expect(out.z).toBeLessThan(THRESHOLD_Z);
  });

  it("lets the visitor step out once the doors are open", () => {
    const out = clampToBuilding(at(0, THRESHOLD_Z + 3), true);
    expect(out.z).toBeCloseTo(THRESHOLD_Z + 3, 6);
  });

  it("holds the visitor inside the car walls", () => {
    const out = clampToBuilding(at(99, -99), false);
    expect(out.x).toBeLessThanOrEqual(CAR_BOUNDS.maxX);
    expect(out.z).toBeGreaterThanOrEqual(CAR_BOUNDS.minZ);
  });

  it("holds the visitor inside the room walls", () => {
    const out = clampToBuilding(at(999, THRESHOLD_Z + 5), true);
    expect(out.x).toBeLessThanOrEqual(ROOM_BOUNDS.maxX);
  });

  it("refuses to cross the threshold beside the doorway", () => {
    // 문이 열려 있어도 문틀 옆 벽으로는 나갈 수 없다.
    const out = clampToBuilding(at(DOORWAY_HALF + 0.6, THRESHOLD_Z + 0.4), true);
    expect(out.z).toBeLessThan(THRESHOLD_Z);
  });

  it("allows crossing straight through the doorway", () => {
    const out = clampToBuilding(at(0.2, THRESHOLD_Z + 0.4), true);
    expect(out.z).toBeCloseTo(THRESHOLD_Z + 0.4, 6);
  });

  it("pulls someone standing outside back in when the doors shut", () => {
    const out = clampToBuilding(at(0, THRESHOLD_Z + 8), false);
    expect(out.z).toBeLessThan(THRESHOLD_Z);
    expect(out.x).toBe(0);
  });
});

describe("stepPosition", () => {
  const NORTH = Math.PI; // 카메라가 문(+Z)을 보는 방향

  it("walks toward where the visitor is looking", () => {
    const out = stepPosition(at(0, 0), NORTH, { forward: 1, strafe: 0 }, 0.5, 4, false);
    expect(out.z).toBeGreaterThan(0);
  });

  it("walks backward on negative input", () => {
    const out = stepPosition(at(0, 0.5), NORTH, { forward: -1, strafe: 0 }, 0.2, 4, false);
    expect(out.z).toBeLessThan(0.5);
  });

  // 카메라의 오른쪽은 "앞 × 위" 다. +Z 를 보고 서면 그 방향은 월드 -X 가 된다.
  // 여기서 부호를 뒤집으면 A 와 D 가 서로 바뀐다.
  it("strafes toward -X when facing the doors", () => {
    const out = stepPosition(at(0, 0), NORTH, { forward: 0, strafe: 1 }, 0.2, 4, false);
    expect(out.x).toBeLessThan(0);
  });

  it("strafes the opposite way on negative input", () => {
    const out = stepPosition(at(0, 0), NORTH, { forward: 0, strafe: -1 }, 0.2, 4, false);
    expect(out.x).toBeGreaterThan(0);
  });

  it("keeps strafe perpendicular to the walking direction", () => {
    const forward = stepPosition(at(0, 0), NORTH, { forward: 1, strafe: 0 }, 0.2, 4, false);
    const side = stepPosition(at(0, 0), NORTH, { forward: 0, strafe: 1 }, 0.2, 4, false);
    // 두 방향의 내적이 0 이어야 옆걸음이 앞뒤로 새지 않는다.
    expect(forward.x * side.x + forward.z * side.z).toBeCloseTo(0, 6);
  });

  it("does not move faster diagonally than straight", () => {
    const straight = stepPosition(at(0, 0), NORTH, { forward: 1, strafe: 0 }, 0.25, 4, true);
    const diagonal = stepPosition(at(0, 0), NORTH, { forward: 1, strafe: 1 }, 0.25, 4, true);
    const straightLen = Math.hypot(straight.x, straight.z);
    const diagonalLen = Math.hypot(diagonal.x, diagonal.z);
    expect(diagonalLen).toBeLessThanOrEqual(straightLen + 1e-6);
  });

  it("stays put with no input", () => {
    const out = stepPosition(at(1, 2), NORTH, { forward: 0, strafe: 0 }, 0.5, 4, true);
    expect(out).toEqual(at(1, 2));
  });

  it("walks out of the car even in tiny per-frame steps", () => {
    // 120Hz 화면에서는 한 프레임 이동이 3cm 도 안 된다.
    // 문턱 앞뒤에 어느 영역에도 속하지 않는 틈이 있으면 여기서 영원히 막힌다.
    let position = at(0, 0);
    for (let frame = 0; frame < 400; frame++) {
      position = stepPosition(position, NORTH, { forward: 1, strafe: 0 }, 1 / 120, 3.4, true);
    }
    expect(position.z).toBeGreaterThan(THRESHOLD_Z + 1);
  });

  it("never escapes the building however long the step", () => {
    const out = stepPosition(at(0, 0), NORTH, { forward: 1, strafe: 0 }, 60, 9, true);
    expect(out.z).toBeLessThanOrEqual(ROOM_BOUNDS.maxZ);
  });
});
