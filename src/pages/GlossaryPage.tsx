import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { useLanguage } from '../context/LanguageContext';
import { BookA, Search, Volume2, Tag, Copy, Check, X } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';

export const GlossaryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

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

  const handleCopySnippet = (snippet: string, idx: number) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetIndex(idx);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="brand" size="sm">
            <BookA className="w-3.5 h-3.5 mr-1" />
            <span>{t('វចនានុក្រមបច្ចេកទេស', 'Technical Glossary')}</span>
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
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
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ស្វែងរកពាក្យ (ឧ. polymorphism, jvm, static)...', 'Search terms (e.g. polymorphism, jvm)...')}
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

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {language === 'km' ? cat.labelKm : cat.labelEn}
            </button>
          ))}
        </div>
      </Card>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <EmptyState
          title={t('រកមិនឃើញពាក្យបច្ចេកទេសដែលត្រូវនឹងការស្វែងរករបស់អ្នកឡើយ', 'No glossary terms match your search')}
          description={t(
            'សូមសាកល្បងសម្អាតពាក្យស្វែងរក ឬជ្រើសរើសប្រភេទផ្សេងទៀត។',
            'Try clearing your search query or selecting a different category filter.'
          )}
          actionText={t('សម្អាតការស្វែងរក', 'Clear Search')}
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((item, idx) => (
            <Card
              key={idx}
              hover
              className="flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.term}
                    </h3>
                    <div className="text-rose-600 dark:text-rose-400 font-semibold text-xs sm:text-sm mt-0.5">
                      {item.khmerTranslation}
                    </div>
                  </div>

                  {/* Pronunciation Badge */}
                  <Badge variant="neutral" size="sm">
                    <Volume2 className="w-3 h-3 text-rose-500 mr-1" />
                    <span>{item.pronunciationKm}</span>
                  </Badge>
                </div>

                {/* Definition */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'km' ? item.definitionKm : item.definitionEn}
                </p>
              </div>

              {/* Code snippet if present */}
              {item.exampleSnippet && (
                <div className="relative p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto flex items-center justify-between gap-2">
                  <code>{item.exampleSnippet}</code>
                  <button
                    onClick={() => handleCopySnippet(item.exampleSnippet!, idx)}
                    title={t('ចម្លងកូដ', 'Copy code')}
                    className="p-1 rounded text-slate-400 hover:text-white shrink-0"
                  >
                    {copiedSnippetIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}

              {/* Category pill */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span className="inline-flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold text-slate-500">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
