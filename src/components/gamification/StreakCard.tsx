import React from 'react';
import { Flame, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const StreakCard: React.FC = () => {
  const { t } = useLanguage();
  const { progress } = useProgress();

  const streak = progress.streak || {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    activityDates: [],
  };

  // Generate last 14 days dates
  const last14Days: { dateStr: string; dayLabel: string; isActive: boolean }[] = [];
  const today = new Date();
  const activeDateSet = new Set(streak.activityDates || []);

  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    last14Days.push({
      dateStr,
      dayLabel,
      isActive: activeDateSet.has(dateStr),
    });
  }

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
              {t('ការតស៊ូប្រចាំថ្ងៃ (Learning Streak)', 'Learning Streak')}
            </h3>
            <p className="text-[11px] text-slate-500">
              {t('រៀនបន្តិចម្តងៗជារៀងរាល់ថ្ងៃ ដើម្បីពង្រឹងការចងចាំ', 'Consistent daily practice builds mastery')}
            </p>
          </div>
        </div>

        <Badge variant="brand" size="xs">
          <Award className="w-3 h-3 mr-1" />
          <span>{t('កំណត់ត្រាខ្ពស់បំផុត:', 'Best:')} {streak.longestStreak} {t('ថ្ងៃ', 'days')}</span>
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Streak Counter */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-amber-500">
            {streak.currentStreak}
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t('ថ្ងៃជាប់ៗគ្នា', 'Days Streak')}
          </span>
        </div>

        {/* 14-Day Activity Heatmap Dots */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {last14Days.map((item) => (
            <div key={item.dateStr} className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-slate-400 font-medium">
                {item.dayLabel}
              </span>
              <div
                title={`${item.dateStr}: ${item.isActive ? t('បានរៀន', 'Active') : t('សម្រាក', 'Rest')}`}
                className={`w-5 h-5 rounded-md transition-all ${
                  item.isActive
                    ? 'bg-amber-500 text-white shadow-2xs shadow-amber-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Respectful Motivational Note */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-400">
        💡 {t(
          'Khmer Java Academy មិនប្រើសារបង្ខិតបង្ខំ ឬធ្វើឱ្យបាក់ទឹកចិត្តឡើយ។ ការរៀនតាមល្បឿនផ្ទាល់ខ្លួនដោយភាពរីករាយ គឺជាវិធីដ៏ប្រសើរបំផុត។',
          'Learn at your own pace without pressure or manipulative reminders. Genuine consistency comes from curious exploration.'
        )}
      </div>
    </Card>
  );
};
