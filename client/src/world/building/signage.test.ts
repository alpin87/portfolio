import { describe, expect, it } from "vitest";
import { fitFontSize } from "./signage";

/** 글자 하나당 폭이 크기에 비례한다고 본 가짜 측정기 */
const measurer = (perChar: number) => (text: string, size: number) =>
  text.length * perChar * size;

describe("fitFontSize", () => {
  const measure = measurer(0.5);

  it("keeps the starting size when the text already fits", () => {
    expect(fitFontSize(measure, "5F", 900, 148, 40)).toBe(148);
  });

  it("shrinks long text until it fits the plate", () => {
    const size = fitFontSize(measure, "Tempick 크롬 확장", 900, 148, 40);
    expect(size).toBeLessThan(148);
    expect(measure("Tempick 크롬 확장", size)).toBeLessThanOrEqual(900);
  });

  it("never goes below the floor size even for absurd text", () => {
    const size = fitFontSize(measure, "가".repeat(400), 900, 148, 40);
    expect(size).toBe(40);
  });

  it("returns the floor size for a zero-width plate", () => {
    expect(fitFontSize(measure, "안녕", 0, 148, 40)).toBe(40);
  });

  it("handles empty text without looping", () => {
    expect(fitFontSize(measure, "", 900, 148, 40)).toBe(148);
  });
});
