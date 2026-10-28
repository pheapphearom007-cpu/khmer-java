import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Scale } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 overflow-hidden font-sans text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Scale className="w-5 h-5" />
              </span>
              <h2 id="legal-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t('សេចក្តីប្រកាសផ្លូវច្បាប់ កម្មសិទ្ធិបញ្ញា & អាជ្ញាប័ណ្ណ', 'Legal, Intellectual Property & Licensing')}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {t(
                'តម្លាភាពនៃភាពជាម្ចាស់ និក្ខេបសញ្ញា និងការប្រើប្រាស់ស្របច្បាប់នៃ Khmer Java Academy',
                'Ownership transparency, registered trademarks, and fair use policies for Khmer Java Academy'
              )}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={t('បិទផ្ទាំង', 'Close modal')}
            className="p-2.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1: Independent Platform & W3Schools Relationship */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <h3 className="text-sm font-bold text-white">
              {t('ភាពឯករាជ្យ និងទំនាក់ទំនងជាមួយ W3Schools', 'Independence & W3Schools Relationship')}
            </h3>
            <p>
              {t(
                'Khmer Java Academy គឺជាវេទិកាអប់រំបច្ចេកវិទ្យាឯករាជ្យ ១០០% បង្កើតឡើងដើម្បីជួយសិស្ស-និស្សិតកម្ពុជា។ វេទិកានេះពុំមានការឧបត្ថម្ភ ជាប់ពាក់ព័ន្ធ ឬជាដៃគូផ្លូវការជាមួយក្រុមហ៊ុន Refsnes Data AS ឬគេហទំព័រ W3Schools ឡើយ។',
                'Khmer Java Academy is an independent educational initiative created to empower Cambodian learners. This platform is NOT affiliated with, sponsored by, authorized by, or endorsed by Refsnes Data AS or W3Schools.'
              )}
            </p>
            <p className="text-slate-400">
              {t(
                'W3Schools® គឺជានិក្ខេបសញ្ញាចុះបញ្ជីរបស់ក្រុមហ៊ុន Refsnes Data AS។ រាល់តំណភ្ជាប់ (hyperlinks) ទៅកាន់ W3Schools ត្រូវបានផ្តល់ជូនក្នុងគោលបំណងជាឯកសារយោងសិក្សាខាងក្រៅបន្ថែម (Nominative Fair Use) តែប៉ុណ្ណោះ។ គ្មានមាតិកា អត្ថបទ ឬរូបភាពរបស់ W3Schools ត្រូវបានចម្លង (copy) ឬបង្កប់ (iframe frame) ក្នុងវេទិកានេះឡើយ។',
                'W3Schools® is a registered trademark of Refsnes Data AS. Outbound links to W3Schools tutorials are provided strictly as external educational references under nominative fair use. No proprietary text, graphics, or code from W3Schools have been copied or framed.'
              )}
            </p>
          </div>

          {/* Section 2: Oracle & Java Trademarks */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <h3 className="text-sm font-bold text-white">
              {t('និក្ខេបសញ្ញា Java® & Oracle Corporation', 'Java® & Oracle Corporation Trademarks')}
            </h3>
            <p>
              {t(
                'Java និង OpenJDK ជានិក្ខេបសញ្ញា ឬនិក្ខេបសញ្ញាចុះបញ្ជីរបស់ Oracle Corporation និង/ឬសាខារបស់ខ្លួននៅសហរដ្ឋអាមេរិក និងបណ្តាប្រទេសដទៃ។ ឈ្មោះ និងនិក្ខេបសញ្ញាផ្សេងទៀតជាកម្មសិទ្ធិរបស់ម្ចាស់រៀងៗខ្លួន។',
                'Java and OpenJDK are registered trademarks of Oracle Corporation and/or its affiliates in the United States and other countries. Other brands and product names are trademarks of their respective holders.'
              )}
            </p>
            <p className="text-slate-400">
              {t(
                'ការប្រើប្រាស់ពាក្យ "Java" ក្នុងឈ្មោះ Khmer Java Academy គឺសម្រាប់តែពណ៌នាអំពីមុខវិជ្ជាភាសាសរសេរកូដដែលត្រូវបានបង្រៀនតែប៉ុណ្ណោះ។ សញ្ញារូបពែងកាហ្វេនៅលើគេហទំព័រគឺជារូបតំណាង Open-source Lucide Icon និង Unicode Emoji (☕) មិនមែនជានិមិត្តសញ្ញាពាណិជ្ជកម្មផ្លូវការរបស់ Oracle ឡើយ។',
                'The use of the word "Java" in Khmer Java Academy serves strictly to describe the programming curriculum taught. The coffee cup icons displayed are standard open-source Lucide icons and Unicode emoji (☕), not Oracle’s proprietary commercial cup logo.'
              )}
            </p>
          </div>

          {/* Section 3: Creator Intellectual Property */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <h3 className="text-sm font-bold text-white">
              {t('កម្មសិទ្ធិបញ្ញារបស់អ្នកបង្កើត (Creator Ownership)', 'Creator Authorship & Intellectual Property')}
            </h3>
            <p>
              {t(
                'Khmer Java Academy ត្រូវបានបង្កើត និងដឹកនាំអភិវឌ្ឍន៍ដោយ Pheap Phirom។ រាល់អត្ថបទពន្យល់ដើមជាភាសាខ្មែរ ការរចនាគេហទំព័រ (UI/UX) ឧទាហរណ៍កូដដើម លំហាត់អនុវត្តអន្តរកម្ម គម្រោងអនុវត្តទាំង ៥ និងប្រព័ន្ធតេស្តវាស់ស្ទង់សមត្ថភាព គឺជាកម្មសិទ្ធិបញ្ញារបស់អ្នកបង្កើត។',
                'Khmer Java Academy was designed and created by Pheap Phirom. All original Khmer explanations, UI/UX architecture, custom interactive exercises, 5 guided projects, and diagnostic assessment questions are the intellectual property of the author.'
              )}
            </p>
            <p className="text-slate-400">
              {t(
                'អ្នកបង្កើតមិនទាមទារសិទ្ធិលើភាសា Java, បណ្ណាល័យកូដចំហ (Open Source Libraries) ឬសេវាកម្មខាងក្រៅដូចជា OpenJDK Wandbox និង Google Gemini ឡើយ។',
                'The creator does not claim ownership of the Java language specification, third-party open-source libraries, or external execution infrastructure (Wandbox / OpenJDK / Google Gemini).'
              )}
            </p>
          </div>

          {/* Section 4: Open Source Licenses & Third-Party Credits */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2.5">
            <h3 className="text-sm font-bold text-white">
              {t('បណ្ណាល័យកូដចំហ និងឥណទាន (Open Source Credits)', 'Open Source Licenses & Credits')}
            </h3>
            <p>
              {t(
                'វេទិកានេះត្រូវបានកសាងឡើងដោយប្រើប្រាស់បច្ចេកវិទ្យាកូដចំហដែលមានអាជ្ញាប័ណ្ណអនុញ្ញាតស្របច្បាប់៖',
                'This platform is proudly built using permissive open-source software technologies:'
              )}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200">React & React DOM</span> — MIT License
              </li>
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200">Lucide React Icons</span> — ISC License
              </li>
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200">Monaco Editor React</span> — MIT License
              </li>
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200">Vite & Tailwind CSS</span> — MIT License
              </li>
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200">Supabase Client</span> — MIT License
              </li>
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200">Google Fonts (Kantumruy Pro)</span> — SIL OFL 1.1
              </li>
            </ul>
            <p className="text-[11px] text-slate-500 pt-1">
              {t(
                'រូបភាពចម្លាក់អប្សរាប្រាសាទអង្គរវត្តត្រូវបានប្រើប្រាស់ជាកិត្តិយស និងមោទនភាពជាតិខ្មែរក្រោមគោលការណ៍បេតិកភណ្ឌសាធារណៈ (Public Domain / Creative Commons)។',
                'Angkor Wat Apsara relief carvings are featured in honor of Cambodian cultural heritage under public domain and Creative Commons attribution standards.'
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            {t('ព័ត៌មានលម្អិតបន្ថែម ឬសំណួរច្បាប់:', 'For inquiries or rights queries:')}{' '}
            <a href="mailto:pheapphearom007@gmail.com" className="text-rose-400 hover:underline">
              pheapphearom007@gmail.com
            </a>
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            {t('យល់ព្រម & បិទ', 'Acknowledge & Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
