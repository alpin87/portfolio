import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Overview from "@/pages/Overview";
import ProjectsPage from "@/pages/ProjectsPage";
import OpenSourcePage from "@/pages/OpenSourcePage";
import ExperiencePage from "@/pages/ExperiencePage";
import SkillsPage from "@/pages/SkillsPage";
import ProjectDetail from "@/pages/ProjectDetail";
import OpenSourceDetail from "@/pages/OpenSourceDetail";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Overview} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/opensource" component={OpenSourcePage} />
      <Route path="/opensource/:id" component={OpenSourceDetail} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/skills" component={SkillsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
