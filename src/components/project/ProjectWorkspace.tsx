import React, { useState, useEffect } from 'react';
import { GuidedProject, ProjectTestCase } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { JavaEditor } from '../editor/JavaEditor';
import { OutputPanel } from '../editor/OutputPanel';
import { executionService } from '../../services/executionService';
import { ExecutionResult } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Lightbulb,
  Play,
  KeyRound,
  Trophy,
} from 'lucide-react';

interface ProjectWorkspaceProps {
  project: GuidedProject;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ project }) => {
  const { language, t } = useLanguage();
  const { isProjectCompleted, markProjectComplete } = useProgress();

  const [code, setCode] = useState(project.starterCode);
  const [stdin, setStdin] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Requirements persistence in localStorage
  const REQS_STORAGE_KEY = `khmer_java_proj_${project.id}_reqs`;
  const [checkedRequirements, setCheckedRequirements] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(REQS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track test results per test index
  const [testResults, setTestResults] = useState<Record<number, { passed: boolean; message: string }>>({});

  useEffect(() => {
    localStorage.setItem(REQS_STORAGE_KEY, JSON.stringify(checkedRequirements));
  }, [checkedRequirements, REQS_STORAGE_KEY]);

  const completed = isProjectCompleted(project.id);
  const title = language === 'km' ? project.titleKm : project.titleEn;
  const description = language === 'km' ? project.descriptionKm : project.descriptionEn;
  const objectives = language === 'km' ? project.objectivesKm : project.objectivesEn;
  const hints = language === 'km' ? project.hintsKm : project.hintsEn;

  const handleRun = async (codeToRun: string, customStdin?: string): Promise<ExecutionResult> => {
    setIsRunning(true);
    try {
      const res = await executionService.executeJava({
        code: codeToRun,
        stdin: customStdin !== undefined ? customStdin : stdin,
      });
      setResult(res);
      return res;
    } catch (err: any) {
      const errRes: ExecutionResult = {
        stdout: '',
        stderr: err?.message || 'Execution error',
        exitCode: 1,
        isError: true,
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      };
      setResult(errRes);
      return errRes;
    } finally {
      setIsRunning(false);
    }
  };

  const runTestCase = async (testCase: ProjectTestCase, idx: number) => {
    const input = testCase.stdin || '';
    setStdin(input);
    const execRes = await handleRun(code, input);

    const stdoutClean = execRes.stdout.toLowerCase();
    const expectedClean = testCase.expectedOutputSubstring.toLowerCase();
    const passed = stdoutClean.includes(expectedClean);

    setTestResults((prev) => ({
      ...prev,
      [idx]: {
        passed,
        message: passed
          ? t('ឆ្លងកាត់ជោគជ័យ! Output មានផ្ទុកលទ្ធផលរំពឹងទុក។', 'Test passed! Output contains expected result.')
          : t(`មិនទាន់ឆ្លងកាត់ទេ: រំពឹងឃើញ "${testCase.expectedOutputSubstring}"`, `Failed: Expected output to contain "${testCase.expectedOutputSubstring}"`),
      },
    }));
  };

  const toggleReq = (reqId: string) => {
    setCheckedRequirements((prev) => ({
      ...prev,
      [reqId]: !prev[reqId],
    }));
  };

  const handleToggleComplete = () => {
    markProjectComplete(project.id, !completed);
  };

  const handleLoadSolution = () => {
    if (!showSolution) {
      if (
        window.confirm(
          t(
            'តើអ្នកពិតជាចង់មើលដំណោះស្រាយគំរូមែនទេ? ព្យាយាមសរសេរដោយខ្លួនឯងមុនដើម្បីអភិវឌ្ឍជំនាញ!',
            'Reveal reference solution? Try solving it independently first!'
          )
        )
      ) {
        setCode(project.solutionCode);
        setShowSolution(true);
      }
    } else {
      setCode(project.starterCode);
      setShowSolution(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Banner Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="brand" size="xs">
                {t('គម្រោងអនុវត្ត', 'Guided Project')}
              </Badge>
              <Badge variant="neutral" size="xs">
                <Clock className="w-3 h-3 mr-1 text-slate-400" />
                ~{project.estimatedHours} {t('ម៉ោង', 'hours')}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={completed ? 'success' : 'outline'}
              size="sm"
              onClick={handleToggleComplete}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              {completed
                ? t('គម្រោងបានបញ្ចប់! ✓', 'Project Completed! ✓')
                : t('កត់សម្គាល់ថាបានបញ្ចប់', 'Mark as Completed')}
            </Button>
          </div>
        </div>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {description}
        </p>

        {/* W3Schools References */}
        {project.w3schoolsReferences.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">
              {t('មេរៀនយោង W3Schools:', 'W3Schools References:')}
            </span>
            {project.w3schoolsReferences.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:underline font-semibold"
              >
                <span>{ref.title}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </Card>

      {/* Main Split Layout: Left Requirements & Tests / Right IDE Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Requirements, Objectives & Hints */}
        <div className="lg:col-span-5 space-y-6">
          {/* Learning Objectives */}
          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{t('គោលបំណងនៃការរៀនសូត្រ', 'Learning Objectives')}</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Requirements Checklist (Persisted in LocalStorage) */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t('លក្ខខណ្ឌតម្រូវនៃគម្រោង (Checklist)', 'Project Requirements')}</span>
              </h3>
              <Badge variant="neutral" size="xs">
                {Object.values(checkedRequirements).filter(Boolean).length} / {project.requirements.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {project.requirements.map((req) => {
                const isChecked = checkedRequirements[req.id];
                const text = language === 'km' ? req.textKm : req.textEn;
                return (
                  <label
                    key={req.id}
                    onClick={() => toggleReq(req.id)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 line-through'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span className="leading-relaxed">{text}</span>
                  </label>
                );
              })}
            </div>
          </Card>

          {/* Test Cases Runner with Automated Diff/Verification */}
          {project.testCases.length > 0 && (
            <Card className="p-5 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Play className="w-4 h-4 text-rose-500" />
                <span>{t('ករណីតេស្តស្វ័យប្រវត្ត (Automated Test Cases)', 'Automated Test Cases')}</span>
              </h3>
              <div className="space-y-3">
                {project.testCases.map((tc, idx) => {
                  const testStatus = testResults[idx];
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {tc.name}
                        </span>
                        <Button
                          variant="primary"
                          size="xs"
                          onClick={() => runTestCase(tc, idx)}
                          disabled={isRunning}
                          leftIcon={<Play className="w-3 h-3" />}
                        >
                          {t('រត់តេស្តនេះ', 'Run Test')}
                        </Button>
                      </div>

                      {tc.stdin && (
                        <div className="font-mono text-[11px] text-slate-500">
                          Input: <span className="text-amber-500">{tc.stdin.replace(/\n/g, ', ')}</span>
                        </div>
                      )}

                      <div className="text-slate-500 text-[11px]">
                        Expected substring: <span className="font-mono text-emerald-500">{tc.expectedOutputSubstring}</span>
                      </div>

                      {testStatus && (
                        <div
                          className={`p-2 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 ${
                            testStatus.passed
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                          }`}
                        >
                          {testStatus.passed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span>{testStatus.message}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Hints & Reference Solution Toggle */}
          <div className="space-y-3">
            <button
              onClick={() => setShowHints(!showHints)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs font-semibold"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span>{t('ការណែនាំជំនួយ (Hints)', 'Helpful Hints')}</span>
              </span>
              <span>{showHints ? '▲' : '▼'}</span>
            </button>

            {showHints && (
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                {hints.map((hint, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span>💡</span>
                    <span>{hint}</span>
                  </div>
                ))}
              </div>
            )}

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={handleLoadSolution}
              leftIcon={<KeyRound className="w-4 h-4" />}
            >
              {showSolution
                ? t('ត្រឡប់ទៅកូដចាប់ផ្តើម (Starter Code)', 'Revert to Starter Code')
                : t('បង្ហាញដំណោះស្រាយគំរូ (Reference Solution)', 'Show Reference Solution')}
            </Button>
          </div>
        </div>

        {/* Right Column: Code Editor & Output */}
        <div className="lg:col-span-7 space-y-4">
          <JavaEditor
            initialCode={project.starterCode}
            value={code}
            onChange={setCode}
            onRun={(c) => handleRun(c)}
            isRunning={isRunning}
            height="460px"
          />

          <OutputPanel
            result={result}
            isRunning={isRunning}
            stdin={stdin}
            onStdinChange={setStdin}
            onClear={() => setResult(null)}
          />
        </div>
      </div>
    </div>
  );
};
