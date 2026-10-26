import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

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
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            {t('ត្រឡប់ទៅទំព័រដើម', 'Go Home')}
          </Button>
        </Link>
        <Link to="/curriculum">
          <Button variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            {t('កម្មវិធីសិក្សា', 'Curriculum')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
