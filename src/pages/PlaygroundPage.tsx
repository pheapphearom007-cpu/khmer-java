import React from 'react';
import { CodePlayground } from '../components/editor/CodePlayground';
import { useLanguage } from '../context/LanguageContext';
import { Code2, ShieldCheck, Zap, Info } from 'lucide-react';

export const PlaygroundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <Code2 className="w-4 h-4" />
          <span>{t('កន្លែងរត់កូដឯករាជ្យ', 'Independent Code Sandbox')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t('Java Code Playground', 'Java Code Playground')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {t(
            'សរសេរកូដ Java ដោយសេរី ពិសោធន៍តក្កវិជ្ជា និងដំណើរការកូដលើ OpenJDK 21 Sandbox ពិតប្រាកដ។ គាំទ្រទាំងការទទួលទិន្នន័យតាមរយៈ Scanner (Stdin) និងការបង្ហាញលទ្ធផលភាសាខ្មែរ UTF-8។',
            'Write Java freely, test your logic, and execute against genuine OpenJDK 21 sandboxes. Full support for Scanner stdin and UTF-8 Khmer output.'
          )}
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{t('សុវត្ថិភាពខ្ពស់', 'Isolated Sandbox')}</div>
            <div className="text-slate-500 mt-0.5">
              {t('ដំណើរការក្នុង Docker/Sandbox ដាច់ដោយឡែក គ្មានហានិភ័យលើម៉ាស៊ីនអ្នកឡើយ។', 'Isolated cloud container execution; safe from malware or host exposure.')}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{t('OpenJDK 21 LTS', 'OpenJDK 21 LTS')}</div>
            <div className="text-slate-500 mt-0.5">
              {t('កំណែ Java ទំនើបចុងក្រោយ គាំទ្រមុខងារ Record, Pattern Matching, និង Lambdas។', 'Modern Java standard with fast response and latest features.')}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{t('ផ្លូវកាត់ក្តារចុច', 'Shortcut: Ctrl + Enter')}</div>
            <div className="text-slate-500 mt-0.5">
              {t('ចុចបញ្ជា Ctrl + Enter (ឬ Cmd + Enter លើ Mac) ដើម្បីរត់កូដភ្លាមៗ។', 'Press Ctrl+Enter or Cmd+Enter to execute code immediately.')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Playground Surface */}
      <CodePlayground height="500px" />
    </div>
  );
};
