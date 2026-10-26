import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_LESSONS } from '../data/curriculum';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { HelpCircle, ArrowRight, Search, X } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const QuizzesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { progress } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

  const lessonsWithQuizzes = ALL_LESSONS.filter((l) => l.quizzes && l.quizzes.length > 0);

  // Statistics
  let totalAttempted = 0;
  let totalQuestionsCount = 0;
  let totalCorrect = 0;

  lessonsWithQuizzes.forEach((l) => {
    totalQuestionsCount += l.quizzes.length;
    const scoreRecord = progress.quizScores[l.id];
    if (scoreRecord) {
      totalAttempted++;
      totalCorrect += scoreRecord.score;
    }
  });

  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / (totalAttempted * 2)) * 100) : 0;

  const filteredLessons = lessonsWithQuizzes.filter((lesson) => {
    const hasTaken = Boolean(progress.quizScores[lesson.id]);
    if (filterStatus === 'completed' && !hasTaken) return false;
    if (filterStatus === 'pending' && hasTaken) return false;

    const title = language === 'km' ? lesson.titleKm : lesson.titleEn;
    const summary = language === 'km' ? lesson.summaryKm : lesson.summaryEn;
    const q = searchQuery.toLowerCase().trim();
    return !q || title.toLowerCase().includes(q) || summary.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm">
              <HelpCircle className="w-3.5 h-3.5 mr-1" />
              <span>{t('តេស្តសមត្ថភាព និងចំណេះដឹង', 'Skill Quizzes')}</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('កម្រងលំហាត់តេស្តសមត្ថភាព Java', 'Java Knowledge Assessment Quizzes')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {t(
              'សាកល្បងវាស់ស្ទង់ចំណេះដឹងលើទ្រឹស្តី វេយ្យាករណ៍ និងការយល់ដឹងលើកូដ Java តាមរយៈលំហាត់ជ្រើសរើសចម្លើយពហុជម្រើស ដែលមានការបកស្រាយលម្អិត។',
              'Test and reinforce your understanding of Java fundamentals, syntax, and OOP concepts with progressive feedback and hints.'
            )}
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="p-5 flex items-center gap-6 shrink-0">
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('បានធ្វើរួច', 'Attempted')}</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {totalAttempted} / {lessonsWithQuizzes.length}
            </div>
          </div>
          <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('ភាពត្រឹមត្រូវ', 'Accuracy')}</div>
            <div className="text-xl sm:text-2xl font-black text-amber-500">{accuracy}%</div>
          </div>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ស្វែងរកតេស្តតាមមេរៀន (ឧ. variables, methods)...', 'Search quizzes by lesson...')}
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

        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {(['all', 'completed', 'pending'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st === 'all'
                ? t('ទាំងអស់', 'All')
                : st === 'completed'
                ? t('បានធ្វើរួច', 'Completed')
                : t('មិនទាន់ធ្វើ', 'Pending')}
            </button>
          ))}
        </div>
      </Card>

      {/* Quizzes Grid */}
      {filteredLessons.length === 0 ? (
        <EmptyState
          title={t('រកមិនឃើញលំហាត់តេស្តដែលត្រូវនឹងការស្វែងរកឡើយ', 'No quizzes match your query')}
          description={t(
            'សូមសាកល្បងសម្អាតពាក្យស្វែងរក ឬប្តូរជម្រើស Filter ឡើងវិញ។',
            'Try clearing your search query or selecting a different status filter.'
          )}
          actionText={t('សម្អាតការស្វែងរក', 'Clear Search')}
          onAction={() => {
            setSearchQuery('');
            setFilterStatus('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const title = t(lesson.titleKm, lesson.titleEn);
            const scoreRecord = progress.quizScores[lesson.id];
            const hasTaken = Boolean(scoreRecord);

            return (
              <Card
                key={lesson.id}
                hover
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="neutral" size="xs">
                      {lesson.quizzes.length} {t('សំណួរ', 'questions')}
                    </Badge>

                    {hasTaken && (
                      <Badge variant="success" size="xs" dot>
                        {scoreRecord.score} / {scoreRecord.total}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                    {t(lesson.summaryKm, lesson.summaryEn)}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {hasTaken
                      ? t('បានឆ្លើយចប់រួចរាល់', 'Completed')
                      : t('មិនទាន់បានធ្វើ', 'Not Attempted')}
                  </span>

                  <Link to={`/curriculum/${lesson.slug}#sec-quiz`}>
                    <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      {hasTaken ? t('ធ្វើម្តងទៀត', 'Retake') : t('ចាប់ផ្តើមតេស្ត', 'Take Quiz')}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
