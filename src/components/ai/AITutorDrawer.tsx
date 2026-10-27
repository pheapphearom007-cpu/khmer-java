import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Sparkles,
  Bug,
  Lightbulb,
  Send,
  X,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  Loader2,
  BookOpen,
  Flame,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { aiTutorService } from '../../services/aiTutorService';
import { AIMessage, AITutorAction, AITutorStatus } from '../../types/ai';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCode?: string;
  activeError?: string;
  lessonTitle?: string;
  lessonSlug?: string;
}

const INITIAL_WELCOME_KM = `សួស្តីប្អូន! ខ្ញុំជា **លោកគ្រូ Java AI** (KJA AI Java Tutor) ☕🇰🇭

ខ្ញុំអាចជួយប្អូនលើការរៀន Java 21 និងកម្មវិធីសិក្សា Khmer Java Academy ដូចជា៖
- ពន្យល់កូដមួយជួរៗ (Explain Code)
- ស្វែងរកកំហុសក្នុងកូដ ឬ Error (Find the Bug)
- ផ្តល់តម្រុយជំនួយជាជំហានៗ (Give Me a Hint)
- សម្រួលការពន្យល់ឱ្យកាន់តែងាយយល់ (Simplify Explanation)
- បង្កើតលំហាត់អនុវត្តថ្មីតាមកម្រិត (Generate Practice)

តើប្អូនមានចម្ងល់ ឬចង់ឱ្យខ្ញុំជួយលើចំណុចណាដែរ?`;

const INITIAL_WELCOME_EN = `Hello! I am your **AI Java Tutor** at Khmer Java Academy ☕🇰🇭

I specialize in Java 21 and the Khmer Java Academy curriculum. I can help you:
- Explain code line-by-line
- Diagnose compiler and runtime errors
- Provide progressive hints before revealing solutions
- Simplify concepts with real-world Cambodian analogies
- Generate personalized practice challenges

How can I assist your Java learning journey today?`;

export const AITutorDrawer: React.FC<AITutorDrawerProps> = ({
  isOpen,
  onClose,
  activeCode,
  activeError,
  lessonTitle,
  lessonSlug,
}) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<AIMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: language === 'km' ? INITIAL_WELCOME_KM : INITIAL_WELCOME_EN,
        timestamp: Date.now(),
      },
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [status, setStatus] = useState<AITutorStatus | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load status on open
  useEffect(() => {
    if (isOpen) {
      aiTutorService.getStatus().then(setStatus).catch(() => {});
    }
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Listen for Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (customPrompt?: string, action?: AITutorAction) => {
    const promptToSend = (customPrompt || inputPrompt).trim();
    if (!promptToSend && !action) return;

    const userMsgId = `usr_${Date.now()}`;
    const newMessages: AIMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        content: promptToSend || (action ? `[Action: ${action}]` : ''),
        actionType: action,
        timestamp: Date.now(),
      },
    ];

    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await aiTutorService.askTutor({
        prompt: promptToSend,
        actionType: action || 'chat',
        codeContext: activeCode,
        errorContext: activeError,
        lessonTitle,
        lessonSlug,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `ast_${Date.now()}`,
          role: 'assistant',
          content: response.message,
          actionType: response.actionType,
          isVerifiedExecution: response.isVerifiedExecution,
          isFallback: response.isFallback,
          timestamp: Date.now(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content:
            language === 'km'
              ? '⚠️ សេវាកម្ម AI កំពុងរវល់ ឬជួបបញ្ហាបច្ចេកទេសបណ្តោះអាសន្ន។ សូមសាកល្បងម្តងទៀតនៅបន្តិចក្រោយ។'
              : '⚠️ The AI service is currently unavailable. Please try again shortly.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: language === 'km' ? INITIAL_WELCOME_KM : INITIAL_WELCOME_EN,
        timestamp: Date.now(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 xl:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('លោកគ្រូ Java AI', 'AI Java Tutor')}
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] md:w-[500px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
              <Bot className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                  {t('លោកគ្រូ Java AI', 'AI Java Tutor')}
                </h3>
                <Badge variant="brand" size="xs">
                  Java 21
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lessonTitle ? `${t('មេរៀន:', 'Lesson:')} ${lessonTitle}` : t('ជំនួយការរៀនកូដឆ្លាតវៃ', 'Smart Learning Companion')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              title={t('សម្អាតប្រវត្តិសន្ទនា', 'Clear chat')}
              aria-label={t('សម្អាតប្រវត្តិសន្ទនា', 'Clear chat')}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={onClose}
              title={t('បិទ', 'Close')}
              aria-label={t('បិទផ្ទាំងជំនួយការ AI', 'Close AI tutor drawer')}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

      {/* Contextual Action Bar */}
      <div className="px-4 py-2.5 bg-rose-50/50 dark:bg-rose-950/20 border-b border-rose-100 dark:border-rose-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
        <button
          disabled={isLoading}
          onClick={() => handleSendMessage(t('សូមពន្យល់កូដមួយជួរៗ', 'Please explain this code line by line'), 'explain_code')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium whitespace-nowrap transition-all shadow-2xs"
        >
          <BookOpen className="w-3.5 h-3.5 text-rose-500" />
          <span>{t('Explain Code', 'Explain Code')}</span>
        </button>

        <button
          disabled={isLoading}
          onClick={() => handleSendMessage(t('សូមស្វែងរកកំហុស និងវិធីកែប្រែ', 'Please find the bug and show how to fix it'), 'find_bug')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 font-medium whitespace-nowrap transition-all shadow-2xs"
        >
          <Bug className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('Find Bug', 'Find the Bug')}</span>
        </button>

        <button
          disabled={isLoading}
          onClick={() => handleSendMessage(t('សូមផ្តល់តម្រុយជំនួយ', 'Give me a hint'), 'give_hint')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium whitespace-nowrap transition-all shadow-2xs"
        >
          <Lightbulb className="w-3.5 h-3.5 text-emerald-500" />
          <span>{t('Give Hint', 'Give Me a Hint')}</span>
        </button>

        <button
          disabled={isLoading}
          onClick={() => handleSendMessage(t('សូមពន្យល់ឱ្យកាន់តែងាយ', 'Simplify this explanation'), 'simplify')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium whitespace-nowrap transition-all shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>{t('Simplify', 'Simplify')}</span>
        </button>

        <button
          disabled={isLoading}
          onClick={() => handleSendMessage(t('សូមបង្កើតលំហាត់អនុវត្តថ្មី', 'Generate a practice exercise'), 'generate_practice')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap transition-all shadow-2xs"
        >
          <Flame className="w-3.5 h-3.5 text-purple-500" />
          <span>{t('Practice', 'Generate Practice')}</span>
        </button>
      </div>

      {/* Limitation Notice Banner */}
      <div className="px-4 py-2 bg-amber-50/70 dark:bg-amber-950/30 border-b border-amber-200/50 dark:border-amber-900/30 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <span className="leading-tight">
          {t(
            'AI ជាជំនួយការរៀនសូត្របន្ថែម។ កូដដែលបង្កើតគួរតែត្រូវបានផ្ទៀងផ្ទាត់ និងដំណើរការក្នុង Sandbox។',
            'AI is an educational assistant. Generated code should be verified and tested in the OpenJDK sandbox.'
          )}
        </span>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1 font-medium">
                {isUser ? (
                  <span>{t('អ្នកសិក្សា (You)', 'You')}</span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                    <Bot className="w-3 h-3" />
                    <span>{t('លោកគ្រូ Java AI', 'Java AI Tutor')}</span>
                  </span>
                )}
                <span>•</span>
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              <div
                className={`max-w-[90%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  isUser
                    ? 'bg-rose-600 text-white rounded-br-xs shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs'
                }`}
              >
                {msg.content}

                {!isUser && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">{t('បានចម្លង', 'Copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t('ចម្លង', 'Copy')}</span>
                        </>
                      )}
                    </button>

                    {msg.isFallback && (
                      <span className="text-[10px] text-slate-400">
                        {t('Local Expert Engine', 'Local Expert Engine')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 max-w-[70%] text-xs text-slate-500 border border-slate-200 dark:border-slate-700">
            <Loader2 className="w-4 h-4 animate-spin text-rose-600 shrink-0" />
            <span>{t('លោកគ្រូ Java AI កំពុងវិភាគ និងរៀបចំការពន្យល់...', 'Java AI Tutor is thinking...')}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isLoading}
            placeholder={t(
              'សួរសំណួរអំពីកូដ ឬមេរៀន Java...',
              'Ask a question about Java code or lesson...'
            )}
            className="flex-1 px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading || !inputPrompt.trim()}
            isLoading={isLoading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
          <span>{t('ទំនាក់ទំនងជាភាសាខ្មែរធម្មជាតិ', 'Natural Khmer communication')}</span>
          <span>{status?.provider ? `Engine: ${status.provider}` : 'Java 21 LTS'}</span>
        </div>
      </div>
    </div>
    </>
  );
};
