import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_LESSONS } from '../data/curriculum';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const QuizzesPage: React.FC = () => {
  const { t } = useLanguage();
  const { progress } = useProgress();

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <HelpCircle className="w-4 h-4" />
            <span>{t('តេស្តសមត្ថភាព និងចំណេះដឹង', 'Skill Quizzes')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
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
        <div className="flex items-center gap-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
          <div>
            <div className="text-xs text-slate-500">{t('បានធ្វើរួច', 'Attempted')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalAttempted} / {lessonsWithQuizzes.length}
            </div>
          </div>
          <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <div className="text-xs text-slate-500">{t('ភាពត្រឹមត្រូវ', 'Accuracy')}</div>
            <div className="text-2xl font-black text-amber-500">{accuracy}%</div>
          </div>
        </div>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonsWithQuizzes.map((lesson) => {
          const title = t(lesson.titleKm, lesson.titleEn);
          const scoreRecord = progress.quizScores[lesson.id];
          const hasTaken = Boolean(scoreRecord);

          return (
            <div
              key={lesson.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {lesson.quizzes.length} {t('សំណួរ', 'questions')}
                  </span>

                  {hasTaken && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {scoreRecord.score} / {scoreRecord.total}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
                  {t(lesson.summaryKm, lesson.summaryEn)}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {hasTaken
                    ? t('បានឆ្លើយចប់រួចរាល់', 'Completed')
                    : t('មិនទាន់បានធ្វើ', 'Not Attempted')}
                </span>

                <Link
                  to={`/curriculum/${lesson.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  <span>{hasTaken ? t('ធ្វើម្តងទៀត', 'Retake') : t('ចាប់ផ្តើមតេស្ត', 'Take Quiz')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
