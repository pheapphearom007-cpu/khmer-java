import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ALL_LESSONS, findLessonBySlug } from '../data/curriculum';
import { GUIDED_PROJECTS } from '../data/projects';
import { isSupabaseConfigured } from '../services/supabaseClient';
import {
  BookOpen,
  Trophy,
  FolderGit2,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  Database,
  ArrowRight,
  User,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { progress, resetProgress } = useProgress();

  const totalLessons = ALL_LESSONS.length;
  const completedLessonsCount = progress.completedLessonIds.length;
  const lessonProgressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  const totalProjects = GUIDED_PROJECTS.length;
  const completedProjectsCount = progress.completedProjectIds.length;

  const quizCount = Object.keys(progress.quizScores).length;

  const handleReset = () => {
    if (window.confirm(t('តើអ្នកពិតជាចង់កំណត់វឌ្ឍនភាពឡើងវិញមែនទេ? ទិន្នន័យមេរៀនដែលបានបញ្ចប់នឹងត្រូវលុប។', 'Are you sure you want to reset your learning progress?'))) {
      resetProgress();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile & Sync Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center text-xl font-extrabold shadow-md shadow-rose-600/20">
              {user ? user.displayName.charAt(0).toUpperCase() : <User className="w-7 h-7" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {user ? user.displayName : t('សិស្សស្វ័យសិក្សា (Guest Student)', 'Guest Student')}
                </h1>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold">
                  Java Learner
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {user ? user.email : t('របៀប Offline / Local Storage', 'Offline / Local Storage Mode')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-emerald-500' : 'text-amber-500'}`} />
              <span className="text-slate-600 dark:text-slate-300">
                {isSupabaseConfigured
                  ? t('ភ្ជាប់ Supabase Cloud Sync រួចរាល់', 'Supabase Cloud Sync: Connected')
                  : t('រក្សាទុកក្នុង Browser (Local Mode)', 'Local Browser Storage')}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              title={t('កំណត់វឌ្ឍនភាពឡើងវិញ', 'Reset progress')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">
              {t('វឌ្ឍនភាពនៃការរៀនសរុប (Overall Curriculum Progress)', 'Curriculum Progress')}
            </span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">{lessonProgressPercent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${lessonProgressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Completed Lessons */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500">{t('មេរៀនបានបញ្ចប់', 'Completed Lessons')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {completedLessonsCount} / {totalLessons}
            </div>
          </div>
        </div>

        {/* Quizzes Taken */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500">{t('តេស្តបានឆ្លើយរួច', 'Quizzes Taken')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {quizCount}
            </div>
          </div>
        </div>

        {/* Guided Projects */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500">{t('គម្រោងសម្រេចបាន', 'Completed Projects')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {completedProjectsCount} / {totalProjects}
            </div>
          </div>
        </div>

        {/* Bookmarks */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500">{t('មេរៀនបាន Bookmark', 'Bookmarked Lessons')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {progress.bookmarks.length}
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked Lessons Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500" />
          <span>{t('មេរៀនដែលបានកត់ចំណាំ (Saved Bookmarks)', 'Saved Bookmarks')}</span>
        </h2>

        {progress.bookmarks.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 italic">
            {t('មិនទាន់មានមេរៀនណាត្រូវបាន Bookmark នៅឡើយទេ។ ចុចលើរូប Bookmark ក្នុងមេរៀនដើម្បីរក្សាទុកសម្រាប់អានពេលក្រោយ។', 'No bookmarks saved yet. Click the bookmark icon inside any lesson to save it for quick reference.')}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {progress.bookmarks.map((slug) => {
              const lesson = findLessonBySlug(slug);
              if (!lesson) return null;
              return (
                <Link
                  key={slug}
                  to={`/curriculum/${slug}`}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-rose-500 transition-colors group flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">{lesson.difficulty}</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-rose-600">
                      {t(lesson.titleKm, lesson.titleEn)}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-rose-600 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Lessons Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>{t('កំណត់ត្រាមេរៀនដែលបានរៀនចប់', 'Completed Lessons History')}</span>
        </h2>

        {progress.completedLessonIds.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            {t('អ្នកមិនទាន់បានបញ្ចប់មេរៀនណាមួយនៅឡើយទេ។', 'You have not completed any lessons yet.')}
            <div className="mt-3">
              <Link
                to="/curriculum"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold text-xs"
              >
                <span>{t('ចាប់ផ្តើមរៀនឥឡូវនេះ', 'Start Learning Now')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {progress.completedLessonIds.map((id) => {
              const lesson = ALL_LESSONS.find((l) => l.id === id);
              if (!lesson) return null;
              const quizRecord = progress.quizScores[id];

              return (
                <div key={id} className="py-3 flex items-center justify-between gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <Link
                      to={`/curriculum/${lesson.slug}`}
                      className="font-medium text-slate-800 dark:text-slate-200 hover:text-rose-600"
                    >
                      {t(lesson.titleKm, lesson.titleEn)}
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    {quizRecord && (
                      <span className="font-semibold text-amber-500">
                        Quiz: {quizRecord.score}/{quizRecord.total}
                      </span>
                    )}
                    <Link
                      to={`/curriculum/${lesson.slug}`}
                      className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                    >
                      {t('ពិនិត្យឡើងវិញ', 'Review')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
