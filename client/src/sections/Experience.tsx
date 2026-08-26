import { portfolioData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Experience() {
  const { experience, education, certifications } = portfolioData;
  const timeline = [...experience].reverse();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>경력</CardTitle>
          <CardDescription>최근 순으로 정리했습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="border-border relative space-y-8 border-l pl-6">
            {timeline.map(exp => (
              <li key={exp.company + exp.period} className="relative">
                <span className="border-background bg-border absolute -left-[1.9rem] top-1.5 size-3 rounded-full border-2" />
                <p className="text-muted-foreground font-mono text-xs">{exp.period}</p>
                <h3 className="mt-1 font-medium">{exp.company}</h3>
                <p className="text-muted-foreground text-sm">{exp.position}</p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="grid gap-4 @3xl/main:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>교육</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {education.map(edu => (
              <div key={edu.major}>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-medium">{edu.school}</h4>
                  <Badge variant="secondary">{edu.status}</Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">{edu.major}</p>
                <p className="text-muted-foreground mt-1 font-mono text-xs">GPA {edu.gpa}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>자격증</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {certifications.map(cert => (
              <div key={cert.name}>
                <h4 className="font-medium">{cert.name}</h4>
                <p className="text-muted-foreground mt-1 font-mono text-xs">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
