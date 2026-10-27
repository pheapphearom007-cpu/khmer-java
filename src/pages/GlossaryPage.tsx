import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { useLanguage } from '../context/LanguageContext';
import { BookA, Search, Volume2, Tag, Copy, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';

const ITEMS_PER_PAGE = 8;

export const GlossaryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
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
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE) || 1;
  const paginatedTerms = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTerms.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTerms, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

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
      <header className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="brand" size="sm">
            <BookA className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
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
      </header>

      {/* Search and Category Filters */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-label={t('ស្វែងរកពាក្យបច្ចេកទេស', 'Search technical terms')}
            placeholder={t('ស្វែងរកពាក្យ (ឧ. polymorphism, jvm, static)...', 'Search terms (e.g. polymorphism, jvm)...')}
            className="w-full pl-10 pr-9 py-2 min-h-[44px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-rose-500"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              aria-label={t('សម្អាតការស្វែងរក', 'Clear search query')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0" role="tablist" aria-label={t('ប្រភេទពាក្យបច្ចេកទេស', 'Glossary categories')}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selectedCategory === cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-2 min-h-[44px] rounded-xl text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
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

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          {t(`បង្ហាញ ${paginatedTerms.length} ក្នុងចំណោម ${filteredTerms.length} ពាក្យ`, `Showing ${paginatedTerms.length} of ${filteredTerms.length} terms`)}
        </span>
        {totalPages > 1 && (
          <span>
            {t(`ទំព័រទី ${currentPage} នៃ ${totalPages}`, `Page ${currentPage} of ${totalPages}`)}
          </span>
        )}
      </div>

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
            setCurrentPage(1);
          }}
        />
      ) : (
        <section aria-label={t('បញ្ជីពាក្យបច្ចេកទេស', 'Glossary terms list')} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedTerms.map((item, idx) => (
            <Card
              key={item.term}
              hover
              className="flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.term}
                    </h2>
                    <div className="text-rose-600 dark:text-rose-400 font-semibold text-xs sm:text-sm mt-0.5">
                      {item.khmerTranslation}
                    </div>
                  </div>

                  {/* Pronunciation Badge */}
                  <Badge variant="neutral" size="sm">
                    <Volume2 className="w-3 h-3 text-rose-500 mr-1" aria-hidden="true" />
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
                    aria-label={t('ចម្លងកូដគំរូ', 'Copy code snippet')}
                    className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded text-slate-400 hover:text-white shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    {copiedSnippetIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}

              {/* Category pill */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span className="inline-flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold text-slate-500">
                  <Tag className="w-3 h-3" aria-hidden="true" />
                  {item.category}
                </span>
              </div>
            </Card>
          ))}
        </section>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label={t('ការផ្លាស់ប្តូរទំព័រ', 'Glossary pagination')}
          className="flex items-center justify-center gap-2 pt-4"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label={t('ទំព័រមុន', 'Previous page')}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              aria-label={t(`ទំព័រទី ${page}`, `Page ${page}`)}
              className={`w-11 h-11 rounded-xl text-xs font-bold transition-all ${
                currentPage === page
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label={t('ទំព័របន្ទាប់', 'Next page')}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
};
