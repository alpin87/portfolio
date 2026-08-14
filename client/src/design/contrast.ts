/** #rrggbb 를 0~1 채널로 */
function channels(hex: string): [number, number, number] {
  const value = hex.trim().replace("#", "");
  if (value.length !== 6) throw new Error(`contrast: ${hex} is not a #rrggbb color`);
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255) as [
    number,
    number,
    number,
  ];
}

/** WCAG 상대 휘도 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = channels(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** 두 색의 명암비. 1(같은 색) ~ 21(검정과 흰색) */
export function contrastRatio(a: string, b: string): number {
  const first = relativeLuminance(a);
  const second = relativeLuminance(b);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

/** 본문처럼 작은 글자에 요구되는 최소 명암비 (WCAG AA) */
export const AA_BODY = 4.5;
/** 24px 이상 또는 굵은 19px 이상 큰 글자의 최소 명암비 */
export const AA_LARGE = 3;
