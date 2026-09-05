import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { useThemeStore } from './stores/themeStore';

const Landing = lazy(() => import('./pages/Landing'));
const Overview = lazy(() => import('./pages/Overview'));
const DigitalTwin = lazy(() => import('./pages/DigitalTwin'));
const Operations = lazy(() => import('./pages/Operations'));
const Simulation = lazy(() => import('./pages/Simulation'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));

function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">
          Loading Baghewala Digital Twin...
        </p>
      </div>
    </div>
  );
}

function ThemeInitializer() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeInitializer />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* 1. Landing Hero Page */}
          <Route path="/" element={<Landing />} />

          {/* 2. Main 6-Page Core Experience */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="digital-twin" element={<DigitalTwin />} />
            <Route path="operations" element={<Operations />} />
            <Route path="simulation" element={<Simulation />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />

            {/* Legacy route redirects for seamless navigation */}
            <Route path="twin" element={<Navigate to="/app/digital-twin" replace />} />
            <Route path="css-operations" element={<Navigate to="/app/operations" replace />} />
            <Route path="srp-operations" element={<Navigate to="/app/operations" replace />} />
            <Route path="optimization" element={<Navigate to="/app/simulation" replace />} />
            <Route path="ai-prediction" element={<Navigate to="/app/simulation" replace />} />
            <Route path="analytics" element={<Navigate to="/app/operations" replace />} />
            <Route path="alerts" element={<Navigate to="/app/overview" replace />} />
            <Route path="architecture" element={<Navigate to="/app/overview" replace />} />
          </Route>

          {/* Fallback to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
