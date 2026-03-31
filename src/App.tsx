import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Prognose from "./pages/Prognose";
import CryptoUpload from "./pages/CryptoUpload";
import Selbstauskunft from "./pages/Selbstauskunft";
import BaufinanzierungSelbstauskunft from "./pages/BaufinanzierungSelbstauskunft";
import Bauprojekte from "./pages/Bauprojekte";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prognose" element={<Prognose />} />
            <Route path="/crypto-upload" element={<CryptoUpload />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/selbstauskunft" element={<Selbstauskunft />} />
            <Route path="/baufinanzierung-selbstauskunft" element={<BaufinanzierungSelbstauskunft />} />
            <Route path="/bauprojekte/:country" element={<Bauprojekte />} />
            <Route path="/bauprojekte/:country/:projectId" element={<Bauprojekte />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
