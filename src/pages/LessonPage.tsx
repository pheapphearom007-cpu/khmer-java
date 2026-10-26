import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  findLessonBySlug,
  getAdjacentLessons,
  CURRICULUM_MODULES,
} from '../data/curriculum';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { JavaEditor } from '../components/editor/JavaEditor';
import { OutputPanel } from '../components/editor/OutputPanel';
import { QuizComponent } from '../components/quiz/QuizComponent';
import { executionService } from '../services/executionService';
import { ExecutionResult } from '../types';
import { CurriculumSidebar } from '../components/layout/CurriculumSidebar';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
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
  ListTree,
  BookMarked,
  HelpCircle,
  Play,
  Sparkles,
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

  // Desktop sidebar collapse state & mobile drawer state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Track last lesson visited
  useEffect(() => {
    if (slug) {
      setLastLesson(slug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug, setLastLesson]);

  // Code runner state for primary lesson example
  const [editorCode, setEditorCode] = useState(lesson?.examples[0]?.code || '');
  const [stdin, setStdin] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  // Exercise runner state
  const [exerciseCode, setExerciseCode] = useState(lesson?.exercise?.starterCode || '');
  const [exerciseResult, setExerciseResult] = useState<ExecutionResult | null>(null);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);
  const [showExerciseSolution, setShowExerciseSolution] = useState(false);
  const [showExerciseHints, setShowExerciseHints] = useState(false);

  // Practice Questions state (hints and solution toggles)
  const [revealedPracticeHints, setRevealedPracticeHints] = useState<Record<string, boolean>>({});
  const [revealedPracticeSolutions, setRevealedPracticeSolutions] = useState<Record<string, boolean>>({});

  const togglePracticeHint = (qId: string) => {
    setRevealedPracticeHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const togglePracticeSolution = (qId: string) => {
    setRevealedPracticeSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleLoadCodeToEditor = (code: string) => {
    setEditorCode(code);
    scrollToSection('sec-editor');
  };

  // Reset editor states when lesson changes
  useEffect(() => {
    if (lesson?.examples[0]?.code) {
      setEditorCode(lesson.examples[0].code);
      setResult(null);
      setStdin('');
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
        <Link to="/curriculum">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            {t('ត្រឡប់ទៅកម្មវិធីសិក្សា', 'Back to Curriculum')}
          </Button>
        </Link>
      </div>
    );
  }

  const { prevLesson, nextLesson } = getAdjacentLessons(lesson.slug);
  const currentModule = CURRICULUM_MODULES.find((m) => m.slug === lesson.moduleSlug);
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
        status: 'service_unavailable',
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
        status: 'service_unavailable',
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      });
    } finally {
      setIsExerciseRunning(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Collapsible Curriculum Sidebar */}
      <CurriculumSidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isCollapsedDesktop={sidebarCollapsed}
        onToggleDesktop={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Lesson Content Viewport */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-5xl mx-auto space-y-10">
        {/* Sticky Mobile/Top Action Bar */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200/90 dark:border-slate-800/90 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shrink-0"
              title={t('បើកមាតិកាមេរៀន', 'Open Curriculum Tree')}
            >
              <ListTree className="w-4 h-4 text-rose-500" />
              <span className="font-semibold">{t('មាតិកា', 'Outline')}</span>
            </button>

            {/* Breadcrumb Path */}
            <div className="hidden sm:flex items-center gap-1.5 text-slate-500 dark:text-slate-400 truncate">
              <Link to="/curriculum" className="hover:text-rose-600 transition-colors">
                {t('កម្មវិធីសិក្សា', 'Curriculum')}
              </Link>
              <span>/</span>
              {currentModule && (
                <span className="truncate max-w-[140px] font-medium text-slate-700 dark:text-slate-300">
                  {t(currentModule.titleKm, currentModule.titleEn)}
                </span>
              )}
            </div>
          </div>

          {/* Bookmark & Completion Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant={bookmarked ? 'primary' : 'outline'}
              size="sm"
              onClick={() => toggleBookmark(lesson.slug)}
              leftIcon={<Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />}
            >
              <span className="hidden sm:inline">
                {bookmarked ? t('បានកត់ចំណាំ', 'Bookmarked') : t('កត់ចំណាំ', 'Bookmark')}
              </span>
            </Button>

            <Button
              variant={completed ? 'success' : 'outline'}
              size="sm"
              onClick={() => markLessonComplete(lesson.id, !completed)}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              {completed ? t('បានរៀនចប់ ✓', 'Completed ✓') : t('កត់សម្គាល់ថាចប់', 'Mark Complete')}
            </Button>
          </div>
        </div>

        {/* Lesson Title Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="brand" size="sm">
              {lesson.difficulty === 'beginner'
                ? t('កម្រិតដំបូង', 'Beginner')
                : lesson.difficulty === 'intermediate'
                ? t('កម្រិតមធ្យម', 'Intermediate')
                : t('កម្រិតខ្ពស់', 'Advanced')}
            </Badge>

            <Badge variant="neutral" size="sm">
              <Clock className="w-3 h-3 text-slate-400 mr-1" />
              {lesson.estimatedMinutes} {t('នាទី', 'mins')}
            </Badge>

            {lesson.w3schoolsUrl && (
              <a
                href={lesson.w3schoolsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold ml-1"
              >
                <span>W3Schools Reference</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            {title}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(lesson.summaryKm, lesson.summaryEn)}
          </p>
        </div>

        {/* Quick Table of Contents Pills for easy jumping */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">{t('រំលងទៅ:', 'Jump to:')}</span>
          <button
            onClick={() => scrollToSection('sec-objectives')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 whitespace-nowrap transition-colors"
          >
            🎯 {t('គោលបំណង', 'Objectives')}
          </button>
          <button
            onClick={() => scrollToSection('sec-theory')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 whitespace-nowrap transition-colors"
          >
            📖 {t('ទ្រឹស្តី', 'Theory')}
          </button>
          {lesson.vocabulary && lesson.vocabulary.length > 0 && (
            <button
              onClick={() => scrollToSection('sec-vocab')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 whitespace-nowrap transition-colors"
            >
              📚 {t('វាក្យសព្ទ', 'Vocabulary')}
            </button>
          )}
          {lesson.examples.length > 0 && (
            <button
              onClick={() => scrollToSection('sec-editor')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 whitespace-nowrap transition-colors"
            >
              💻 {t('ឧទាហរណ៍កូដ', 'Code Example')}
            </button>
          )}
          {lesson.commonMistakes.length > 0 && (
            <button
              onClick={() => scrollToSection('sec-mistakes')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 whitespace-nowrap transition-colors"
            >
              ⚠️ {t('កំហុសទូទៅ', 'Mistakes')}
            </button>
          )}
          {lesson.exercise && (
            <button
              onClick={() => scrollToSection('sec-exercise')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 whitespace-nowrap transition-colors"
            >
              ✍️ {t('លំហាត់', 'Exercise')}
            </button>
          )}
          {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
            <button
              onClick={() => scrollToSection('sec-practice')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 whitespace-nowrap transition-colors"
            >
              💡 {t('សំណួរអនុវត្ត', 'Practice Questions')}
            </button>
          )}
          {lesson.quizzes.length > 0 && (
            <button
              onClick={() => scrollToSection('sec-quiz')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 whitespace-nowrap transition-colors"
            >
              🏆 {t('តេស្ត Quiz', 'Quiz')}
            </button>
          )}
        </div>

        {/* Section: Learning Objectives */}
        <section id="sec-objectives">
          <Card className="bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/70 dark:border-rose-900/50">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>{t('គោលបំណងនៃមេរៀន (Lesson Objectives)', 'Lesson Objectives')}</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Section: Lesson Theory & Explanation */}
        <section id="sec-theory" className="space-y-4">
          <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
            <div className="whitespace-pre-wrap font-sans">
              {content}
            </div>
          </div>

          {/* Syntax Code Block */}
          {lesson.syntax && (
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-rose-500" />
                <span>{t('ទម្រង់វេយ្យាករណ៍ (Syntax Structure)', 'Syntax Structure')}</span>
              </h4>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
                <code>{lesson.syntax}</code>
              </pre>
            </div>
          )}
        </section>

        {/* Section: English Technical Vocabulary with Khmer Definitions */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <section id="sec-vocab" className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <BookMarked className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t('វាក្យសព្ទបច្ចេកទេស និងនិយមន័យ (Technical Vocabulary)', 'Technical Vocabulary & Definitions')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.vocabulary.map((vocab, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1.5 transition-all hover:border-rose-300 dark:hover:border-rose-800"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                      {vocab.term}
                    </span>
                    <Badge variant="neutral" size="xs">
                      {vocab.khmerTerm}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {t(vocab.definitionKm, vocab.definitionEn)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Live Code Example & Interactive Sandbox */}
        {lesson.examples.length > 0 && (
          <section id="sec-editor" className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  <BookOpen className="w-4 h-4" />
                  <span>{t('ឧទាហរណ៍ជាក់ស្តែង', 'Interactive Code Example')}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                  {lesson.examples[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {t(lesson.examples[0].explanationKm, lesson.examples[0].explanationEn)}
                </p>
              </div>

              <Link
                to={`/playground?lesson=${lesson.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors shrink-0 self-start sm:self-center"
              >
                <span>{t('បើកក្នុង Playground', 'Open in Playground')}</span>
                <ExternalLink className="w-3.5 h-3.5 text-rose-500" />
              </Link>
            </div>

            {/* Java Code Editor & Output Panels */}
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
                expectedOutput={lesson.examples[0].expectedOutput}
              />
            </div>

            {/* Line by line breakdown */}
            {lesson.examples[0].lineByLineExplanation && (
              <Card className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {t('ការពន្យល់កូដមួយជួរៗ (Line-by-Line Breakdown)', 'Line-by-Line Breakdown')}
                </h4>
                <div className="space-y-2">
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
              </Card>
            )}
          </section>
        )}

        {/* Section: Common Mistakes & Pitfalls */}
        {lesson.commonMistakes.length > 0 && (
          <section id="sec-mistakes" className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t('កំហុសដែលឧស្សាហ៍ជួបប្រទះ (Common Mistakes & Pitfalls)', 'Common Mistakes & Pitfalls')}
              </h3>
            </div>

            <div className="space-y-4">
              {lesson.commonMistakes.map((mistake, idx) => (
                <Card key={idx} className="space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {idx + 1}. {t(mistake.titleKm, mistake.titleEn)}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    {/* Bad code */}
                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 text-rose-300 space-y-1">
                      <div className="text-[11px] font-sans font-bold text-rose-400 flex items-center gap-1">
                        <span>❌</span>
                        <span>{t('កូដខុស (Incorrect)', 'Incorrect Code')}</span>
                      </div>
                      <pre className="whitespace-pre-wrap">{mistake.badCode}</pre>
                    </div>

                    {/* Good code */}
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 space-y-1">
                      <div className="text-[11px] font-sans font-bold text-emerald-400 flex items-center gap-1">
                        <span>✓</span>
                        <span>{t('កូដត្រឹមត្រូវ (Correct)', 'Correct Code')}</span>
                      </div>
                      <pre className="whitespace-pre-wrap">{mistake.goodCode}</pre>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t(mistake.explanationKm, mistake.explanationEn)}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Section: Practice Exercise */}
        {lesson.exercise && (
          <section id="sec-exercise" className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <Card className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-rose-500" />
                  <span>{t(lesson.exercise.titleKm, lesson.exercise.titleEn)}</span>
                </h3>
                <Badge variant="brand" size="sm">
                  {t('លំហាត់អនុវត្ត', 'Practice Exercise')}
                </Badge>
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
                  <span>
                    {showExerciseHints
                      ? t('លាក់ការណែនាំ', 'Hide hints')
                      : t('មើលការណែនាំជំនួយ (Hints)', 'Show hints')}
                  </span>
                </button>

                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    if (!showExerciseSolution) {
                      setExerciseCode(lesson.exercise!.solutionCode);
                      setShowExerciseSolution(true);
                    } else {
                      setExerciseCode(lesson.exercise!.starterCode);
                      setShowExerciseSolution(false);
                    }
                  }}
                >
                  {showExerciseSolution ? t('ត្រឡប់ទៅកូដដើម', 'Reset to Starter Code') : t('បង្ហាញចម្លើយគំរូ', 'Show Solution')}
                </Button>
              </div>

              {showExerciseHints && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  {(language === 'km' ? lesson.exercise.hintsKm : lesson.exercise.hintsEn).map((h, i) => (
                    <div key={i}>💡 {h}</div>
                  ))}
                </div>
              )}
            </Card>
          </section>
        )}

        {/* Section: Practice Questions (At least three per lesson) */}
        {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
          <section id="sec-practice" className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <Sparkles className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {t('សំណួរអនុវត្តពង្រឹងសមត្ថភាព (Practice Questions)', 'Hands-on Practice Questions')}
                </h3>
              </div>
              <Badge variant="brand" size="xs">
                {lesson.practiceQuestions.length} {t('សំណួរ', 'Questions')}
              </Badge>
            </div>

            <div className="space-y-4">
              {lesson.practiceQuestions.map((pq, idx) => {
                const isHintOpen = revealedPracticeHints[pq.id];
                const isSolutionOpen = revealedPracticeSolutions[pq.id];

                return (
                  <Card key={pq.id} className="space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {t(pq.questionKm, pq.questionEn)}
                        </h4>
                      </div>

                      <Badge
                        variant={pq.difficulty === 'easy' ? 'success' : pq.difficulty === 'medium' ? 'warning' : 'danger'}
                        size="xs"
                      >
                        {pq.difficulty === 'easy'
                          ? t('ងាយ', 'Easy')
                          : pq.difficulty === 'medium'
                          ? t('មធ្យម', 'Medium')
                          : t('លំបាក', 'Hard')}
                      </Badge>
                    </div>

                    {/* Hints & Solution Toggle Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        {pq.hintsKm.length > 0 && (
                          <button
                            onClick={() => togglePracticeHint(pq.id)}
                            className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>
                              {isHintOpen
                                ? t('លាក់ការណែនាំ', 'Hide hint')
                                : t('ការណែនាំ (Hint)', 'Show hint')}
                            </span>
                          </button>
                        )}

                        {pq.solutionCode && (
                          <button
                            onClick={() => togglePracticeSolution(pq.id)}
                            className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                          >
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>
                              {isSolutionOpen
                                ? t('លាក់ចម្លើយគំរូ', 'Hide solution')
                                : t('បង្ហាញចម្លើយគំរូ (Solution)', 'View solution')}
                            </span>
                          </button>
                        )}
                      </div>

                      {pq.solutionCode && (
                        <button
                          onClick={() => handleLoadCodeToEditor(pq.solutionCode!)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                          title={t('ផ្ទុកកូដចូល Editor ខាងលើដើម្បីដំណើរការ', 'Load into editor to run')}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{t('ដំណើរការក្នុង Sandbox', 'Test in Sandbox')}</span>
                        </button>
                      )}
                    </div>

                    {/* Hint Drawer */}
                    {isHintOpen && (
                      <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                        {(language === 'km' ? pq.hintsKm : pq.hintsEn).map((h, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="shrink-0">💡</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Solution Code Drawer */}
                    {isSolutionOpen && pq.solutionCode && (
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          {t('កូដចម្លើយគំរូ (Reference Solution):', 'Reference Solution Code:')}
                        </div>
                        <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                          <code>{pq.solutionCode}</code>
                        </pre>
                        {pq.expectedOutput && (
                          <div className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                            <span className="font-bold text-slate-700 dark:text-slate-300">Expected Output: </span>
                            <code>{pq.expectedOutput}</code>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Section: Lesson Skill Quiz */}
        {lesson.quizzes.length > 0 && (
          <section id="sec-quiz" className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>{t('តេស្តសមត្ថភាពចុងមេរៀន (Lesson Quiz)', 'Lesson Skill Quiz')}</span>
            </h3>
            <QuizComponent
              lessonId={lesson.id}
              questions={lesson.quizzes}
              onFinish={() => markLessonComplete(lesson.id, true)}
            />
          </section>
        )}

        {/* Bottom Navigation: Previous / Next Lesson */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevLesson ? (
            <button
              onClick={() => navigate(`/curriculum/${prevLesson.slug}`)}
              className="w-full sm:w-auto inline-flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm transition-all text-left group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 group-hover:text-rose-600 transition-transform shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  {t('មេរៀនមុន', 'Previous Lesson')}
                </div>
                <div className="font-bold text-xs sm:text-sm truncate max-w-[220px]">
                  {t(prevLesson.titleKm, prevLesson.titleEn)}
                </div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              onClick={() => navigate(`/curriculum/${nextLesson.slug}`)}
              className="w-full sm:w-auto inline-flex items-center justify-end gap-3 p-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all text-right group"
            >
              <div>
                <div className="text-[10px] text-rose-200 uppercase font-semibold">
                  {t('មេរៀនបន្ទាប់', 'Next Lesson')}
                </div>
                <div className="font-bold text-xs sm:text-sm truncate max-w-[220px]">
                  {t(nextLesson.titleKm, nextLesson.titleEn)}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link to="/projects">
              <Button variant="success" rightIcon={<Check className="w-4 h-4" />}>
                {t('បន្តទៅកាន់គម្រោងអនុវត្ត', 'Proceed to Guided Projects')}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
