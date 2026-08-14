import { Link } from "wouter";

type Props = {
  label: string;
  backTo?: string;
};

/** 사이트에서 플루티드 글래스를 쓰는 유일한 자리. 세로 홈이 배경을 띠로 굴절시킨다. */
export default function FlutedNav({ label, backTo }: Props) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b" style={{ borderColor: "var(--rule)" }}>
      <div
        className="absolute inset-0 -z-10"
        style={{
          backdropFilter: "blur(16px) saturate(1.05)",
          WebkitBackdropFilter: "blur(16px) saturate(1.05)",
          backgroundColor: "color-mix(in srgb, var(--ground) 72%, transparent)",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.08) 3px, rgba(0,0,0,0.07) 6px, rgba(255,255,255,0.5) 9px)",
        }}
      />
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {backTo && (
            <Link
              href={backTo}
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: "var(--text-meta)", color: "var(--ink-soft)" }}
            >
              ← Back
            </Link>
          )}
          <span
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "var(--text-meta)", color: "var(--ink)" }}
          >
            {label}
          </span>
        </div>
        <Link
          href="/index"
          className="font-mono uppercase tracking-widest"
          style={{ fontSize: "var(--text-meta)", color: "var(--ink)" }}
        >
          Index
        </Link>
      </nav>
    </header>
  );
}
