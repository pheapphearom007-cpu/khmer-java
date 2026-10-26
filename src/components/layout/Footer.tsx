import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ExternalLink, Heart, ShieldCheck, Database } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { isSupabaseConfigured } from '../../services/supabaseClient';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">Khmer Java Academy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t(
                'វេទិកាបង្រៀនភាសា Java ជាភាសាខ្មែរដំបូងគេបង្អស់ ដែលមានមេរៀនលម្អិត កន្លែងអនុវត្តកូដពិតប្រាកដ លំហាត់តេស្ត និងគម្រោងអនុវត្តជាក់ស្តែងសម្រាប់សិស្ស-និស្សិតកម្ពុជា។',
                'The premier Khmer-first Java educational platform empowering Cambodian learners with interactive coding, progressive quizzes, and hands-on projects.'
              )}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                <Database className="w-3 h-3 text-emerald-400" />
                {isSupabaseConfigured ? 'Supabase Sync: Active' : 'Storage: Local Browser'}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">
              {t('កម្មវិធីសិក្សា', 'Curriculum')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/curriculum" className="hover:text-rose-400 transition-colors">
                  {t('មេរៀនគ្រឹះ Java (Basics)', 'Java Basics')}
                </Link>
              </li>
              <li>
                <Link to="/curriculum" className="hover:text-rose-400 transition-colors">
                  {t('វិធីសាស្ត្រ និងអារេ (Methods & Arrays)', 'Methods & Arrays')}
                </Link>
              </li>
              <li>
                <Link to="/curriculum" className="hover:text-rose-400 transition-colors">
                  {t('កម្មវិធីតម្រង់ទិសវត្ថុ (OOP Masterclass)', 'OOP Masterclass')}
                </Link>
              </li>
              <li>
                <Link to="/curriculum" className="hover:text-rose-400 transition-colors">
                  {t('បណ្តុំទិន្នន័យ (Java Collections)', 'Java Collections')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects & Tools */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">
              {t('ឧបករណ៍ និងគម្រោង', 'Tools & Projects')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/playground" className="hover:text-rose-400 transition-colors">
                  {t('កន្លែងរត់កូដ Java Playground (Wandbox 21)', 'Java Playground (Wandbox 21)')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-rose-400 transition-colors">
                  {t('គម្រោងអនុវត្តទាំង ៥ (5 Guided Projects)', '5 Guided Projects')}
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="hover:text-rose-400 transition-colors">
                  {t('ប្រព័ន្ធតេស្តសមត្ថភាព (Quizzes)', 'Skill Quizzes')}
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="hover:text-rose-400 transition-colors">
                  {t('វចនានុក្រមពាក្យបច្ចេកទេស Java', 'Java Technical Glossary')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Reference & Attribution */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">
              {t('ឯកសារយោង និងគោលការណ៍', 'Reference & Attribution')}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {t(
                'រចនាសម្ព័ន្ធកម្មវិធីសិក្សាត្រូវបានរៀបចំឡើងដោយយោងតាម W3Schools Java Tutorial រួមផ្សំនឹងការពន្យល់ និងឧទាហរណ៍ដើមជាភាសាខ្មែរ។',
                'Curriculum structure referenced from W3Schools Java Tutorial with original Khmer explanations and exercises.'
              )}
            </p>
            <a
              href="https://www.w3schools.com/java/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              <span>W3Schools Java Tutorial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Khmer Java Academy. រក្សាសិទ្ធិគ្រប់យ៉ាងសម្រាប់ការអប់រំនៅកម្ពុជា។</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Real Sandboxed Java Runtime</span>
            </span>
            <span className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for Cambodian Students</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
