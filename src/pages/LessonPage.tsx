import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  findLessonBySlug,
  getAdjacentLessons,
} from '../data/curriculum';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { JavaEditor } from '../components/editor/JavaEditor';
import { OutputPanel } from '../components/editor/OutputPanel';
import { QuizComponent } from '../components/quiz/QuizComponent';
import { executionService } from '../services/executionService';
import { ExecutionResult } from '../types';
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  AlertTriangle,
  Lightbulb,
  Check,
  Trophy,
} from 'lucide-react';

export const LessonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const {
    isLessonCompleted,
    markLessonComplete,
    isBookmarked,
    toggleBookmark,
    setLastLesson,
  } = useProgress();

  const lesson = findLessonBySlug(slug || '');

  // Track last lesson visited
  React.useEffect(() => {
    if (slug) {
      setLastLesson(slug);
    }
  }, [slug, setLastLesson]);

  // Code runner state for the primary lesson example
  const [editorCode, setEditorCode] = useState(lesson?.examples[0]?.code || '');
  const [stdin, setStdin] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  // Exercise state
  const [exerciseCode, setExerciseCode] = useState(lesson?.exercise?.starterCode || '');
  const [exerciseResult, setExerciseResult] = useState<ExecutionResult | null>(null);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);
  const [showExerciseSolution, setShowExerciseSolution] = useState(false);
  const [showExerciseHints, setShowExerciseHints] = useState(false);

  // Update editor state when lesson changes
  React.useEffect(() => {
    if (lesson?.examples[0]?.code) {
      setEditorCode(lesson.examples[0].code);
      setResult(null);
    }
    if (lesson?.exercise?.starterCode) {
      setExerciseCode(lesson.exercise.starterCode);
      setExerciseResult(null);
      setShowExerciseSolution(false);
      setShowExerciseHints(false);
    }
  }, [slug, lesson]);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {t('រកមិនឃើញមេរៀននេះឡើយ', 'Lesson Not Found')}
        </h2>
        <p className="text-slate-500 text-sm">
          {t('សូមត្រួតពិនិត្យតំណភ្ជាប់ ឬត្រឡប់ទៅកាន់ទំព័រកម្មវិធីសិក្សា។', 'Please check the URL or return to the curriculum.')}
        </p>
        <Link
          to="/curriculum"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('ត្រឡប់ទៅកម្មវិធីសិក្សា', 'Back to Curriculum')}</span>
        </Link>
      </div>
    );
  }

  const { prevLesson, nextLesson } = getAdjacentLessons(lesson.slug);
  const completed = isLessonCompleted(lesson.id);
  const bookmarked = isBookmarked(lesson.slug);

  const title = t(lesson.titleKm, lesson.titleEn);
  const objectives = language === 'km' ? lesson.objectivesKm : lesson.objectivesEn;
  const content = language === 'km' ? lesson.contentKm : lesson.contentEn;

  const handleRunExample = async (codeToRun: string) => {
    setIsRunning(true);
    try {
      const res = await executionService.executeJava({
        code: codeToRun,
        stdin,
      });
      setResult(res);
    } catch (err: any) {
      setResult({
        stdout: '',
        stderr: err?.message || 'Execution error',
        exitCode: 1,
        isError: true,
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunExercise = async (codeToRun: string) => {
    setIsExerciseRunning(true);
    try {
      const res = await executionService.executeJava({
        code: codeToRun,
      });
      setExerciseResult(res);
    } catch (err: any) {
      setExerciseResult({
        stdout: '',
        stderr: err?.message || 'Execution error',
        exitCode: 1,
        isError: true,
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      });
    } finally {
      setIsExerciseRunning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/curriculum"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('ត្រឡប់ទៅកម្មវិធីសិក្សា', 'Curriculum Overview')}</span>
        </Link>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(lesson.slug)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              bookmarked
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            title={t('កត់ចំណាំមេរៀននេះ', 'Bookmark this lesson')}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current text-amber-500' : ''}`} />
            <span>{bookmarked ? t('បានកត់ចំណាំ', 'Bookmarked') : t('កត់ចំណាំ', 'Bookmark')}</span>
          </button>

          {/* Mark Complete Button */}
          <button
            onClick={() => markLessonComplete(lesson.id, !completed)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              completed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{completed ? t('បានរៀនចប់ ✓', 'Completed ✓') : t('កត់សម្គាល់ថាចប់', 'Mark Complete')}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header Title */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300">
            {lesson.difficulty}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {lesson.estimatedMinutes} {t('នាទី', 'mins')}
          </span>
          {lesson.w3schoolsUrl && (
            <a
              href={lesson.w3schoolsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline ml-2"
            >
              <span>W3Schools Reference</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {title}
        </h1>
      </div>

      {/* Objectives Box */}
      <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Trophy className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          {t('គោលបំណងនៃមេរៀន (Lesson Objectives)', 'Lesson Objectives')}
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lesson Content Body (Original Khmer Explanations) */}
      <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 space-y-4 text-sm sm:text-base leading-relaxed">
        <div className="whitespace-pre-wrap font-sans">
          {content}
        </div>
      </div>

      {/* Syntax Box if available */}
      {lesson.syntax && (
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Code2 className="w-4 h-4 text-rose-500" />
            {t('ទម្រង់វេយ្យាករណ៍ (Syntax)', 'Java Syntax')}
          </h3>
          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
            <code>{lesson.syntax}</code>
          </pre>
        </div>
      )}

      {/* Code Example & Interactive Editor */}
      {lesson.examples.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-600" />
              <span>{lesson.examples[0].title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t(lesson.examples[0].explanationKm, lesson.examples[0].explanationEn)}
            </p>
          </div>

          {/* Interactive Java Sandbox */}
          <div className="space-y-4">
            <JavaEditor
              initialCode={lesson.examples[0].code}
              value={editorCode}
              onChange={setEditorCode}
              onRun={handleRunExample}
              isRunning={isRunning}
              height="380px"
            />

            <OutputPanel
              result={result}
              isRunning={isRunning}
              stdin={stdin}
              onStdinChange={setStdin}
              onClear={() => setResult(null)}
            />
          </div>

          {/* Line by line explanation */}
          {lesson.examples[0].lineByLineExplanation && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400">
                {t('ការពន្យល់កូដមួយជួរៗ (Line-by-Line Breakdown)', 'Line-by-Line Code Breakdown')}
              </h4>
              <div className="space-y-2.5">
                {lesson.examples[0].lineByLineExplanation.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4"
                  >
                    <code className="font-mono font-bold text-rose-600 dark:text-rose-400 shrink-0">
                      {item.line}
                    </code>
                    <span className="text-slate-600 dark:text-slate-300">
                      {t(item.explanationKm, item.explanationEn)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Common Mistakes Section */}
      {lesson.commonMistakes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {t('កំហុសដែលឧស្សាហ៍ជួបប្រទះ (Common Mistakes & Pitfalls)', 'Common Mistakes to Avoid')}
            </h3>
          </div>

          <div className="space-y-4">
            {lesson.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3"
              >
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {idx + 1}. {t(mistake.titleKm, mistake.titleEn)}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  {/* Bad code */}
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 text-rose-300 space-y-1">
                    <div className="text-[11px] font-sans font-bold text-rose-400">❌ {t('កូដខុស (Incorrect)', 'Incorrect Code')}</div>
                    <pre className="whitespace-pre-wrap">{mistake.badCode}</pre>
                  </div>

                  {/* Good code */}
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 space-y-1">
                    <div className="text-[11px] font-sans font-bold text-emerald-400">✓ {t('កូដត្រូវ (Correct)', 'Correct Code')}</div>
                    <pre className="whitespace-pre-wrap">{mistake.goodCode}</pre>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t(mistake.explanationKm, mistake.explanationEn)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Exercise */}
      {lesson.exercise && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Code2 className="w-5 h-5 text-rose-500" />
                <span>{t(lesson.exercise.titleKm, lesson.exercise.titleEn)}</span>
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 font-semibold">
                {t('លំហាត់អនុវត្ត', 'Practice Exercise')}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t(lesson.exercise.descriptionKm, lesson.exercise.descriptionEn)}
            </p>

            {/* Exercise Editor */}
            <JavaEditor
              initialCode={lesson.exercise.starterCode}
              value={exerciseCode}
              onChange={setExerciseCode}
              onRun={handleRunExercise}
              isRunning={isExerciseRunning}
              height="300px"
            />

            <OutputPanel
              result={exerciseResult}
              isRunning={isExerciseRunning}
              stdin=""
              onStdinChange={() => {}}
              onClear={() => setExerciseResult(null)}
            />

            {/* Hints & Solution buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setShowExerciseHints(!showExerciseHints)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showExerciseHints ? t('លាក់ការណែនាំ', 'Hide hints') : t('មើលការណែនាំជំនួយ (Hints)', 'Show hints')}</span>
              </button>

              <button
                onClick={() => {
                  if (!showExerciseSolution) {
                    setExerciseCode(lesson.exercise!.solutionCode);
                    setShowExerciseSolution(true);
                  } else {
                    setExerciseCode(lesson.exercise!.starterCode);
                    setShowExerciseSolution(false);
                  }
                }}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline font-medium"
              >
                {showExerciseSolution ? t('ត្រឡប់ទៅកូដដើម', 'Reset to Starter Code') : t('បង្ហាញចម្លើយគំរូ', 'Show Solution')}
              </button>
            </div>

            {showExerciseHints && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                {(language === 'km' ? lesson.exercise.hintsKm : lesson.exercise.hintsEn).map((h, i) => (
                  <div key={i}>💡 {h}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quizzes Component */}
      {lesson.quizzes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>{t('តេស្តសមត្ថភាពចុងមេរៀន (Lesson Quiz)', 'Lesson Skill Quiz')}</span>
          </h3>
          <QuizComponent
            lessonId={lesson.id}
            questions={lesson.quizzes}
            onFinish={() => markLessonComplete(lesson.id, true)}
          />
        </div>
      )}

      {/* Bottom Navigation: Previous / Next Lesson */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevLesson ? (
          <button
            onClick={() => navigate(`/curriculum/${prevLesson.slug}`)}
            className="w-full sm:w-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-800 shadow-sm transition-colors text-left"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">{t('មេរៀនមុន', 'Previous')}</div>
              <div className="font-bold truncate max-w-[200px]">{t(prevLesson.titleKm, prevLesson.titleEn)}</div>
            </div>
          </button>
        ) : (
          <div></div>
        )}

        {nextLesson ? (
          <button
            onClick={() => navigate(`/curriculum/${nextLesson.slug}`)}
            className="w-full sm:w-auto inline-flex items-center justify-end gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md transition-colors text-right"
          >
            <div>
              <div className="text-[10px] text-rose-200 uppercase">{t('មេរៀនបន្ទាប់', 'Next Lesson')}</div>
              <div className="font-bold truncate max-w-[200px]">{t(nextLesson.titleKm, nextLesson.titleEn)}</div>
            </div>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        ) : (
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-colors"
          >
            <span>{t('បន្តទៅកាន់គម្រោងអនុវត្ត', 'Proceed to Projects')}</span>
            <Check className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
