import React, { useState } from 'react';
import { Terminal, Clock, CheckCircle2, AlertTriangle, Shield, Trash2, ArrowRight, Copy, Check, Lightbulb } from 'lucide-react';
import { ExecutionResult } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  stdin: string;
  onStdinChange: (val: string) => void;
  onClear: () => void;
}

function getKhmerErrorDiagnosis(stderr: string): string | null {
  if (stderr.includes("';' expected")) {
    return '💡 គន្លឹះដោះស្រាយ: អ្នកប្រហែលជាភ្លេចសញ្ញាក្បៀសកាត់ semicolon (;) នៅចុងបន្ទាត់កូដណាមួយ។';
  }
  if (stderr.includes('cannot find symbol')) {
    return '💡 គន្លឹះដោះស្រាយ: Java រកមិនឃើញអថេរ ឬ Method ដែលអ្នកបានហៅឡើយ។ សូមពិនិត្យអក្ខរាវិរុទ្ធ (Spelling) ឬប្រកាសអថេរជាមុនសិន (Java ប្រកាន់អក្សរតូចធំ Case-sensitive)។';
  }
  if (stderr.includes('is public, should be declared in a file named')) {
    return '💡 គន្លឹះដោះស្រាយ: នៅក្នុង Sandbox ប្រសិនបើអ្នកបង្កើត Class ច្រើន សូមដកពាក្យ "public" ចេញពី Class ជំនួយ ដោយទុកត្រឹម "class Name { ... }"។';
  }
  if (stderr.includes('ArrayIndexOutOfBoundsException')) {
    return '💡 គន្លឹះដោះស្រាយ: អ្នកបានហៅ Index លើសពីទំហំជាក់ស្តែងនៃ Array។ សូមចាំថា Array រាប់ចាប់ពី 0 ដល់ length - 1។';
  }
  if (stderr.includes('NullPointerException')) {
    return '💡 គន្លឹះដោះស្រាយ: Object ដែលអ្នកកំពុងហៅ method មិនទាន់ត្រូវបានបង្កើត (Instantiate) ដោយពាក្យ "new" នៅឡើយទេ (តម្លៃនៅជា null)។';
  }
  if (stderr.includes('reached end of file while parsing')) {
    return '💡 គន្លឹះដោះស្រាយ: អ្នកប្រហែលជាភ្លេចបិទសញ្ញាវង់ក្រចកទម្រង់ "}" នៅចុងបញ្ចប់នៃ Class ឬ Method។';
  }
  return null;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  result,
  isRunning,
  stdin,
  onStdinChange,
  onClear,
}) => {
  const { t } = useLanguage();
  const [showStdin, setShowStdin] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyOutput = () => {
    const textToCopy = (result?.stdout || '') + (result?.stderr ? '\n' + result.stderr : '');
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const diagnosis = result?.stderr ? getKhmerErrorDiagnosis(result.stderr) : null;

  return (
    <div className="flex flex-col border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950 text-slate-100 shadow-sm font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-rose-500" />
          <span className="font-semibold text-slate-200">Terminal Output</span>

          {result && !isRunning && (
            <div className="flex items-center gap-2 ml-2">
              {result.isError ? (
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-rose-950/80 text-rose-400 border border-rose-800">
                  <AlertTriangle className="w-3 h-3" />
                  Exit: {result.exitCode}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  Success
                </span>
              )}

              {result.executionTimeMs !== undefined && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  {result.executionTimeMs}ms
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Stdin Toggle */}
          <button
            onClick={() => setShowStdin(!showStdin)}
            className={`px-2 py-1 rounded-lg text-[11px] font-sans font-medium transition-colors ${
              showStdin || stdin
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title={t('បញ្ចូលទិន្នន័យសម្រាប់ Scanner (Stdin)', 'Provide Scanner stdin input')}
          >
            {t('បញ្ចូលទិន្នន័យ (Stdin)', 'Stdin')} {stdin ? '●' : ''}
          </button>

          {/* Copy output button */}
          {(result?.stdout || result?.stderr) && (
            <button
              onClick={handleCopyOutput}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              title={t('ចម្លងលទ្ធផល', 'Copy output')}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Clear button */}
          <button
            onClick={onClear}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            title={t('សម្អាតលទ្ធផល', 'Clear output')}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stdin Input Drawer if expanded */}
      {showStdin && (
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 font-sans">
          <label className="block text-[11px] font-medium text-amber-300 mb-1 flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-amber-400" />
            {t(
              'ទិន្នន័យបញ្ចូលជាមុនសម្រាប់ Scanner (Stdin) - ចុះបន្ទាត់សម្រាប់ធាតុនីមួយៗ:',
              'Standard Input (Stdin) for Scanner - one line per input:'
            )}
          </label>
          <textarea
            value={stdin}
            onChange={(e) => onStdinChange(e.target.value)}
            rows={2}
            placeholder={t('ឧទាហរណ៍:\nសុខា\n95', 'Example:\nSokha\n95')}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
          />
        </div>
      )}

      {/* Terminal Content Body */}
      <div className="p-4 min-h-[160px] max-h-[300px] overflow-y-auto whitespace-pre-wrap font-mono leading-relaxed select-text">
        {isRunning && (
          <div className="flex items-center gap-2 text-slate-400 animate-pulse font-sans">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>{t('កំពុង Compile និងដំណើរការលើ OpenJDK Sandbox...', 'Compiling and running on OpenJDK Sandbox...')}</span>
          </div>
        )}

        {!isRunning && !result && (
          <div className="text-slate-500 italic py-6 text-center font-sans">
            {t(
              'ចុចប៊ូតុង "ដំណើរការ" (Run) ឬចុច Ctrl+Enter ដើម្បីរត់កូដ Java លើ Sandbox ពិតប្រាកដ។',
              'Click "Run" or press Ctrl+Enter to execute Java code in the secure sandbox.'
            )}
          </div>
        )}

        {!isRunning && result && (
          <div>
            {/* Standard Output */}
            {result.stdout && (
              <div className="text-emerald-400 mb-2">
                {result.stdout}
              </div>
            )}

            {/* Error output */}
            {result.stderr && (
              <div className="text-rose-400 bg-rose-950/30 p-3 rounded-xl border border-rose-900/60 mb-2">
                {result.stderr}
              </div>
            )}

            {/* Khmer Diagnostic Hint */}
            {diagnosis && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-300 font-sans text-xs mb-2 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{diagnosis}</span>
              </div>
            )}

            {/* If neither stdout nor stderr */}
            {!result.stdout && !result.stderr && (
              <div className="text-slate-400 italic">
                {t('(កម្មវិធីដំណើរការចប់ដោយជោគជ័យ ដោយគ្មាន Output បង្ហាញឡើយ)', '(Process finished with no output)')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Security and Sandbox Info Badge */}
      <div className="px-3 py-1.5 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-sans">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {result?.isRealExecution
              ? t('ដំណើរការលើ OpenJDK 21 Sandbox ពិតប្រាកដ (Wandbox)', 'Executed on genuine OpenJDK 21 Sandbox')
              : t('ប្រព័ន្ធការពារ Sandboxed Java Runtime', 'Protected Sandboxed Java Runtime')}
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">UTF-8 Enabled</span>
      </div>
    </div>
  );
};
