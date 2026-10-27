import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { getCurriculumStages } from '../../data/recommendations';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const CurriculumMilestones: React.FC = () => {
  const { language, t } = useLanguage();
  const { progress } = useProgress();

  const stages = getCurriculumStages(progress);

  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
              {t('ដំណាក់កាលនៃកម្មវិធីសិក្សាទាំង ៨ (Curriculum Stages & Milestones)', 'Curriculum Stages & Milestones')}
            </h2>
            <p className="text-[11px] text-slate-500">
              {t('តាមដានវឌ្ឍនភាពឆ្លងកាត់ Module នីមួយៗ និងលក្ខខណ្ឌតម្រូវជាមុន (Prerequisites)', 'Module progression and prerequisite stages')}
            </p>
          </div>
        </div>

        <Badge variant="neutral" size="xs">
          8 {t('ដំណាក់កាល', 'Stages')}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const isDone = stage.status === 'completed';
          const isLocked = stage.status === 'locked';

          return (
            <div
              key={stage.moduleSlug}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                isDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                  : isLocked
                  ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-400 opacity-80'
                  : 'bg-white dark:bg-slate-900 border-rose-200/80 dark:border-rose-900/50 shadow-2xs'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500">
                    {t('ដំណាក់កាលទី', 'Stage')} {stage.moduleNumber}
                  </span>

                  {isDone ? (
                    <Badge variant="success" size="xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      <span>{t('បានចប់', 'Done')}</span>
                    </Badge>
                  ) : isLocked ? (
                    <Badge variant="neutral" size="xs">
                      <Lock className="w-3 h-3 mr-1" />
                      <span>{t('ត្រូវបញ្ចប់គ្រឹះមុន', 'Locked')}</span>
                    </Badge>
                  ) : (
                    <Badge variant="brand" size="xs">
                      <span>{stage.percentage}%</span>
                    </Badge>
                  )}
                </div>

                <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2">
                  {language === 'km' ? stage.titleKm : stage.titleEn}
                </h3>

                {/* Prerequisites note if locked */}
                {isLocked && stage.requiredModuleTitleKm && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 leading-tight">
                    🔒 {t('តម្រូវឱ្យបញ្ចប់:', 'Prerequisite:')} {stage.requiredModuleTitleKm}
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{t('មេរៀន:', 'Lessons:')}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {stage.completedLessons} / {stage.totalLessons}
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone ? 'bg-emerald-500' : 'bg-rose-600'
                    }`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>

                <Link
                  to={`/curriculum#mod-${stage.moduleSlug}`}
                  className="block text-center text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline pt-1"
                >
                  {t('ពិនិត្យមេរៀនក្នុង Module', 'View Module Lessons')} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
