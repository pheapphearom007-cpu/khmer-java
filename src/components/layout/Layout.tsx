import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { OfflineBanner } from '../common/OfflineBanner';
import { BackButton } from '../common/BackButton';
import { useAITutor } from '../../context/AITutorContext';
import { useLanguage } from '../../context/LanguageContext';
import { AITutorDrawer } from '../ai/AITutorDrawer';
import { AITutorFloatingButton } from '../ai/AITutorFloatingButton';

export const Layout: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { isOpen, closeTutor, openTutor, activeCode, activeError, lessonTitle, lessonSlug } = useAITutor();

  // Exclude root landing page and auth page (login/register) to prevent confusing navigation
  const isExcluded = location.pathname === '/' || location.pathname === '/auth';
  const isLessonPage =
    location.pathname.startsWith('/curriculum/') && location.pathname !== '/curriculum';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Accessible Skip Link for Keyboard Navigation (WCAG 2.2 AA - Bypass Blocks) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2.5 bg-rose-600 text-white rounded-xl shadow-2xl font-bold text-xs ring-4 ring-rose-300 dark:ring-rose-900 transition-all"
      >
        {t('រំលងទៅមាតិកាចម្បង (Skip to main content)', 'Skip to main content')}
      </a>

      <Navbar />
      <OfflineBanner />

      {/* Top Back Navigation Bar for applicable pages */}
      {!isExcluded && (
        <nav
          aria-label={t('ការរុករកថយក្រោយ', 'Back Navigation')}
          className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm transition-colors print:hidden"
        >
          <div
            className={`py-2 sm:py-2.5 flex items-center justify-between gap-3 ${
              isLessonPage
                ? 'px-4 sm:px-6 lg:px-8'
                : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
            }`}
          >
            <BackButton />
          </div>
        </nav>
      )}

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none focus:outline-none">
        <Outlet />
      </main>

      <Footer />

      {/* Global AI Java Tutor Drawer & Floating Launcher */}
      <AITutorFloatingButton isOpen={isOpen} onClick={() => openTutor()} />
      <AITutorDrawer
        isOpen={isOpen}
        onClose={closeTutor}
        activeCode={activeCode}
        activeError={activeError}
        lessonTitle={lessonTitle}
        lessonSlug={lessonSlug}
      />
    </div>
  );
};
