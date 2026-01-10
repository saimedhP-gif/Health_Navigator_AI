import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
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
import FamilyProfiles from "./pages/FamilyProfiles";
import MedicalNews from "./pages/MedicalNews";
import EmergencyServices from "./pages/EmergencyServices";
import MentalHealth from "./pages/MentalHealth";
import SkinAnalyzer from "./pages/SkinAnalyzer";
import HealthCommunity from "./pages/HealthCommunity";
import SmartDiagnosis from "./pages/SmartDiagnosis";
import DietPlanner from "./pages/DietPlanner";
import MobileApps from "./pages/MobileApps";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <TooltipProvider>
            {/* Skip Link for keyboard accessibility */}
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <main id="main-content">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/symptoms" element={<SymptomChecker />} />
                  <Route path="/chat" element={<HealthChat />} />
                  <Route path="/library" element={<HealthLibrary />} />
                  <Route path="/scanner" element={<PrescriptionScanner />} />
                  <Route path="/natural-health" element={<NaturalHealth />} />
                  <Route path="/chronic-navigator" element={<ChronicDiseaseNavigator />} />
                  <Route path="/family" element={<FamilyProfiles />} />
                  <Route path="/news" element={<MedicalNews />} />
                  <Route path="/emergency" element={<EmergencyServices />} />
                  <Route path="/mental-health" element={<MentalHealth />} />
                  <Route path="/skin-analyzer" element={<SkinAnalyzer />} />
                  <Route path="/community" element={<HealthCommunity />} />
                  <Route path="/smart-diagnosis" element={<SmartDiagnosis />} />
                  <Route path="/diet-planner" element={<DietPlanner />} />
                  <Route path="/mobile-app" element={<MobileApps />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


