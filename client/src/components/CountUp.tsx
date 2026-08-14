import { useEffect, useRef, useState } from "react";
import { formatCountable, parseCountable } from "@/lib/countable";

type Props = {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  durationMs?: number;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** 뷰포트에 들어오면 수치가 0에서 실제 값까지 굴러간다. 숫자가 없는 값은 그대로 둔다. */
export default function CountUp({ value, className, style, durationMs = 900 }: Props) {
  const countable = parseCountable(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(countable ? formatCountable(countable, 0) : value);

  useEffect(() => {
    if (!countable) {
      setText(value);
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setText(formatCountable(countable, 1));
      return;
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(formatCountable(countable, 1));
      return;
    }

    let frame = 0;
    let settle = 0;
    const final = formatCountable(countable, 1);
    // 프레임이 멈춘 채로 끝나면 중간값이 남는다. 수치는 틀리느니 즉시 확정하는 편이 낫다.
    const snap = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      setText(final);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / durationMs);
          setText(formatCountable(countable, easeOut(progress)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        settle = window.setTimeout(snap, durationMs + 250);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", snap);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", snap);
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
    // countable 은 value 에서 파생되므로 value 만 의존성으로 둔다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className} style={{ ...style, fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  );
}
