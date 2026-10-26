import { ExecutionResult } from '../types';

export interface ExecuteOptions {
  code: string;
  stdin?: string;
  compiler?: string;
}

/**
 * Extracts public class name if student wrote `public class Something`.
 */
function extractMainClassName(code: string): string | null {
  const match = code.match(/public\s+(?:final\s+)?class\s+([A-Za-z0-9_]+)/);
  return match ? match[1] : null;
}

export const executionService = {
  /**
   * Executes Java code securely via OpenJDK Wandbox sandbox
   */
  async executeJava(options: ExecuteOptions): Promise<ExecutionResult> {
    const startTime = performance.now();
    const rawCode = options.code.trim();

    if (!rawCode) {
      return {
        stdout: '',
        stderr: 'គ្មានកូដសម្រាប់ដំណើរការទេ (No code provided).',
        exitCode: 1,
        isError: true,
        provider: 'wandbox-openjdk',
        isRealExecution: false,
      };
    }

    // Check if user has configured custom sandbox runner via localStorage or env
    const customEndpoint = localStorage.getItem('khmer_java_custom_runner_url');
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
        const data = await response.json();
        const duration = Math.round(performance.now() - startTime);
        return {
          stdout: data.stdout || data.output || '',
          stderr: data.stderr || data.error || '',
          exitCode: data.exitCode ?? 0,
          isError: !!data.stderr || (data.exitCode !== undefined && data.exitCode !== 0),
          executionTimeMs: duration,
          provider: 'local',
          isRealExecution: true,
        };
      } catch (err) {
        console.warn('Custom runner failed, falling back to Wandbox OpenJDK:', err);
      }
    }

    try {
      // Wandbox compile request
      const mainClass = extractMainClassName(rawCode);

      // We prepare the payload.
      // If code already defines `public class prog`, run directly.
      // If code defines `public class XYZ`, we provide it as XYZ.java and delegate prog.java to XYZ.main(args).
      // If code defines no public class, we can compile it in prog.java directly or prepend `public class prog { ... }` if only main method is written.
      let payload: Record<string, unknown>;

      if (mainClass && mainClass !== 'prog') {
        payload = {
          compiler: options.compiler || 'openjdk-jdk-21+35',
          'compiler-option-raw': '-encoding\nUTF-8',
          stdin: options.stdin || '',
          codes: [
            {
              file: `${mainClass}.java`,
              code: rawCode,
            },
          ],
          code: `public class prog {
    public static void main(String[] args) {
        try {
            System.setOut(new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out), true, java.nio.charset.StandardCharsets.UTF_8));
            System.setErr(new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.err), true, java.nio.charset.StandardCharsets.UTF_8));
            ${mainClass}.main(args);
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
}`,
        };
      } else {
        payload = {
          compiler: options.compiler || 'openjdk-jdk-21+35',
          'compiler-option-raw': '-encoding\nUTF-8',
          stdin: options.stdin || '',
          code: rawCode,
        };
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Wandbox HTTP error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const duration = Math.round(performance.now() - startTime);

      const status = parseInt(data.status, 10);
      const compileErr = data.compiler_error || data.compiler_message || '';
      const programOut = data.program_output || data.program_message || '';
      const programErr = data.program_error || '';

      const isError = status !== 0 || !!compileErr || !!programErr;
      const combinedStderr = [compileErr, programErr].filter(Boolean).join('\n');

      return {
        stdout: programOut,
        stderr: combinedStderr,
        exitCode: isError ? (status || 1) : 0,
        isError,
        executionTimeMs: duration,
        provider: 'wandbox-openjdk',
        isRealExecution: true,
      };
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - startTime);
      const errorMessage = err instanceof Error ? err.message : String(err);

      return {
        stdout: '',
        stderr: `បរាជ័យក្នុងការតភ្ជាប់ទៅកាន់ម៉ាស៊ីនដំណើរការ Java Sandbox:\n${errorMessage}\n\n[កំណត់សម្គាល់]: ប្រព័ន្ធរត់កូដពិតប្រាកដដំណើរការតាមរយៈ OpenJDK Sandbox API។ ប្រសិនបើគ្មានអ៊ីនធឺណិត ឬ API ជាប់ Firewall សូមពិនិត្យបណ្តាញរបស់អ្នក ឬកំណត់ Custom Runner URL នៅក្នុង Settings។`,
        exitCode: -1,
        isError: true,
        executionTimeMs: duration,
        provider: 'wandbox-openjdk',
        isRealExecution: false,
        limitationNotice: 'Network connection or sandbox service unavailable.',
      };
    }
  },
};
