import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="text-7xl sm:text-9xl font-black text-rose-500/20 select-none">
        404
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t('រកមិនឃើញទំព័រនេះឡើយ', 'Page Not Found')}
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          {t(
            'ទំព័រដែលអ្នកកំពុងស្វែងរកប្រហែលជាត្រូវបានផ្លាស់ប្តូរ ឬមិនមាននៅក្នុងប្រព័ន្ធឡើយ។',
            'The page you are looking for might have been removed or does not exist.'
          )}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>{t('ត្រឡប់ទៅទំព័រដើម', 'Go Home')}</span>
        </Link>
        <Link
          to="/curriculum"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('កម្មវិធីសិក្សា', 'Curriculum')}</span>
        </Link>
      </div>
    </div>
  );
};
