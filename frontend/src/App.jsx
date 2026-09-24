import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickSearch from './components/QuickSearch';
import AIAssistantWidget from './components/AIAssistantWidget';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import TourismPage from './pages/TourismPage';
import ServicesPage from './pages/ServicesPage';
import WardsPage from './pages/WardsPage';
import ProjectsPage from './pages/ProjectsPage';
import DirectoryPage from './pages/DirectoryPage';
import EmergencyPage from './pages/EmergencyPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ReportIssuePage from './pages/ReportIssuePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function AppContent({ isSearchOpen, setIsSearchOpen }) {
  const location = useLocation();
  const isMapRoute = location.pathname === '/' || location.pathname === '/map';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      
      {/* Main Top Navigation */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Page Routing */}
      <main style={{ flex: 1, position: 'relative' }}>
        <Routes>
          {/* Map-First Landing Screen: Interactive GIS Map with Municipal Sidebar */}
          <Route path="/" element={<MapPage />} />
          <Route path="/map" element={<MapPage />} />

          {/* Civic Portal & Traditional Overview */}
          <Route path="/portal" element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />} />

          {/* Departmental & Civic Modules */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tourism" element={<TourismPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/wards" element={<WardsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/report-issue" element={<ReportIssuePage />} />
          <Route path="/admin-portal" element={<AdminDashboardPage />} />
        </Routes>
      </main>

      {/* Conditionally hide footer on Map-First view so map takes full interactive height */}
      {!isMapRoute && <Footer />}

      {/* Global Quick Search Modal */}
      <QuickSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Floating AI Civic Assistant */}
      <AIAssistantWidget />

    </div>
  );
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      </BrowserRouter>
    </LanguageProvider>
  );
}
