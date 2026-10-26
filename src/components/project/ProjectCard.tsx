import React from 'react';
import { Link } from 'react-router-dom';
import { GuidedProject } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { Clock, CheckCircle2, ArrowRight, Code } from 'lucide-react';

interface ProjectCardProps {
  project: GuidedProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language, t } = useLanguage();
  const { isProjectCompleted } = useProgress();
  const completed = isProjectCompleted(project.id);

  const title = language === 'km' ? project.titleKm : project.titleEn;
  const description = language === 'km' ? project.descriptionKm : project.descriptionEn;

  const difficultyColors = {
    beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800',
  };

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <span
          className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${
            difficultyColors[project.difficulty]
          }`}
        >
          {project.difficulty === 'beginner'
            ? t('កម្រិតដំបូង', 'Beginner')
            : project.difficulty === 'intermediate'
            ? t('កម្រិតមធ្យម', 'Intermediate')
            : t('កម្រិតខ្ពស់', 'Advanced')}
        </span>

        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{project.estimatedHours} {t('ម៉ោង', 'hrs')}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 flex-1 leading-relaxed">
        {description}
      </p>

      {/* Footer details */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Code className="w-4 h-4 text-slate-400" />
          <span>{project.requirements.length} {t('លក្ខខណ្ឌតម្រូវ', 'requirements')}</span>
        </div>

        {completed ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            {t('បានបញ្ចប់', 'Completed')}
          </span>
        ) : (
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
          >
            <span>{t('ចាប់ផ្តើមធ្វើ', 'Start Project')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};
