import { ExecutionResult, ExecutionStatus } from '../types';

export interface ExecuteOptions {
  code: string;
  stdin?: string;
  compiler?: string;
  timeoutMs?: number;
}

/**
 * Extracts public class name if student wrote `public class Something`.
 */
function extractMainClassName(code: string): string | null {
  const match = code.match(/public\s+(?:final\s+)?class\s+([A-Za-z0-9_]+)/);
  return match ? match[1] : null;
}

const MAX_CODE_SIZE = 50_000; // 50 KB
const MAX_OUTPUT_SIZE = 100_000; // 100 KB
const DEFAULT_TIMEOUT_MS = 30_000; // 30 seconds

export const executionService = {
  /**
   * Check whether sandbox execution is disabled either by env or local storage
   */
  isExecutionDisabled(): boolean {
    const envDisabled = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_DISABLE_SANDBOX_EXECUTION === 'true') ||
      (typeof process !== 'undefined' && process.env?.VITE_DISABLE_SANDBOX_EXECUTION === 'true');
    const localDisabled = typeof localStorage !== 'undefined' ? localStorage.getItem('khmer_java_execution_disabled') === 'true' : false;
    return envDisabled || localDisabled;
  },

  setExecutionDisabled(disabled: boolean): void {
    if (typeof localStorage === 'undefined') return;
    if (disabled) {
      localStorage.setItem('khmer_java_execution_disabled', 'true');
    } else {
      localStorage.removeItem('khmer_java_execution_disabled');
    }
  },

  getCustomEndpoint(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem('khmer_java_custom_runner_url');
  },

  setCustomEndpoint(url: string | null): void {
    if (typeof localStorage === 'undefined') return;
    if (url && url.trim()) {
      localStorage.setItem('khmer_java_custom_runner_url', url.trim());
    } else {
      localStorage.removeItem('khmer_java_custom_runner_url');
    }
  },

  getExecutionProvider(): 'wandbox-openjdk' | 'local' | 'mock-sandbox' {
    if (this.isExecutionDisabled()) return 'mock-sandbox';
    if (this.getCustomEndpoint()) return 'local';
    return 'wandbox-openjdk';
  },

  isConfigured(): boolean {
    return !this.isExecutionDisabled();
  },

  /**
   * Executes Java code securely via OpenJDK Wandbox sandbox or configured custom endpoint
   */
  async executeJava(options: ExecuteOptions): Promise<ExecutionResult> {
    const startTime = performance.now();
    const rawCode = options.code?.trim() || '';

    // Check if execution has been disabled by user/administrator
    if (this.isExecutionDisabled()) {
      return {
        stdout: '',
        stderr: '⚠️ សេវាកម្មដំណើរការកូដ Java មិនទាន់ត្រូវបានកំណត់ ឬត្រូវបានបិទ (Execution Service Unconfigured / Disabled)។\n\nសូមពិនិត្យមើល "ការណែនាំដំឡើង Sandbox Runner" (Setup Guide) នៅក្នុងផ្ទាំង Settings ដើម្បីភ្ជាប់ទៅកាន់ Docker Runner ផ្ទាល់ខ្លួន ឬបើកដំណើរការ Wandbox ឡើងវិញ។',
        exitCode: -1,
        isError: true,
        status: 'service_unavailable',
        provider: 'mock-sandbox',
        isRealExecution: false,
        limitationNotice: 'Execution service is unconfigured or disabled.',
      };
    }

    if (!rawCode) {
      return {
        stdout: '',
        stderr: 'គ្មានកូដសម្រាប់ដំណើរការទេ (No code provided).',
        exitCode: 1,
        isError: true,
        status: 'compilation_error',
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      };
    }

    // Protection: Request code size limit (50KB)
    if (rawCode.length > MAX_CODE_SIZE) {
      return {
        stdout: '',
        stderr: `ទំហំកូដធំលើសកំណត់ (${rawCode.length} bytes, អតិបរមា ${MAX_CODE_SIZE} bytes)។ សូមកាត់បន្ថយទំហំកូដ ដើម្បីការពារសុវត្ថិភាពម៉ាស៊ីន Sandbox។`,
        exitCode: 1,
        isError: true,
        status: 'compilation_error',
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      };
    }

    // Check custom sandbox runner endpoint (Judge0, Piston, or custom local runner)
    const customEndpoint = this.getCustomEndpoint();
    if (customEndpoint) {
      try {
        const response = await fetch(customEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'java',
            code: rawCode,
            stdin: options.stdin || '',
          }),
        });

        if (!response.ok) {
          throw new Error(`Custom runner responded with HTTP ${response.status}`);
        }

        const data = await response.json();
        const duration = Math.round(performance.now() - startTime);
        const out = data.stdout || data.output || '';
        const err = data.stderr || data.error || '';
        const isErr = !!err || (data.exitCode !== undefined && data.exitCode !== 0);

        let status: ExecutionStatus = 'success';
        if (isErr) {
          status = err.includes('error:') || err.includes('javac') ? 'compilation_error' : 'runtime_error';
        }

        return {
          stdout: out.slice(0, MAX_OUTPUT_SIZE),
          stderr: err.slice(0, MAX_OUTPUT_SIZE),
          compilationError: status === 'compilation_error' ? err : undefined,
          runtimeError: status === 'runtime_error' ? err : undefined,
          exitCode: data.exitCode ?? (isErr ? 1 : 0),
          isError: isErr,
          status,
          executionTimeMs: duration,
          provider: 'local',
          isRealExecution: true,
        };
      } catch (err) {
        console.warn('Custom runner failed, falling back to Wandbox OpenJDK:', err);
      }
    }

    // Default: Wandbox OpenJDK 21 sandbox execution
    try {
      const mainClass = extractMainClassName(rawCode);
      let payload: Record<string, unknown>;

      if (mainClass && mainClass !== 'prog') {
        payload = {
          compiler: options.compiler || 'openjdk-jdk-21+35',
          'compiler-option-raw': '-encoding\nUTF-8',
          'runtime-option-raw': '-Dfile.encoding=UTF-8\n-Dsun.stdout.encoding=UTF-8\n-Dsun.stderr.encoding=UTF-8',
          stdin: options.stdin || '',
          codes: [
            {
              file: `${mainClass}.java`,
              code: rawCode,
            },
          ],
          code: `public class prog {
    public static void main(String[] args) throws Throwable {
        ${mainClass}.main(args);
    }
}`,
        };
      } else {
        payload = {
          compiler: options.compiler || 'openjdk-jdk-21+35',
          'compiler-option-raw': '-encoding\nUTF-8',
          'runtime-option-raw': '-Dfile.encoding=UTF-8\n-Dsun.stdout.encoding=UTF-8\n-Dsun.stderr.encoding=UTF-8',
          stdin: options.stdin || '',
          code: rawCode,
        };
      }

      const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      let response: Response;
      try {
        response = await fetch('https://wandbox.org/api/compile.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        // Resilience: retry once after brief backoff on 429 or 503
        if (!response.ok && (response.status === 429 || response.status === 503)) {
          await new Promise((r) => setTimeout(r, 1200));
          response = await fetch('https://wandbox.org/api/compile.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
        }
      } catch (fetchErr: any) {
        if (controller.signal.aborted) throw fetchErr;
        // Transient socket/network retry
        await new Promise((r) => setTimeout(r, 1200));
        response = await fetch('https://wandbox.org/api/compile.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      }

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Wandbox HTTP error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const duration = Math.round(performance.now() - startTime);

      const exitStatus = parseInt(data.status, 10);
      const compilerErr = data.compiler_error || data.compiler_message || '';
      let programOut = data.program_output || data.program_message || '';
      let programErr = data.program_error || '';
      const signal = data.signal || '';

      // Truncate large outputs to prevent memory issues
      if (programOut.length > MAX_OUTPUT_SIZE) {
        programOut = programOut.slice(0, MAX_OUTPUT_SIZE) + '\n... [លទ្ធផលត្រូវបានកាត់បន្ថយត្រឹម ១០០KB ដើម្បីការពារ Browser Freeze]';
      }
      if (programErr.length > MAX_OUTPUT_SIZE) {
        programErr = programErr.slice(0, MAX_OUTPUT_SIZE) + '\n... [កំហុសត្រូវបានកាត់ត្រឹម ១០០KB]';
      }

      // Diagnose status
      let execStatus: ExecutionStatus = 'success';
      let isTimeout = false;

      if (signal.toLowerCase().includes('kill') || signal.toLowerCase().includes('timeout')) {
        execStatus = 'timeout';
        isTimeout = true;
      } else if (compilerErr && (compilerErr.includes('error:') || compilerErr.includes('expected') || compilerErr.includes('cannot find symbol'))) {
        execStatus = 'compilation_error';
      } else if (exitStatus !== 0 || programErr) {
        execStatus = 'runtime_error';
      }

      const isError = execStatus !== 'success';
      const combinedStderr = [compilerErr, programErr].filter(Boolean).join('\n');

      return {
        stdout: programOut,
        stderr: combinedStderr,
        compilationError: compilerErr || undefined,
        runtimeError: programErr || (exitStatus !== 0 && !compilerErr ? `Process terminated with exit code ${exitStatus}` : undefined),
        exitCode: isError ? (exitStatus || 1) : 0,
        isError,
        status: execStatus,
        isTimeout,
        executionTimeMs: duration,
        provider: 'wandbox-openjdk',
        isRealExecution: true,
      };
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - startTime);
      const isAbort = err instanceof Error && (err.name === 'AbortError' || err.message.toLowerCase().includes('abort'));

      if (isAbort) {
        return {
          stdout: '',
          stderr: '⏱️ ការដំណើរការបានផុតកំណត់ពេលកំណត់ (Execution Timed Out: 30s limit)!\n\nកូដរបស់អ្នកដំណើរការយូរជាង ៣០ វិនាទី។ បញ្ហានេះច្រើនតែកើតឡើងដោយសារ៖\n១. រង្វិលជុំមិនចេះចប់ (Infinite Loop ដូចជា while(true) ឬ for(;;))\n២. ការហៅ Method Recursion គ្មានលក្ខខណ្ឌឈប់ (StackOverflow)\n៣. កម្មវិធីប្រើ Scanner រង់ចាំ Input ពីអ្នកប្រើប្រាស់ តែអ្នកមិនបានបញ្ចូលទិន្នន័យក្នុងប្រអប់ Stdin។',
          exitCode: 124,
          isError: true,
          status: 'timeout',
          isTimeout: true,
          executionTimeMs: duration,
          provider: 'wandbox-openjdk',
          isRealExecution: true,
        };
      }

      const errorMessage = err instanceof Error ? err.message : String(err);

      return {
        stdout: '',
        stderr: `បរាជ័យក្នុងការតភ្ជាប់ទៅកាន់ម៉ាស៊ីនដំណើរការ Java Sandbox:\n${errorMessage}\n\n[កំណត់សម្គាល់]: ប្រព័ន្ធរត់កូដពិតប្រាកដដំណើរការតាមរយៈ OpenJDK Sandbox API។ ប្រសិនបើគ្មានអ៊ីនធឺណិត ឬ API ជាប់ Firewall សូមពិនិត្យបណ្តាញរបស់អ្នក ឬកំណត់ Custom Runner URL នៅក្នុង Settings។`,
        exitCode: -1,
        isError: true,
        status: 'service_unavailable',
        executionTimeMs: duration,
        provider: 'wandbox-openjdk',
        isRealExecution: false,
        limitationNotice: 'Network connection or sandbox service unavailable.',
      };
    }
  },
};
