import { portfolioData } from "@/lib/data";

export default function Footer() {
  const { contact } = portfolioData;
  return (
    <footer id="contact" className="border-t-2 border-foreground mt-24">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between gap-6">
        <div className="font-mono text-sm text-muted-foreground space-y-1">
          <a href={`mailto:${contact.email}`} className="block hover:text-primary transition-colors">{contact.email}</a>
          <a href={`https://${contact.github}`} target="_blank" rel="noreferrer" className="block hover:text-primary transition-colors">{contact.github}</a>
          <a href={`https://${contact.blog}`} target="_blank" rel="noreferrer" className="block hover:text-primary transition-colors">{contact.blog}</a>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 {portfolioData.name}</p>
      </div>
    </footer>
  );
}
