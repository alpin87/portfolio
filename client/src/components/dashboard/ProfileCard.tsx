import { BookOpen, Github, Mail } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfileCard() {
  const { name, title, contact, hero } = portfolioData;

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">{name}</h2>
              <p className="text-muted-foreground mt-1">{title}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${contact.email}`}>
                  <Mail /> 메일
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`https://${contact.github}`} target="_blank" rel="noreferrer">
                  <Github /> GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`https://${contact.blog}`} target="_blank" rel="noreferrer">
                  <BookOpen /> 블로그
                </a>
              </Button>
            </div>
          </div>

          <Separator />

          <dl className="grid gap-6 sm:grid-cols-3">
            {hero.facts.map(fact => (
              <div key={fact.label}>
                <dt className="text-muted-foreground font-mono text-xs tracking-[0.18em]">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-medium">{fact.title}</dd>
                <dd className="text-muted-foreground mt-1 text-sm">{fact.sub}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
