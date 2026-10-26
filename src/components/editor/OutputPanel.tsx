import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Trash2,
  ArrowRight,
  Copy,
  Check,
  Lightbulb,
  FileCode,
  Bug,
  Split,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { ExecutionResult } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../common/Badge';

export interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  stdin: string;
  onStdinChange: (val: string) => void;
  onClear: () => void;
  expectedOutput?: string;
  onOpenSettings?: () => void;
}

type OutputTab = 'output' | 'compile' | 'runtime' | 'compare' | 'stdin';

function getKhmerErrorDiagnosis(stderr: string): string | null {
  if (stderr.includes("';' expected")) {
    return '💡 គន្លឹះដោះស្រាយ: អ្នកប្រហែលជាភ្លេចសញ្ញាក្បៀសកាត់ semicolon (;) នៅចុងបន្ទាត់កូដណាមួយ។ ក្នុង Java គ្រប់ឃ្លាបញ្ជាត្រូវតែបញ្ចប់ដោយ ";" ជានិច្ច។';
  }
  if (stderr.includes('cannot find symbol')) {
    return '💡 គន្លឹះដោះស្រាយ: Java រកមិនឃើញអថេរ ឬ Method ដែលអ្នកបានហៅឡើយ។ សូមពិនិត្យអក្ខរាវិរុទ្ធ (Spelling) ថាតើឈ្មោះដូចគ្នានឹងការប្រកាសដែរឬទេ (Java ប្រកាន់អក្សរតូចធំ Case-sensitive)។';
  }
  if (stderr.includes('is public, should be declared in a file named')) {
    return '💡 គន្លឹះដោះស្រាយ: នៅក្នុង Sandbox ប្រសិនបើអ្នកបង្កើត Class ច្រើន សូមដកពាក្យ "public" ចេញពី Class ជំនួយ ដោយទុកត្រឹម "class Name { ... }"។';
  }
  if (stderr.includes('ArrayIndexOutOfBoundsException')) {
    return '💡 គន្លឹះដោះស្រាយ: អ្នកបានហៅ Index លើសពីទំហំជាក់ស្តែងនៃ Array។ សូមចាំថា Array រាប់ចាប់ពី 0 ដល់ length - 1 (បើ array ទំហំ 5 មាន Index ពី 0 ដល់ 4 ប៉ុណ្ណោះ)។';
  }
  if (stderr.includes('NullPointerException')) {
    return '💡 គន្លឹះដោះស្រាយ: Object ដែលអ្នកកំពុងហៅ method ឬ field មិនទាន់ត្រូវបានបង្កើត (Instantiate) ដោយពាក្យ "new" នៅឡើយទេ (តម្លៃនៅជា null)។';
  }
  if (stderr.includes('ArithmeticException: / by zero')) {
    return '💡 គន្លឹះដោះស្រាយ: កម្មវិធីបានព្យាយាមចែកចំនួនគត់នឹង 0 (Integer Division by Zero) ដែលច្បាប់គណិតវិទ្យាមិនអនុញ្ញាតឡើយ។';
  }
  if (stderr.includes('reached end of file while parsing')) {
    return '💡 គន្លឹះដោះស្រាយ: អ្នកប្រហែលជាភ្លេចបិទសញ្ញាវង់ក្រចកទម្រង់ "}" នៅចុងបញ្ចប់នៃ Class ឬ Method។';
  }
  if (stderr.includes('StackOverflowError')) {
    return '💡 គន្លឹះដោះស្រាយ: Method Recursion របស់អ្នកបានហៅខ្លួនឯងមិនចេះចប់ ដោយគ្មាន Base Case បញ្ឈប់ ធ្វើឱ្យពេញ Stack Memory របស់ JVM។';
  }
  return null;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  result,
  isRunning,
  stdin,
  onStdinChange,
  onClear,
  expectedOutput,
  onOpenSettings,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<OutputTab>('output');
  const [copied, setCopied] = useState(false);

  // Auto switch tab when result arrives
  useEffect(() => {
    if (result) {
      if (result.status === 'compilation_error') {
        setActiveTab('compile');
      } else if (result.status === 'runtime_error' || result.status === 'timeout') {
        setActiveTab('runtime');
      } else if (expectedOutput) {
        setActiveTab('compare');
      } else {
        setActiveTab('output');
      }
    }
  }, [result, expectedOutput]);

  const handleCopyOutput = () => {
    const textToCopy = (result?.stdout || '') + (result?.stderr ? '\n' + result.stderr : '');
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const diagnosis = result?.stderr ? getKhmerErrorDiagnosis(result.stderr) : null;

  // Comparison logic
  const normalizedActual = (result?.stdout || '').trim();
  const normalizedExpected = (expectedOutput || '').trim();
  const isMatch = Boolean(expectedOutput && normalizedActual === normalizedExpected);

  return (
    <div className="flex flex-col border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950 text-slate-100 shadow-sm font-mono text-xs">
      {/* Top Header Status Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-900 border-b border-slate-800 font-sans">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="w-4 h-4 text-rose-500 shrink-0" />
          <span className="font-bold text-slate-200 text-xs sm:text-sm">Console Output</span>

          {/* Status Badge */}
          {isRunning ? (
            <Badge variant="warning" size="xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping mr-1" />
              {t('កំពុងដំណើរការ...', 'Running...')}
            </Badge>
          ) : result ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              {result.status === 'success' && (
                <Badge variant="success" size="xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {t('ជោគជ័យ (Exit 0)', 'Success')}
                </Badge>
              )}
              {result.status === 'compilation_error' && (
                <Badge variant="danger" size="xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {t('កំហុស Compile', 'Compile Error')}
                </Badge>
              )}
              {result.status === 'runtime_error' && (
                <Badge variant="warning" size="xs">
                  <Bug className="w-3 h-3 mr-1" />
                  {t('កំហុស Runtime', 'Runtime Error')}
                </Badge>
              )}
              {result.status === 'timeout' && (
                <Badge variant="danger" size="xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {t('ផុតកំណត់ពេល (15s)', 'Timed Out')}
                </Badge>
              )}
              {result.status === 'service_unavailable' && (
                <Badge variant="neutral" size="xs">
                  {t('សេវាត្រូវបានបិទ', 'Disabled')}
                </Badge>
              )}

              {result.executionTimeMs !== undefined && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <Clock className="w-3 h-3" />
                  {result.executionTimeMs}ms
                </span>
              )}
            </div>
          ) : (
            <Badge variant="neutral" size="xs">
              {t('ត្រៀមខ្លួន (Ready)', 'Ready')}
            </Badge>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={t('ការកំណត់ Sandbox Runner', 'Sandbox Runner Settings')}
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          )}

          {(result?.stdout || result?.stderr) && (
            <button
              onClick={handleCopyOutput}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={t('ចម្លងលទ្ធផល', 'Copy output')}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={onClear}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title={t('សម្អាតលទ្ធផល', 'Clear output')}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 font-sans text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('output')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
            activeTab === 'output'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Terminal className="w-3 h-3 text-emerald-400" />
          <span>{t('លទ្ធផល (Output)', 'Program Output')}</span>
          {result?.stdout && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          )}
        </button>

        {/* Compilation Error Tab (shows indicator if errors exist) */}
        <button
          onClick={() => setActiveTab('compile')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
            activeTab === 'compile'
              ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
              : result?.compilationError
              ? 'text-rose-400 hover:bg-rose-950/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <FileCode className="w-3 h-3 text-rose-400" />
          <span>{t('កំហុស Compile', 'Compile Errors')}</span>
          {result?.compilationError && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-900 text-rose-200 text-[10px] font-bold">
              !
            </span>
          )}
        </button>

        {/* Runtime Error Tab */}
        <button
          onClick={() => setActiveTab('runtime')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
            activeTab === 'runtime'
              ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
              : result?.runtimeError
              ? 'text-amber-400 hover:bg-amber-950/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Bug className="w-3 h-3 text-amber-400" />
          <span>{t('កំហុសពេលរត់ (Runtime)', 'Runtime Errors')}</span>
          {result?.runtimeError && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-900 text-amber-200 text-[10px] font-bold">
              !
            </span>
          )}
        </button>

        {/* Compare Output Tab (if expected output defined) */}
        {expectedOutput && (
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
              activeTab === 'compare'
                ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Split className="w-3 h-3 text-indigo-400" />
            <span>{t('ប្រៀបធៀបលទ្ធផល', 'Compare Output')}</span>
            {result && (
              <span
                className={`w-2 h-2 rounded-full ${
                  isMatch ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
            )}
          </button>
        )}

        {/* Stdin Tab */}
        <button
          onClick={() => setActiveTab('stdin')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ml-auto ${
            activeTab === 'stdin'
              ? 'bg-slate-800 text-amber-300 border border-amber-800/80'
              : stdin
              ? 'text-amber-400 hover:bg-slate-850'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <ArrowRight className="w-3 h-3 text-amber-400" />
          <span>Stdin {stdin ? '●' : ''}</span>
        </button>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 min-h-[190px] max-h-[360px] overflow-y-auto whitespace-pre-wrap font-mono leading-relaxed select-text">
        {/* Loading State */}
        {isRunning && (
          <div className="flex items-center gap-2 text-slate-400 animate-pulse font-sans py-8 justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs">
              {t(
                'កំពុង Compile និងដំណើរការលើ OpenJDK 21 Sandbox (Wandbox)...',
                'Compiling and running on OpenJDK 21 Sandbox (Wandbox)...'
              )}
            </span>
          </div>
        )}

        {/* Idle Blank State */}
        {!isRunning && !result && activeTab !== 'stdin' && (
          <div className="text-slate-500 italic py-8 text-center font-sans space-y-2">
            <Terminal className="w-8 h-8 text-slate-600 mx-auto stroke-1" />
            <p className="text-xs">
              {t(
                'ចុចប៊ូតុង "ដំណើរការ" (Run) ឬចុច Ctrl+Enter ដើម្បីរត់កូដ Java លើ Sandbox ពិតប្រាកដ។',
                'Click "Run" or press Ctrl+Enter to execute Java code in the secure sandbox.'
              )}
            </p>
          </div>
        )}

        {/* TAB 1: Program Standard Output (stdout) */}
        {!isRunning && activeTab === 'output' && result && (
          <div className="space-y-3">
            {result.stdout ? (
              <div className="text-emerald-400 font-mono text-xs leading-relaxed">
                {result.stdout}
              </div>
            ) : result.isError ? (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 font-sans text-xs">
                {t(
                  '⚠️ កម្មវិធីមិនបានបង្កើត Output ឡើយដោយសារមានកំហុស។ សូមពិនិត្យផ្ទាំង "កំហុស Compile" ឬ "កំហុសពេលរត់"។',
                  '⚠️ No standard output generated due to an error. Check the Compile or Runtime error tabs.'
                )}
              </div>
            ) : (
              <div className="text-slate-400 italic font-sans text-xs">
                {t(
                  '✓ កម្មវិធីដំណើរការចប់ដោយជោគជ័យ (Exit 0) ដោយគ្មាន Output បង្ហាញឡើយ។',
                  '✓ Process completed successfully (Exit 0) with no standard output.'
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Compilation Errors */}
        {!isRunning && activeTab === 'compile' && (
          <div className="space-y-3">
            {result?.compilationError ? (
              <div className="space-y-3">
                <div className="text-rose-400 bg-rose-950/40 p-3.5 rounded-xl border border-rose-900/60 font-mono text-xs whitespace-pre-wrap">
                  <div className="text-[11px] font-bold text-rose-300 font-sans flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t('កំហុសពេល Compile (javac compiler error):', 'Java Compiler Diagnostic Output:')}</span>
                  </div>
                  {result.compilationError}
                </div>

                {diagnosis && (
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-300 font-sans text-xs flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">{diagnosis}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-500 italic py-6 text-center font-sans">
                {t('✓ គ្មានកំហុស Compile ឡើយ (No compilation errors).', '✓ No compilation errors detected.')}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Runtime Errors */}
        {!isRunning && activeTab === 'runtime' && (
          <div className="space-y-3">
            {result?.runtimeError || result?.isTimeout ? (
              <div className="space-y-3">
                <div className="text-rose-300 bg-rose-950/40 p-3.5 rounded-xl border border-rose-900/60 font-mono text-xs whitespace-pre-wrap">
                  <div className="text-[11px] font-bold text-rose-300 font-sans flex items-center gap-1.5 mb-1.5">
                    <Bug className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t('កំហុសពេលរត់កម្មវិធី (Runtime Exception / Stack Trace):', 'Runtime Exception & Stack Trace:')}</span>
                  </div>
                  {result.runtimeError || result.stderr}
                </div>

                {diagnosis && (
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-300 font-sans text-xs flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">{diagnosis}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-500 italic py-6 text-center font-sans">
                {t('✓ គ្មានកំហុសពេលរត់ឡើយ (No runtime exceptions).', '✓ No runtime exceptions detected.')}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Compare Output with Expected Output */}
        {!isRunning && activeTab === 'compare' && expectedOutput && (
          <div className="space-y-4 font-sans">
            {/* Verdict Card */}
            <div
              className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                isMatch
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-800 text-amber-300'
              }`}
            >
              {isMatch ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-xs font-bold">
                    {t(
                      '✓ លទ្ធផលកូដរបស់អ្នកត្រូវគ្នាបេះបិទនឹងការរំពឹងទុក! (Output Matches Exactly)',
                      '✓ Output matches the expected output exactly!'
                    )}
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-xs font-bold">
                    {t(
                      '⚠️ លទ្ធផលកូដរបស់អ្នកខុសគ្នាពីការរំពឹងទុក (Output Differs)',
                      '⚠️ Output does not match the expected result. Check formatting or whitespace.'
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Side-by-side comparison grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              {/* Expected Output Card */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <span>📌</span>
                  <span>{t('លទ្ធផលរំពឹងទុក (Expected):', 'Expected Output:')}</span>
                </div>
                <pre className="text-indigo-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                  {normalizedExpected || t('(គ្មាន)', '(None)')}
                </pre>
              </div>

              {/* Actual Output Card */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <span>💻</span>
                  <span>{t('លទ្ធផលជាក់ស្តែងរបស់អ្នក (Actual):', 'Your Actual Output:')}</span>
                </div>
                <pre
                  className={`whitespace-pre-wrap overflow-x-auto leading-relaxed ${
                    isMatch ? 'text-emerald-400' : 'text-amber-300'
                  }`}
                >
                  {normalizedActual || t('(គ្មានទិន្នន័យ)', '(No output)')}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Stdin Input Panel */}
        {activeTab === 'stdin' && (
          <div className="space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {t(
                    'ទិន្នន័យបញ្ចូលជាមុនសម្រាប់ Scanner (Stdin) - មួយបន្ទាត់សម្រាប់មួយ Input:',
                    'Console Standard Input (Stdin) for Scanner - one line per token:'
                  )}
                </span>
              </label>
              {stdin && (
                <button
                  onClick={() => onStdinChange('')}
                  className="text-[11px] text-slate-400 hover:text-rose-400"
                >
                  {t('សម្អាត Stdin', 'Clear Stdin')}
                </button>
              )}
            </div>

            <textarea
              value={stdin}
              onChange={(e) => onStdinChange(e.target.value)}
              rows={4}
              placeholder={t('ឧទាហរណ៍:\nសុខ សំណាង\n25\n3.85', 'Example:\nSokha\n25\n3.85')}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />

            <div className="text-[11px] text-slate-400 flex items-start gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {t(
                  'នៅពេលកូដរបស់អ្នកហៅ scanner.nextLine() ឬ scanner.nextInt() ប្រព័ន្ធនឹងអានទិន្នន័យពីប្រអប់នេះតាមលំដាប់ជួរ។',
                  'When code invokes scanner.nextLine() or nextInt(), tokens are consumed sequentially from this input.'
                )}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Security and Sandbox Info Badge */}
      <div className="px-3 sm:px-4 py-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-sans">
        <div className="flex items-center gap-1.5 truncate">
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">
            {result?.provider === 'local'
              ? t('ដំណើរការលើ Custom Local Runner', 'Custom Local Runner')
              : result?.provider === 'mock-sandbox'
              ? t('សេវា Sandbox មិនទាន់កំណត់ (Unconfigured)', 'Sandbox Unconfigured')
              : t('OpenJDK 21 Sandbox (Wandbox Isolated Cloud)', 'OpenJDK 21 Sandbox (Wandbox Isolated Cloud)')}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-slate-400 font-mono">Max 15s | UTF-8</span>
        </div>
      </div>
    </div>
  );
};
