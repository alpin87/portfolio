export type Countable = {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
};

const NUMBER = /\d[\d,]*(\.\d+)?/;

/**
 * "3,570ms" 같은 측정값에서 애니메이션할 숫자를 떼어낸다.
 * 숫자가 없으면 null — 호출부는 원문을 그대로 보여준다.
 */
export function parseCountable(text: string): Countable | null {
  const match = NUMBER.exec(text);
  if (!match) return null;

  const raw = match[0];
  const start = match.index;
  const decimalPart = raw.split(".")[1];

  return {
    prefix: text.slice(0, start),
    value: Number(raw.replace(/,/g, "")),
    suffix: text.slice(start + raw.length),
    decimals: decimalPart ? decimalPart.length : 0,
  };
}

/** progress 0~1 사이의 중간 값을 원래 표기(자릿수 구분, 소수 자리)로 되돌린다. */
export function formatCountable(countable: Countable, progress: number): string {
  const current = countable.value * Math.min(1, Math.max(0, progress));
  const body = current.toLocaleString("en-US", {
    minimumFractionDigits: countable.decimals,
    maximumFractionDigits: countable.decimals,
  });
  return `${countable.prefix}${body}${countable.suffix}`;
}
