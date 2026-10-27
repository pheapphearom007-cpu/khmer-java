import React from 'react';
import {
  BookOpen,
  Sparkles,
  GraduationCap,
  Crown,
  Trophy,
  CheckCircle2,
  HelpCircle,
  FolderGit2,
  Layers,
  Award,
  Flame,
  Zap,
  Shield,
  Star,
  Lock,
} from 'lucide-react';
import { AchievementBadge } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface AchievementBadgeCardProps {
  badge: AchievementBadge;
  isUnlocked: boolean;
  unlockedAt?: string;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Sparkles,
  GraduationCap,
  Crown,
  Trophy,
  CheckCircle2,
  HelpCircle,
  FolderGit2,
  Layers,
  Award,
  Flame,
  Zap,
  Shield,
  Star,
};

export const AchievementBadgeCard: React.FC<AchievementBadgeCardProps> = ({
  badge,
  isUnlocked,
  unlockedAt,
}) => {
  const { language, t } = useLanguage();
  const Icon = iconMap[badge.icon] || Trophy;

  return (
    <Card
      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
        isUnlocked
          ? 'bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-900 dark:to-amber-950/20 border-amber-300 dark:border-amber-900/60 shadow-xs'
          : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-400 opacity-60'
      }`}
    >
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isUnlocked
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-500 shadow-xs shadow-amber-500/20'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}
          >
            {isUnlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
          </div>

          <Badge variant={isUnlocked ? 'warning' : 'neutral'} size="xs">
            +{badge.xpReward} XP
          </Badge>
        </div>

        <div>
          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
            {language === 'km' ? badge.titleKm : badge.titleEn}
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {language === 'km' ? badge.descriptionKm : badge.descriptionEn}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
        {isUnlocked ? (
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>
              {unlockedAt ? new Date(unlockedAt).toLocaleDateString() : t('សម្រេចបាន', 'Unlocked')}
            </span>
          </span>
        ) : (
          <span>{t('មិនទាន់សម្រេចបាន', 'In Progress')}</span>
        )}
      </div>
    </Card>
  );
};
