
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AppointmentSystem from "./pages/AppointmentSystem";
import DoctorPatientConsultation from "./pages/DoctorPatientConsultation";
import HealthTrackerPage from "./pages/HealthTrackerPage";
import MentalHealthSupport from "./pages/MentalHealthSupport";
import PharmacyIntegration from "./pages/PharmacyIntegration";
import AdminPanel from "./pages/AdminPanel";
import Layout from "./components/Layout";
import Dashboard from "./pages/DashBoard";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="swasthya-hub-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
            {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
           
            <Route path="/appointments" element={<AppointmentSystem />} />
            <Route path="/consultation" element={<DoctorPatientConsultation />} />
            <Route path="/health-tracker" element={<HealthTrackerPage />} />
            <Route path="/mental-health" element={<MentalHealthSupport />} />
            <Route path="/pharmacy" element={<PharmacyIntegration />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Route>

             <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
