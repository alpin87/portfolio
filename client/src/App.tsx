import { useState } from "react";
import { Route, Switch } from "wouter";
import BootScreen from "@/components/BootScreen";
import ErrorBoundary from "@/components/ErrorBoundary";
import GrainOverlay from "@/components/GrainOverlay";
import Building from "@/routes/Building";
import Case from "@/routes/Case";
import Index from "@/routes/Index";
import NotFound from "@/routes/NotFound";

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <ErrorBoundary>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <GrainOverlay />
      <div className="relative z-10">
        <Switch>
          <Route path="/" component={Building} />
          <Route path="/index" component={Index} />
          <Route path="/case/:id" component={Case} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ErrorBoundary>
  );
}

export default App;
