import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { useLanguage } from '../context/LanguageContext';
import { BookA, Search, Volume2, Tag } from 'lucide-react';

export const GlossaryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      term.term.toLowerCase().includes(q) ||
      term.khmerTranslation.toLowerCase().includes(q) ||
      term.pronunciationKm.toLowerCase().includes(q) ||
      term.definitionKm.toLowerCase().includes(q) ||
      term.definitionEn.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', labelKm: 'ទាំងអស់', labelEn: 'All' },
    { id: 'oop', labelKm: 'OOP (តម្រង់ទិសវត្ថុ)', labelEn: 'OOP' },
    { id: 'jvm', labelKm: 'JVM & ស្ថាបត្យកម្ម', labelEn: 'JVM & Architecture' },
    { id: 'syntax', labelKm: 'វេយ្យាករណ៍ និងពាក្យគន្លឹះ', labelEn: 'Syntax & Keywords' },
    { id: 'data-structure', labelKm: 'បណ្តុំទិន្នន័យ (Collections)', labelEn: 'Collections' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <BookA className="w-4 h-4" />
          <span>{t('វចនានុក្រមបច្ចេកទេស', 'Technical Glossary')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t('វចនានុក្រមពាក្យបច្ចេកទេស Java ជាភាសាខ្មែរ', 'Khmer-English Java Technical Glossary')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {t(
            'ស្វែងយល់ និងទន្ទេញពាក្យបច្ចេកទេសសំខាន់ៗក្នុងពិភព Java ជាមួយការបញ្ចេញសំឡេងជាភាសាខ្មែរ ការបកប្រែត្រឹមត្រូវ និងឧទាហរណ៍ជាក់ស្តែង។',
            'Master key Java terminology with Khmer pronunciation guides, precise definitions, and contextual code snippets.'
          )}
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ស្វែងរកពាក្យ (ឧ. polymorphism, jvm, static)...', 'Search terms (e.g. polymorphism, jvm)...')}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {language === 'km' ? cat.labelKm : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-slate-500 text-sm">
            {t('រកមិនឃើញពាក្យបច្ចេកទេសដែលត្រូវនឹងការស្វែងរករបស់អ្នកឡើយ។', 'No glossary terms match your search.')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.term}
                  </h3>
                  <div className="text-rose-600 dark:text-rose-400 font-semibold text-sm mt-0.5">
                    {item.khmerTranslation}
                  </div>
                </div>

                {/* Pronunciation badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                  <Volume2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>{item.pronunciationKm}</span>
                </div>
              </div>

              {/* Definition */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'km' ? item.definitionKm : item.definitionEn}
              </p>

              {/* Code snippet if present */}
              {item.exampleSnippet && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                  <code>{item.exampleSnippet}</code>
                </div>
              )}

              {/* Category pill */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold text-slate-500">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
