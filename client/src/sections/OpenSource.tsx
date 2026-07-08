import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";
import SectionHeading from "@/sections/SectionHeading";
import FadeInSection from "@/components/FadeInSection";

export default function OpenSource() {
  return (
    <>
      <SectionHeading index="02" title="OPEN SOURCE" />
      <div className="space-y-4">
        {portfolioData.openSource.map(oss => (
          <FadeInSection key={oss.pr} direction="up">
            <a
              href={oss.url}
              target="_blank"
              rel="noreferrer"
              className="group block border border-border bg-card p-8 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-sm">{oss.repo}</p>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 border text-success border-success/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {oss.pr} · Merged
                </span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mt-3">{oss.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{oss.description}</p>
            </a>
          </FadeInSection>
        ))}
      </div>
    </>
  );
}
