import React, { useState } from 'react';
import { GUIDED_PROJECTS } from '../data/projects';
import { ProjectCard } from '../components/project/ProjectCard';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { FolderGit2, Trophy } from 'lucide-react';
import { DifficultyLevel } from '../types';

export const ProjectsPage: React.FC = () => {
  const { t } = useLanguage();
  const { progress } = useProgress();
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | 'all'>('all');

  const completedCount = progress.completedProjectIds.length;

  const filteredProjects = GUIDED_PROJECTS.filter((proj) => {
    if (filterDifficulty === 'all') return true;
    return proj.difficulty === filterDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <FolderGit2 className="w-4 h-4" />
            <span>{t('គម្រោងអនុវត្តផ្ទាល់ដៃ', 'Portfolio Guided Projects')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('៥ គម្រោងអនុវត្តជាក់ស្តែងសម្រាប់អ្នករៀន Java', '5 Guided Real-World Java Projects')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {t(
              'អនុវត្តចំណេះដឹងដែលបានរៀនតាមរយៈការកសាងកម្មវិធីពិតប្រាកដចំនួន ៥ ចាប់ពីម៉ាស៊ីនគិតលេខ រហូតដល់ប្រព័ន្ធគ្រប់គ្រងសិស្សពេញលេញ ជាមួយតេស្តស្វ័យប្រវត្ត និងដំណោះស្រាយគំរូ។',
              'Put your knowledge into practice by building 5 real projects from a command line calculator to a full Student Management System with automated test cases and reference solutions.'
            )}
          </p>
        </div>

        {/* Completion Progress Card */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500">{t('គម្រោងសម្រេចបាន', 'Completed Projects')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {completedCount} / {GUIDED_PROJECTS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilterDifficulty(lvl)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              filterDifficulty === lvl
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {lvl === 'all'
              ? t('គម្រោងទាំងអស់', 'All Projects')
              : lvl === 'beginner'
              ? t('កម្រិតដំបូង', 'Beginner')
              : lvl === 'intermediate'
              ? t('កម្រិតមធ្យម', 'Intermediate')
              : t('កម្រិតខ្ពស់', 'Advanced')}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
