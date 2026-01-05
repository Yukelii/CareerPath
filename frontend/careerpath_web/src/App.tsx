import React, { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
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
import { ResumeAnalysisPage } from './pages/ResumeAnalysisPage';
import { ResumeAnalysisSection } from './pages/ResumeAnalysisSection';


import './App.css';

type AuthStatus = 'loading' | 'authed' | 'guest';

function useAuthStatus(): AuthStatus {
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        // Same idea as ProfileSection: rely on cookie session/JWT cookie
        const res = await fetch('/api/users/me', { credentials: 'include' });

        if (cancelled) return;

        if (res.ok) setStatus('authed');
        else setStatus('guest');
      } catch {
        if (!cancelled) setStatus('guest');
      }
    }

    check();

    // Optional: let login/register/logout pages trigger re-check
    const handler = () => check();
    window.addEventListener('auth-changed', handler);

    return () => {
      cancelled = true;
      window.removeEventListener('auth-changed', handler);
    };
  }, []);

  return status;
}

function RequireAuth({ status }: { status: AuthStatus }) {
  const location = useLocation();

  if (status === 'loading') {
    return null; // or a loader component
  }

  if (status !== 'authed') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function PublicOnly({ status }: { status: AuthStatus }) {
  if (status === 'loading') {
    return null;
  }

  if (status === 'authed') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function AppShell() {
  const location = useLocation();
  const status = useAuthStatus();

  const hideHeader =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/logout';

  const fallbackPath = useMemo(() => {
    if (status === 'loading') return null;
    return status === 'authed' ? '/' : '/login';
  }, [status]);

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        {/* Public-only pages */}
        <Route element={<PublicOnly status={status} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Logout can stay public (it can just clear cookies/client state) */}
        <Route path="/logout" element={<LogoutPage />} />

        {/* Protected app pages */}
        <Route element={<RequireAuth status={status} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
          <Route path="/roadmap/:roadmapId" element={<RoadmapPage />} />
          <Route path="/roadmaps/:roadmapId" element={<RoadmapPage />} />

          <Route path="/guides" element={<GuidePage />} />

          <Route path="/account" element={<AccountLayout />}>
          <Route path="resume-analysis" element={<ResumeAnalysisSection />} /> // changed 
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileSection />} />
            <Route path="settings" element={<SettingsSection />} />
            <Route path="progress" element={<ProgressSection />} />
          </Route>
        </Route>

        {/* Unknown routes */}
        {fallbackPath && <Route path="*" element={<Navigate to={fallbackPath} replace />} />}
        {!fallbackPath && <Route path="*" element={null} />}
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
