import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ALL_LESSONS, findLessonBySlug } from '../data/curriculum';
import { GUIDED_PROJECTS } from '../data/projects';
import { ALL_ACHIEVEMENTS, getLevelFromXp } from '../data/achievements';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { PersonalizedRecommendations } from '../components/dashboard/PersonalizedRecommendations';
import { CurriculumMilestones } from '../components/dashboard/CurriculumMilestones';
import { DailyWeeklyGoalWidget } from '../components/gamification/DailyWeeklyGoalWidget';
import { StreakCard } from '../components/gamification/StreakCard';
import { AchievementBadgeCard } from '../components/gamification/AchievementBadgeCard';
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
  Flame,
  Clock,
  Play,
  Zap,
  FileEdit,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { progress, resetProgress, toggleBookmark } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'stages' | 'achievements' | 'bookmarks' | 'notes'>('overview');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const totalLessons = ALL_LESSONS.length;
  const completedLessonsCount = progress.completedLessonIds.length;

  const totalProjects = GUIDED_PROJECTS.length;
  const completedProjectsCount = progress.completedProjectIds.length;

  const quizCount = Object.keys(progress.quizScores).length;
  const assessmentCount = progress.assessmentAttempts?.length || 0;
  const notesCount = Object.keys(progress.notes || {}).length;

  // Level & XP calculation
  const levelInfo = getLevelFromXp(progress.xp);

  // Last visited lesson for "Continue Learning"
  const lastLesson = progress.lastLessonSlug ? findLessonBySlug(progress.lastLessonSlug) : ALL_LESSONS[0];

  const handleReset = () => {
    if (
      window.confirm(
        t(
          'តើអ្នកពិតជាចង់កំណត់វឌ្ឍនភាពឡើងវិញមែនទេ? ទិន្នន័យមេរៀនដែលបានបញ្ចប់ និងពិន្ទុនឹងត្រូវលុប។',
          'Are you sure you want to reset your learning progress and XP?'
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

  const unlockedBadgeIds = new Set(progress.unlockedAchievementIds || []);
  const filteredBadges = ALL_ACHIEVEMENTS.filter((b) => {
    const isUnlocked = unlockedBadgeIds.has(b.id);
    if (badgeFilter === 'unlocked' && !isUnlocked) return false;
    if (badgeFilter === 'locked' && isUnlocked) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* ------------------------------------------------------------- */}
      {/* 1. Profile, Level & XP Hero Header                            */}
      {/* ------------------------------------------------------------- */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-rose-600/20 shrink-0">
              {user ? user.displayName.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {user ? user.displayName : t('សិស្សស្វ័យសិក្សា (Guest Student)', 'Guest Student')}
                </h1>
                <Badge variant="brand" size="xs">
                  {language === 'km' ? levelInfo.titleKm : levelInfo.titleEn}
                </Badge>
                <Badge variant="warning" size="xs">
                  Level {levelInfo.level}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {user ? user.email : t('របៀប Offline / Local Storage Mode', 'Offline / Local Storage Mode')}
              </p>
            </div>
          </div>

          {/* Cloud Sync & Backup Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={isSupabaseConfigured ? 'success' : 'warning'} size="sm">
              <Database className="w-3.5 h-3.5 mr-1" />
              {isSupabaseConfigured
                ? t('Supabase Cloud Sync: Active', 'Supabase Cloud Sync: Active')
                : t('Local Browser Mode', 'Local Browser Mode')}
            </Badge>

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

        {/* Level XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Zap className="w-4 h-4 text-amber-500 fill-current" />
              <span>
                {t('ពិន្ទុបទពិសោធន៍សរុប (Total XP):', 'Total Experience:')} {progress.xp} XP
              </span>
            </div>
            <span className="text-amber-600 dark:text-amber-400">
              {levelInfo.currentXpInLevel} / {levelInfo.neededXpForNext} XP ទៅកាន់ Level {levelInfo.level + 1}
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full transition-all duration-500"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------- */}
      {/* 2. Key Metrics 5-Card Grid                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Completed Lessons */}
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500">{t('មេរៀនចប់', 'Lessons')}</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {completedLessonsCount}/{totalLessons}
            </div>
          </div>
        </Card>

        {/* Quizzes & Assessments */}
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500">{t('តេស្ត & Quiz', 'Tests')}</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {quizCount + assessmentCount}
            </div>
          </div>
        </Card>

        {/* Guided Projects */}
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500">{t('គម្រោងអនុវត្ត', 'Projects')}</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {completedProjectsCount}/{totalProjects}
            </div>
          </div>
        </Card>

        {/* Daily Streak */}
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500">{t('Streak', 'Streak')}</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {progress.streak?.currentStreak || 0} {t('ថ្ងៃ', 'days')}
            </div>
          </div>
        </Card>

        {/* Time Spent */}
        <Card className="p-4 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500">{t('ពេលរៀនសរុប', 'Time Spent')}</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {Math.max(1, Math.round(progress.totalTimeSpentMinutes || 0))} {t('នាទី', 'mins')}
            </div>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. Navigation Tabs Bar                                        */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>{t('ផ្ទាំងគ្រប់គ្រង & អនុសាសន៍ (Overview)', 'Overview & Study Plan')}</span>
        </button>

        <button
          onClick={() => setActiveTab('stages')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'stages'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>{t('ដំណាក់កាលកម្មវិធីសិក្សាទាំង ៨ (Stages)', 'Curriculum Stages')}</span>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'achievements'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>
            {t('សមិទ្ធផល & មេដាយ', 'Achievements')} ({unlockedBadgeIds.size}/{ALL_ACHIEVEMENTS.length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'bookmarks'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>{t('Bookmarks & កំណត់ត្រា', 'Saved & History')}</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'notes'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>{t('កំណត់ចំណាំផ្ទាល់ខ្លួន', 'Personal Notes')} ({notesCount})</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: OVERVIEW & PERSONALIZED RECOMMENDATIONS                */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Continue Learning Hero Card */}
          {lastLesson && (
            <Card className="p-6 sm:p-7 bg-gradient-to-r from-rose-50/90 via-white to-amber-50/90 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-rose-200 dark:border-rose-900/60 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="xs">
                    {t('បន្តការរៀនចុងក្រោយ (Continue Learning)', 'Continue Learning')}
                  </Badge>
                  <Badge variant="neutral" size="xs">
                    {lastLesson.difficulty}
                  </Badge>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {t(lastLesson.titleKm, lastLesson.titleEn)}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {t(lastLesson.summaryKm, lastLesson.summaryEn)}
                </p>
              </div>

              <Link to={`/curriculum/${lastLesson.slug}`} className="shrink-0">
                <Button variant="primary" size="lg" rightIcon={<Play className="w-4 h-4 fill-current" />}>
                  {t('បន្តរៀនមេរៀននេះ', 'Resume Lesson')}
                </Button>
              </Link>
            </Card>
          )}

          {/* Transparent Personalized Recommendations */}
          <PersonalizedRecommendations />

          {/* Daily & Weekly Goals */}
          <DailyWeeklyGoalWidget />

          {/* Learning Streak Card */}
          <StreakCard />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: CURRICULUM MILESTONES (8 STAGES)                       */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'stages' && <CurriculumMilestones />}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: PERSONAL ACHIEVEMENTS PAGE                             */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                {t('មេដាយសមិទ្ធផលផ្ទាល់ខ្លួន (Personal Badges)', 'Personal Achievements')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('មេដាយដែលទទួលបានតាមរយៈការរៀនសូត្រ និងការតស៊ូពិតប្រាកដ', 'Badges unlocked through real milestones')}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              {(['all', 'unlocked', 'locked'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBadgeFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all capitalize ${
                    badgeFilter === filter
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {filter === 'all'
                    ? t('ទាំងអស់', 'All')
                    : filter === 'unlocked'
                    ? t('សម្រេចបាន', 'Unlocked')
                    : t('កំពុងរៀន', 'Locked')}
                </button>
              ))}
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => {
              const isUnlocked = unlockedBadgeIds.has(badge.id);
              const historyItem = progress.achievementHistory?.find((h) => h.id === badge.id);

              return (
                <AchievementBadgeCard
                  key={badge.id}
                  badge={badge}
                  isUnlocked={isUnlocked}
                  unlockedAt={historyItem?.unlockedAt}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: BOOKMARKS & COMPLETED LESSONS HISTORY                  */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          {/* Bookmarked Lessons */}
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
                  'ចាប់ផ្តើមរៀនមេរៀនដំបូង ដើម្បីកត់ត្រាវឌ្ឍនភាព និងទទួលបានពិន្ទុ XP។',
                  'Start your first lesson to begin recording achievements.'
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
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: PERSONAL STUDY NOTES                                   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {t('កំណត់ចំណាំផ្ទាល់ខ្លួនទាំងអស់ (All Personal Study Notes)', 'Personal Study Notes')}
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {notesCount} {t('មេរៀនមានកំណត់ចំណាំ', 'lessons with notes')}
              </span>
            </div>

            {notesCount === 0 ? (
              <EmptyState
                title={t('មិនទាន់មានកំណត់ចំណាំនៅឡើយទេ', 'No notes saved yet')}
                description={t(
                  'នៅពេលអ្នកកំពុងរៀនមេរៀនណាមួយ អ្នកអាចចុចប៊ូតុង "កំណត់ចំណាំ" ដើម្បីកត់ត្រាចំណុចសំខាន់ៗដែលនឹង Sync លើ Cloud ដោយស្វ័យប្រវត្តិ។',
                  'When studying any lesson, click the "Notes" button to write down key reminders which synchronize across your devices.'
                )}
                actionText={t('ទៅកាន់កម្មវិធីសិក្សា', 'Browse Curriculum')}
                onAction={() => window.location.assign('/curriculum')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(progress.notes || {}).map(([lessonSlug, noteText]) => {
                  const lesson = ALL_LESSONS.find((l) => l.slug === lessonSlug);
                  if (!noteText.trim()) return null;

                  return (
                    <Card key={lessonSlug} className="p-4 flex flex-col justify-between border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <Link
                            to={`/curriculum/${lessonSlug}`}
                            className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-rose-500 transition-colors line-clamp-1"
                          >
                            {lesson ? t(lesson.titleKm, lesson.titleEn) : lessonSlug}
                          </Link>
                          <Badge variant="brand" size="xs">
                            {t('មេរៀន Java', 'Java Lesson')}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-mono whitespace-pre-wrap line-clamp-4 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                          {noteText}
                        </p>
                      </div>

                      <div className="flex items-center justify-end pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                        <Link to={`/curriculum/${lessonSlug}`}>
                          <Button variant="outline" size="xs" rightIcon={<ArrowRight className="w-3 h-3" />}>
                            {t('បើកមេរៀន & កែសម្រួល', 'Open Lesson & Edit')}
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
