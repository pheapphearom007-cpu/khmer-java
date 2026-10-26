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
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { TopSearchBar } from '../common/TopSearchBar';
import { Badge } from '../common/Badge';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const { progress } = useProgress();
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

  const totalCompleted = progress.completedLessonIds.length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-rose-600/20 group-hover:scale-105 transition-transform">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  Khmer Java <span className="text-rose-600 dark:text-rose-400">Academy</span>
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">
                  {t('បណ្ឌិត្យសភាភាសា Java ជាភាសាខ្មែរ', 'Java Learning Platform for Cambodia')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  location.pathname === link.to ||
                  (link.to !== '/' && location.pathname.startsWith(link.to));
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Tools Area: Search, Language, Theme, User */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Quick Global Search Trigger Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs transition-colors border border-slate-200/60 dark:border-slate-700/60"
                title={t('ស្វែងរក (Ctrl + K)', 'Search (Ctrl + K)')}
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">{t('ស្វែងរក...', 'Search...')}</span>
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-700">
                  ⌘K
                </kbd>
              </button>

              {/* Completion badge */}
              <Link to="/dashboard" className="hidden lg:block">
                <Badge variant="brand" size="sm" dot pulseDot>
                  {totalCompleted} {t('មេរៀនចប់', 'done')}
                </Badge>
              </Link>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title={t('ប្តូរភាសា (Switch Language)', 'Switch Language')}
              >
                <Globe className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span className="hidden sm:inline">{language === 'km' ? 'ភាសាខ្មែរ' : 'English'}</span>
                <span className="sm:hidden">{language === 'km' ? 'KM' : 'EN'}</span>
              </button>

              {/* Dark / Light Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* User Auth */}
              {user ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline max-w-[90px] truncate">{user.displayName}</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    title={t('ចាកចេញ', 'Sign Out')}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('ចូលគណនី', 'Sign In')}</span>
                </Link>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-150">
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Command Palette Search Modal */}
      <TopSearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
