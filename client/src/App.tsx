/**
 * App - top-level routes for the redesigned Kingdom Sales Training site.
 * Editorial cream + Mid Blue. Drops the dark theme provider in favor of
 * the cream surface defined in index.css.
 *
 * Routes:
 *   /                       Home (cover page)
 *   /curriculum             30-day curriculum + 5 phases
 *   /reference              Reference Binder index (8 guides)
 *   /reference/:slug        Individual guide detail with PDF preview
 *   /flashcards             Drill page
 *   /quiz                   Knowledge quiz + results spread
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "@/pages/Home";
import Curriculum from "@/pages/Curriculum";
import CurriculumLesson from "@/pages/CurriculumLesson";
import ReferenceBinder from "@/pages/ReferenceBinder";
import ReferenceGuide from "@/pages/ReferenceGuide";
import Flashcards from "@/pages/Flashcards";
import Quiz from "@/pages/Quiz";
import Library from "@/pages/Library";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/curriculum" component={Curriculum} />
      <Route path="/curriculum/:code" component={CurriculumLesson} />
      <Route path="/reference" component={ReferenceBinder} />
      <Route path="/reference/:slug" component={ReferenceGuide} />
      <Route path="/flashcards" component={Flashcards} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/library" component={Library} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
