import React, { useState } from 'react';
import { GuidedProject } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { JavaEditor } from '../editor/JavaEditor';
import { OutputPanel } from '../editor/OutputPanel';
import { executionService } from '../../services/executionService';
import { ExecutionResult } from '../../types';
import {
  CheckCircle2,
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
  const [checkedRequirements, setCheckedRequirements] = useState<Record<string, boolean>>({});

  const completed = isProjectCompleted(project.id);
  const title = language === 'km' ? project.titleKm : project.titleEn;
  const description = language === 'km' ? project.descriptionKm : project.descriptionEn;
  const objectives = language === 'km' ? project.objectivesKm : project.objectivesEn;
  const hints = language === 'km' ? project.hintsKm : project.hintsEn;

  const handleRun = async (codeToRun: string, customStdin?: string) => {
    setIsRunning(true);
    try {
      const res = await executionService.executeJava({
        code: codeToRun,
        stdin: customStdin !== undefined ? customStdin : stdin,
      });
      setResult(res);
    } catch (err: any) {
      setResult({
        stdout: '',
        stderr: err?.message || 'Execution error',
        exitCode: 1,
        isError: true,
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const runTestCase = (testStdin?: string) => {
    const input = testStdin || '';
    setStdin(input);
    handleRun(code, input);
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
      if (window.confirm(t('តើអ្នកពិតជាចង់មើលដំណោះស្រាយគំរូមែនទេ? ព្យាយាមសរសេរដោយខ្លួនឯងមុនដើម្បីអភិវឌ្ឍជំនាញ!', 'Reveal reference solution? Try solving it independently first!'))) {
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
      {/* Project Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                {t('គម្រោងអនុវត្ត', 'Guided Project')}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                ~{project.estimatedHours} {t('ម៉ោង', 'hours')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                completed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{completed ? t('គម្រោងបានបញ្ចប់!', 'Project Completed!') : t('កត់សម្គាល់ថាបានបញ្ចប់', 'Mark as Completed')}</span>
            </button>
          </div>
        </div>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {description}
        </p>

        {/* W3Schools References */}
        {project.w3schoolsReferences.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">{t('មេរៀនយោង W3Schools:', 'W3Schools References:')}</span>
            {project.w3schoolsReferences.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:underline"
              >
                <span>{ref.title}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Main Split: Requirements & Test cases / Editor & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Requirements, Objectives & Hints */}
        <div className="lg:col-span-5 space-y-6">
          {/* Objectives */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              {t('គោលបំណងនៃការរៀនសូត្រ', 'Learning Objectives')}
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {t('លក្ខខណ្ឌតម្រូវនៃគម្រោង (Checklist)', 'Project Requirements')}
            </h3>
            <div className="space-y-2.5">
              {project.requirements.map((req) => {
                const isChecked = checkedRequirements[req.id];
                const text = language === 'km' ? req.textKm : req.textEn;
                return (
                  <label
                    key={req.id}
                    onClick={() => toggleReq(req.id)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 line-through'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>{text}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Test Cases */}
          {project.testCases.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                <Play className="w-4 h-4 text-rose-500" />
                {t('ករណីតេស្តសាកល្បង (Test Cases)', 'Sample Test Cases')}
              </h3>
              <div className="space-y-3">
                {project.testCases.map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{tc.name}</span>
                      <button
                        onClick={() => runTestCase(tc.stdin)}
                        className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold"
                      >
                        {t('រត់តេស្តនេះ', 'Run Test')}
                      </button>
                    </div>
                    {tc.stdin && (
                      <div className="font-mono text-[11px] text-slate-500">
                        Input: <span className="text-amber-500">{tc.stdin.replace(/\n/g, ', ')}</span>
                      </div>
                    )}
                    <div className="text-slate-500 text-[11px]">
                      Expected output contains:{' '}
                      <span className="font-mono text-emerald-500">{tc.expectedOutputSubstring}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hints & Solution Toggle */}
          <div className="space-y-3">
            <button
              onClick={() => setShowHints(!showHints)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs font-semibold"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                {t('ការណែនាំជំនួយ (Hints)', 'Helpful Hints')}
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

            <button
              onClick={handleLoadSolution}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              <KeyRound className="w-4 h-4" />
              <span>
                {showSolution
                  ? t('ត្រឡប់ទៅកូដចាប់ផ្តើម (Starter Code)', 'Revert to Starter Code')
                  : t('បង្ហាញដំណោះស្រាយគំរូ (Reference Solution)', 'Show Reference Solution')}
              </span>
            </button>
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
