import { describe, expect, it } from "vitest";
import {
  advance,
  carY,
  createElevator,
  DOOR_MS,
  FLOOR_HEIGHT,
  requestFloor,
  TRAVEL_MS_PER_FLOOR,
  type ElevatorState,
} from "./elevator";

const settled = (state: ElevatorState, ms: number) => advance(state, ms);

describe("createElevator", () => {
  it("starts parked on the lobby with its doors open", () => {
    const state = createElevator();
    expect(state.current).toBe(1);
    expect(state.target).toBe(1);
    expect(state.phase).toBe("open");
  });
});

describe("requestFloor", () => {
  it("starts closing the doors before traveling", () => {
    const state = requestFloor(createElevator(), 4);
    expect(state.phase).toBe("closing");
    expect(state.target).toBe(4);
    expect(state.current).toBe(1);
  });

  it("ignores a request for the floor it is already parked on", () => {
    const parked = createElevator();
    expect(requestFloor(parked, 1)).toBe(parked);
  });

  it("ignores requests while it is already moving", () => {
    const moving = settled(requestFloor(createElevator(), 5), DOOR_MS + 10);
    expect(moving.phase).toBe("traveling");
    const hijacked = requestFloor(moving, 2);
    expect(hijacked.target).toBe(5);
  });

  it("refuses floors outside the building", () => {
    expect(() => requestFloor(createElevator(), 0 as never)).toThrow();
    expect(() => requestFloor(createElevator(), 9 as never)).toThrow();
  });
});

describe("advance", () => {
  it("closes, travels, then opens on arrival", () => {
    let state = requestFloor(createElevator(), 2);
    expect(state.phase).toBe("closing");

    state = advance(state, DOOR_MS);
    expect(state.phase).toBe("traveling");

    state = advance(state, TRAVEL_MS_PER_FLOOR);
    expect(state.phase).toBe("opening");
    expect(state.current).toBe(2);

    state = advance(state, DOOR_MS);
    expect(state.phase).toBe("open");
  });

  it("takes longer the more floors it crosses", () => {
    const near = advance(advance(requestFloor(createElevator(), 2), DOOR_MS), TRAVEL_MS_PER_FLOOR);
    const far = advance(advance(requestFloor(createElevator(), 6), DOOR_MS), TRAVEL_MS_PER_FLOOR);
    expect(near.phase).toBe("opening");
    expect(far.phase).toBe("traveling");
  });

  it("does not overshoot when handed a huge delta", () => {
    const state = advance(requestFloor(createElevator(), 6), 999_999);
    expect(state.phase).toBe("open");
    expect(state.current).toBe(6);
    expect(state.progress).toBe(1);
  });

  it("stays put when nothing was requested", () => {
    const parked = createElevator();
    expect(advance(parked, 5_000)).toEqual(parked);
  });
});

describe("carY", () => {
  it("sits at the lobby height when parked on 1F", () => {
    expect(carY(createElevator())).toBe(0);
  });

  it("interpolates between floors while traveling", () => {
    const halfway = advance(
      advance(requestFloor(createElevator(), 3), DOOR_MS),
      TRAVEL_MS_PER_FLOOR,
    );
    const y = carY(halfway);
    expect(y).toBeGreaterThan(0);
    expect(y).toBeLessThan(FLOOR_HEIGHT * 2);
  });

  it("lands exactly on the target height", () => {
    const arrived = advance(requestFloor(createElevator(), 5), 999_999);
    expect(carY(arrived)).toBeCloseTo(FLOOR_HEIGHT * 4, 6);
  });
});
