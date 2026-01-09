import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Landing from "./pages/Landing";
import SymptomChecker from "./pages/SymptomChecker";
import HealthChat from "./pages/HealthChat";
import HealthLibrary from "./pages/HealthLibrary";
import PrescriptionScanner from "./pages/PrescriptionScanner";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NaturalHealth from "./pages/NaturalHealth";
import ChronicDiseaseNavigator from "./pages/ChronicDiseaseNavigator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/symptoms" element={<SymptomChecker />} />
              <Route path="/chat" element={<HealthChat />} />
              <Route path="/library" element={<HealthLibrary />} />
              <Route path="/scanner" element={<PrescriptionScanner />} />
              <Route path="/natural-health" element={<NaturalHealth />} />
              <Route path="/chronic-navigator" element={<ChronicDiseaseNavigator />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


