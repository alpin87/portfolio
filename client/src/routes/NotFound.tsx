import { Link } from "wouter";
import FlutedNav from "@/components/FlutedNav";
import { portfolioData } from "@/lib/data";

export default function NotFound() {
  return (
    <div
      className="flex min-h-[100svh] flex-col"
      style={{ background: "var(--ground)", color: "var(--ink)" }}
    >
      <FlutedNav label={portfolioData.name} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-28 sm:px-6">
        <p
          className="font-mono uppercase tracking-widest"
          style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
        >
          404
        </p>
        <h1
          className="mt-6 font-bold leading-[0.92] tracking-tight"
          style={{ fontSize: "var(--text-display)" }}
        >
          지면 없음
        </h1>
        <p
          className="mt-6 max-w-[var(--measure)]"
          style={{ fontSize: "var(--text-lead)", color: "var(--ink-soft)" }}
        >
          찾으시는 주소에 해당하는 페이지가 없습니다.
        </p>
        <div className="mt-12 flex gap-8">
          <Link
            href="/"
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "var(--text-meta)" }}
          >
            처음으로 →
          </Link>
          <Link
            href="/index"
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "var(--text-meta)", color: "var(--ink-soft)" }}
          >
            전체 이력 →
          </Link>
        </div>
      </main>
    </div>
  );
}
