import { Link } from "wouter";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-5 py-4 text-center">
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-lg">
            <FileQuestion className="size-6" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold tabular-nums">404</h1>
            <p className="text-muted-foreground text-sm">
              찾으시는 페이지가 없습니다. 주소가 바뀌었거나 지워진 페이지일 수 있습니다.
            </p>
          </div>
          <Button asChild>
            <Link href="/">
              <ArrowLeft /> Overview로 돌아가기
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
