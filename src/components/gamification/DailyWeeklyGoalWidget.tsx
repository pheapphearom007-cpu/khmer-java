import React from 'react';
import { Target, CheckCircle2, Calendar, Flame } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const DailyWeeklyGoalWidget: React.FC = () => {
  const { t } = useLanguage();
  const { progress, updateDailyGoalTarget, updateWeeklyGoalTarget } = useProgress();

  const daily = progress.dailyGoal;
  const weekly = progress.weeklyGoal;

  const dailyPercent = Math.min(
    100,
    daily.targetActivities > 0 ? Math.round((daily.completedActivities / daily.targetActivities) * 100) : 0
  );

  const weeklyPercent = Math.min(
    100,
    weekly.targetLessons > 0 ? Math.round((weekly.completedLessons / weekly.targetLessons) * 100) : 0
  );

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
              {t('គោលដៅសិក្សាស្ម័គ្រចិត្ត', 'Optional Learning Goals')}
            </h3>
            <p className="text-[11px] text-slate-500">
              {t('កំណត់ល្បឿនរៀនតាមពេលវេលាផ្ទាល់ខ្លួនរបស់អ្នក', 'Set your own pace without pressure')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Goal Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>{t('គោលដៅថ្ងៃនេះ (Daily)', 'Daily Goal')}</span>
            </span>

            {daily.isCompleted ? (
              <Badge variant="success" size="xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                <span>{t('សម្រេចបាន!', 'Completed!')}</span>
              </Badge>
            ) : (
              <span className="text-[11px] font-bold text-slate-500">
                {daily.completedActivities} / {daily.targetActivities} {t('សកម្មភាព', 'activities')}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                daily.isCompleted ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${dailyPercent}%` }}
            />
          </div>

          {/* Target Selector */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>{t('កម្រិតក្នុងមួយថ្ងៃ:', 'Target / day:')}</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => updateDailyGoalTarget(val)}
                  className={`w-6 h-6 rounded-lg font-bold text-xs transition-all ${
                    daily.targetActivities === val
                      ? 'bg-rose-600 text-white'
                      : 'bg-white dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Goal Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('គោលដៅប្រចាំសប្តាហ៍ (Weekly)', 'Weekly Goal')}</span>
            </span>

            {weekly.isCompleted ? (
              <Badge variant="success" size="xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                <span>{t('សម្រេចបាន!', 'Completed!')}</span>
              </Badge>
            ) : (
              <span className="text-[11px] font-bold text-slate-500">
                {weekly.completedLessons} / {weekly.targetLessons} {t('មេរៀន', 'lessons')}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                weekly.isCompleted ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${weeklyPercent}%` }}
            />
          </div>

          {/* Target Selector */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>{t('មេរៀនក្នុងមួយសប្តាហ៍:', 'Lessons / week:')}</span>
            <div className="flex items-center gap-1">
              {[2, 3, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => updateWeeklyGoalTarget(val)}
                  className={`w-6 h-6 rounded-lg font-bold text-xs transition-all ${
                    weekly.targetLessons === val
                      ? 'bg-amber-500 text-white'
                      : 'bg-white dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
