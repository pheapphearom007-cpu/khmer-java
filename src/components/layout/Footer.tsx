import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Coffee,
  ExternalLink,
  Heart,
  ShieldCheck,
  Database,
  User,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import { DEVELOPER_PROFILE } from '../../data/developer';
import { DeveloperProfileModal } from '../common/DeveloperProfileModal';
import { LegalModal } from '../common/LegalModal';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [showDevModal, setShowDevModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const dev = DEVELOPER_PROFILE;

  return (
    <>
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Col */}
            <div className="space-y-4 lg:col-span-1">
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
                {t('ឯកសារយោង និងគោលការណ៍', 'Reference & External Links')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {t(
                  'កម្មវិធីសិក្សាភាសា Java ឯករាជ្យជាភាសាខ្មែរ ដោយយោងលើប្រធានបទគោលនៃ W3Schools Java Tutorial សម្រាប់ជាឯកសារយោងបន្ថែម (Fair Use)។',
                  'Independent Khmer curriculum referencing topic outlines from W3Schools Java Tutorial for supplementary study under nominative fair use.'
                )}
              </p>
              <div className="space-y-2">
                <a
                  href="https://www.w3schools.com/java/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium"
                >
                  <span>W3Schools Java Tutorial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div>
                  <button
                    onClick={() => setShowLegalModal(true)}
                    className="text-xs text-slate-400 hover:text-white underline underline-offset-2 flex items-center gap-1 transition-colors"
                  >
                    <ShieldCheck className="w-3 h-3 text-rose-400" />
                    <span>{t('សេចក្តីប្រកាសច្បាប់ & និក្ខេបសញ្ញា', 'Legal & Trademark Notices')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Developer & Creator Spotlight Col */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white text-xs tracking-wider uppercase flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-500" />
                  <span>{t('អ្នកអភិវឌ្ឍន៍ (Developer)', 'Developer')}</span>
                </h4>
                <button
                  onClick={() => setShowDevModal(true)}
                  className="text-[11px] text-rose-400 hover:text-rose-300 font-medium hover:underline"
                >
                  {t('មើល Profile', 'View Profile')}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl overflow-hidden border border-rose-500/40 bg-slate-700 shrink-0">
                    <img
                      src={dev.photoUrl}
                      alt={dev.nameEn}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center bg-rose-600 text-white font-bold text-xs">
                      PP
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white text-xs truncate">
                      {dev.nameEn}
                    </p>
                    <p className="text-[11px] text-rose-400 truncate">{dev.roleEn}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">{language === 'km' ? dev.locationKm : dev.locationEn}</span>
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex flex-col gap-1 text-[11px]">
                  <a
                    href={`mailto:${dev.email}`}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-rose-400 transition-colors truncate"
                  >
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{dev.email}</span>
                  </a>
                  <a
                    href={`tel:${dev.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors truncate"
                  >
                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{dev.phone}</span>
                  </a>
                </div>

                <div className="pt-1">
                  <a
                    href={dev.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-semibold transition-colors"
                  >
                    <span>{t('គេហទំព័រ Portfolio ផ្ទាល់ខ្លួន', 'Personal Portfolio')}</span>
                    <ExternalLink className="w-3 h-3 text-rose-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Attribution Bar */}
          <div className="mt-10 pt-6 border-t border-slate-800 space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>
                © {new Date().getFullYear()} Khmer Java Academy. {t('បង្កើត និងអភិវឌ្ឍន៍ដោយ', 'Created & developed by')}{' '}
                <button
                  onClick={() => setShowDevModal(true)}
                  className="text-rose-400 hover:text-rose-300 font-bold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500 rounded"
                >
                  Pheap Phirom
                </button>{' '}
                ({t('សៀមរាប, កម្ពុជា', 'Siem Reap, Cambodia')}).
              </p>
              <div className="flex items-center gap-4 text-slate-400 flex-wrap">
                <button
                  onClick={() => setShowLegalModal(true)}
                  className="text-slate-400 hover:text-white underline underline-offset-2"
                >
                  {t('សេចក្តីប្រកាសច្បាប់ & និក្ខេបសញ្ញា', 'Legal & Trademarks')}
                </button>
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

            {/* Statutory Trademark Disclaimer Notice */}
            <p className="text-[11px] text-slate-500 leading-normal text-center sm:text-left">
              Java® is a registered trademark of Oracle Corporation and/or its affiliates. W3Schools® is a registered trademark of Refsnes Data AS. Khmer Java Academy is an independent educational platform and is not affiliated with, endorsed by, or sponsored by Oracle Corporation or Refsnes Data AS. External links to W3Schools are provided solely as educational study references under nominative fair use.
            </p>
          </div>
        </div>
      </footer>

      {/* Developer Profile Modal */}
      <DeveloperProfileModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />

      {/* Legal, Trademarks & Licensing Modal */}
      <LegalModal isOpen={showLegalModal} onClose={() => setShowLegalModal(false)} />
    </>
  );
};
