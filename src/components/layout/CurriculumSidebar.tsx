import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CURRICULUM_MODULES,
} from '../../data/curriculum';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Bookmark,
} from 'lucide-react';

interface CurriculumSidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsedDesktop: boolean;
  onToggleDesktop: () => void;
}

export const CurriculumSidebar: React.FC<CurriculumSidebarProps> = ({
  isOpenMobile,
  onCloseMobile,
  isCollapsedDesktop,
  onToggleDesktop,
}) => {
  const { t } = useLanguage();
  const location = useLocation();
  const { isLessonCompleted, isBookmarked } = useProgress();

  // Track expanded modules in accordion
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Expand the module matching current lesson
    const currentSlug = location.pathname.split('/').pop() || '';
    const initial: Record<string, boolean> = {};
    CURRICULUM_MODULES.forEach((mod) => {
      const hasCurrent = mod.lessons.some((l) => l.slug === currentSlug);
      initial[mod.id] = hasCurrent || mod.id === 'mod-1';
    });
    return initial;
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const renderModuleTree = () => (
    <div className="space-y-3 p-3">
      {CURRICULUM_MODULES.map((module) => {
        const isExpanded = expandedModules[module.id] ?? false;
        const modTitle = t(module.titleKm, module.titleEn);

        // Calculate module completion stats
        const completedInMod = module.lessons.filter((l) => isLessonCompleted(l.id)).length;
        const totalInMod = module.lessons.length;
        const allModCompleted = completedInMod === totalInMod && totalInMod > 0;

        return (
          <div
            key={module.id}
            className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 overflow-hidden"
          >
            {/* Module Accordion Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {modTitle}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    allModCompleted
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {completedInMod}/{totalInMod}
                </span>
              </div>
            </button>

            {/* Lessons List in Accordion */}
            {isExpanded && (
              <div className="p-1 space-y-0.5 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/80">
                {module.lessons.map((lesson) => {
                  const lessonTitle = t(lesson.titleKm, lesson.titleEn);
                  const isCurrent = location.pathname === `/curriculum/${lesson.slug}`;
                  const isCompleted = isLessonCompleted(lesson.id);
                  const bookmarked = isBookmarked(lesson.slug);

                  return (
                    <Link
                      key={lesson.id}
                      to={`/curriculum/${lesson.slug}`}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        isCurrent
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold border-l-2 border-rose-600'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                        )}
                        <span className="truncate">{lessonTitle}</span>
                      </div>

                      {bookmarked && (
                        <Bookmark className="w-3 h-3 text-amber-500 fill-current shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur transition-all duration-300 ${
          isCollapsedDesktop ? 'w-16' : 'w-72 xl:w-80'
        }`}
      >
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
          {/* Header Bar with Collapse Toggle */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
            {!isCollapsedDesktop && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-500" />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {t('មាតិកាមេរៀន', 'Curriculum Outline')}
                </span>
              </div>
            )}
            <button
              onClick={onToggleDesktop}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mx-auto lg:mx-0"
              title={isCollapsedDesktop ? t('ពង្រីកមាតិកា', 'Expand Sidebar') : t('បង្រួញមាតិកា', 'Collapse Sidebar')}
            >
              {isCollapsedDesktop ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Scrollable Tree View */}
          {!isCollapsedDesktop ? (
            <div className="flex-1 overflow-y-auto">
              {renderModuleTree()}
            </div>
          ) : (
            <div className="py-4 flex flex-col items-center gap-3">
              <Link
                to="/curriculum"
                title={t('កម្មវិធីសិក្សា', 'Curriculum')}
                className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Drawer Slide-over */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in"
          />

          {/* Drawer Container */}
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-500" />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  {t('មាតិកាមេរៀន Java', 'Java Curriculum Outline')}
                </span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {renderModuleTree()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
