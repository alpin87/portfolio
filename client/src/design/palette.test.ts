import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { AA_BODY, AA_LARGE, contrastRatio } from "./contrast";

/**
 * 토큰 값을 CSS 에서 직접 읽는다.
 * 테스트에 값을 복사해 두면 CSS 만 고쳤을 때 검사가 거짓으로 통과한다.
 */
function readTokens(): Record<string, string> {
  const css = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");
  const root = css.slice(css.indexOf(":root"), css.indexOf("}", css.indexOf(":root")));
  const tokens: Record<string, string> = {};
  for (const [, name, value] of root.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    tokens[name] = value;
  }
  return tokens;
}

const T = readTokens();

describe("지면 팔레트", () => {
  it("읽어온 토큰이 비어 있지 않다", () => {
    expect(Object.keys(T).length).toBeGreaterThan(6);
    expect(T.ground).toMatch(/^#[0-9a-f]{6}$/i);
  });

  // 작은 글자에 쓰는 색은 전부 본문 기준을 넘어야 한다.
  // ink-faint 는 라벨·표 헤더·기간처럼 12px 글자에 쓰이므로 예외가 아니다.
  for (const background of ["ground", "surface"]) {
    for (const foreground of ["ink", "ink-soft", "ink-faint", "signal"]) {
      it(`${foreground} on ${background} 이 본문 명암비를 넘는다`, () => {
        const ratio = contrastRatio(T[foreground], T[background]);
        expect(ratio, `${T[foreground]} on ${T[background]} = ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(
          AA_BODY,
        );
      });
    }
  }

  it("액센트 면 위의 글자가 읽힌다", () => {
    // 버튼처럼 signal 을 바탕으로 깔고 밝은 글자를 얹는 자리
    const ratio = contrastRatio("#fdf6f1", T.signal);
    expect(ratio, `${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_BODY);
  });

  it("구분선은 배경과 구별될 만큼은 차이 난다", () => {
    const ratio = contrastRatio(T.rule, T.ground);
    expect(ratio).toBeGreaterThan(1.15);
  });

  it("큰 제목은 여유롭게 통과한다", () => {
    expect(contrastRatio(T.ink, T.ground)).toBeGreaterThanOrEqual(AA_LARGE * 2);
  });
});
