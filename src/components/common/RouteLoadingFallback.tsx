import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const RouteLoadingFallback: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={t('កំពុងផ្ទុកទិន្នន័យទំព័រ...', 'Loading page content...')}
      className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in"
    >
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-rose-600 dark:text-rose-400" />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {t('កំពុងរៀបចំទិន្នន័យ...', 'Loading Khmer Java Academy...')}
      </p>
      <p className="text-xs text-slate-400 max-w-xs mt-1">
        {t('សូមរង់ចាំមួយភ្លែត ប្រព័ន្ធកំពុងដំណើរការទំព័រ', 'Please wait while the page assets are being prepared.')}
      </p>
      <span className="sr-only">{t('កំពុងដំណើរការ', 'Loading')}</span>
    </div>
  );
};
