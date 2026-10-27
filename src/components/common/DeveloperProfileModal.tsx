import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DEVELOPER_PROFILE } from '../../data/developer';
import {
  X,
  Mail,
  Phone,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Code2,
  Heart,
  Target,
} from 'lucide-react';

interface DeveloperProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperProfileModal: React.FC<DeveloperProfileModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dev = DEVELOPER_PROFILE;
  const role = language === 'km' ? dev.roleKm : dev.roleEn;
  const location = language === 'km' ? dev.locationKm : dev.locationEn;
  const bio = language === 'km' ? dev.bioKm : dev.bioEn;
  const approach = language === 'km' ? dev.approachKm : dev.approachEn;
  const skills = language === 'km' ? dev.skillsKm : dev.skillsEn;
  const goals = language === 'km' ? dev.goalsKm : dev.goalsEn;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="developer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 overflow-hidden font-sans text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background Cover with Angkor Wat overlay */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-900">
          <img
            src={dev.backgroundUrl}
            alt="Angkor Wat Apsara Relief"
            className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label={t('បិទផ្ទាំង', 'Close modal')}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Badge */}
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {t('អ្នកបង្កើត & អភិវឌ្ឍន៍', 'Creator & Developer')}
            </span>
          </div>
        </div>

        {/* Profile Content Container */}
        <div className="px-6 sm:px-8 pb-8 -mt-16 sm:-mt-20 relative space-y-6">
          {/* Avatar and Main Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-slate-900 bg-slate-800 shadow-2xl shrink-0">
                <img
                  src={dev.photoUrl}
                  alt={dev.nameEn}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder monogram
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-600 to-amber-600 text-white font-black text-2xl">
                  PP
                </div>
              </div>
              <div className="space-y-1 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 id="developer-modal-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {dev.nameEn}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">{role}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            <a
              href={dev.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold shadow-lg shadow-rose-950/50 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 shrink-0"
            >
              <span>{t('មើល Portfolio ដើម', 'View Original Portfolio')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
            {dev.stats.map((st, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  {language === 'km' ? st.labelKm : st.labelEn}
                </span>
                <span className="text-xs font-bold text-white block">
                  {language === 'km' ? st.valueKm : st.valueEn}
                </span>
              </div>
            ))}
          </div>

          {/* Bio & Philosophy */}
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>{t('អំពីទស្សនវិស័យ & ការអភិវឌ្ឍ', 'About & Development Vision')}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{bio}</p>
            <div className="pt-2 text-xs text-slate-400 flex items-start gap-2">
              <span className="font-semibold text-slate-300">{t('គោលការណ៍ការងារ:', 'Work Approach:')}</span>
              <span>{approach}</span>
            </div>
          </div>

          {/* Two-Column: Core Skills & Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Skills */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('ជំនាញស្នូល (Core Skills)', 'Core Technical Skills')}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {skills.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Goals */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-rose-400" />
                <span>{t('គោលដៅអភិវឌ្ឍន៍ (Professional Goals)', 'Professional Goals')}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {goals.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 shrink-0 font-bold">▸</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Direct Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-900 border border-slate-700/80 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('ទំនាក់ទំនងអ្នកអភិវឌ្ឍន៍ដោយផ្ទាល់ (Direct Contact)', 'Direct Contact')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href={`mailto:${dev.email}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white transition-colors border border-slate-700/60"
              >
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="truncate">{dev.email}</span>
              </a>
              <a
                href={`tel:${dev.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white transition-colors border border-slate-700/60"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dev.phone} (Phone / Telegram)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
