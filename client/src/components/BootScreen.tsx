import { useEffect } from "react";
import { portfolioData } from "@/lib/data";

type Props = {
  onDone: () => void;
  /** 정보가 읽히기 전에 화면이 사라지지 않도록 하는 최소 노출 시간 */
  minimumMs?: number;
};

/** 에셋을 기다리는 동안에도 신원부터 전달한다 — 5초 만에 닫혀도 누군지는 남는다. */
export default function BootScreen({ onDone, minimumMs = 900 }: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, minimumMs);
    return () => window.clearTimeout(timer);
  }, [onDone, minimumMs]);

  const current = portfolioData.experience[portfolioData.experience.length - 1];

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col justify-end p-6 sm:p-12"
      style={{ background: "var(--ground)", color: "var(--ink)" }}
    >
      <h1
        className="font-bold leading-none tracking-tight"
        style={{ fontSize: "var(--text-display)" }}
      >
        {portfolioData.name}
      </h1>
      <p
        className="mt-4 font-mono uppercase tracking-widest"
        style={{ fontSize: "var(--text-meta)", color: "var(--ink-soft)" }}
      >
        {portfolioData.title} · {current.company} · {current.description}
      </p>
    </div>
  );
}
