export type CapabilityInput = {
  webgl2: boolean;
  reducedMotion: boolean;
  /** navigator.deviceMemory — 미지원 브라우저에서는 null */
  deviceMemoryGb: number | null;
  hardwareConcurrency: number | null;
  coarsePointer: boolean;
};

export type CapabilityVerdict = {
  immersive: boolean;
  reason: "ok" | "no-webgl2" | "reduced-motion" | "low-memory" | "low-cpu";
};

const MIN_MEMORY_GB = 4;
const MIN_CORES = 4;

export function decideCapability(input: CapabilityInput): CapabilityVerdict {
  if (!input.webgl2) return { immersive: false, reason: "no-webgl2" };
  if (input.reducedMotion) return { immersive: false, reason: "reduced-motion" };
  if (input.deviceMemoryGb !== null && input.deviceMemoryGb < MIN_MEMORY_GB) {
    return { immersive: false, reason: "low-memory" };
  }
  if (input.hardwareConcurrency !== null && input.hardwareConcurrency < MIN_CORES) {
    return { immersive: false, reason: "low-cpu" };
  }
  return { immersive: true, reason: "ok" };
}

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

export function probeCapability(): CapabilityVerdict {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { immersive: false, reason: "no-webgl2" };
  }
  const nav = navigator as Navigator & { deviceMemory?: number };
  return decideCapability({
    webgl2: hasWebGL2(),
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    deviceMemoryGb: typeof nav.deviceMemory === "number" ? nav.deviceMemory : null,
    hardwareConcurrency:
      typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : null,
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
  });
}
