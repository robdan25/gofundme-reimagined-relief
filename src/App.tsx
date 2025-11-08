import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import WhatToDonate from "./pages/WhatToDonate";
import OfficialReliefLists from "./pages/OfficialReliefLists";
import About from "./pages/About";
import Partners from "./pages/Partners";
import DropOffAndShipping from "./pages/DropOffAndShipping";
import StartADrive from "./pages/StartADrive";
import CampaignDetail from "./pages/CampaignDetail";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Safety from "./pages/Safety";
import HelpCenter from "./pages/HelpCenter";
import Press from "./pages/Press";
import Volunteer from "./pages/Volunteer";
import ReportIssue from "./pages/ReportIssue";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Events from "./pages/Events";
import TestimonialsPage from "./pages/Testimonials";
import DonationPhotos from "./pages/DonationPhotos";
import CommunityWall from "./pages/CommunityWall";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import { Analytics } from "./components/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Analytics />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/what-to-donate" element={<WhatToDonate />} />
            <Route path="/official-relief-lists" element={<OfficialReliefLists />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/drop-off-and-shipping" element={<DropOffAndShipping />} />
            <Route path="/start-drive" element={<StartADrive />} />
            <Route path="/campaigns/:slug" element={<CampaignDetail />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/press" element={<Press />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donation-photos" element={<DonationPhotos />} />
            <Route path="/community-wall" element={<CommunityWall />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
