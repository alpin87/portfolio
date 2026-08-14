import type { ReactNode } from "react";
import { Link } from "wouter";
import FlutedNav from "@/components/FlutedNav";
import { portfolioData } from "@/lib/data";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const META = "font-mono uppercase tracking-widest";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t py-16" style={{ borderColor: "var(--rule)" }}>
      <h2 className={META} style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}>
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Index() {
  const {
    name,
    title,
    contact,
    projects,
    experience,
    skills,
    openSource,
    miniProjects,
    education,
    certifications,
  } = portfolioData;

  const current = experience[experience.length - 1];

  useDocumentTitle(`Index — ${name}`, `${title} · ${current.company}. 프로젝트와 경력 전체 목록.`);

  return (
    <div style={{ background: "var(--ground)", minHeight: "100vh" }}>
      <FlutedNav label={name} />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6" style={{ color: "var(--ink)" }}>
        <h1
          className="font-bold leading-none tracking-tight"
          style={{ fontSize: "var(--text-display)" }}
        >
          {name}
        </h1>
        <p className="mt-4" style={{ fontSize: "var(--text-lead)", color: "var(--ink-soft)" }}>
          {title} · {current.company}
        </p>
        <p
          className={`mt-2 ${META}`}
          style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
        >
          {contact.email} · {contact.github} · {contact.blog}
        </p>

        <Section title="Projects">
          <ul>
            {projects.map((project) => {
              const row = (
                <div
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                  style={{ borderBottom: "1px solid var(--rule)" }}
                >
                  <span className="font-bold" style={{ fontSize: "var(--text-h3)" }}>
                    {project.title}
                  </span>
                  <span
                    className={META}
                    style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
                  >
                    {project.period}
                  </span>
                  <span className="w-full" style={{ color: "var(--ink-soft)" }}>
                    {project.summary}
                  </span>
                </div>
              );
              return (
                <li key={project.id}>
                  {project.hasDetail ? <Link href={`/case/${project.id}`}>{row}</Link> : row}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section title="Experience">
          <ul className="space-y-6">
            {[...experience].reverse().map((job) => (
              <li key={`${job.company}-${job.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                  <span className="font-bold" style={{ fontSize: "var(--text-lead)" }}>
                    {job.company}
                  </span>
                  <span
                    className={META}
                    style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
                  >
                    {job.period}
                  </span>
                </div>
                <p style={{ color: "var(--ink-soft)" }}>
                  {job.position} — {job.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <div className="grid gap-8 sm:grid-cols-2">
            {[...skills.now, ...skills.previously].map((group) => (
              <div key={group.category}>
                <h3
                  className={META}
                  style={{ fontSize: "var(--text-meta)", color: "var(--ink-faint)" }}
                >
                  {group.category}
                </h3>
                <p className="mt-1" style={{ color: "var(--ink)" }}>
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Open Source">
          <ul className="space-y-4">
            {openSource.map((item) => (
              <li key={item.url}>
                <a href={item.url} target="_blank" rel="noreferrer" className="font-bold">
                  {item.repo} {item.pr}
                </a>
                <p style={{ color: "var(--ink-soft)" }}>{item.description}</p>
              </li>
            ))}
            {miniProjects.map((item) => (
              <li key={item.github}>
                <span className="font-bold">{item.name}</span>
                <p style={{ color: "var(--ink-soft)" }}>{item.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education & Certifications">
          <ul className="space-y-2" style={{ color: "var(--ink-soft)" }}>
            {education.map((item) => (
              <li key={`${item.school}-${item.major}`}>
                {item.school} · {item.major} · {item.status} · GPA {item.gpa}
              </li>
            ))}
            {certifications.map((item) => (
              <li key={item.name}>
                {item.name} · {item.issuer} · {item.date}
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  );
}
