import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle2, XCircle, HelpCircle, Lightbulb, RotateCcw, Trophy, ArrowRight } from 'lucide-react';

interface QuizComponentProps {
  lessonId: string;
  questions: QuizQuestion[];
  onFinish?: (score: number, total: number) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  lessonId,
  questions,
  onFinish,
}) => {
  const { language, t } = useLanguage();
  const { saveQuizScore, getQuizScore } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const previousRecord = getQuizScore(lessonId);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        {t('មិនទាន់មានលំហាត់តេស្តសម្រាប់មេរៀននេះនៅឡើយទេ។', 'No quizzes available for this lesson yet.')}
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const questionText = language === 'km' ? currentQ.questionKm : currentQ.questionEn;
  const options = language === 'km' ? currentQ.optionsKm : currentQ.optionsEn;
  const explanation = language === 'km' ? currentQ.explanationKm : currentQ.explanationEn;
  const hint = language === 'km' ? currentQ.hintKm : currentQ.hintEn;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const updatedAnswers = [...userAnswers, selectedOption];
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      // Finished all questions
      let correctCount = 0;
      userAnswers.forEach((ans, idx) => {
        if (ans === questions[idx].correctOptionIndex) {
          correctCount++;
        }
      });
      // Include current question answer
      if (selectedOption === currentQ.correctOptionIndex) {
        correctCount++;
      }

      saveQuizScore(lessonId, correctCount, questions.length);
      setIsCompleted(true);
      if (onFinish) {
        onFinish(correctCount, questions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setShowHint(false);
    setIsCompleted(false);
  };

  // Completed State View
  if (isCompleted) {
    let finalScore = 0;
    userAnswers.forEach((ans, idx) => {
      if (ans === questions[idx].correctOptionIndex) finalScore++;
    });

    const percentage = Math.round((finalScore / questions.length) * 100);
    const isPassing = percentage >= 70;

    return (
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {t('លទ្ធផលនៃការធ្វើតេស្តសាកល្បង', 'Quiz Completed!')}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {isPassing
              ? t('អបអរសាទរ! អ្នកបានឆ្លងកាត់តេស្តនេះដោយជោគជ័យ។', 'Great job! You passed the quiz successfully.')
              : t('សូមព្យាយាមម្តងទៀតដើម្បីទទួលបានពិន្ទុកាន់តែប្រសើរ!', 'Keep practicing to master this concept!')}
          </p>
        </div>

        <div className="inline-flex items-center justify-center gap-6 px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div>
            <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
              {finalScore} / {questions.length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{t('ពិន្ទុរបស់អ្នក', 'Your Score')}</div>
          </div>
          <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
          <div>
            <div className="text-3xl font-extrabold text-amber-500">{percentage}%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{t('ភាគរយ', 'Accuracy')}</div>
          </div>
        </div>

        <div>
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('ធ្វើតេស្តម្តងទៀត', 'Retake Quiz')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Top status */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-rose-500" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {t('សំណួរទី', 'Question')} {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {previousRecord && (
          <span className="text-slate-500 dark:text-slate-400">
            {t('កំណត់ត្រាចាស់:', 'Previous Best:')} {previousRecord.score}/{previousRecord.total}
          </span>
        )}
      </div>

      {/* Question Text */}
      <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
        {questionText}
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctOptionIndex;

          let btnClass =
            'w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ';

          if (!isAnswerSubmitted) {
            btnClass += isSelected
              ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200';
          } else {
            if (isCorrect) {
              btnClass += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold';
            } else if (isSelected && !isCorrect) {
              btnClass += 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
            } else {
              btnClass += 'border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswerSubmitted}
              className={btnClass}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
              {isAnswerSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Hint toggle */}
      {hint && !isAnswerSubmitted && (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? t('លាក់ការណែនាំ', 'Hide hint') : t('មើលការណែនាំ (Hint)', 'Show hint')}</span>
          </button>
          {showHint && (
            <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg text-xs text-amber-800 dark:text-amber-200">
              💡 {hint}
            </div>
          )}
        </div>
      )}

      {/* Explanation after submit */}
      {isAnswerSubmitted && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            {selectedOption === currentQ.correctOptionIndex ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {t('ចម្លើយត្រឹមត្រូវ!', 'Correct!')}
              </span>
            ) : (
              <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <XCircle className="w-4 h-4" /> {t('មិនទាន់ត្រឹមត្រូវទេ', 'Incorrect')}
              </span>
            )}
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{explanation}</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-end pt-2">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
          >
            {t('ផ្ទៀងផ្ទាត់ចម្លើយ', 'Submit Answer')}
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
          >
            <span>
              {currentIndex < questions.length - 1 ? t('សំណួរបន្ទាប់', 'Next Question') : t('បញ្ចប់ការធ្វើតេស្ត', 'Finish Quiz')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
