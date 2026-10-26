import React from 'react';
import { CodePlayground } from '../components/editor/CodePlayground';
import { useLanguage } from '../context/LanguageContext';
import { Code2, ShieldCheck, Zap, Info } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const PlaygroundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="brand" size="sm">
            <Code2 className="w-3.5 h-3.5 mr-1" />
            <span>{t('កន្លែងរត់កូដឯករាជ្យ', 'Independent Code Sandbox')}</span>
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('Java Code Playground', 'Java Code Playground')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {t(
            'សរសេរកូដ Java ដោយសេរី ពិសោធន៍តក្កវិជ្ជា និងដំណើរការកូដលើ OpenJDK 21 Sandbox ពិតប្រាកដ។ គាំទ្រទាំងការទទួលទិន្នន័យតាមរយៈ Scanner (Stdin) និងការបង្ហាញលទ្ធផលភាសាខ្មែរ UTF-8។',
            'Write Java freely, test your logic, and execute against genuine OpenJDK 21 sandboxes. Full support for Scanner stdin and UTF-8 Khmer output.'
          )}
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <Card className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{t('សុវត្ថិភាពខ្ពស់', 'Isolated Sandbox')}</div>
            <div className="text-slate-500 mt-0.5 leading-relaxed">
              {t('ដំណើរការក្នុង Docker/Sandbox ដាច់ដោយឡែក គ្មានហានិភ័យលើម៉ាស៊ីនអ្នកឡើយ។', 'Isolated container execution; safe from malware or host exposure.')}
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{t('OpenJDK 21 LTS', 'OpenJDK 21 LTS')}</div>
            <div className="text-slate-500 mt-0.5 leading-relaxed">
              {t('កំណែ Java ទំនើបចុងក្រោយ គាំទ្រមុខងារ Record, Pattern Matching, និង Lambdas។', 'Modern Java standard with fast response and latest features.')}
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{t('ផ្លូវកាត់ក្តារចុច', 'Shortcut: Ctrl + Enter')}</div>
            <div className="text-slate-500 mt-0.5 leading-relaxed">
              {t('ចុចបញ្ជា Ctrl + Enter (ឬ Cmd + Enter លើ Mac) ដើម្បីរត់កូដភ្លាមៗ។', 'Press Ctrl+Enter or Cmd+Enter to execute code immediately.')}
            </div>
          </div>
        </Card>
      </div>

      {/* Main Playground Surface */}
      <CodePlayground height="500px" />
    </div>
  );
};
