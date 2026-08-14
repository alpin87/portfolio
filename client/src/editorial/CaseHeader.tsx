import type { Project } from "@/lib/data";

export default function CaseHeader({ project }: { project: Project }) {
  return (
    <header className="mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6">
      <p
        className="font-mono uppercase tracking-widest"
        style={{ fontSize: "var(--text-meta)", color: "var(--accent)" }}
      >
        {project.category}
      </p>
      <h1
        className="mt-6 font-bold leading-[0.92] tracking-tight"
        style={{ fontSize: "var(--text-display)", color: "var(--ink)" }}
      >
        {project.title}
      </h1>
      <p
        className="mt-6 max-w-[var(--measure)]"
        style={{ fontSize: "var(--text-lead)", color: "var(--ink-soft)" }}
      >
        {project.subtitle}
      </p>
      <dl
        className="mt-12 grid gap-x-8 gap-y-4 border-t pt-6 font-mono sm:grid-cols-3"
        style={{ borderColor: "var(--rule)", fontSize: "var(--text-meta)" }}
      >
        <div>
          <dt style={{ color: "var(--ink-faint)" }}>PERIOD</dt>
          <dd style={{ color: "var(--ink)" }}>{project.period}</dd>
        </div>
        <div>
          <dt style={{ color: "var(--ink-faint)" }}>ROLE</dt>
          <dd style={{ color: "var(--ink)" }}>{project.role}</dd>
        </div>
        <div>
          <dt style={{ color: "var(--ink-faint)" }}>STACK</dt>
          <dd style={{ color: "var(--ink)" }}>{project.techStack.join(" · ")}</dd>
        </div>
      </dl>
    </header>
  );
}
