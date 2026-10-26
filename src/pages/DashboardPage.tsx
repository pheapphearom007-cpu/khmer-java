import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ALL_LESSONS, findLessonBySlug } from '../data/curriculum';
import { GUIDED_PROJECTS } from '../data/projects';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
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
  Download,
  Upload,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { progress, resetProgress, toggleBookmark } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalLessons = ALL_LESSONS.length;
  const completedLessonsCount = progress.completedLessonIds.length;
  const lessonProgressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  const totalProjects = GUIDED_PROJECTS.length;
  const completedProjectsCount = progress.completedProjectIds.length;

  const quizCount = Object.keys(progress.quizScores).length;

  const handleReset = () => {
    if (
      window.confirm(
        t(
          'តើអ្នកពិតជាចង់កំណត់វឌ្ឍនភាពឡើងវិញមែនទេ? ទិន្នន័យមេរៀនដែលបានបញ្ចប់នឹងត្រូវលុប។',
          'Are you sure you want to reset your learning progress?'
        )
      )
    ) {
      resetProgress();
    }
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `khmer_java_progress_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported.completedLessonIds)) {
          localStorage.setItem('khmer_java_progress_v1', JSON.stringify(imported));
          window.location.reload();
        } else {
          alert('ឯកសារ JSON មិនត្រូវទម្រង់ទិន្នន័យវឌ្ឍនភាពឡើយ (Invalid JSON format)');
        }
      } catch {
        alert('បរាជ័យក្នុងការអានឯកសារ JSON (Failed to parse JSON)');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile & Sync Banner */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl font-black shadow-md shadow-rose-600/20">
              {user ? user.displayName.charAt(0).toUpperCase() : <User className="w-7 h-7" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {user ? user.displayName : t('សិស្សស្វ័យសិក្សា (Guest Student)', 'Guest Student')}
                </h1>
                <Badge variant="brand" size="xs">
                  Java Learner
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {user ? user.email : t('របៀប Offline / Local Storage Mode', 'Offline / Local Storage Mode')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Supabase Status Badge */}
            <Badge variant={isSupabaseConfigured ? 'success' : 'warning'} size="sm">
              <Database className="w-3.5 h-3.5 mr-1" />
              {isSupabaseConfigured
                ? t('Supabase Cloud Sync: Connected', 'Supabase Cloud Sync: Connected')
                : t('Local Browser Mode', 'Local Browser Mode')}
            </Badge>

            {/* Export & Import Backup */}
            <Button
              variant="outline"
              size="xs"
              onClick={handleExportData}
              title={t('ទាញយកឯកសារបម្រុងទុក (Export Progress)', 'Export progress backup')}
              leftIcon={<Download className="w-3 h-3" />}
            >
              {t('ទាញយក Backup', 'Backup')}
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportData}
              accept=".json"
              className="hidden"
            />
            <Button
              variant="outline"
              size="xs"
              onClick={() => fileInputRef.current?.click()}
              title={t('បញ្ចូលឯកសារបម្រុងទុក (Import Progress)', 'Import progress backup')}
              leftIcon={<Upload className="w-3 h-3" />}
            >
              {t('បញ្ចូល Backup', 'Restore')}
            </Button>

            {/* Reset Button */}
            <Button
              variant="ghost"
              size="xs"
              onClick={handleReset}
              title={t('កំណត់វឌ្ឍនភាពឡើងវិញ', 'Reset progress')}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              {t('កំណត់ឡើងវិញ', 'Reset')}
            </Button>
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
              className="h-full bg-rose-600 rounded-full transition-all duration-500"
              style={{ width: `${lessonProgressPercent}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Lessons */}
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('មេរៀនបានបញ្ចប់', 'Completed Lessons')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {completedLessonsCount} / {totalLessons}
            </div>
          </div>
        </Card>

        {/* Quizzes Taken */}
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('តេស្តបានឆ្លើយរួច', 'Quizzes Taken')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {quizCount}
            </div>
          </div>
        </Card>

        {/* Guided Projects */}
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('គម្រោងសម្រេចបាន', 'Completed Projects')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {completedProjectsCount} / {totalProjects}
            </div>
          </div>
        </Card>

        {/* Bookmarks */}
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('មេរៀនបាន Bookmark', 'Bookmarked Lessons')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {progress.bookmarks.length}
            </div>
          </div>
        </Card>
      </div>

      {/* Bookmarked Lessons Section */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <span>{t('មេរៀនដែលបានកត់ចំណាំ (Saved Bookmarks)', 'Saved Bookmarks')}</span>
          </h2>
          <Badge variant="neutral" size="xs">
            {progress.bookmarks.length}
          </Badge>
        </div>

        {progress.bookmarks.length === 0 ? (
          <EmptyState
            title={t('មិនទាន់មានមេរៀនណាត្រូវបាន Bookmark នៅឡើយទេ', 'No bookmarks saved yet')}
            description={t(
              'ចុចលើរូប Bookmark ក្នុងមេរៀនដើម្បីរក្សាទុកសម្រាប់អានពេលក្រោយ។',
              'Click the bookmark icon inside any lesson to save it for quick reference.'
            )}
            actionText={t('ចូលទៅកម្មវិធីសិក្សា', 'Browse Curriculum')}
            onAction={() => window.location.assign('/curriculum')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {progress.bookmarks.map((slug) => {
              const lesson = findLessonBySlug(slug);
              if (!lesson) return null;
              return (
                <div
                  key={slug}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3 group"
                >
                  <Link
                    to={`/curriculum/${slug}`}
                    className="min-w-0 space-y-1 hover:text-rose-600 transition-colors"
                  >
                    <Badge variant="brand" size="xs">
                      {lesson.difficulty}
                    </Badge>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {t(lesson.titleKm, lesson.titleEn)}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleBookmark(slug)}
                      title={t('ដក Bookmark ចេញ', 'Remove bookmark')}
                      className="p-1.5 rounded-lg text-amber-500 hover:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                    <Link to={`/curriculum/${slug}`}>
                      <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        {t('អាន', 'Read')}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Completed Lessons History */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>{t('កំណត់ត្រាមេរៀនដែលបានរៀនចប់', 'Completed Lessons History')}</span>
          </h2>
          <Badge variant="success" size="xs">
            {completedLessonsCount} / {totalLessons}
          </Badge>
        </div>

        {progress.completedLessonIds.length === 0 ? (
          <EmptyState
            title={t('អ្នកមិនទាន់បានបញ្ចប់មេរៀនណាមួយនៅឡើយទេ', 'No completed lessons yet')}
            description={t(
              'ចាប់ផ្តើមរៀនមេរៀនដំបូង ដើម្បីកត់ត្រាវឌ្ឍនភាព និងទទួលបានវិញ្ញាបនបត្រ។',
              'Start your first lesson to record your milestones.'
            )}
            actionText={t('ចាប់ផ្តើមរៀនឥឡូវនេះ', 'Start First Lesson')}
            onAction={() => window.location.assign('/curriculum/intro-to-java')}
          />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {progress.completedLessonIds.map((id) => {
              const lesson = ALL_LESSONS.find((l) => l.id === id);
              if (!lesson) return null;
              const quizRecord = progress.quizScores[id];

              return (
                <div
                  key={id}
                  className="py-3 flex items-center justify-between gap-4 text-xs sm:text-sm hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <Link
                      to={`/curriculum/${lesson.slug}`}
                      className="font-semibold text-slate-800 dark:text-slate-200 hover:text-rose-600 truncate"
                    >
                      {t(lesson.titleKm, lesson.titleEn)}
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 text-xs shrink-0">
                    {quizRecord && (
                      <Badge variant="warning" size="xs">
                        Quiz: {quizRecord.score}/{quizRecord.total}
                      </Badge>
                    )}
                    <Link to={`/curriculum/${lesson.slug}`}>
                      <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="w-3 h-3" />}>
                        {t('ពិនិត្យឡើងវិញ', 'Review')}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};
