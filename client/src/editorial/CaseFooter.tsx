import { Link } from "wouter";
import type { Project } from "@/lib/data";

export default function CaseFooter({ prev, next }: { prev?: Project; next?: Project }) {
  return (
    <footer
      className="mx-auto grid max-w-4xl gap-6 border-t px-4 py-16 sm:grid-cols-2 sm:px-6"
      style={{ borderColor: "var(--rule)" }}
    >
      {prev ? (
        <Link href={`/case/${prev.id}`}>
          <span
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
          >
            ← 이전
          </span>
          <span
            className="mt-2 block font-bold"
            style={{ fontSize: "var(--text-h3)", color: "var(--ink)" }}
          >
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={`/case/${next.id}`} className="sm:text-right">
          <span
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
          >
            다음 →
          </span>
          <span
            className="mt-2 block font-bold"
            style={{ fontSize: "var(--text-h3)", color: "var(--ink)" }}
          >
            {next.title}
          </span>
        </Link>
      )}
    </footer>
  );
}
