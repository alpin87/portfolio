import { Link, useLocation } from "wouter";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/lib/data";

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "opensource", label: "Open Source" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
];

export default function TopNav() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const onHome = location === "/";
  const active = useScrollSpy(onHome ? SECTIONS.map(s => s.id) : []);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight">
          {portfolioData.name}<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-1">
          {SECTIONS.map(s => (
            <a
              key={s.id}
              href={onHome ? `#${s.id}` : `/#${s.id}`}
              className={cn(
                "hidden sm:inline-block px-3 py-1.5 text-sm transition-colors",
                onHome && active === s.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2 p-2 border border-border hover:bg-secondary transition-colors"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
