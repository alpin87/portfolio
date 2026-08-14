import { describe, expect, it } from "vitest";
import { portfolioData } from "./data";

const HEX = /^#[0-9a-f]{6}$/i;

describe("portfolioData.projects", () => {
  it("gives every project a hex accent color", () => {
    for (const project of portfolioData.projects) {
      expect(project.accent, `${project.id} accent`).toMatch(HEX);
    }
  });

  it("keeps project ids unique", () => {
    const ids = portfolioData.projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every detailed project narrative content", () => {
    const detailed = portfolioData.projects.filter((p) => p.hasDetail);
    expect(detailed.length).toBeGreaterThan(0);
    for (const project of detailed) {
      const blocks = project.troubleshooting.length + project.features.length;
      expect(blocks, `${project.id} narrative blocks`).toBeGreaterThan(0);
    }
  });
});
