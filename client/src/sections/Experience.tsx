import { portfolioData } from "@/lib/data";
import SectionHeading from "@/sections/SectionHeading";
import FadeInSection from "@/components/FadeInSection";

export default function Experience() {
  const { experience, education, certifications } = portfolioData;
  return (
    <>
      <SectionHeading index="03" title="EXPERIENCE" />
      <div className="space-y-10">
        {experience.map(exp => (
          <FadeInSection key={exp.company + exp.period} direction="up">
            <div className="grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-8">
              <p className="font-mono text-sm text-muted-foreground pt-0.5">{exp.period}</p>
              <div>
                <h3 className="font-bold">{exp.company}</h3>
                <p className="text-sm text-primary mt-0.5">{exp.position}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      <FadeInSection direction="up">
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div>
            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-6 border-b border-border pb-3">교육</p>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.major} className="border-l-2 border-primary pl-4">
                  <h4 className="font-bold">{edu.school} <span className="font-normal text-sm text-muted-foreground">{edu.status}</span></h4>
                  <p className="text-sm text-muted-foreground mt-1">{edu.major}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">GPA {edu.gpa}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] mb-6 border-b border-border pb-3">자격증</p>
            <div className="grid gap-4">
              {certifications.map(cert => (
                <div key={cert.name} className="border-l-2 border-primary pl-4">
                  <h4 className="font-bold">{cert.name}</h4>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </>
  );
}
