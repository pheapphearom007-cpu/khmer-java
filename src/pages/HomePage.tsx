import React from 'react';
import { Link } from 'react-router-dom';
import {
  Coffee,
  BookOpen,
  Code2,
  FolderGit2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
  Terminal,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { CURRICULUM_MODULES, ALL_LESSONS } from '../data/curriculum';
import { GUIDED_PROJECTS } from '../data/projects';
import { CodePlayground } from '../components/editor/CodePlayground';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { progress } = useProgress();

  const completedCount = progress.completedLessonIds.length;
  const totalLessons = ALL_LESSONS.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-rose-50/60 via-transparent to-transparent dark:from-rose-950/20 dark:via-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold shadow-sm">
              <Coffee className="w-3.5 h-3.5" />
              <span>{t('វេទិកាបង្រៀន Java ជាភាសាខ្មែរដំបូងគេ', 'First Khmer-First Java Academy')}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t('រៀនសរសេរកូដ ', 'Master ')}
              <span className="bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
                Java
              </span>{' '}
              {t('ពីកម្រិតសូន្យ រហូតដល់កសាងកម្មវិធីពិត', 'from zero to building real applications')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t(
                'មេរៀនជាភាសាខ្មែរច្បាស់លាស់ ផ្អែកលើស្តង់ដារ W3Schools ជាមួយការអនុវត្តកូដលើ OpenJDK Sandbox ពិតប្រាកដ លំហាត់តេស្ត និងគម្រោងអនុវត្តចំនួន ៥ ជាក់ស្តែង។',
                'Comprehensive Khmer curriculum referenced from W3Schools with genuine OpenJDK 21 sandbox execution, quizzes, and 5 guided projects.'
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/curriculum"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/20 hover:scale-[1.02] transition-transform"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('ចាប់ផ្តើមរៀនឥតគិតថ្លៃ', 'Start Learning Free')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/playground"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
              >
                <Code2 className="w-4 h-4 text-rose-500" />
                <span>{t('សាកល្បងរត់កូដ Java', 'Open Code Playground')}</span>
              </Link>
            </div>

            {/* Highlights badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t('ភាសាខ្មែរ ១០០%', '100% Khmer First')}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{t('OpenJDK 21 Sandbox', 'Real OpenJDK 21')}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <FolderGit2 className="w-4 h-4 text-rose-500" />
                <span>{t('៥ គម្រោងអនុវត្ត', '5 Guided Projects')}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{t('W3Schools Aligned', 'W3Schools Aligned')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress resume strip if user started learning */}
      {completedCount > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-rose-600 to-amber-600 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-lg">{t('បន្តការរៀនសូត្ររបស់អ្នក', 'Continue Your Learning Journey')}</h3>
              <p className="text-xs text-rose-100">
                {t(
                  `អ្នកបានបញ្ចប់ ${completedCount} ក្នុងចំណោម ${totalLessons} មេរៀន (${progressPercent}%)`,
                  `You have completed ${completedCount} of ${totalLessons} lessons (${progressPercent}%)`
                )}
              </p>
            </div>
            <Link
              to={`/curriculum/${progress.lastLessonSlug || 'intro-to-java'}`}
              className="px-5 py-2.5 rounded-xl bg-white text-rose-700 font-bold text-xs hover:bg-rose-50 transition-colors shadow-sm shrink-0"
            >
              {t('រៀនបន្តភ្លាមៗ →', 'Resume Now →')}
            </Link>
          </div>
        </section>
      )}

      {/* Interactive Code Playground on Homepage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <Terminal className="w-4 h-4" />
            <span>{t('សាកល្បងសរសេរកូដភ្លាមៗ', 'Instant Live Execution')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t('សាកល្បងរត់កូដ Java លើ Sandbox ពិតប្រាកដ', 'Try Running Java Code Online')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t(
              'ចុចប៊ូតុង Run ដើម្បី compile និងដំណើរការកូដ Java ភ្លាមៗដោយមិនបាច់ដំឡើងអ្វីឡើយ។',
              'Click Run to compile and execute Java code in seconds without installing anything.'
            )}
          </p>
        </div>

        <CodePlayground height="360px" />
      </section>

      {/* Curriculum Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Layers className="w-4 h-4" />
              <span>{t('ផ្លូវនៃការសិក្សា', 'Curriculum Roadmap')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t('កម្មវិធីសិក្សា Java បែប W3Schools', 'W3Schools-Aligned Curriculum')}
            </h2>
          </div>
          <Link
            to="/curriculum"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <span>{t('មើលមេរៀនទាំងអស់', 'View All Lessons')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRICULUM_MODULES.map((module) => {
            const modTitle = t(module.titleKm, module.titleEn);
            const modDesc = t(module.descriptionKm, module.descriptionEn);
            return (
              <div
                key={module.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {module.lessons.length} {t('មេរៀន', 'lessons')}
                    </span>
                    <span className="text-[11px] uppercase font-bold text-rose-600 dark:text-rose-400">
                      {module.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{modTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {modDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    to={`/curriculum/${module.lessons[0].slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    <span>{t('ចូលរៀនម៉ូឌុលនេះ', 'Explore Module')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5 Guided Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <FolderGit2 className="w-4 h-4" />
              <span>{t('ការអនុវត្តជាក់ស្តែង', 'Practical Projects')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t('៥ គម្រោងអនុវត្តជាក់ស្តែង (Guided Projects)', '5 Guided Portfolio Projects')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t(
                'កសាងគម្រោងដោយមានតេស្តសាកល្បង ដំណោះស្រាយគំរូ និងការណែនាំជាជំហានៗ។',
                'Build portfolio projects with automated test cases, hints, and step-by-step guidance.'
              )}
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <span>{t('មើលគម្រោងទាំងអស់', 'Explore Projects')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDED_PROJECTS.slice(0, 3).map((project) => {
            const title = t(project.titleKm, project.titleEn);
            const desc = t(project.descriptionKm, project.descriptionEn);
            return (
              <div
                key={project.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      {project.difficulty}
                    </span>
                    <span className="text-xs text-slate-500">~{project.estimatedHours}h</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    <span>{t('ចាប់ផ្តើមគម្រោងនេះ', 'Start Project')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden border border-slate-800 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/30 text-rose-400 text-xs font-semibold border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('ឥតគិតថ្លៃ ១០០% សម្រាប់សិស្សកម្ពុជា', '100% Free for Cambodian Students')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t('ត្រៀមខ្លួនរួចរាល់ហើយឬនៅ ដើម្បីក្លាយជា Java Developer?', 'Ready to become a confident Java Developer?')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t(
                'មិនចាំបាច់មានបទពិសោធន៍សរសេរកូដពីមុនឡើយ។ ចាប់ផ្តើមពីមេរៀនទីមួយ "សេចក្តីផ្តើមអំពី Java" នៅថ្ងៃនេះ!',
                'No prior coding experience required. Begin your journey today with lesson 1: Introduction to Java!'
              )}
            </p>
            <div className="pt-2">
              <Link
                to="/curriculum/intro-to-java"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                <span>{t('រៀនមេរៀនដំបូងភ្លាមៗ', 'Start First Lesson')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
