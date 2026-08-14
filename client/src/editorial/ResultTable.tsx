import CountUp from "@/components/CountUp";

type Row = { label: string; before: string; after: string; delta?: string; note?: string };

export default function ResultTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) return null;
  return (
    <table className="mt-8 w-full border-collapse font-mono" style={{ fontSize: "var(--text-meta)" }}>
      <thead>
        <tr style={{ color: "var(--ink-faint)" }}>
          <th className="border-b py-2 text-left font-normal" style={{ borderColor: "var(--rule)" }}>
            측정
          </th>
          <th className="border-b py-2 text-right font-normal" style={{ borderColor: "var(--rule)" }}>
            전
          </th>
          <th className="border-b py-2 text-right font-normal" style={{ borderColor: "var(--rule)" }}>
            후
          </th>
          <th className="border-b py-2 text-right font-normal" style={{ borderColor: "var(--rule)" }}>
            변화
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="align-top">
            <td
              className="border-b py-3 pr-4"
              style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
            >
              {row.label}
              {row.note && (
                <span className="mt-1 block" style={{ color: "var(--ink-faint)" }}>
                  {row.note}
                </span>
              )}
            </td>
            <td
              className="border-b py-3 text-right"
              style={{ borderColor: "var(--rule)", color: "var(--ink-faint)" }}
            >
              {row.before}
            </td>
            <td
              className="border-b py-3 text-right"
              style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
            >
              <CountUp value={row.after} />
            </td>
            <td
              className="border-b py-3 text-right"
              style={{ borderColor: "var(--rule)", color: "var(--accent)" }}
            >
              {row.delta ? <CountUp value={row.delta} /> : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
