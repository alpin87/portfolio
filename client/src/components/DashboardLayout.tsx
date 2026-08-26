import type { CSSProperties, ReactNode } from "react";
import { Github, Moon, Sun } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  if (!toggleTheme) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}

export default function DashboardLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <SidebarProvider style={{ "--content-max": "1200px" } as CSSProperties}>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="mx-auto flex w-full max-w-(--content-max) items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <h1 className="text-base font-medium">{title}</h1>
            <div className="ml-auto flex items-center gap-1">
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                <a
                  href={`https://${portfolioData.contact.github}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-(--content-max) flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
