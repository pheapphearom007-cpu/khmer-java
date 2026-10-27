import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface BackButtonProps {
  /** Optional custom fallback path if in-app history is unavailable */
  fallbackPath?: string;
  /** Custom label override (defaults to bilingual "ត្រឡប់ក្រោយ" / "Back") */
  label?: string;
  /** Custom aria-label override for accessibility */
  ariaLabel?: string;
  /** Optional additional CSS class names */
  className?: string;
  /** Optional click interceptor */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Computes a sensible fallback destination based on the current URL
 * when opened directly in a new tab without prior browser history.
 */
export const getSensibleFallbackPath = (pathname: string): string => {
  // Lesson subpages (File Handling, Exception Handling, OOP, etc.) -> Curriculum catalog
  if (pathname.startsWith('/curriculum/') && pathname !== '/curriculum') {
    return '/curriculum';
  }
  // Project detail subpages -> Projects catalog
  if (pathname.startsWith('/projects/') && pathname !== '/projects') {
    return '/projects';
  }
  // Course tools & assessment hubs -> Curriculum catalog
  if (
    pathname === '/quizzes' ||
    pathname === '/playground' ||
    pathname === '/glossary' ||
    pathname === '/dashboard' ||
    pathname === '/projects'
  ) {
    return '/curriculum';
  }
  // Curriculum catalog or error pages -> Home
  return '/';
};

/**
 * Checks whether browser history contains a previous in-app entry
 */
export const hasBrowserHistory = (): boolean => {
  if (typeof window === 'undefined') return false;
  // React Router v6 tracks history depth in window.history.state.idx
  const state = window.history.state;
  if (state && typeof state.idx === 'number' && state.idx > 0) {
    return true;
  }
  // Fallback check: window.history.length > 1 and document.referrer matches current origin
  if (
    typeof document !== 'undefined' &&
    document.referrer &&
    document.referrer.startsWith(window.location.origin) &&
    window.history.length > 1
  ) {
    return true;
  }
  return false;
};

export const BackButton: React.FC<BackButtonProps> = ({
  fallbackPath,
  label,
  ariaLabel,
  className = '',
  onClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent accidental form submission if nested in or near forms
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }

    if (hasBrowserHistory()) {
      navigate(-1);
    } else {
      const target = fallbackPath || getSensibleFallbackPath(location.pathname);
      navigate(target);
    }
  };

  const buttonText = label || t('ត្រឡប់ក្រោយ', 'Back');
  const accessibleLabel =
    ariaLabel || t('ត្រឡប់ទៅទំព័រមុន (Back)', 'Go back to previous page');

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={accessibleLabel}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{buttonText}</span>
    </button>
  );
};
