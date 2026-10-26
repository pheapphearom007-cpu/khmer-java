import React, { useState } from 'react';
import { JavaEditor } from './JavaEditor';
import { OutputPanel } from './OutputPanel';
import { executionService } from '../../services/executionService';
import { ExecutionResult } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Terminal } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode?: string;
  initialStdin?: string;
  height?: string;
  title?: string;
}

const TEMPLATES = [
  {
    nameKm: 'ជំរាបសួរដំបូង (Hello World)',
    nameEn: 'Hello World',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("សួស្តីកម្ពុជា! ស្វាគមន៍មកកាន់ Khmer Java Academy!");
    }
}`,
  },
  {
    nameKm: 'គណនាលេខបូកដក (Math & Variables)',
    nameEn: 'Variables & Math',
    code: `public class Main {
    public static void main(String[] args) {
        int a = 45;
        int b = 15;
        System.out.println("ផលបូក: " + (a + b));
        System.out.println("ផលដក: " + (a - b));
        System.out.println("ផលគុណ: " + (a * b));
        System.out.println("ផលចែក: " + (a / b));
    }
}`,
  },
  {
    nameKm: 'ទទួលទិន្នន័យ (Scanner Input)',
    nameEn: 'Scanner Input',
    stdin: 'សុខា\n20',
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("សូមបញ្ចូលឈ្មោះរបស់អ្នក: ");
        String name = scanner.nextLine();
        System.out.print("សូមបញ្ចូលអាយុរបស់អ្នក: ");
        int age = scanner.nextInt();
        
        System.out.println("\\n=== លទ្ធផល ===");
        System.out.println("ជំរាបសួរ " + name + "! អ្នកមានអាយុ " + age + " ឆ្នាំ។");
    }
}`,
  },
  {
    nameKm: 'ថ្នាក់ និងវត្ថុ (OOP Class & Object)',
    nameEn: 'OOP Class & Object',
    code: `class Student {
    String name;
    double gpa;
    
    Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }
    
    void showInfo() {
        System.out.println("និស្សិត: " + name + " | GPA: " + gpa);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("សុខា", 3.8);
        Student s2 = new Student("វណ្ណដា", 3.95);
        s1.showInfo();
        s2.showInfo();
    }
}`,
  },
  {
    nameKm: 'ការប្រើប្រាស់ ArrayList',
    nameEn: 'ArrayList Demo',
    code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("ស្វាយ");
        fruits.add("ចេក");
        fruits.add("ធុរេន");
        
        System.out.println("ចំនួនផ្លែឈើ: " + fruits.size());
        for (String fruit : fruits) {
            System.out.println("- " + fruit);
        }
    }
}`,
  },
];

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode = TEMPLATES[0].code,
  initialStdin = '',
  height = '440px',
  title,
}) => {
  const { t, language } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(initialStdin);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const handleRun = async (codeToRun: string) => {
    setIsRunning(true);
    try {
      const res = await executionService.executeJava({
        code: codeToRun,
        stdin,
      });
      setResult(res);
    } catch (err: any) {
      setResult({
        stdout: '',
        stderr: err?.message || 'Error executing code',
        exitCode: 1,
        isError: true,
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const loadTemplate = (tmpl: typeof TEMPLATES[0]) => {
    setCode(tmpl.code);
    if (tmpl.stdin) {
      setStdin(tmpl.stdin);
    } else {
      setStdin('');
    }
    setResult(null);
  };

  return (
    <div className="space-y-4">
      {/* Header and Template Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            {title || t('Java Interactive Playground', 'Java Interactive Playground')}
          </h3>
        </div>

        {/* Template Quick Select */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {t('គំរួ:', 'Templates:')}
          </span>
          <div className="flex gap-1.5">
            {TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => loadTemplate(tmpl)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap"
              >
                {language === 'km' ? tmpl.nameKm : tmpl.nameEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor & Output Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <JavaEditor
            initialCode={initialCode}
            value={code}
            onChange={setCode}
            onRun={handleRun}
            isRunning={isRunning}
            height={height}
          />
        </div>

        <div>
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
