import React, { useRef, useState, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface JavaEditorProps {
  initialCode: string;
  value?: string;
  onChange?: (val: string) => void;
  onRun: (code: string) => void;
  isRunning?: boolean;
  height?: string;
  readOnly?: boolean;
}

export const JavaEditor: React.FC<JavaEditorProps> = ({
  initialCode,
  value,
  onChange,
  onRun,
  isRunning = false,
  height = '420px',
  readOnly = false,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [editorValue, setEditorValue] = useState(value !== undefined ? value : initialCode);
  const [fontSize, setFontSize] = useState(14);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  }, [value]);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Add Ctrl+Enter or Cmd+Enter keybinding to Run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const code = editor.getValue();
      onRun(code);
    });
  };

  const handleCodeChange = (val: string | undefined) => {
    const newVal = val || '';
    setEditorValue(newVal);
    if (onChange) {
      onChange(newVal);
    }
  };

  const handleReset = () => {
    setEditorValue(initialCode);
    if (onChange) {
      onChange(initialCode);
    }
    if (editorRef.current) {
      editorRef.current.setValue(initialCode);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="flex flex-col border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-900 shadow-sm">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-800/90 border-b border-slate-700/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-mono text-slate-300 font-medium">Main.java</span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-700/80 text-rose-300 font-mono">
            Java 21
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font size adjustment */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-700/50 rounded-lg px-2 py-0.5 text-slate-300">
            <button
              onClick={() => setFontSize((s) => Math.max(12, s - 1))}
              className="px-1 hover:text-white"
              title="Decrease font size"
            >
              -
            </button>
            <span className="text-[11px] font-mono">{fontSize}px</span>
            <button
              onClick={() => setFontSize((s) => Math.min(22, s + 1))}
              className="px-1 hover:text-white"
              title="Increase font size"
            >
              +
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 transition-colors"
            title={t('ចម្លងកូដ', 'Copy code')}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? t('បានចម្លង', 'Copied') : t('ចម្លង', 'Copy')}</span>
          </button>

          {/* Reset Button */}
          {!readOnly && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 transition-colors"
              title={t('កំណត់កូដឡើងវិញ', 'Reset code')}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('កំណត់ឡើងវិញ', 'Reset')}</span>
            </button>
          )}

          {/* Run Button */}
          <button
            onClick={() => onRun(editorValue)}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-rose-900/60 text-white font-semibold text-xs shadow-sm transition-all active:scale-95"
            title="Ctrl+Enter / Cmd+Enter"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{t('កំពុងរត់...', 'Running...')}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t('ដំណើរការ', 'Run')}</span>
                <kbd className="hidden md:inline text-[9px] font-mono px-1 py-0.2 bg-rose-700/70 rounded">
                  Ctrl+↵
                </kbd>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Surface with Skeleton Loading fallback */}
      <div className="relative">
        <Editor
          height={height}
          language="java"
          theme="vs-dark"
          value={editorValue}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          loading={
            <div className="h-full flex items-center justify-center bg-slate-900 text-slate-400 text-xs font-mono">
              <Loader2 className="w-5 h-5 animate-spin mr-2 text-rose-500" />
              Loading Monaco Editor...
            </div>
          }
          options={{
            fontSize: fontSize,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            readOnly: readOnly,
            lineNumbers: 'on',
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'all',
            automaticLayout: true,
            tabSize: 4,
            bracketPairColorization: { enabled: true },
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
};
