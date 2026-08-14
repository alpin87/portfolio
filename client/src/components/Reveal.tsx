import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** 등장 지연(ms) — 형제 요소를 계단식으로 띄울 때 쓴다. */
  delay?: number;
  className?: string;
};

/** 뷰포트에 들어오면 한 번만 올라오며 나타난다. reduced-motion 에서는 토큰이 duration 을 0 으로 만든다. */
export default function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(1.75rem)",
        filter: shown ? "none" : "blur(6px)",
        transition: `opacity var(--motion-slow) var(--ease-out) ${delay}ms, transform var(--motion-slow) var(--ease-out) ${delay}ms, filter var(--motion-slow) var(--ease-out) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
