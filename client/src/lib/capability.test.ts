import { describe, expect, it } from "vitest";
import { decideCapability, type CapabilityInput } from "./capability";

const CAPABLE: CapabilityInput = {
  webgl2: true,
  reducedMotion: false,
  deviceMemoryGb: 8,
  hardwareConcurrency: 8,
  coarsePointer: false,
};

describe("decideCapability", () => {
  it("allows the immersive world on a capable desktop", () => {
    expect(decideCapability(CAPABLE)).toEqual({ immersive: true, reason: "ok" });
  });

  it("refuses without WebGL2", () => {
    expect(decideCapability({ ...CAPABLE, webgl2: false })).toEqual({
      immersive: false,
      reason: "no-webgl2",
    });
  });

  it("refuses when the visitor asked for reduced motion", () => {
    expect(decideCapability({ ...CAPABLE, reducedMotion: true })).toEqual({
      immersive: false,
      reason: "reduced-motion",
    });
  });

  it("refuses below 4GB of device memory", () => {
    expect(decideCapability({ ...CAPABLE, deviceMemoryGb: 2 }).reason).toBe("low-memory");
  });

  it("refuses below 4 logical cores", () => {
    expect(decideCapability({ ...CAPABLE, hardwareConcurrency: 2 }).reason).toBe("low-cpu");
  });

  it("treats unknown memory and cores as acceptable rather than blocking", () => {
    const verdict = decideCapability({
      ...CAPABLE,
      deviceMemoryGb: null,
      hardwareConcurrency: null,
    });
    expect(verdict.immersive).toBe(true);
  });

  it("checks WebGL2 before reduced motion so the hardest block wins", () => {
    expect(decideCapability({ ...CAPABLE, webgl2: false, reducedMotion: true }).reason).toBe(
      "no-webgl2",
    );
  });

  it("allows a capable touch device", () => {
    expect(decideCapability({ ...CAPABLE, coarsePointer: true }).immersive).toBe(true);
  });
});
