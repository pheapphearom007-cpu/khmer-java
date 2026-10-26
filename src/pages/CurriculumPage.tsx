import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, CheckCircle2, Bookmark, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';

export const CurriculumPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { isLessonCompleted, isBookmarked } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBookmarkOnly, setFilterBookmarkOnly] = useState(false);

  // Filter lessons based on search query
  const filteredModules = CURRICULUM_MODULES.map((module) => {
    const matchingLessons = module.lessons.filter((lesson) => {
      const title = language === 'km' ? lesson.titleKm : lesson.titleEn;
      const summary = language === 'km' ? lesson.summaryKm : lesson.summaryEn;
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        summary.toLowerCase().includes(query) ||
        lesson.slug.toLowerCase().includes(query);

      const matchesBookmark = !filterBookmarkOnly || isBookmarked(lesson.slug);

      return matchesSearch && matchesBookmark;
    });

    return {
      ...module,
      lessons: matchingLessons,
    };
  }).filter((module) => module.lessons.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <BookOpen className="w-4 h-4" />
          <span>{t('កម្មវិធីសិក្សាពេញលេញ', 'Complete Curriculum')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t('កម្មវិធីសិក្សា Java បែប W3Schools', 'W3Schools Java Learning Path')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {t(
            'រៀបចំឡើងតាមលំដាប់លំដោយពីកម្រិតដំបូងដល់កម្រិតខ្ពស់ រួមមានទ្រឹស្តីជាភាសាខ្មែរ ឧទាហរណ៍ជាក់ស្តែង ការពន្យល់មួយជួរៗ លំហាត់ និងកន្លែងរត់កូដលើ Sandbox។',
            'Follow our progressive curriculum from absolute basics to advanced topics with Khmer explanations, exercises, and interactive code execution.'
          )}
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ស្វែងរកមេរៀន (ឧ. variables, oop, if-else)...', 'Search lessons (e.g. variables, oop)...')}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Bookmark Toggle */}
        <button
          onClick={() => setFilterBookmarkOnly(!filterBookmarkOnly)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors border ${
            filterBookmarkOnly
              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${filterBookmarkOnly ? 'fill-current' : ''}`} />
          <span>{t('បង្ហាញតែមេរៀនដែលបាន Bookmark', 'Show Bookmarks Only')}</span>
        </button>
      </div>

      {/* Modules List */}
      {filteredModules.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-slate-500 text-sm">
            {t('រកមិនឃើញមេរៀនដែលត្រូវនឹងការស្វែងរករបស់អ្នកឡើយ។', 'No lessons match your search criteria.')}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredModules.map((module) => {
            const modTitle = t(module.titleKm, module.titleEn);
            const modDesc = t(module.descriptionKm, module.descriptionEn);

            return (
              <div
                key={module.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
              >
                {/* Module Header */}
                <div className="p-6 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{modTitle}</h2>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {module.lessons.length} {t('មេរៀន', 'lessons')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {modDesc}
                  </p>
                </div>

                {/* Lessons List in Module */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {module.lessons.map((lesson) => {
                    const lessonTitle = t(lesson.titleKm, lesson.titleEn);
                    const lessonSummary = t(lesson.summaryKm, lesson.summaryEn);
                    const isCompleted = isLessonCompleted(lesson.id);
                    const bookmarked = isBookmarked(lesson.slug);

                    return (
                      <div
                        key={lesson.id}
                        className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                <CheckCircle2 className="w-3 h-3" />
                                {t('បានរៀនចប់', 'Completed')}
                              </span>
                            ) : (
                              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                {t('មិនទាន់រៀន', 'Not Started')}
                              </span>
                            )}

                            {bookmarked && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-amber-500">
                                <Bookmark className="w-3 h-3 fill-current" />
                              </span>
                            )}

                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.estimatedMinutes} {t('នាទី', 'mins')}
                            </span>
                          </div>

                          <Link
                            to={`/curriculum/${lesson.slug}`}
                            className="block font-bold text-base text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            {lessonTitle}
                          </Link>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {lessonSummary}
                          </p>
                        </div>

                        {/* Action links */}
                        <div className="flex items-center gap-3 shrink-0">
                          {lesson.w3schoolsUrl && (
                            <a
                              href={lesson.w3schoolsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={t('មើលមេរៀនដើម W3Schools', 'View original W3Schools tutorial')}
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}

                          <Link
                            to={`/curriculum/${lesson.slug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
                          >
                            <span>{t('ចូលរៀន', 'Learn')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
