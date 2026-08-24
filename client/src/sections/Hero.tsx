import { portfolioData } from "@/lib/data";
import FadeInSection from "@/components/FadeInSection";

export default function Hero() {
  const { contact, hero } = portfolioData;
  return (
    <>
      <div className="relative w-full" style={{ height: "clamp(560px, 92vh, 900px)" }}>
        <iframe
          src="/hero-shelf.html"
          title="프로젝트 서재 — 백승민 포트폴리오"
          className="absolute inset-0 w-full h-full border-0"
          loading="eager"
        />
      </div>

      <FadeInSection direction="up">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
          <div className="grid sm:grid-cols-3 gap-6 border-t border-border pt-8">
            {hero.facts.map(fact => (
              <div key={fact.label}>
                <p className="font-mono text-xs font-medium tracking-[0.2em] text-primary mb-3">{fact.label}</p>
                <p className="font-medium">{fact.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{fact.sub}</p>
              </div>
            ))}
          </div>

          <p className="font-mono text-sm text-muted-foreground mt-12">
            <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">{contact.email}</a>
            <span className="mx-2">·</span>
            <a href={`https://${contact.github}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{contact.github}</a>
            <span className="mx-2">·</span>
            <a href={`https://${contact.blog}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{contact.blog}</a>
          </p>
        </div>
      </FadeInSection>
    </>
  );
}
