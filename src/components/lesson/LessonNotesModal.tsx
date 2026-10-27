import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  FileEdit,
  Save,
  Trash2,
  Cloud,
  CheckCircle2,
  AlertCircle,
  WifiOff,
} from 'lucide-react';
import { Button } from '../common/Button';

interface LessonNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonSlug: string;
  lessonTitle: string;
}

export const LessonNotesModal: React.FC<LessonNotesModalProps> = ({
  isOpen,
  onClose,
  lessonSlug,
  lessonTitle,
}) => {
  const { t } = useLanguage();
  const { getNote, saveNote, deleteNote, syncStatus } = useProgress();
  const { user } = useAuth();

  const [noteContent, setNoteContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load existing note when modal opens or lessonSlug changes
  useEffect(() => {
    if (isOpen) {
      setNoteContent(getNote(lessonSlug));
      setIsSaved(false);
      setShowDeleteConfirm(false);
    }
  }, [isOpen, lessonSlug, getNote]);

  // Handle escape key
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

  const handleSave = async () => {
    await saveNote(lessonSlug, noteContent);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDelete = async () => {
    await deleteNote(lessonSlug);
    setNoteContent('');
    setShowDeleteConfirm(false);
    setIsSaved(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-notes-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden font-sans flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h3 id="lesson-notes-title" className="text-sm font-bold text-slate-900 dark:text-white">
                {t('កំណត់ចំណាំផ្ទាល់ខ្លួន (Personal Notes)', 'Personal Study Notes')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {lessonTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={t('បិទ', 'Close')}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sync Indicator Notice */}
        <div className="px-6 py-2 bg-slate-100 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            {syncStatus === 'offline' ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('របៀបក្រៅបណ្តាញ (រក្សាទុកលើ Browser)', 'Offline mode (Saved in browser)')}</span>
              </>
            ) : syncStatus === 'syncing' ? (
              <>
                <Cloud className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>{t('កំពុងធ្វើសមកាលកម្មលើ Cloud...', 'Syncing to Cloud PostgreSQL...')}</span>
              </>
            ) : syncStatus === 'error' ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>{t('មានបញ្ហាសមកាលកម្ម', 'Cloud Sync error')}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  {user
                    ? t('សមកាលកម្ម Realtime គ្រប់ឧបករណ៍ ☁️', 'Realtime Multi-Device Sync Active ☁️')
                    : t('រក្សាទុកលើម៉ាស៊ីន (សូមចូលគណនីដើម្បី Sync លើ Cloud)', 'Saved locally (Sign in to sync across devices)')}
                </span>
              </>
            )}
          </div>

          {isSaved && (
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {t('បានរក្សាទុក!', 'Saved!')}
            </span>
          )}
        </div>

        {/* Text Area */}
        <div className="p-6 flex-1 overflow-y-auto">
          <label htmlFor="lesson-note-textarea" className="sr-only">
            {t('សរសេរកំណត់ចំណាំរបស់អ្នកនៅទីនេះ', 'Write your note here')}
          </label>
          <textarea
            id="lesson-note-textarea"
            value={noteContent}
            onChange={(e) => {
              setNoteContent(e.target.value);
              setIsSaved(false);
            }}
            placeholder={t(
              'កត់ត្រាគន្លឹះសំខាន់ៗ, កូដចងចាំ, ឬចម្ងល់សម្រាប់មេរៀននេះ... (គាំទ្រការសមកាលកម្មស្វ័យប្រវត្ត)',
              'Write key takeaways, memory triggers, or questions for this lesson... (Synchronized across all your logged-in devices)'
            )}
            className="w-full h-56 sm:h-72 p-4 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none font-mono leading-relaxed"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div>
            {noteContent.trim() && !showDeleteConfirm && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('លុបកំណត់ចំណាំ', 'Delete Note')}</span>
              </button>
            )}

            {showDeleteConfirm && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-500 font-semibold">{t('តើអ្នកប្រាកដទេ?', 'Are you sure?')}</span>
                <button
                  onClick={handleDelete}
                  className="px-2 py-1 rounded bg-rose-600 text-white font-bold hover:bg-rose-700"
                >
                  {t('បាទ/ចាស លុប', 'Yes, Delete')}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700"
                >
                  {t('បោះបង់', 'Cancel')}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              {t('បិទ', 'Close')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              {t('រក្សាទុកកំណត់ចំណាំ', 'Save Note')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
