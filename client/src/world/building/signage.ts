import * as THREE from "three";

const SANS = '"Pretendard Variable", Pretendard, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

/**
 * 판에 들어가도록 글자 크기를 줄인다.
 * 고정 크기로 그리면 긴 제목이 캔버스 밖으로 넘어가 잘린 채 벽에 걸린다.
 */
export function fitFontSize(
  measure: (text: string, size: number) => number,
  text: string,
  maxWidth: number,
  startSize: number,
  minSize: number,
): number {
  if (!text) return startSize;
  let size = startSize;
  while (size > minSize && measure(text, size) > maxWidth) {
    size -= 2;
  }
  return Math.max(minSize, size);
}

function fitInContext(
  ctx: CanvasRenderingContext2D,
  text: string,
  weight: number,
  family: string,
  maxWidth: number,
  startSize: number,
  minSize: number,
): number {
  return fitFontSize(
    (value, size) => {
      ctx.font = `${weight} ${size}px ${family}`;
      return ctx.measureText(value).width;
    },
    text,
    maxWidth,
    startSize,
    minSize,
  );
}

/**
 * 벽에 걸리는 사인 한 장. 제목과 메타를 두 줄로 쌓는다.
 * 한 줄에 나란히 두면 제목 길이에 따라 메타가 판 밖으로 밀려난다.
 */
export function makeSign(primary: string, secondary: string, accent: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const padX = 60;
    const available = canvas.width - padX - 40;

    ctx.fillStyle = "#f4f1ea";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 12, canvas.height);

    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";

    const titleSize = fitInContext(ctx, primary, 700, SANS, available, 104, 42);
    ctx.font = `700 ${titleSize}px ${SANS}`;
    ctx.fillStyle = "#1b1917";
    ctx.fillText(primary, padX, 132);

    if (secondary) {
      const metaSize = fitInContext(ctx, secondary, 500, MONO, available, 52, 26);
      ctx.font = `500 ${metaSize}px ${MONO}`;
      ctx.fillStyle = "#6b6157";
      ctx.fillText(secondary, padX, 196);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** 승강기 안 층 표시기 — 큰 숫자 하나. */
export function makeFloorDisplay(): {
  canvas: HTMLCanvasElement;
  texture: THREE.CanvasTexture;
  draw: (label: string, accent: string) => void;
} {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const draw = (label: string, accent: string) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#14120f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = accent;
    ctx.font = `700 168px ${MONO}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 6);
    texture.needsUpdate = true;
  };

  draw("1", "#e04b26");
  return { canvas, texture, draw };
}
