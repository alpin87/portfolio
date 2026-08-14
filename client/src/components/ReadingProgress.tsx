import { useEffect, useState } from "react";

/** 케이스 지면이 얼마나 남았는지 알려주는 잉크 선. 긴 글에서 이탈을 줄인다. */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable <= 0 ? 0 : Math.min(1, window.scrollY / scrollable));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-14 z-40 h-px origin-left"
      style={{
        background: "var(--accent)",
        transform: `scaleX(${progress})`,
        transition: "transform 80ms linear",
      }}
    />
  );
}
