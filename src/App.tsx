import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { AITutorProvider } from './context/AITutorContext';
import { Layout } from './components/layout/Layout';
import { RouteLoadingFallback } from './components/common/RouteLoadingFallback';

// Route-level Code Splitting (Lazy-loaded chunks)
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const CurriculumPage = lazy(() => import('./pages/CurriculumPage').then((m) => ({ default: m.CurriculumPage })));
const LessonPage = lazy(() => import('./pages/LessonPage').then((m) => ({ default: m.LessonPage })));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage').then((m) => ({ default: m.PlaygroundPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })));
const QuizzesPage = lazy(() => import('./pages/QuizzesPage').then((m) => ({ default: m.QuizzesPage })));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage').then((m) => ({ default: m.GlossaryPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const AuthPage = lazy(() => import('./pages/AuthPage').then((m) => ({ default: m.AuthPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Automatically catches Supabase password reset / auth callback tokens landing on root or other pages
const AuthRedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/auth') {
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      if (
        hash.includes('type=recovery') ||
        hash.includes('error=access_denied') ||
        hash.includes('otp_expired') ||
        search.includes('type=recovery')
      ) {
        navigate(`/auth${search}${hash}`, { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProgressProvider>
          <AITutorProvider>
            <BrowserRouter>
              <AuthRedirectHandler />
              <Suspense fallback={<RouteLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="curriculum" element={<CurriculumPage />} />
                    <Route path="curriculum/:slug" element={<LessonPage />} />
                    <Route path="playground" element={<PlaygroundPage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:slug" element={<ProjectDetailPage />} />
                    <Route path="quizzes" element={<QuizzesPage />} />
                    <Route path="glossary" element={<GlossaryPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="auth" element={<AuthPage />} />
                    <Route path="404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AITutorProvider>
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
