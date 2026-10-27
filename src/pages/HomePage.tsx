import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { CURRICULUM_MODULES, ALL_LESSONS } from '../data/curriculum';
import { GUIDED_PROJECTS } from '../data/projects';
import { CodePlayground } from '../components/editor/CodePlayground';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { progress } = useProgress();

  const completedCount = progress.completedLessonIds.length;
  const totalLessons = ALL_LESSONS.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section with clean, restrained, high-contrast aesthetics */}
      <section className="relative pt-10 sm:pt-16 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.25]">
              {t('រៀនសរសេរកូដ ', 'Master ')}
              <span className="text-rose-600 dark:text-rose-500 underline decoration-rose-500/30 underline-offset-8">
                Java
              </span>{' '}
              {t('ពីកម្រិតសូន្យ រហូតដល់កសាងកម្មវិធីពិត', 'from zero to production proficiency')}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              {t(
                'មេរៀនច្បាស់លាស់ជាភាសាខ្មែរ រៀបចំតាមលំដាប់ប្រធានបទ W3Schools Java Tutorial ជាមួយការរត់កូដលើ OpenJDK Sandbox ពិតប្រាកដ លំហាត់តេស្ត និងគម្រោងអនុវត្តជាក់ស្តែង។',
                'Comprehensive Khmer curriculum referencing W3Schools topic progressions, genuine OpenJDK 21 execution, progressive quizzes, and 5 portfolio projects.'
              )}
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/curriculum">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t('ចាប់ផ្តើមរៀនដោយឥតគិតថ្លៃ', 'Start Learning Free')}
                </Button>
              </Link>

              <Link to="/playground">
                <Button size="lg" variant="outline" leftIcon={<Code2 className="w-4 h-4 text-rose-500" />}>
                  {t('សាកល្បងរត់កូដ (Playground)', 'Try Java Playground')}
                </Button>
              </Link>
            </div>

            {/* Core Trust Indicators - Clean Typographic Metric Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t('ភាសាខ្មែរ ១០០%', '100% Khmer')}
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span>{t('OpenJDK 21 Sandbox', 'OpenJDK 21 Sandbox')}</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span>{t('៥ គម្រោងអនុវត្ត', '5 Guided Projects')}</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span>{t('២៧ មេរៀនពេញលេញ', '27 Comprehensive Lessons')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress resume card if user has begun studying */}
      {completedCount > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-900 text-white border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-base sm:text-lg">
                  {t('បន្តការរៀនសូត្ររបស់អ្នក (Resume Learning)', 'Resume Learning')}
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                {t(
                  `អ្នកបានបញ្ចប់ ${completedCount} ក្នុងចំណោម ${totalLessons} មេរៀន (${progressPercent}%)`,
                  `You have completed ${completedCount} of ${totalLessons} lessons (${progressPercent}%)`
                )}
              </p>
            </div>
            <Link to={`/curriculum/${progress.lastLessonSlug || 'intro-to-java'}`}>
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('រៀនបន្តភ្លាមៗ', 'Continue Now')}
              </Button>
            </Link>
          </Card>
        </section>
      )}

      {/* 3 Step Learning Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            {t('វិធីសាស្ត្ររៀនប្រកបដោយប្រសិទ្ធភាព', 'Effective Learning Workflow')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('របៀបរៀន Java ឱ្យឆាប់ចេះ និងច្បាស់លាស់', 'How Khmer Java Academy Works')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-3 p-6" hover>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-base">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t('១. យល់ដឹងទ្រឹស្តីជាភាសាខ្មែរ', '1. Master Concepts in Khmer')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t(
                'អានការពន្យល់ដើមជាភាសាខ្មែរដែលមានភាពសាមញ្ញ ឧទាហរណ៍ជាក់ស្តែងក្នុងជីវិតពិត ព្រមទាំងការបំបែកកូដមួយជួរៗយ៉ាងច្បាស់។',
                'Read original Khmer explanations with real-world analogies and clear line-by-line code breakdowns.'
              )}
            </p>
          </Card>

          <Card className="space-y-3 p-6" hover>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-base">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t('២. សរសេរ និងរត់កូដលើ Sandbox', '2. Code in Live Sandbox')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t(
                'មិនចាំបាច់ដំឡើង JDK ស្មុគស្មាញឡើយ។ សរសេរកូដក្នុង Monaco Editor និងចុច Run ដើម្បី compile លើ OpenJDK 21 ភ្លាមៗ។',
                'No tedious local environment setup. Write code in Monaco Editor and execute immediately on real OpenJDK 21.'
              )}
            </p>
          </Card>

          <Card className="space-y-3 p-6" hover>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t('៣. កសាងគម្រោងទាំង ៥ ពិតប្រាកដ', '3. Build 5 Real Projects')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t(
                'អនុវត្តចំណេះដឹងលើគម្រោង Portfolio ជាក់ស្តែង៖ ម៉ាស៊ីនគិតលេខ, ប្រព័ន្ធពិន្ទុ, ATM, បណ្ណាល័យ, និងប្រព័ន្ធគ្រប់គ្រងសិស្ស។',
                'Apply skills to 5 guided portfolio projects with automated test cases and reference solutions.'
              )}
            </p>
          </Card>
        </div>
      </section>

      {/* Interactive Code Playground on Homepage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              {t('សាកល្បងសរសេរកូដភ្លាមៗ', 'Instant Live Execution')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t('សាកល្បងរត់កូដ Java លើ Sandbox ពិតប្រាកដ', 'Live Java Code Playground')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t(
                'ចុចប៊ូតុង Run (ដំណើរការ) ឬចុច Ctrl+Enter ដើម្បី compile និងដំណើរការកូដ Java ភ្លាមៗ។',
                'Click Run or press Ctrl+Enter to execute Java in seconds.'
              )}
            </p>
          </div>

          <Link to="/playground">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              {t('បើក Playground ពេញអេក្រង់', 'Full Playground')}
            </Button>
          </Link>
        </div>

        <CodePlayground height="360px" />
      </section>

      {/* Curriculum Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('កម្មវិធីសិក្សា Java បែបទំនើប ៨ ម៉ូឌុល', '8 Modern Java Learning Modules')}
            </h2>
          </div>
          <Link to="/curriculum">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              {t('មើលមេរៀនទាំងអស់', 'View All Lessons')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRICULUM_MODULES.map((module) => {
            const modTitle = t(module.titleKm, module.titleEn);
            const modDesc = t(module.descriptionKm, module.descriptionEn);
            return (
              <Card
                key={module.id}
                hover
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="neutral" size="sm">
                      {module.lessons.length} {t('មេរៀន', 'lessons')}
                    </Badge>
                    <Badge variant="brand" size="xs">
                      {module.level}
                    </Badge>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {modTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {modDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={`/curriculum/${module.lessons[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
                  >
                    <span>{t('ចូលរៀនម៉ូឌុលនេះ', 'Explore Module')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5 Guided Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('៥ គម្រោងអនុវត្តជាក់ស្តែង (Guided Projects)', '5 Guided Portfolio Projects')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t(
                'កសាងគម្រោងពិតជាមួយតេស្តស្វ័យប្រវត្ត ការណែនាំជំនួយ និងដំណោះស្រាយគំរូ។',
                'Build projects with automated test cases, hints, and reference solutions.'
              )}
            </p>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              {t('មើលគម្រោងទាំងអស់', 'Explore Projects')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDED_PROJECTS.slice(0, 3).map((project) => {
            const title = t(project.titleKm, project.titleEn);
            const desc = t(project.descriptionKm, project.descriptionEn);
            return (
              <Card
                key={project.id}
                hover
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={project.difficulty === 'beginner' ? 'success' : 'brand'} size="xs">
                      {project.difficulty}
                    </Badge>
                    <span className="text-xs text-slate-500 font-medium">~{project.estimatedHours}h</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700"
                  >
                    <span>{t('ចាប់ផ្តើមគម្រោងនេះ', 'Start Project')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Clean Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-md">
          <div className="max-w-2xl space-y-4">
            <Badge variant="brand" size="sm">
              {t('ឥតគិតថ្លៃ ១០០% សម្រាប់សិស្សកម្ពុជា', '100% Free for Cambodian Students')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('ត្រៀមខ្លួនរួចរាល់ហើយឬនៅ ដើម្បីក្លាយជា Java Developer?', 'Ready to become a confident Java Developer?')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t(
                'មិនចាំបាច់មានបទពិសោធន៍សរសេរកូដពីមុនឡើយ។ ចាប់ផ្តើមពីមេរៀនទីមួយ "សេចក្តីផ្តើមអំពី Java" នៅថ្ងៃនេះ!',
                'No prior coding background required. Begin your journey today with lesson 1: Introduction to Java!'
              )}
            </p>
            <div className="pt-2">
              <Link to="/curriculum/intro-to-java">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t('រៀនមេរៀនដំបូងភ្លាមៗ', 'Start First Lesson')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
