import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, FolderGit2, BookA, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { ALL_LESSONS } from '../../data/curriculum';
import { GUIDED_PROJECTS } from '../../data/projects';
import { GLOSSARY_TERMS } from '../../data/glossary';
import { useLanguage } from '../../context/LanguageContext';

export interface TopSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TopSearchBar: React.FC<TopSearchBarProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Matching lessons
  const matchedLessons = ALL_LESSONS.filter((l) => {
    if (!q) return false;
    const title = language === 'km' ? l.titleKm : l.titleEn;
    const summary = language === 'km' ? l.summaryKm : l.summaryEn;
    return title.toLowerCase().includes(q) || summary.toLowerCase().includes(q) || l.slug.includes(q);
  }).slice(0, 5);

  // Matching projects
  const matchedProjects = GUIDED_PROJECTS.filter((p) => {
    if (!q) return false;
    const title = language === 'km' ? p.titleKm : p.titleEn;
    return title.toLowerCase().includes(q) || p.slug.includes(q);
  }).slice(0, 3);

  // Matching glossary
  const matchedGlossary = GLOSSARY_TERMS.filter((g) => {
    if (!q) return false;
    return (
      g.term.toLowerCase().includes(q) ||
      g.khmerTranslation.toLowerCase().includes(q) ||
      g.pronunciationKm.toLowerCase().includes(q)
    );
  }).slice(0, 4);

  const hasResults = matchedLessons.length > 0 || matchedProjects.length > 0 || matchedGlossary.length > 0;

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              'ស្វែងរកមេរៀន គម្រោង ឬពាក្យបច្ចេកទេស (ឧ. loop, oop, array)...',
              'Search lessons, projects, or terms (e.g. loop, oop)...'
            )}
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {q && !hasResults && (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              {t('រកមិនឃើញលទ្ធផលដែលត្រូវនឹង ', 'No results found for ')}
              <span className="font-semibold text-slate-700 dark:text-slate-200">"{query}"</span>
            </div>
          )}

          {!q && (
            <div className="p-4 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {t('មេរៀនណែនាំ (Recommended)', 'Recommended Lessons')}
              </div>
              <div className="space-y-1">
                {ALL_LESSONS.slice(0, 4).map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleSelect(`/curriculum/${l.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-rose-500 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                        {t(l.titleKm, l.titleEn)}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Matches */}
          {matchedLessons.length > 0 && (
            <div className="py-2 space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                <span>{t('មេរៀន (Lessons)', 'Lessons')}</span>
              </div>
              {matchedLessons.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleSelect(`/curriculum/${l.slug}`)}
                  className="w-full text-left px-3 py-2 rounded-xl flex items-center justify-between hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-800 dark:text-slate-200 transition-colors group"
                >
                  <div>
                    <div className="text-xs sm:text-sm font-semibold group-hover:text-rose-600 dark:group-hover:text-rose-400">
                      {t(l.titleKm, l.titleEn)}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{t(l.summaryKm, l.summaryEn)}</div>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}

          {/* Projects Matches */}
          {matchedProjects.length > 0 && (
            <div className="py-2 space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('គម្រោងអនុវត្ត (Guided Projects)', 'Guided Projects')}</span>
              </div>
              {matchedProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(`/projects/${p.slug}`)}
                  className="w-full text-left px-3 py-2 rounded-xl flex items-center justify-between hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-800 dark:text-slate-200 transition-colors group"
                >
                  <div>
                    <div className="text-xs sm:text-sm font-semibold group-hover:text-amber-600">
                      {t(p.titleKm, p.titleEn)}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{t(p.descriptionKm, p.descriptionEn)}</div>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}

          {/* Glossary Matches */}
          {matchedGlossary.length > 0 && (
            <div className="py-2 space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookA className="w-3.5 h-3.5 text-purple-500" />
                <span>{t('វចនានុក្រមបច្ចេកទេស (Glossary)', 'Glossary')}</span>
              </div>
              {matchedGlossary.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect('/glossary')}
                  className="w-full text-left px-3 py-2 rounded-xl flex items-center justify-between hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-800 dark:text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600">
                      {g.term}
                    </span>
                    <span className="text-xs text-rose-500">({g.khmerTranslation})</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{g.pronunciationKm}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>{t('ចុច Esc ដើម្បីបិទ', 'Press Esc to exit')}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Khmer Java Academy Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
