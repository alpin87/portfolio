type Props = {
  index: number;
  title: string;
  problem: string;
  cause: string;
  solution: string;
  /** 트러블슈팅이 아니라 기능 소개로 쓸 때 첫 단락의 라벨을 바꾼다. */
  leadLabel?: string;
};

const BEATS = [
  { key: "problem", label: "문제" },
  { key: "cause", label: "원인" },
  { key: "solution", label: "해결" },
] as const;

export default function Narrative({
  index,
  title,
  problem,
  cause,
  solution,
  leadLabel,
}: Props) {
  const text = { problem, cause, solution };
  const labelFor = (key: (typeof BEATS)[number]["key"], fallback: string) =>
    key === "problem" && leadLabel ? leadLabel : fallback;
  return (
    <section
      className="mx-auto max-w-4xl border-t px-4 py-16 sm:px-6"
      style={{ borderColor: "var(--rule)" }}
    >
      <div className="grid gap-10 lg:grid-cols-[6rem_1fr]">
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: "var(--text-meta)", color: "var(--accent)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h2
            className="font-bold leading-tight"
            style={{ fontSize: "var(--text-h2)", color: "var(--ink)" }}
          >
            {title}
          </h2>
          <div className="mt-8 space-y-8">
            {BEATS.filter((beat) => text[beat.key].length > 0).map((beat) => (
              <div key={beat.key}>
                <h3
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
                >
                  {labelFor(beat.key, beat.label)}
                </h3>
                <p
                  className="mt-2 max-w-[var(--measure)]"
                  style={{
                    fontSize: "var(--text-body)",
                    lineHeight: 1.85,
                    color: "var(--ink)",
                    wordBreak: "keep-all",
                  }}
                >
                  {text[beat.key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
