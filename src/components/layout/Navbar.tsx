import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Code2,
  FolderGit2,
  HelpCircle,
  BookA,
  BarChart3,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  User,
  LogOut,
  Coffee,
  Search,
  Bot,
  Cloud,
  RefreshCw,
  WifiOff,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { useAITutor } from '../../context/AITutorContext';
import { TopSearchBar } from '../common/TopSearchBar';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const { progress, syncStatus, manualSync } = useProgress();
  const { openTutor } = useAITutor();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('khmer_java_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('khmer_java_theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { to: '/curriculum', label: t('កម្មវិធីសិក្សា', 'Curriculum'), icon: BookOpen },
    { to: '/playground', label: t('កន្លែងរត់កូដ', 'Playground'), icon: Code2 },
    { to: '/projects', label: t('គម្រោងអនុវត្ត', 'Projects'), icon: FolderGit2 },
    { to: '/quizzes', label: t('លំហាត់តេស្ត', 'Quizzes'), icon: HelpCircle },
    { to: '/glossary', label: t('វចនានុក្រម', 'Glossary'), icon: BookA },
    { to: '/dashboard', label: t('វឌ្ឍនភាព', 'Dashboard'), icon: BarChart3 },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo & Brand */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-xl"
              aria-label="Khmer Java Academy Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-rose-600/20 group-hover:scale-105 transition-transform">
                <Coffee className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  Khmer Java <span className="text-rose-600 dark:text-rose-400">Academy</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1" aria-label={t('មាតិកាគេហទំព័រ', 'Main Navigation')}>
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.to ||
                  (link.to !== '/' && location.pathname.startsWith(link.to));
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold min-h-[40px] flex items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                      isActive
                        ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Tools Area: Search, Language, Theme, User */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Quick Global Search Trigger Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs transition-colors border border-slate-200/60 dark:border-slate-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                title={t('ស្វែងរក (Ctrl + K)', 'Search (Ctrl + K)')}
                aria-label={t('ស្វែងរកក្នុងគេហទំព័រ (Ctrl + K)', 'Search site (Ctrl + K)')}
              >
                <Search className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                <span className="hidden md:inline">{t('ស្វែងរក...', 'Search...')}</span>
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-700">
                  ⌘K
                </kbd>
              </button>

              {/* AI Tutor Launcher Button */}
              <button
                onClick={() => openTutor()}
                className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all border border-rose-200/60 dark:border-rose-900/60 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                title={t('បើកលោកគ្រូ Java AI', 'Open AI Java Tutor')}
                aria-label={t('បើកលោកគ្រូ Java AI', 'Open AI Java Tutor')}
              >
                <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{t('Java AI Tutor', 'Java AI Tutor')}</span>
              </button>

              {/* XP & Streak Badges */}
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-1.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-xl"
                aria-label={`Progress: ${progress.xp || 0} XP, Streak: ${progress.streak?.currentStreak || 0} days`}
              >
                <span className="inline-flex items-center px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40 text-xs font-bold shadow-2xs">
                  <span>{progress.xp || 0} XP</span>
                </span>

                {(progress.streak?.currentStreak || 0) > 0 && (
                  <span className="inline-flex items-center px-2.5 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200/60 dark:border-orange-900/40 text-xs font-bold shadow-2xs">
                    <span>{progress.streak.currentStreak} {t('ថ្ងៃ', 'days')}</span>
                  </span>
                )}
              </Link>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                title={t('ប្តូរភាសា (Switch Language)', 'Switch Language')}
                aria-label={language === 'km' ? 'ប្តូរទៅភាសាអង់គ្លេស (Switch to English)' : 'Switch to Khmer language (ប្តូរទៅភាសាខ្មែរ)'}
              >
                <Globe className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                <span className="hidden sm:inline">{language === 'km' ? 'ភាសាខ្មែរ' : 'English'}</span>
                <span className="sm:hidden">{language === 'km' ? 'KM' : 'EN'}</span>
              </button>

              {/* Dark / Light Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                aria-label={isDark ? t('ប្តូរទៅពន្លឺ (Light Mode)', 'Switch to light mode') : t('ប្តូរទៅងងឹត (Dark Mode)', 'Switch to dark mode')}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" /> : <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />}
              </button>

              {/* User Auth & Cloud Sync (Desktop) */}
              {user ? (
                <div className="hidden sm:flex items-center gap-1.5">
                  {/* Cloud Realtime Sync Status Indicator */}
                  {syncStatus === 'syncing' ? (
                    <button
                      onClick={manualSync}
                      title={t('កំពុងសមកាលកម្ម Cloud...', 'Syncing to Cloud...')}
                      aria-label="Cloud Syncing"
                      className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-xl text-[11px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60"
                    >
                      <RefreshCw className="w-3 h-3 animate-spin" aria-hidden="true" />
                      <span>{t('Sync...', 'Sync...')}</span>
                    </button>
                  ) : syncStatus === 'offline' ? (
                    <span
                      title={t('ក្រៅបណ្តាញ (រក្សាទុកក្នុង Browser)', 'Offline (Saved in browser)')}
                      className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-xl text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50"
                    >
                      <WifiOff className="w-3 h-3" aria-hidden="true" />
                      <span>{t('Offline', 'Offline')}</span>
                    </span>
                  ) : syncStatus === 'synced' ? (
                    <button
                      onClick={manualSync}
                      title={t('សមកាលកម្មរួចរាល់ ☁️ (ចុចដើម្បី Refresh)', 'Synced to Cloud ☁️ (Click to refresh)')}
                      aria-label="Cloud Synced"
                      className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-xl text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/40 transition-colors hover:brightness-105"
                    >
                      <Cloud className="w-3.5 h-3.5 fill-emerald-500/20" aria-hidden="true" />
                      <span>{t('Synced', 'Synced')}</span>
                    </button>
                  ) : (
                    <button
                      onClick={manualSync}
                      title={t('Realtime Cloud Sync សកម្ម (ចុចដើម្បី Sync ភ្លាមៗ)', 'Realtime Cloud Sync Active (Click to sync now)')}
                      aria-label="Cloud Sync Active"
                      className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-xl text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-700/50"
                    >
                      <Cloud className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      <span>{t('Cloud', 'Cloud')}</span>
                    </button>
                  )}

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-2.5 py-1.5 min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-medium text-slate-800 dark:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    aria-label={`Profile: ${user.displayName}`}
                  >
                    <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline max-w-[90px] truncate">{user.displayName}</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    title={t('ចាកចេញ', 'Sign Out')}
                    aria-label={t('ចាកចេញពីគណនី', 'Sign Out')}
                    className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  <User className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t('ចូលគណនី', 'Sign In')}</span>
                </Link>
              )}

              {/* Mobile Menu Toggle Button (Touch target 44x44px) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                aria-label={mobileMenuOpen ? t('បិទម៉ឺនុយ', 'Close menu') : t('បើកម៉ឺនុយ', 'Open menu')}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            role="navigation"
            aria-label={t('ម៉ឺនុយទូរស័ព្ទ', 'Mobile Navigation')}
            className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-150"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                location.pathname === link.to ||
                (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    isActive
                      ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Mobile Auth and User Section */}
            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
                        {user.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{user.displayName}</div>
                        <div className="text-[11px] text-slate-500">{user.email}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-500">{progress.xp || 0} XP</span>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 min-h-[44px] transition-colors"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    <span>{t('ចាកចេញពីគណនី (Sign Out)', 'Sign Out')}</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm min-h-[44px] transition-colors"
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>{t('ចូលគណនី / ចុះឈ្មោះ (Sign In / Register)', 'Sign In / Register')}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette Search Modal */}
      <TopSearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
