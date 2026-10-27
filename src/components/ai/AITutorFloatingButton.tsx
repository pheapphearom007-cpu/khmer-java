import React from 'react';
import { Bot } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AITutorFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AITutorFloatingButton: React.FC<AITutorFloatingButtonProps> = ({ onClick, isOpen }) => {
  const { t } = useLanguage();

  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 min-h-[48px] min-w-[48px] bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white rounded-full shadow-lg shadow-rose-600/30 hover:shadow-xl hover:shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 dark:focus-visible:ring-rose-800"
      title={t('បើកលោកគ្រូ Java AI', 'Open AI Java Tutor')}
      aria-label={t('បើកលោកគ្រូ Java AI', 'Open AI Java Tutor')}
    >
      <div className="relative">
        <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
        </span>
      </div>

      <span className="font-bold text-xs sm:text-sm tracking-wide">
        {t('លោកគ្រូ Java AI', 'Java AI Tutor')}
      </span>
    </button>
  );
};
