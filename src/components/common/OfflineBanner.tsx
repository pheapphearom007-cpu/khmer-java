import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const OfflineBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isOffline, setIsOffline] = useState(() => typeof navigator !== 'undefined' && !navigator.onLine);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRecheck = async () => {
    setIsChecking(true);
    try {
      await fetch('/api/assessment/packages', { method: 'HEAD', cache: 'no-store' });
      setIsOffline(false);
    } catch {
      // Still offline
      setIsOffline(!navigator.onLine);
    } finally {
      setIsChecking(false);
    }
  };

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="bg-amber-600 text-white px-4 py-2.5 text-xs font-medium shadow-md flex items-center justify-between gap-3 sticky top-16 z-30 transition-all duration-200"
    >
      <div className="flex items-center gap-2.5 max-w-4xl">
        <WifiOff className="w-4 h-4 shrink-0 text-amber-100" />
        <span>
          {t(
            '⚠️ អ្នកកំពុងស្ថិតក្នុងស្ថានភាព Offline (គ្មានអ៊ីនធឺណិត)។ មេរៀន និងវចនានុក្រមនៅតែអាចអានបាន ប៉ុន្តែការរត់កូដ Java Sandbox និង AI Tutor ត្រូវការអ៊ីនធឺណិតដើម្បីដំណើរការ។',
            '⚠️ You are currently offline. Cached lessons and glossary remain accessible, but Java Sandbox execution and AI Tutor require network connectivity.'
          )}
        </span>
      </div>
      <button
        onClick={handleRecheck}
        disabled={isChecking}
        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label={t('ពិនិត្យការតភ្ជាប់អ៊ីនធឺណិតឡើងវិញ', 'Recheck network connection')}
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
        <span className="hidden sm:inline">{t('ពិនិត្យឡើងវិញ', 'Retry')}</span>
      </button>
    </div>
  );
};
