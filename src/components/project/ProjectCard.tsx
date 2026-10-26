import React from 'react';
import { Link } from 'react-router-dom';
import { GuidedProject } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { Clock, CheckCircle2, ArrowRight, Code } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ProjectCardProps {
  project: GuidedProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language, t } = useLanguage();
  const { isProjectCompleted } = useProgress();
  const completed = isProjectCompleted(project.id);

  const title = language === 'km' ? project.titleKm : project.titleEn;
  const description = language === 'km' ? project.descriptionKm : project.descriptionEn;

  return (
    <Card hover className="flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <Badge
            variant={
              project.difficulty === 'beginner'
                ? 'success'
                : project.difficulty === 'intermediate'
                ? 'warning'
                : 'danger'
            }
            size="sm"
          >
            {project.difficulty === 'beginner'
              ? t('កម្រិតដំបូង', 'Beginner')
              : project.difficulty === 'intermediate'
              ? t('កម្រិតមធ្យម', 'Intermediate')
              : t('កម្រិតខ្ពស់', 'Advanced')}
          </Badge>

          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>~{project.estimatedHours} {t('ម៉ោង', 'hrs')}</span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer details */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Code className="w-4 h-4 text-slate-400" />
          <span>{project.requirements.length} {t('លក្ខខណ្ឌតម្រូវ', 'requirements')}</span>
        </div>

        {completed ? (
          <Badge variant="success" size="sm">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            {t('បានបញ្ចប់', 'Completed')}
          </Badge>
        ) : (
          <Link to={`/projects/${project.slug}`}>
            <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />}>
              {t('ចាប់ផ្តើមធ្វើ', 'Start Project')}
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
};
