import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ALL_LESSONS } from '../data/curriculum';
import { ASSESSMENT_PACKAGES } from '../data/assessments/assessmentPackages';
import { assessmentService } from '../services/assessmentService';
import { AssessmentPackage, ClientAssessmentQuestion } from '../types/assessment';
import { AssessmentRunner } from '../components/assessment/AssessmentRunner';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import {
  ArrowRight,
  Search,
  X,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const QuizzesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { progress, getWeakTopics, getAssessmentAttempts } = useProgress();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active running test state
  const [activePackage, setActivePackage] = useState<AssessmentPackage | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<ClientAssessmentQuestion[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Filter state
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'modules' | 'topics' | 'lessons'>('diagnostic');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [lessonPage, setLessonPage] = useState(1);

  const weakTopics = getWeakTopics();
  const assessmentAttempts = getAssessmentAttempts();

  // Handle URL param ?package=...
  useEffect(() => {
    const pkgSlug = searchParams.get('package');
    if (pkgSlug) {
      const pkg = ASSESSMENT_PACKAGES.find((p) => p.slug === pkgSlug || p.id === pkgSlug);
      if (pkg) {
        startAssessment(pkg);
      }
    }
  }, [searchParams]);

  const startAssessment = async (pkg: AssessmentPackage) => {
    setIsLoadingQuestions(true);
    setActivePackage(pkg);
    try {
      const data = await assessmentService.getQuestions({
        packageSlug: pkg.slug,
        randomize: true,
      });
      setActiveQuestions(data.questions);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleExitAssessment = () => {
    setActivePackage(null);
    setActiveQuestions([]);
    setSearchParams({});
  };

  // If a test is actively being taken, render AssessmentRunner!
  if (activePackage) {
    if (isLoadingQuestions) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t('កំពុងរៀបចំកម្រងសំណួរចៃដន្យ...', 'Loading randomized assessment questions...')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('ផ្ទៀងផ្ទាត់សុវត្ថិភាព និងច្បាប់ចម្លើយលើ Backend Engine...', 'Securing test session without pre-leaked keys...')}
          </p>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <Button variant="ghost" size="xs" onClick={handleExitAssessment}>
            ← {t('ចាកចេញពីការតេស្តនេះ', 'Exit Assessment')}
          </Button>
        </div>
        <AssessmentRunner
          packageId={activePackage.id}
          packageTitle={language === 'km' ? activePackage.titleKm : activePackage.titleEn}
          questions={activeQuestions}
          timeLimitMinutes={activePackage.timeLimitMinutes}
          onExit={handleExitAssessment}
        />
      </div>
    );
  }

  // Statistics
  const lessonsWithQuizzes = ALL_LESSONS.filter((l) => l.quizzes && l.quizzes.length > 0);
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

  // Filter packages based on activeTab
  const filteredPackages = ASSESSMENT_PACKAGES.filter((pkg) => {
    if (activeTab === 'diagnostic' && pkg.category !== 'diagnostic') return false;
    if (activeTab === 'modules' && pkg.category !== 'module') return false;
    if (activeTab === 'topics' && pkg.category !== 'topic') return false;

    if (filterDifficulty !== 'all' && pkg.level !== filterDifficulty) return false;

    const title = language === 'km' ? pkg.titleKm : pkg.titleEn;
    const desc = language === 'km' ? pkg.descriptionKm : pkg.descriptionEn;
    const q = searchQuery.toLowerCase().trim();
    return !q || title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  const filteredLessons = lessonsWithQuizzes.filter((lesson) => {
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
              <span>{t('ប្រព័ន្ធតេស្តវាស់ស្ទង់សមត្ថភាពឆ្លាតវៃ', 'Smart Java Assessment System')}</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('កម្រងតេស្តសមត្ថភាព និងការវាយតម្លៃ Java', 'Java Knowledge Assessment & Diagnostics')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {t(
              'វាស់ស្ទង់ចំណេះដឹងតាមរយៈសំណួរពហុទម្រង់៖ ពហុជម្រើស, ទស្សន៍ទាយលទ្ធផល (Predict Output), ស្វែងរកកំហុស (Find Bug), បំពេញចន្លោះកូដ និងកូដខ្លី។ ប្រព័ន្ធនឹងវិភាគចំណុចខ្សោយ និងណែនាំមេរៀនដែលត្រូវរំលឹកឡើងវិញដោយស្វ័យប្រវត្តិ។',
              'Assess Java competence through comprehensive multi-format tests: Multiple Choice, Predict Output, Find the Bug, and Code Completion. Identifies weak topics and recommends targeted revision.'
            )}
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="p-5 flex items-center gap-6 shrink-0">
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('តេស្តបានធ្វើ', 'Assessments Taken')}</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {assessmentAttempts.length}
            </div>
          </div>
          <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('ភាពត្រឹមត្រូវ Quiz', 'Quiz Accuracy')}</div>
            <div className="text-xl sm:text-2xl font-black text-amber-500">{accuracy}%</div>
          </div>
        </Card>
      </div>

      {/* Weak Topics Revision Recommendation Alert Banner */}
      {weakTopics.length > 0 && (
        <Card className="p-5 bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t('ចំណុចដែលត្រូវពង្រឹង (Weak Topics Identified)', 'Targeted Revision Recommended')}</span>
            </div>
            <Badge variant="neutral" size="xs">
              {weakTopics.length} {t('ប្រធានបទ', 'topics')}
            </Badge>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            {t(
              'ផ្អែកលើការតេស្តកន្លងមក ប្រព័ន្ធបានរកឃើញថាអ្នកគួររំលឹកមេរៀនខាងក្រោម ដើម្បីបង្កើនការយល់ដឹងឱ្យកាន់តែច្បាស់៖',
              'Based on your past tests, we recommend brushing up on these specific lessons:'
            )}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {weakTopics.map((wt) => (
              <Link
                key={wt.topic}
                to={`/curriculum/${wt.recommendedLessonSlug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:border-rose-500 shadow-2xs transition-all"
              >
                <span>{wt.recommendedLessonTitleKm}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Primary Category Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('diagnostic')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'diagnostic'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>{t('តេស្តវាស់ស្ទង់សមត្ថភាពពេញលេញ (Diagnostic)', 'Comprehensive Diagnostic')}</span>
        </button>

        <button
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'modules'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>{t('តេស្តបញ្ចប់ Module (Module Exams)', 'Module Final Exams')}</span>
        </button>

        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'topics'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>{t('តេស្តតាមប្រធានបទ (Topic-Based)', 'Topic Assessments')}</span>
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'lessons'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>{t('Quiz តាមមេរៀន (27 Lesson Quizzes)', 'Lesson Quick Quizzes')}</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ស្វែងរកតេស្តតាមចំណងជើង ឬប្រធានបទ...', 'Search assessments by title or topic...')}
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

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterDifficulty(lvl)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all capitalize ${
                filterDifficulty === lvl
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {lvl === 'all' ? t('គ្រប់កម្រិត', 'All Levels') : lvl}
            </button>
          ))}
        </div>
      </Card>

      {/* ------------------------------------------------------------- */}
      {/* Tab Content 1, 2, 3: Assessment Packages Grid                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab !== 'lessons' ? (
        filteredPackages.length === 0 ? (
          <EmptyState
            title={t('រកមិនឃើញតេស្តដែលត្រូវនឹងលក្ខខណ្ឌស្វែងរកឡើយ', 'No assessments match your criteria')}
            description={t('សូមសាកល្បងសម្អាតពាក្យស្វែងរក ឬប្តូរជម្រើសកម្រិតពិបាក។', 'Try clearing your search query.')}
            actionText={t('សម្អាតការស្វែងរក', 'Clear Search')}
            onAction={() => {
              setSearchQuery('');
              setFilterDifficulty('all');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const title = language === 'km' ? pkg.titleKm : pkg.titleEn;
              const desc = language === 'km' ? pkg.descriptionKm : pkg.descriptionEn;

              // Check if user has taken this assessment
              const attempts = assessmentAttempts.filter((a) => a.assessmentId === pkg.id);
              const latestAttempt = attempts[0];

              return (
                <Card key={pkg.id} hover className="flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="brand" size="xs">
                        {pkg.level}
                      </Badge>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{pkg.timeLimitMinutes || 15} {t('នាទី', 'mins')}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      {latestAttempt ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {latestAttempt.percentage}% ({latestAttempt.score}/{latestAttempt.totalQuestions})
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {pkg.questionIds.length} {t('សំណួរចម្រុះ', 'questions')}
                        </span>
                      )}
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => startAssessment(pkg)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {latestAttempt ? t('ធ្វើម្តងទៀត', 'Retake') : t('ចាប់ផ្តើមតេស្ត', 'Start Test')}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )
      ) : (
        /* ------------------------------------------------------------- */
        /* Tab Content 4: Preserved Lesson Quizzes Grid                  */
        /* ------------------------------------------------------------- */
        filteredLessons.length === 0 ? (
          <EmptyState
            title={t('រកមិនឃើញកម្រងសំណួរមេរៀនឡើយ', 'No lesson quizzes found')}
            description={t('សូមសាកល្បងសម្អាតពាក្យស្វែងរក។', 'Try clearing your search query.')}
            actionText={t('សម្អាតការស្វែងរក', 'Clear Search')}
            onAction={() => setSearchQuery('')}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.slice((lessonPage - 1) * 9, lessonPage * 9).map((lesson) => {
                const title = t(lesson.titleKm, lesson.titleEn);
                const scoreRecord = progress.quizScores[lesson.id];
                const hasTaken = Boolean(scoreRecord);

                return (
                  <Card key={lesson.id} hover className="flex flex-col justify-between">
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
                        {hasTaken ? t('បានឆ្លើយចប់រួចរាល់', 'Completed') : t('មិនទាន់បានធ្វើ', 'Not Attempted')}
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

            {Math.ceil(filteredLessons.length / 9) > 1 && (
              <nav
                aria-label={t('ការផ្លាស់ប្តូរទំព័រមេរៀន Quiz', 'Lesson quiz pagination')}
                className="flex items-center justify-center gap-2 pt-2"
              >
                {Array.from({ length: Math.ceil(filteredLessons.length / 9) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setLessonPage(p)}
                    aria-current={lessonPage === p ? 'page' : undefined}
                    aria-label={t(`ទំព័រទី ${p}`, `Page ${p}`)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                      lessonPage === p
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </nav>
            )}
          </div>
        )
      )}
    </div>
  );
};
