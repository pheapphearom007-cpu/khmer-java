import React, { useState } from 'react';
import { GUIDED_PROJECTS } from '../data/projects';
import { ProjectCard } from '../components/project/ProjectCard';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { FolderGit2, Trophy, Search, X } from 'lucide-react';
import { DifficultyLevel } from '../types';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';

export const ProjectsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { progress } = useProgress();
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = progress.completedProjectIds.length;

  const filteredProjects = GUIDED_PROJECTS.filter((proj) => {
    const matchesDifficulty = filterDifficulty === 'all' || proj.difficulty === filterDifficulty;
    const title = language === 'km' ? proj.titleKm : proj.titleEn;
    const desc = language === 'km' ? proj.descriptionKm : proj.descriptionEn;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);

    return matchesDifficulty && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm">
              <FolderGit2 className="w-3.5 h-3.5 mr-1" />
              {t('គម្រោងអនុវត្តផ្ទាល់ដៃ', 'Portfolio Guided Projects')}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
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
        <Card className="p-4 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t('គម្រោងសម្រេចបាន', 'Completed Projects')}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {completedCount} / {GUIDED_PROJECTS.length}
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ស្វែងរកគម្រោង (ឧ. atm, calculator)...', 'Search projects (e.g. atm, calculator)...')}
            className="w-full pl-10 pr-9 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-rose-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterDifficulty(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                filterDifficulty === lvl
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
      </Card>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title={t('រកមិនឃើញគម្រោងដែលត្រូវនឹងការស្វែងរកឡើយ', 'No projects match your search')}
          description={t(
            'សូមសាកល្បងសម្អាតពាក្យស្វែងរក ឬជ្រើសរើសកម្រិតផ្សេងទៀត។',
            'Try clearing your search query or selecting a different level filter.'
          )}
          actionText={t('សម្អាតការស្វែងរក', 'Clear Search')}
          onAction={() => {
            setSearchQuery('');
            setFilterDifficulty('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};
