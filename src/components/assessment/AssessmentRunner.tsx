import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClientAssessmentQuestion,
  QuestionValidationResponse,
  AssessmentResultSummary,
} from '../../types/assessment';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { assessmentService } from '../../services/assessmentService';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Lightbulb,
  RotateCcw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  BookOpen,
  Code2,
  Terminal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface AssessmentRunnerProps {
  packageId: string;
  packageTitle: string;
  questions: ClientAssessmentQuestion[];
  timeLimitMinutes?: number;
  onExit?: () => void;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
  packageId,
  packageTitle,
  questions,
  timeLimitMinutes: _timeLimitMinutes,
  onExit,
}) => {
  const { language, t } = useLanguage();
  const { saveAssessmentResult } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, { answer: string; choiceId?: string }>>({});
  const [questionResults, setQuestionResults] = useState<Record<string, QuestionValidationResponse>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalSummary, setFinalSummary] = useState<AssessmentResultSummary | null>(null);

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const currentQ = questions[currentIndex];
  const qId = currentQ?.id;
  const currentAnswer = userAnswers[qId] || { answer: '' };
  const currentResult = questionResults[qId];
  const isAnswered = Boolean(currentResult);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectChoice = (choiceId: string, choiceText: string) => {
    if (isAnswered) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: { answer: choiceText, choiceId },
    }));
  };

  const handleTextChange = (text: string) => {
    if (isAnswered) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: { answer: text },
    }));
  };

  // Submit single question answer for immediate validation & feedback
  const handleVerifyCurrentAnswer = async () => {
    if (!currentAnswer.answer && !currentAnswer.choiceId) return;
    setIsValidating(true);

    try {
      const result = await assessmentService.validateAnswer({
        questionId: qId,
        userAnswer: currentAnswer.answer,
        userChoiceId: currentAnswer.choiceId,
      });

      setQuestionResults((prev) => ({
        ...prev,
        [qId]: result,
      }));
    } finally {
      setIsValidating(false);
    }
  };

  // Finalize full assessment - only counted as completed when user explicitly submits!
  const handleFinalizeAssessment = async () => {
    const formattedAnswers = questions.map((q) => ({
      questionId: q.id,
      userAnswer: userAnswers[q.id]?.answer || '',
      userChoiceId: userAnswers[q.id]?.choiceId,
    }));

    const summary = await assessmentService.submitAssessment({
      assessmentId: packageId,
      assessmentTitle: packageTitle,
      timeSpentSeconds,
      answers: formattedAnswers,
    });

    setFinalSummary(summary);
    setIsCompleted(true);
    await saveAssessmentResult(summary);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setQuestionResults({});
    setTimeSpentSeconds(0);
    setIsCompleted(false);
    setFinalSummary(null);
    setShowHint(false);
  };

  // -------------------------------------------------------------
  // Completed Results View
  // -------------------------------------------------------------
  if (isCompleted && finalSummary) {
    const isPassing = finalSummary.percentage >= 70;

    return (
      <div className="max-w-4xl mx-auto space-y-8 py-6">
        {/* Hero Card */}
        <Card className="p-8 text-center space-y-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-slate-200 dark:border-slate-800">
          <div
            className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg ${
              isPassing
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shadow-emerald-500/20'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 shadow-amber-500/20'
            }`}
          >
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isPassing
                ? t('អបអរសាទរ! អ្នកបានឆ្លងកាត់ការតេស្តនេះ', 'Congratulations! You Passed!')
                : t('បញ្ចប់ការតេស្ត! សូមព្យាយាមពង្រឹងបន្ថែម', 'Assessment Completed!')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t(
                `អ្នកបានបញ្ចប់កម្រងតេស្ត "${packageTitle}" ដោយចំណាយពេលសរុប ${formatTime(timeSpentSeconds)} នាទី។`,
                `You completed "${packageTitle}" in ${formatTime(timeSpentSeconds)}.`
              )}
            </p>
          </div>

          {/* Stats Badges */}
          <div className="inline-grid grid-cols-3 gap-4 sm:gap-8 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
                {finalSummary.score} / {finalSummary.totalQuestions}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{t('ពិន្ទុសរុប', 'Score')}</div>
            </div>

            <div className="border-x border-slate-100 dark:border-slate-700 px-4">
              <div
                className={`text-2xl sm:text-3xl font-black ${
                  isPassing ? 'text-emerald-500' : 'text-amber-500'
                }`}
              >
                {finalSummary.percentage}%
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{t('ភាពត្រឹមត្រូវ', 'Accuracy')}</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200">
                {formatTime(timeSpentSeconds)}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{t('រយៈពេល', 'Time Spent')}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button variant="primary" size="md" onClick={handleRestart} leftIcon={<RotateCcw className="w-4 h-4" />}>
              {t('ធ្វើតេស្តម្តងទៀត', 'Retake Assessment')}
            </Button>
            {onExit && (
              <Button variant="outline" size="md" onClick={onExit}>
                {t('ត្រឡប់ទៅកាន់ទំព័រតេស្ត', 'Back to Assessments')}
              </Button>
            )}
          </div>
        </Card>

        {/* Weak Topics & Targeted Revision Recommendations */}
        {finalSummary.weakTopics.length > 0 && (
          <Card className="p-6 space-y-4 border-amber-300 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-base">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{t('ចំណុចដែលត្រូវពង្រឹង និងមេរៀនដែលត្រូវរំលឹក (Targeted Revision)', 'Targeted Revision Recommendations')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t(
                'ផ្អែកលើលទ្ធផលនៃការឆ្លើយ ប្រព័ន្ធបានរកឃើញប្រធានបទមួយចំនួនដែលមានភាពត្រឹមត្រូវក្រោម ៧០%។ សូមចុចលើមេរៀនខាងក្រោមដើម្បីរំលឹកចំណេះដឹងឡើងវិញ៖',
                'Based on your submission, the engine identified topics with under 70% accuracy. We strongly recommend reviewing these targeted lessons:'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {finalSummary.weakTopics.map((wt) => (
                <div
                  key={wt.topic}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-2xs flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {wt.topicTitleKm}
                      </span>
                      <Badge variant="danger" size="xs">
                        {wt.percentage}%
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500">
                      {t('ណែនាំឱ្យរៀន:', 'Recommended Lesson:')}
                    </div>
                    <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5 line-clamp-1">
                      {wt.recommendedLessonTitleKm}
                    </div>
                  </div>

                  <Link to={`/curriculum/${wt.recommendedLessonSlug}`}>
                    <Button variant="outline" size="xs" fullWidth rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      {t('ចូលរំលឹកមេរៀននេះ', 'Review Lesson')}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Topic Mastery Breakdown */}
        <Card className="p-6 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            {t('ការវិភាគសមត្ថភាពតាមប្រធានបទ (Topic Breakdown)', 'Topic Performance Breakdown')}
          </h3>

          <div className="space-y-3">
            {finalSummary.topicPerformance.map((tp) => (
              <div key={tp.topic} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {language === 'km' ? tp.topicTitleKm : tp.topicTitleEn}
                  </span>
                  <span className="font-bold text-slate-500">
                    {tp.correct} / {tp.total} ({tp.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      tp.percentage >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${tp.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Active Assessment Question View
  // -------------------------------------------------------------
  const title = language === 'km' ? currentQ.titleKm : currentQ.titleEn;
  const description = language === 'km' ? currentQ.descriptionKm : currentQ.descriptionEn;
  const learningObjective = language === 'km' ? currentQ.learningObjectiveKm : currentQ.learningObjectiveEn;
  const hints = language === 'km' ? currentQ.hintsKm : currentQ.hintsEn;

  const answeredCount = Object.keys(questionResults).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Top Header Card */}
      <Card className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="xs">
              {currentQ.topicTitleKm}
            </Badge>
            <Badge variant="neutral" size="xs">
              {currentQ.difficulty}
            </Badge>
            <span className="text-xs text-slate-500">
              {currentQ.type.replace('-', ' ')}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            {packageTitle}
          </h2>
        </div>

        {/* Live Timer & Answered Progress */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            <span>{formatTime(timeSpentSeconds)}</span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {t('ឆ្លើយបាន:', 'Answered:')}{' '}
            <span className="font-bold text-slate-900 dark:text-white">
              {answeredCount} / {questions.length}
            </span>
          </div>
        </div>
      </Card>

      {/* Progress Bar & Question Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            {t('សំណួរទី', 'Question')} {currentIndex + 1} / {questions.length}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-rose-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
          {questions.map((q, idx) => {
            const hasResult = questionResults[q.id];
            const isCurr = idx === currentIndex;

            let pillClass = 'w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center justify-center ';
            if (isCurr) {
              pillClass += 'ring-2 ring-rose-500 font-black ';
            }
            if (hasResult) {
              pillClass += hasResult.isCorrect
                ? 'bg-emerald-500 text-white'
                : 'bg-rose-500 text-white';
            } else {
              pillClass += 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowHint(false);
                }}
                className={pillClass}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6 sm:p-8 space-y-6">
        {/* Learning Objective Tag */}
        <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">{t('គោលបំណងសិក្សា៖ ', 'Learning Objective: ')}</span>
            <span>{learningObjective}</span>
          </div>
        </div>

        {/* Question Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Code Snippet if applicable */}
        {currentQ.codeSnippet && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-rose-500" />
              <span>{t('កូដ Java សម្រាប់វិភាគ៖', 'Java Code Snippet:')}</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
              <code>{currentQ.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Blank Snippet for Code Completion */}
        {currentQ.blankSnippet && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm border border-slate-800">
            <code>{currentQ.blankSnippet}</code>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* Interactive Input Area based on Question Type                 */}
        {/* ------------------------------------------------------------- */}

        {/* Multiple Choice & Find the Bug Options */}
        {(currentQ.type === 'multiple-choice' || currentQ.type === 'find-the-bug') && currentQ.options && (
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer.choiceId === opt.id;
              let optClass =
                'w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ';

              if (!isAnswered) {
                optClass += isSelected
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200';
              } else {
                const isCorrect = currentResult.expectedAnswer === opt.id;
                if (isCorrect) {
                  optClass += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  optClass += 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                } else {
                  optClass += 'border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectChoice(opt.id, language === 'km' ? opt.textKm : opt.textEn)}
                  className={optClass}
                >
                  <span className="pr-4">{language === 'km' ? opt.textKm : opt.textEn}</span>
                  {isAnswered && (
                    <span>
                      {currentResult.expectedAnswer === opt.id ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Predict Output Input */}
        {currentQ.type === 'predict-output' && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-rose-500" />
              <span>{t('បញ្ចូលលទ្ធផល Output ដែលនឹងបង្ហាញលើ Console៖', 'Enter Predicted Console Output:')}</span>
            </label>
            <textarea
              disabled={isAnswered}
              rows={3}
              value={currentAnswer.answer}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={t('ឧ. 3\nឬ Woof Woof', 'e.g. 3 or Woof Woof')}
              className="w-full p-3 font-mono text-xs sm:text-sm rounded-xl bg-slate-900 text-emerald-400 border border-slate-700 focus:outline-none focus:border-rose-500 disabled:opacity-80"
            />
          </div>
        )}

        {/* Code Completion & Short Coding Input */}
        {(currentQ.type === 'code-completion' || currentQ.type === 'short-coding') && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {currentQ.type === 'code-completion'
                ? t('បញ្ចូលពាក្យគន្លឹះដែលបាត់ក្នុងចន្លោះ (Fill in the blank):', 'Enter Missing Keyword:')
                : t('សរសេរកូដ Java សេចក្តីថ្លែងការណ៍ខ្លី៖', 'Write Java Statement:')}
            </label>
            <input
              type="text"
              disabled={isAnswered}
              value={currentAnswer.answer}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={currentQ.type === 'code-completion' ? 'new / void / return / this' : 'int age = 20;'}
              className="w-full p-3 font-mono text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 disabled:opacity-80"
            />
          </div>
        )}

        {/* Submit Single Question Button (if not yet answered) */}
        {!isAnswered && (
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              disabled={isValidating || (!currentAnswer.answer && !currentAnswer.choiceId)}
              isLoading={isValidating}
              onClick={handleVerifyCurrentAnswer}
            >
              {t('ផ្ទៀងផ្ទាត់ចម្លើយ (Check Answer)', 'Check Answer')}
            </Button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* Immediate Feedback Card (Only revealed after submission!)      */}
        {/* ------------------------------------------------------------- */}
        {isAnswered && currentResult && (
          <div
            className={`p-5 rounded-2xl border space-y-3 transition-all ${
              currentResult.isCorrect
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm sm:text-base">
              {currentResult.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('ត្រឹមត្រូវណាស់! ធ្វើបានល្អណាស់។', 'Correct! Well done.')}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span>{t('មិនទាន់ត្រឹមត្រូវឡើយ។', 'Not quite right.')}</span>
                </>
              )}
            </div>

            {/* Explanation in Natural Khmer */}
            <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              {language === 'km' ? currentResult.explanationKm : currentResult.explanationEn}
            </div>

            {/* If wrong, show expected answer */}
            {!currentResult.isCorrect && (
              <div className="pt-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                <span className="text-rose-600 dark:text-rose-400 font-sans font-bold">
                  {t('ចម្លើយរំពឹងទុក៖ ', 'Expected Answer: ')}
                </span>
                <span>{currentResult.expectedAnswer}</span>
              </div>
            )}
          </div>
        )}

        {/* Optional Hints Drawer */}
        {hints && hints.length > 0 && (
          <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <Lightbulb className="w-4 h-4" />
              <span>
                {showHint ? t('លាក់តម្រុយជំនួយ', 'Hide Hints') : t('បង្ហាញតម្រុយជំនួយ (Hint)', 'Show Hint')}
              </span>
              {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showHint && (
              <div className="mt-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
                {hints.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="shrink-0">💡</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="md"
          disabled={currentIndex === 0}
          onClick={() => {
            setCurrentIndex((prev) => Math.max(0, prev - 1));
            setShowHint(false);
          }}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          {t('សំណួរមុន', 'Previous')}
        </Button>

        {currentIndex < questions.length - 1 ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setCurrentIndex((prev) => prev + 1);
              setShowHint(false);
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {t('សំណួរបន្ទាប់', 'Next Question')}
          </Button>
        ) : (
          <Button
            variant="success"
            size="md"
            onClick={handleFinalizeAssessment}
            leftIcon={<Trophy className="w-4 h-4" />}
          >
            {t('បញ្ចប់ការធ្វើតេស្ត (Submit Assessment)', 'Complete Assessment')}
          </Button>
        )}
      </div>
    </div>
  );
};
