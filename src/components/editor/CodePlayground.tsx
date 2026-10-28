import React, { useState, useEffect } from 'react';
import { JavaEditor } from './JavaEditor';
import { OutputPanel } from './OutputPanel';
import { executionService } from '../../services/executionService';
import { ExecutionResult } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAITutor } from '../../context/AITutorContext';
import { useProgress } from '../../context/ProgressContext';
import { ALL_LESSONS, CURRICULUM_MODULES } from '../../data/curriculum';
import {
  Terminal,
  BookOpen,
  Settings,
  AlertTriangle,
  RotateCcw,
  Check,
  Server,
  Code2,
  X,
  Bot,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface CodePlaygroundProps {
  initialCode?: string;
  initialStdin?: string;
  height?: string;
  title?: string;
  initialExpectedOutput?: string;
}

const STARTER_TEMPLATES = [
  {
    id: 'hello-world',
    nameKm: 'ជំរាបសួរដំបូង (Hello World)',
    nameEn: 'Hello World',
    expectedOutput: 'សួស្តីកម្ពុជា! ស្វាគមន៍មកកាន់ Khmer Java Academy!\nJava 21 ដំណើរការយ៉ាងរលូន។',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("សួស្តីកម្ពុជា! ស្វាគមន៍មកកាន់ Khmer Java Academy!");
        System.out.println("Java 21 ដំណើរការយ៉ាងរលូន។");
    }
}`,
  },
  {
    id: 'variables-math',
    nameKm: 'គណនាលេខ និងអថេរ (Math)',
    nameEn: 'Variables & Math',
    expectedOutput: `ផលបូក: 60\nផលដក: 30\nផលគុណ: 675\nផលចែក: 3.00`,
    code: `public class Main {
    public static void main(String[] args) {
        int a = 45;
        int b = 15;
        System.out.println("ផលបូក: " + (a + b));
        System.out.println("ផលដក: " + (a - b));
        System.out.println("ផលគុណ: " + (a * b));
        System.out.printf("ផលចែក: %.2f%n", ((double) a / b));
    }
}`,
  },
  {
    id: 'scanner-input',
    nameKm: 'ទទួលទិន្នន័យ (Scanner Input)',
    nameEn: 'Scanner Input',
    stdin: 'សុខា\n20\n3.85',
    expectedOutput: `=== ព័ត៌មាននិស្សិត ===\nឈ្មោះ: សុខា | អាយុ: 20 ឆ្នាំ | និទ្ទេស GPA: 3.85`,
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String name = scanner.nextLine();
        int age = scanner.nextInt();
        double gpa = scanner.nextDouble();
        
        System.out.println("=== ព័ត៌មាននិស្សិត ===");
        System.out.printf("ឈ្មោះ: %s | អាយុ: %d ឆ្នាំ | និទ្ទេស GPA: %.2f%n", name, age, gpa);
        scanner.close();
    }
}`,
  },
  {
    id: 'oop-class',
    nameKm: 'ថ្នាក់ និងវត្ថុ (OOP Class & Object)',
    nameEn: 'OOP Class & Object',
    expectedOutput: `និស្សិត: សុខា | GPA: 3.80 | តារាងកិត្តិយស: true\nនិស្សិត: វណ្ណដា | GPA: 3.20 | តារាងកិត្តិយស: false`,
    code: `class Student {
    private String name;
    private double gpa;
    
    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }
    
    public void display() {
        boolean isHonor = gpa >= 3.5;
        System.out.printf("និស្សិត: %s | GPA: %.2f | តារាងកិត្តិយស: %b%n", name, gpa, isHonor);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("សុខា", 3.8);
        Student s2 = new Student("វណ្ណដា", 3.2);
        s1.display();
        s2.display();
    }
}`,
  },
  {
    id: 'collections-arraylist',
    nameKm: 'បណ្តុំទិន្នន័យ ArrayList',
    nameEn: 'ArrayList Collections',
    expectedOutput: `ចំនួនផ្លែឈើ: 3\n1. ស្វាយ\n2. ចេក\n3. ធុរេន`,
    code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("ស្វាយ");
        fruits.add("ចេក");
        fruits.add("ធុរេន");
        
        System.out.println("ចំនួនផ្លែឈើ: " + fruits.size());
        for (int i = 0; i < fruits.size(); i++) {
            System.out.println((i + 1) + ". " + fruits.get(i));
        }
    }
}`,
  },
  {
    id: 'stream-api',
    nameKm: 'Stream API & Lambdas',
    nameEn: 'Stream API & Lambdas',
    expectedOutput: `និស្សិតឆ្នើម:\n- ចិន្តា (3.9)\n- សំណាង (3.8)`,
    code: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("សុខា:3.2", "សំណាង:3.8", "ចិន្តា:3.9");
        
        System.out.println("និស្សិតឆ្នើម:");
        names.stream()
            .filter(entry -> Double.parseDouble(entry.split(":")[1]) >= 3.5)
            .sorted((a, b) -> b.compareTo(a))
            .forEach(e -> {
                String[] parts = e.split(":");
                System.out.println("- " + parts[0] + " (" + parts[1] + ")");
            });
    }
}`,
  },
];

const LOCAL_STORAGE_KEY = 'khmer_java_playground_saved_draft';

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  initialStdin = '',
  height = '460px',
  title,
  initialExpectedOutput,
}) => {
  const { t, language } = useLanguage();
  const { openTutor } = useAITutor();
  const { logLearningActivity } = useProgress();

  // Load saved draft if exists, otherwise fallback to initialCode or first template
  const [savedDraft, setSavedDraft] = useState<string | null>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  });

  const startingCode = initialCode || savedDraft || STARTER_TEMPLATES[0].code;
  const startingExpected = initialExpectedOutput || STARTER_TEMPLATES[0].expectedOutput;

  const [code, setCode] = useState(startingCode);
  const [lastLoadedBaseCode, setLastLoadedBaseCode] = useState(startingCode);
  const [stdin, setStdin] = useState(initialStdin || (savedDraft ? '' : STARTER_TEMPLATES[0].stdin || ''));
  const [expectedOutput, setExpectedOutput] = useState<string>(startingExpected || '');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(savedDraft ? null : STARTER_TEMPLATES[0].id);

  // Modal states
  const [showLessonSelector, setShowLessonSelector] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Settings State
  const [isExecutionDisabled, setIsExecutionDisabled] = useState(() => executionService.isExecutionDisabled());
  const [customRunnerUrl, setCustomRunnerUrl] = useState(() => executionService.getCustomEndpoint() || '');
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  // Track if user has modified code from base
  const isDirty = code.trim() !== lastLoadedBaseCode.trim();

  // Auto-save draft to local storage on change
  useEffect(() => {
    if (code) {
      localStorage.setItem(LOCAL_STORAGE_KEY, code);
      setSavedDraft(code);
    }
  }, [code]);

  const handleRun = async (codeToRun: string) => {
    setIsRunning(true);
    try {
      logLearningActivity('playground_run');
      const res = await executionService.executeJava({
        code: codeToRun,
        stdin,
      });
      setResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setResult({
        stdout: '',
        stderr: msg,
        exitCode: 1,
        isError: true,
        status: 'service_unavailable',
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showDiscardConfirm) setShowDiscardConfirm(false);
        else if (showSettingsModal) setShowSettingsModal(false);
        else if (showLessonSelector) setShowLessonSelector(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDiscardConfirm, showSettingsModal, showLessonSelector]);

  // Guard action when code is dirty
  const runWithDiscardGuard = (action: () => void) => {
    if (isDirty) {
      setPendingAction(() => action);
      setShowDiscardConfirm(true);
    } else {
      action();
    }
  };

  const confirmDiscardAndProceed = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setShowDiscardConfirm(false);
  };

  const loadTemplate = (tmpl: typeof STARTER_TEMPLATES[0]) => {
    runWithDiscardGuard(() => {
      setCode(tmpl.code);
      setLastLoadedBaseCode(tmpl.code);
      setActiveTemplateId(tmpl.id);
      setStdin(tmpl.stdin || '');
      setExpectedOutput(tmpl.expectedOutput || '');
      setResult(null);
    });
  };

  const loadLessonExample = (lessonSlug: string) => {
    const target = ALL_LESSONS.find((l) => l.slug === lessonSlug);
    if (!target || !target.examples[0]) return;

    runWithDiscardGuard(() => {
      const ex = target.examples[0];
      setCode(ex.code);
      setLastLoadedBaseCode(ex.code);
      setActiveTemplateId(null);
      setStdin('');
      setExpectedOutput(ex.expectedOutput || '');
      setResult(null);
      setShowLessonSelector(false);
    });
  };

  const handleSaveSettings = () => {
    executionService.setExecutionDisabled(isExecutionDisabled);
    executionService.setCustomEndpoint(customRunnerUrl);
    setShowSettingsModal(false);
  };

  const handleTestConnection = async () => {
    setIsPinging(true);
    setPingStatus(null);
    try {
      const res = await executionService.executeJava({
        code: `public class prog { public static void main(String[] args) { System.out.println("PING_OK"); } }`,
      });
      if (res.stdout.includes('PING_OK')) {
        setPingStatus(`✅ ${t('ការតភ្ជាប់ជោគជ័យ! (Connection OK)', 'Connection OK! Response time: ' + res.executionTimeMs + 'ms')}`);
      } else {
        setPingStatus(`⚠️ ${t('ការតភ្ជាប់មានបញ្ហា:', 'Connection Warning:')} ${res.stderr || 'No response'}`);
      }
    } catch (e: any) {
      setPingStatus(`❌ ${t('បរាជ័យក្នុងការតភ្ជាប់:', 'Connection Failed:')} ${e.message}`);
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Warning Banner: If Execution Backend is Disabled/Unconfigured */}
      {isExecutionDisabled && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans shadow-sm">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-sm">
                {t(
                  'សេវាកម្មដំណើរការកូដ Java ត្រូវបានបិទ ឬមិនទាន់បានកំណត់ (Execution Backend Unconfigured)',
                  'Java Execution Sandbox Unconfigured or Disabled'
                )}
              </div>
              <p className="text-slate-600 dark:text-amber-300/80 leading-relaxed">
                {t(
                  'ប៊ូតុង "ដំណើរការ" (Run) ត្រូវបានបិទជាបណ្តោះអាសន្ន។ សូមបើកដំណើរការ Wandbox OpenJDK ឡើងវិញ ឬកំណត់ Custom Docker Runner នៅក្នុងផ្ទាំង Settings។',
                  'The Run button is currently disabled. Enable Wandbox OpenJDK or configure a custom Docker runner in Settings.'
                )}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettingsModal(true)}
            leftIcon={<Settings className="w-4 h-4" />}
            className="shrink-0 self-start sm:self-center bg-white/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200"
          >
            {t('កំណត់ Runner ឡើងវិញ', 'Configure Runner')}
          </Button>
        </div>
      )}

      {/* Header and Template / Lesson Controls */}
      <Card className="p-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                {title || t('Java Interactive Playground', 'Java Interactive Playground')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('OpenJDK 21 Sandbox | កន្លែងសរសេរ និងតេស្តកូដជាក់ស្តែង', 'OpenJDK 21 Sandbox | Live code editor & testbed')}
              </p>
            </div>
          </div>

          {/* Right Action Tools: Lesson Selector & Settings */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="xs"
              onClick={() => setShowLessonSelector(true)}
              leftIcon={<BookOpen className="w-3.5 h-3.5 text-rose-500" />}
            >
              <span>{t('ផ្ទុកឧទាហរណ៍ពីមេរៀន', 'Load Lesson Example')}</span>
            </Button>

            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowSettingsModal(true)}
              leftIcon={<Settings className="w-3.5 h-3.5 text-slate-400" />}
              title={t('ការកំណត់ម៉ាស៊ីនដំណើរការកូដ', 'Runner Settings')}
            >
              <span>{t('ការកំណត់ Sandbox', 'Settings')}</span>
            </Button>
          </div>
        </div>

        {/* Quick Starter Templates Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold shrink-0">
            {t('គំរូ:', 'Templates:')}
          </span>

          <div className="flex items-center gap-1.5 flex-nowrap">
            {STARTER_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => loadTemplate(tmpl)}
                className={`px-2.5 py-1 rounded-xl transition-all whitespace-nowrap font-medium border text-xs ${
                  activeTemplateId === tmpl.id && !isDirty
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border-transparent'
                }`}
              >
                {language === 'km' ? tmpl.nameKm : tmpl.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* AI Java Tutor Contextual Action Bar in Playground */}
        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold">
            <Bot className="w-4 h-4" />
            <span>{t('លោកគ្រូ Java AI ជំនួយការ៖', 'Java AI Tutor Actions:')}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() =>
                openTutor({
                  code,
                  action: 'explain_code',
                })
              }
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all"
            >
              <span>{t('Explain Code', 'Explain Code')}</span>
            </button>

            <button
              onClick={() =>
                openTutor({
                  code,
                  error: result?.stderr,
                  action: 'find_bug',
                })
              }
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all"
            >
              <span>{t('Find the Bug', 'Find the Bug')}</span>
            </button>

            <button
              onClick={() =>
                openTutor({
                  code,
                  action: 'give_hint',
                })
              }
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all"
            >
              <span>{t('Give Me a Hint', 'Give Me a Hint')}</span>
            </button>

            <button
              onClick={() =>
                openTutor({
                  action: 'simplify',
                })
              }
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all"
            >
              <span>{t('Simplify', 'Simplify')}</span>
            </button>

            <button
              onClick={() =>
                openTutor({
                  action: 'generate_practice',
                })
              }
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all"
            >
              <span>{t('Generate Practice', 'Generate Practice')}</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Editor & Output Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Monaco Java Editor */}
        <div>
          <JavaEditor
            initialCode={lastLoadedBaseCode}
            value={code}
            onChange={setCode}
            onRun={handleRun}
            isRunning={isRunning}
            height={height}
            isExecutionDisabled={isExecutionDisabled}
          />
        </div>

        {/* Right Column: Multi-tab Terminal Output Panel */}
        <div>
          <OutputPanel
            result={result}
            isRunning={isRunning}
            stdin={stdin}
            onStdinChange={setStdin}
            onClear={() => setResult(null)}
            expectedOutput={expectedOutput}
            onOpenSettings={() => setShowSettingsModal(true)}
          />
        </div>
      </div>

      {/* MODAL 1: Load Example From Curriculum Lessons */}
      {showLessonSelector && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lesson-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans animate-fade-in"
          onClick={() => setShowLessonSelector(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="lesson-modal-title" className="font-extrabold text-slate-900 dark:text-white text-base">
                    {t('ជ្រើសរើសឧទាហរណ៍ពីមេរៀន (Load Lesson Example)', 'Load Example from Curriculum')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('ជ្រើសរើសមេរៀនដើម្បីទាញយកកូដគំរូ និងលទ្ធផលរំពឹងទុកចូលក្នុង Playground', 'Select any lesson to import its runnable code and expected output')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowLessonSelector(false)}
                aria-label={t('បិទ', 'Close')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* List of 8 modules and lessons */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {CURRICULUM_MODULES.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {modIdx + 1}. {t(mod.titleKm, mod.titleEn)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mod.lessons.map((les) => (
                      <button
                        key={les.id}
                        onClick={() => loadLessonExample(les.slug)}
                        className="text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200/80 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800 transition-all group"
                      >
                        <div className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 truncate">
                          {t(les.titleKm, les.titleEn)}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {les.examples[0]?.title || 'Java Code Example'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowLessonSelector(false)}>
                {t('បិទ', 'Close')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Sandbox Runner Configuration & Setup Guide */}
      {showSettingsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans animate-fade-in"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center">
                  <Server className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="settings-modal-title" className="font-extrabold text-slate-900 dark:text-white text-base">
                    {t('ការកំណត់ Sandbox Execution', 'Java Sandbox Execution Settings')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('គ្រប់គ្រងប្រព័ន្ធរត់កូដ និងការកំណត់សុវត្ថិភាព', 'Manage backend runner and security isolation')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSettingsModal(false)}
                aria-label={t('បិទ', 'Close')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Toggle: Enable / Disable Execution */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {t('បើកដំណើរការ Sandbox Execution', 'Enable Sandbox Execution')}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {t(
                    'បិទដើម្បីសាកល្បង Disabled Run State និង Setup Guide ដូចការស្នើសុំ',
                    'Turn off to verify the unconfigured/disabled state and setup guide'
                  )}
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!isExecutionDisabled}
                  onChange={(e) => setIsExecutionDisabled(!e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>

            {/* Custom Runner Endpoint Input */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <span>{t('Custom Runner Endpoint URL (ស្រេចចិត្ត):', 'Custom Runner Endpoint URL (Optional):')}</span>
              </label>
              <input
                type="text"
                value={customRunnerUrl}
                onChange={(e) => setCustomRunnerUrl(e.target.value)}
                placeholder="http://localhost:2000/api/v2/execute"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
              />
              <p className="text-[11px] text-slate-500">
                {t(
                  'ទុកទទេដើម្បីប្រើ Wandbox OpenJDK 21 Isolated Cloud Sandbox តាមលំនាំដើម។',
                  'Leave blank to use default Wandbox OpenJDK 21 isolated cloud runner.'
                )}
              </p>
            </div>

            {/* Test Connection Button */}
            <div className="flex items-center justify-between pt-1">
              <Button
                variant="outline"
                size="xs"
                onClick={handleTestConnection}
                disabled={isPinging || isExecutionDisabled}
                leftIcon={<Server className="w-3.5 h-3.5" />}
              >
                {isPinging ? t('កំពុងតេស្ត...', 'Pinging...') : t('តេស្តការតភ្ជាប់ Runner', 'Test Runner Connection')}
              </Button>

              {pingStatus && <div className="text-xs font-medium">{pingStatus}</div>}
            </div>

            {/* Self-hosted Docker Setup Guide */}
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-2.5 text-xs font-sans">
              <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>{t('ការណែនាំដំឡើង Self-hosted Docker Runner:', 'Self-hosted Docker Runner Guide:')}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {t(
                  'ដើម្បីរត់កូដក្នុងម៉ាស៊ីនផ្ទាល់ខ្លួនដោយសុវត្ថិភាពខ្ពស់បំផុត គ្មានការតភ្ជាប់ក្រៅ អ្នកអាចដំណើរការ Docker Container ជាមួយ Piston API៖',
                  'Run an isolated local sandbox container without external network dependencies:'
                )}
              </p>
              <pre className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                <code>docker run -d -p 2000:2000 ghcr.io/engineer-man/piston</code>
              </pre>
              <p className="text-slate-400 text-[11px]">
                {t(
                  'រួចបញ្ចូល URL: http://localhost:2000/api/v2/execute ក្នុងប្រអប់ខាងលើ។',
                  'Then set endpoint URL to http://localhost:2000/api/v2/execute.'
                )}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setShowSettingsModal(false)}>
                {t('បោះបង់', 'Cancel')}
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveSettings} leftIcon={<Check className="w-4 h-4" />}>
                {t('រក្សាទុកការកំណត់', 'Save Settings')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Discard Unsaved Changes Confirmation Warning */}
      {showDiscardConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="discard-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans animate-fade-in"
          onClick={() => setShowDiscardConfirm(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 id="discard-modal-title" className="font-extrabold text-slate-900 dark:text-white text-base">
                  {t('បោះបង់កូដដែលបានកែប្រែមែនទេ?', 'Discard Unsaved Changes?')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('អ្នកមានកូដដែលបានសរសេរ និងមិនទាន់រក្សាទុក។', 'You have modified the code in the editor.')}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-900/40">
              {t(
                'ប្រសិនបើអ្នកបន្ត កូដដែលអ្នកបានកែប្រែនឹងត្រូវបាត់បង់ ហើយជំនួសដោយកូដគំរូថ្មី។ តើអ្នកពិតជាចង់បន្តមែនទេ?',
                'Proceeding will replace your current edits with the selected code template. Do you wish to continue?'
              )}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setShowDiscardConfirm(false)}>
                {t('បន្តសរសេរកូដចាស់', 'Keep Editing')}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={confirmDiscardAndProceed}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                {t('បោះបង់ និងផ្ទុកថ្មី', 'Discard & Load')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
