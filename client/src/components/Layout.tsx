import React from "react";
import { Link, useLocation } from "wouter";
import { portfolioData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "About", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Competencies", path: "/competencies" },
    { name: "Experience", path: "/experience" },
    { name: "Skills", path: "/skills" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white flex flex-col lg:flex-row">
      {/* Left Sidebar / Navigation */}
      <aside className="w-full lg:w-[400px] lg:h-screen lg:sticky lg:top-0 bg-sidebar border-r border-border p-8 flex flex-col justify-between z-10">
        <div>
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">{portfolioData.name}</h1>
            <p className="text-lg text-muted-foreground font-mono text-sm">{portfolioData.title}</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={cn(
                    "block py-3 px-4 -mx-4 text-lg transition-colors duration-200 hover:bg-secondary",
                    location === item.path
                      ? "font-medium text-primary border-l-2 border-primary bg-secondary/50"
                      : "text-muted-foreground border-l-2 border-transparent"
                  )}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 lg:mt-0 space-y-6 text-sm font-mono text-muted-foreground">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-20 opacity-50">Email</span>
              <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-primary transition-colors">
                {portfolioData.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-20 opacity-50">Github</span>
              <a href={`https://${portfolioData.contact.github}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                {portfolioData.contact.github}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-20 opacity-50">Blog</span>
              <a href={`https://${portfolioData.contact.blog}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                {portfolioData.contact.blog}
              </a>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded border border-border hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="text-xs">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="text-xs">Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative">
        {/* Background Grid Lines (Subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }} 
        />
        
        <div className="relative z-0 max-w-4xl mx-auto p-8 lg:p-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
}
