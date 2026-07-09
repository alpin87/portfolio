import { portfolioData } from "@/lib/data";
import FadeInSection from "@/components/FadeInSection";

export default function Hero() {
  const { name, title, contact, hero } = portfolioData;
  return (
    <FadeInSection direction="up">
      <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tighter leading-[1.05]">
        {name}
        <br />
        <span className="text-muted-foreground/60">{title}</span>
      </h1>

      <div className="grid sm:grid-cols-3 gap-6 mt-16 border-t border-border pt-8">
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
    </FadeInSection>
  );
}
