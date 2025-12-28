import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { Header } from './components/Header';
import { AccountLayout } from './pages/AccountLayout';
import { ProfileSection } from './pages/ProfileSection';
import { SettingsSection } from './pages/SettingsSection';
import { ProgressSection } from './pages/ProgressSection';
import { GuidePage } from './pages/GuidePage';
import './App.css';

function App() {
  return (
    <Router>
      {/* Header is shown on all pages */}
      <Header />

      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap/:roadmapId" element={<RoadmapPage />} />
        <Route path="/guides" element={<GuidePage />} />
        {/* Account/settings area with nested routes */}
        <Route path="/account" element={<AccountLayout />}>
          {/* default tab when hitting /account */}
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfileSection />} />
          <Route path="settings" element={<SettingsSection />} />
          <Route path="progress" element={<ProgressSection />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
