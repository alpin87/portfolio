import { useEffect } from "react";
import { useParams } from "wouter";
import FlutedNav from "@/components/FlutedNav";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
import CaseFooter from "@/editorial/CaseFooter";
import CaseHeader from "@/editorial/CaseHeader";
import Narrative from "@/editorial/Narrative";
import ResultTable from "@/editorial/ResultTable";
import { portfolioData } from "@/lib/data";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import NotFound from "@/routes/NotFound";

export default function Case() {
  const { id } = useParams<{ id: string }>();
  const detailed = portfolioData.projects.filter((p) => p.hasDetail);
  const position = detailed.findIndex((p) => p.id === id);
  const project = position === -1 ? undefined : detailed[position];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useDocumentTitle(
    project ? `${project.title} — ${portfolioData.name}` : `${portfolioData.name} | Backend Engineer`,
    project?.summary,
  );


  if (!project) return <NotFound />;

  return (
    <div
      style={{
        background: "var(--ground)",
        ["--accent" as string]: project.accent,
        minHeight: "100vh",
      }}
    >
      <FlutedNav label={project.title} backTo="/" />
      <ReadingProgress />
      <CaseHeader project={project} />

      {project.image && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <img
            src={project.image}
            alt={`${project.title} 화면`}
            loading="lazy"
            className="w-full"
            style={{ border: "1px solid var(--rule)" }}
          />
        </div>
      )}

      <div className="mx-auto mt-16 max-w-4xl px-4 sm:px-6">
        <p
          className="max-w-[var(--measure)]"
          style={{
            fontSize: "var(--text-lead)",
            lineHeight: 1.8,
            color: "var(--ink)",
            wordBreak: "keep-all",
          }}
        >
          {project.description}
        </p>
      </div>

      <div className="mt-16">
        {project.troubleshooting.map((item, index) => (
          <Reveal key={item.title}>
            <Narrative
              index={index}
              title={item.title}
              problem={item.problem}
              cause={item.cause}
              solution={item.solution}
            />
            {item.results && item.results.length > 0 && (
              <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
                <ResultTable rows={item.results} />
              </div>
            )}
          </Reveal>
        ))}

        {project.troubleshooting.length === 0 &&
          project.features.map((feature, index) => (
            <Narrative
              key={feature.title}
              index={index}
              title={feature.title}
              problem={feature.description}
              cause=""
              solution=""
              leadLabel="기능"
            />
          ))}
      </div>

      <CaseFooter prev={detailed[position - 1]} next={detailed[position + 1]} />
    </div>
  );
}
