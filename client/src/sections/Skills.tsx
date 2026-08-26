import { portfolioData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SkillCard({
  title,
  description,
  groups,
}: {
  title: string;
  description: string;
  groups: { category: string; items: string[] }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {groups.map(group => (
          <div key={group.category}>
            <p className="text-muted-foreground font-mono text-xs tracking-wider">
              {group.category}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {group.items.map(item => (
                <Badge key={item} variant="secondary" className="font-mono font-normal">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function Skills() {
  return (
    <div className="grid gap-4 @3xl/main:grid-cols-2">
      <SkillCard
        title="지금 쓰는 것"
        description="현재 업무에서 매일 다루고 있는 스택입니다."
        groups={portfolioData.skills.now}
      />
      <SkillCard
        title="이전에 쓰던 것"
        description="이전 프로젝트에서 다뤘고, 다시 사용하면 곧바로 활용할 수 있는 스택입니다."
        groups={portfolioData.skills.previously}
      />
    </div>
  );
}
