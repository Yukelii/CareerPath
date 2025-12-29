import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { Header } from './components/Header';

import { HomePage } from './pages/HomePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { GuidePage } from './pages/GuidePage';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';

import { AccountLayout } from './pages/AccountLayout';
import { ProfileSection } from './pages/ProfileSection';
import { SettingsSection } from './pages/SettingsSection';
import { ProgressSection } from './pages/ProgressSection';

import './App.css';

function AppShell() {
  const location = useLocation();

  const hideHeader =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/logout';

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        <Route path="/" element={<HomePage />} />

        {/* Keep both if some parts of your app use either */}
        <Route path="/roadmap/:roadmapId" element={<RoadmapPage />} />
        <Route path="/roadmaps/:roadmapId" element={<RoadmapPage />} />

        <Route path="/guides" element={<GuidePage />} />

        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfileSection />} />
          <Route path="settings" element={<SettingsSection />} />
          <Route path="progress" element={<ProgressSection />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
