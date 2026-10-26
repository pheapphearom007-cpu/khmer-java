import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Bookmark,
  Clock,
  ArrowRight,
  ExternalLink,
  X,
} from 'lucide-react';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { DifficultyLevel } from '../types';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const CurriculumPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { isLessonCompleted, isBookmarked, progress } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBookmarkOnly, setFilterBookmarkOnly] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');

  // Filter lessons based on search query, level, and bookmark
  const filteredModules = CURRICULUM_MODULES.map((module) => {
    if (selectedLevel !== 'all' && module.level !== selectedLevel) {
      return null;
    }

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

    if (matchingLessons.length === 0) return null;

    return {
      ...module,
      lessons: matchingLessons,
    };
  }).filter((mod): mod is typeof CURRICULUM_MODULES[0] => mod !== null);

  const totalLessonsCount = CURRICULUM_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompletedCount = progress.completedLessonIds.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm">
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              {t('កម្មវិធីសិក្សាពេញលេញ', 'Curriculum Roadmap')}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('កម្មវិធីសិក្សា Java តាមស្តង់ដារ W3Schools', 'W3Schools Java Learning Path')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {t(
              'រៀបចំឡើងតាមលំដាប់លំដោយពីកម្រិតដំបូងដល់កម្រិតខ្ពស់ រួមមានទ្រឹស្តីជាភាសាខ្មែរ ឧទាហរណ៍ជាក់ស្តែង ការពន្យល់មួយជួរៗ លំហាត់ និងកន្លែងរត់កូដលើ OpenJDK 21 Sandbox។',
              'Follow our progressive curriculum from absolute basics to advanced topics with Khmer explanations, exercises, and interactive code execution.'
            )}
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('វឌ្ឍនភាពសិក្សា', 'Overall Progress')}</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {totalCompletedCount} / {totalLessonsCount}
            </div>
          </div>
          <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('ភាគរយ', 'Completed')}</div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">
              {Math.round((totalCompletedCount / totalLessonsCount) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ស្វែងរកមេរៀន (ឧ. loop, oop, array)...', 'Search lessons (e.g. loop, oop)...')}
            className="w-full pl-10 pr-9 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-rose-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Level and Bookmark Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Level Filter Tabs */}
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedLevel === lvl
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lvl === 'all'
                ? t('ទាំងអស់', 'All')
                : lvl === 'beginner'
                ? t('ដំបូង', 'Beginner')
                : lvl === 'intermediate'
                ? t('មធ្យម', 'Intermediate')
                : t('ខ្ពស់', 'Advanced')}
            </button>
          ))}

          {/* Bookmark Toggle */}
          <button
            onClick={() => setFilterBookmarkOnly(!filterBookmarkOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
              filterBookmarkOnly
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${filterBookmarkOnly ? 'fill-current text-amber-500' : ''}`} />
            <span>{t('Bookmark', 'Bookmarks')}</span>
          </button>
        </div>
      </Card>

      {/* Modules & Lessons List */}
      {filteredModules.length === 0 ? (
        <EmptyState
          title={t('រកមិនឃើញមេរៀនដែលត្រូវនឹងការស្វែងរករបស់អ្នកឡើយ', 'No lessons match your criteria')}
          description={t(
            'សូមសាកល្បងស្វែងរកដោយប្រើពាក្យគន្លឹះផ្សេងទៀត ឬលុប Filter ចេញ។',
            'Try adjusting your search terms or clearing active filters.'
          )}
          actionText={t('សម្អាតការស្វែងរក', 'Clear Search & Filters')}
          onAction={() => {
            setSearchQuery('');
            setSelectedLevel('all');
            setFilterBookmarkOnly(false);
          }}
        />
      ) : (
        <div className="space-y-8">
          {filteredModules.map((module) => {
            const modTitle = t(module.titleKm, module.titleEn);
            const modDesc = t(module.descriptionKm, module.descriptionEn);

            return (
              <Card
                key={module.id}
                padding="none"
                className="overflow-hidden"
              >
                {/* Module Header */}
                <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {modTitle}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="brand" size="xs">
                        {module.level}
                      </Badge>
                      <Badge variant="neutral" size="xs">
                        {module.lessons.length} {t('មេរៀន', 'lessons')}
                      </Badge>
                    </div>
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
                        className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isCompleted ? (
                              <Badge variant="success" size="xs" dot>
                                {t('បានរៀនចប់', 'Completed')}
                              </Badge>
                            ) : (
                              <Badge variant="neutral" size="xs">
                                {t('មិនទាន់រៀន', 'Not Started')}
                              </Badge>
                            )}

                            {bookmarked && (
                              <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-current" />
                            )}

                            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                              <Clock className="w-3 h-3" />
                              {lesson.estimatedMinutes} {t('នាទី', 'mins')}
                            </span>
                          </div>

                          <Link
                            to={`/curriculum/${lesson.slug}`}
                            className="block font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            {lessonTitle}
                          </Link>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {lessonSummary}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-3 shrink-0">
                          {lesson.w3schoolsUrl && (
                            <a
                              href={lesson.w3schoolsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={t('មើលមេរៀនដើម W3Schools', 'View original W3Schools tutorial')}
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}

                          <Link to={`/curriculum/${lesson.slug}`}>
                            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                              {t('ចូលរៀន', 'Learn')}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
