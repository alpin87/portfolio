import { describe, expect, it } from "vitest";
import { formatCountable, parseCountable } from "./countable";

describe("parseCountable", () => {
  it("splits a measurement into prefix, number and suffix", () => {
    expect(parseCountable("3,570ms")).toEqual({ prefix: "", value: 3570, suffix: "ms", decimals: 0 });
  });

  it("keeps a leading tree marker as prefix", () => {
    expect(parseCountable("└ 440ms")).toEqual({ prefix: "└ ", value: 440, suffix: "ms", decimals: 0 });
  });

  it("remembers decimal places so the count-up does not change precision", () => {
    expect(parseCountable("-36.5%")).toEqual({ prefix: "-", value: 36.5, suffix: "%", decimals: 1 });
  });

  it("handles Korean unit suffixes", () => {
    expect(parseCountable("395쿼리")).toEqual({ prefix: "", value: 395, suffix: "쿼리", decimals: 0 });
  });

  it("returns null when there is no number to animate", () => {
    expect(parseCountable("검증 없음")).toBeNull();
    expect(parseCountable("—")).toBeNull();
    expect(parseCountable("")).toBeNull();
  });

  it("takes only the first number in a mixed string", () => {
    expect(parseCountable("약 1,800ms (기대)")).toEqual({
      prefix: "약 ",
      value: 1800,
      suffix: "ms (기대)",
      decimals: 0,
    });
  });
});

describe("formatCountable", () => {
  it("restores thousands separators while counting", () => {
    const parsed = parseCountable("3,570ms");
    expect(parsed).not.toBeNull();
    expect(formatCountable(parsed!, 1)).toBe("3,570ms");
    expect(formatCountable(parsed!, 0)).toBe("0ms");
  });

  it("holds the original decimal precision mid-flight", () => {
    const parsed = parseCountable("-36.5%");
    expect(formatCountable(parsed!, 0.5)).toBe("-18.3%");
  });

  it("lands exactly on the target at progress 1", () => {
    const parsed = parseCountable("12.3배");
    expect(formatCountable(parsed!, 1)).toBe("12.3배");
  });
});
