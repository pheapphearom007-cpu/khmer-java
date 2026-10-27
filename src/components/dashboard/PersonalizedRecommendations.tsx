import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, AlertTriangle, FolderGit2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { generatePersonalizedRecommendations } from '../../data/recommendations';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const PersonalizedRecommendations: React.FC = () => {
  const { language, t } = useLanguage();
  const { progress } = useProgress();

  const recommendations = generatePersonalizedRecommendations(progress, language);

  if (recommendations.length === 0) return null;

  return (
    <Card className="p-6 space-y-4 border-rose-200/80 dark:border-rose-900/60 bg-gradient-to-br from-white via-rose-50/20 to-amber-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-0.5">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
            {t('អនុសាសន៍រៀនសូត្រផ្ទាល់ខ្លួន (Personalized Recommendations)', 'Personalized Recommendations')}
          </h2>
          <p className="text-[11px] text-slate-500">
            {t('ណែនាំដោយផ្អែកលើវឌ្ឍនភាព និងលទ្ធផលតេស្តពិតប្រាកដរបស់អ្នក', 'Transparently suggested based on your progress and quiz scores')}
          </p>
        </div>

        <Badge variant="brand" size="xs">
          {recommendations.length} {t('ការណែនាំ', 'items')}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          let Icon = BookOpen;
          let badgeVariant: 'brand' | 'warning' | 'success' | 'neutral' = 'brand';

          if (rec.type === 'revision') {
            Icon = AlertTriangle;
            badgeVariant = 'warning';
          } else if (rec.type === 'project') {
            Icon = FolderGit2;
            badgeVariant = 'success';
          }

          return (
            <div
              key={rec.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={badgeVariant} size="xs">
                    <Icon className="w-3 h-3 mr-1" />
                    <span>{language === 'km' ? rec.badgeTextKm : rec.badgeTextEn}</span>
                  </Badge>
                  {rec.priority === 'high' && (
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                      ★ {t('អាទិភាពខ្ពស់', 'High Priority')}
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                  {language === 'km' ? rec.titleKm : rec.titleEn}
                </h3>

                {/* Transparent Reason Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">
                    {t('ហេតុអ្វីបានជាណែនាំ៖', 'Why this is recommended:')}
                  </span>
                  <span>{language === 'km' ? rec.reasonKm : rec.reasonEn}</span>
                </div>
              </div>

              <Link to={rec.url} className="pt-2">
                <Button variant="primary" size="xs" fullWidth rightIcon={<ArrowRight className="w-3 h-3" />}>
                  {rec.type === 'revision'
                    ? t('ចូលរំលឹកមេរៀននេះ', 'Review Lesson')
                    : rec.type === 'project'
                    ? t('បើកគម្រោងអនុវត្ត', 'Open Project')
                    : t('បន្តការរៀនឥឡូវនេះ', 'Continue Lesson')}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
