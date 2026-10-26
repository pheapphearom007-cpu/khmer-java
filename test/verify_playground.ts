import { executionService } from '../src/services/executionService.ts';

console.log('====================================================');
console.log('   KHMER JAVA ACADEMY - PLAYGROUND VERIFICATION     ');
console.log('   Real OpenJDK Sandbox Execution Test Suite        ');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${testName}`);
    if (details) {
      console.error(`     Details: ${details}`);
    }
  }
}

async function runTests() {
  // 1. Valid Java Execution Test
  console.log('[Test 1] Testing Valid Java Execution (Hello World & Math)...');
  try {
    const validCode = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Khmer Java Academy!");
        int a = 15;
        int b = 25;
        System.out.println("Sum = " + (a + b));
    }
}
`;
    const res = await executionService.executeJava({ code: validCode });
    assert(res.status === 'success', 'Status is success', `Got status: ${res.status}`);
    assert(res.exitCode === 0, 'Exit code is 0', `Got exitCode: ${res.exitCode}`);
    assert(!res.isError, 'isError is false');
    assert(res.stdout.includes('Hello, Khmer Java Academy!'), 'Stdout contains Hello message', `Stdout: ${res.stdout}`);
    assert(res.stdout.includes('Sum = 40'), 'Stdout contains computed sum', `Stdout: ${res.stdout}`);
    assert(res.compilationError === undefined, 'compilationError is undefined');
    assert(res.runtimeError === undefined, 'runtimeError is undefined');
    assert(res.isRealExecution === true, 'isRealExecution is true');
    console.log(`     Execution time: ${res.executionTimeMs}ms via ${res.provider}\n`);
  } catch (err) {
    assert(false, 'Valid Java Execution Exception', String(err));
  }

  // 2. Khmer Unicode Console Output Test
  console.log('[Test 2] Testing Khmer Unicode Standard Output...');
  try {
    const khmerCode = `
public class KhmerPrintTest {
    public static void main(String[] args) {
        System.out.println("សួស្តីកម្ពុជា - ស្វាគមន៍មកកាន់ Khmer Java Academy!");
        System.out.println("ភាសាកម្មវិធី Java ងាយស្រួលរៀន");
    }
}
`;
    const res = await executionService.executeJava({ code: khmerCode });
    assert(res.status === 'success', 'Khmer output status is success', `Got: ${res.status}`);
    assert(res.stdout.includes('សួស្តីកម្ពុជា'), 'Output retains Khmer script (no ???)', `Output: ${res.stdout}`);
    assert(res.stdout.includes('ភាសាកម្មវិធី Java'), 'Second Khmer line verified');
    console.log(`     Khmer output verified correctly without mojibake.\n`);
  } catch (err) {
    assert(false, 'Khmer Unicode Output Exception', String(err));
  }

  // 3. Compilation Error Separation Test
  console.log('[Test 3] Testing Compilation Error Separation (Syntax error)...');
  try {
    const syntaxErrorCode = `
public class BrokenSyntax {
    public static void main(String[] args) {
        int x = 100 // Missing semicolon here
        System.out.println(x)
    }
}
`;
    const res = await executionService.executeJava({ code: syntaxErrorCode });
    assert(res.status === 'compilation_error', 'Status categorized as compilation_error', `Got: ${res.status}`);
    assert(res.isError === true, 'isError is true');
    assert(res.exitCode !== 0, 'Exit code is non-zero', `ExitCode: ${res.exitCode}`);
    assert(!!res.compilationError, 'compilationError field is populated');
    assert(res.compilationError?.includes(';') || res.compilationError?.includes('error:'), 'compilationError contains javac diagnostic');
    assert(res.stdout === '', 'stdout is empty during compile error', `Stdout: ${res.stdout}`);
    console.log(`     Compiler diagnostic caught: "${res.compilationError?.split('\n')[0]}"\n`);
  } catch (err) {
    assert(false, 'Compilation Error Test Exception', String(err));
  }

  // 4. Runtime Error Separation Test
  console.log('[Test 4] Testing Runtime Error Separation (ArrayIndexOutOfBoundsException)...');
  try {
    const runtimeErrorCode = `
public class CrashTest {
    public static void main(String[] args) {
        System.out.println("Running before crash...");
        int[] numbers = {1, 2, 3};
        int invalid = numbers[10]; // Crash here
        System.out.println("Should not print: " + invalid);
    }
}
`;
    const res = await executionService.executeJava({ code: runtimeErrorCode });
    assert(res.status === 'runtime_error', 'Status categorized as runtime_error', `Got: ${res.status}`);
    assert(res.isError === true, 'isError is true');
    assert(res.stdout.includes('Running before crash...'), 'Stdout captured lines printed prior to crash');
    assert(!res.stdout.includes('Should not print'), 'Lines after crash were not reached');
    assert(!!res.runtimeError || res.stderr.includes('ArrayIndexOutOfBoundsException'), 'Runtime stack trace captured in runtimeError/stderr');
    assert(res.compilationError === undefined, 'compilationError is undefined (code compiled fine)');
    console.log(`     Runtime exception correctly separated.\n`);
  } catch (err) {
    assert(false, 'Runtime Error Test Exception', String(err));
  }

  // 5. Stdin / Scanner Interactive Input Test
  console.log('[Test 5] Testing Stdin / Scanner Interactive Console Input...');
  try {
    const stdinCode = `
import java.util.Scanner;

public class StdinExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String name = scanner.nextLine();
            int score = scanner.nextInt();
            System.out.println("សិស្ស: " + name + " | ពិន្ទុ: " + score);
        }
    }
}
`;
    const res = await executionService.executeJava({
      code: stdinCode,
      stdin: 'Sophea Sok\n98\n',
    });
    assert(res.status === 'success', 'Stdin status is success', `Got: ${res.status}`);
    assert(res.stdout.includes('Sophea Sok'), 'Stdin string parameter consumed correctly');
    assert(res.stdout.includes('98'), 'Stdin integer parameter consumed correctly');
    console.log(`     Console Stdin simulation verified successfully.\n`);
  } catch (err) {
    assert(false, 'Stdin Test Exception', String(err));
  }

  // 6. Security Limit: Code Size Limit (> 50KB)
  console.log('[Test 6] Testing Security Limit: Max Code Size (50KB)...');
  try {
    const oversizedCode = 'public class Big { public static void main(String[] args) { // ' + 'A'.repeat(55_000) + '\n}}';
    const res = await executionService.executeJava({ code: oversizedCode });
    assert(res.status === 'compilation_error', 'Oversized code rejected with compilation_error');
    assert(res.isError === true, 'isError is true');
    assert(res.isRealExecution === false, 'Blocked before hitting sandbox server');
    assert(res.stderr.includes('50000') || res.stderr.includes('ទំហំកូដធំលើសកំណត់'), 'Clear Khmer warning message returned');
    console.log(`     Code size limit protection verified.\n`);
  } catch (err) {
    assert(false, 'Code Size Limit Test Exception', String(err));
  }

  // 7. Security Limit: Empty Code Check
  console.log('[Test 7] Testing Empty / Whitespace Code Handling...');
  try {
    const res = await executionService.executeJava({ code: '    \n\t  ' });
    assert(res.status === 'compilation_error', 'Empty code rejected with compilation_error');
    assert(res.isError === true, 'isError is true');
    assert(res.stderr.includes('គ្មានកូដសម្រាប់ដំណើរការទេ'), 'Khmer empty code warning returned');
    console.log(`     Empty code check verified.\n`);
  } catch (err) {
    assert(false, 'Empty Code Test Exception', String(err));
  }

  // 8. Timeout Protection Test (Short timeout simulation)
  console.log('[Test 8] Testing Timeout AbortController Protection...');
  try {
    // Provide a 1ms timeout which triggers immediate AbortController abort
    const res = await executionService.executeJava({
      code: 'public class Delay { public static void main(String[] args) throws Exception { Thread.sleep(5000); } }',
      timeoutMs: 1, // 1 millisecond
    });
    assert(res.status === 'timeout', 'Status is timeout', `Got: ${res.status}`);
    assert(res.isTimeout === true, 'isTimeout is true');
    assert(res.isError === true, 'isError is true');
    assert(res.stderr.includes('ផុតកំណត់ពេលកំណត់') || res.stderr.includes('Timed Out'), 'Khmer timeout explanation included');
    console.log(`     Timeout handling and user guidance verified.\n`);
  } catch (err) {
    assert(false, 'Timeout Test Exception', String(err));
  }

  // 9. Unconfigured / Disabled State Simulation
  console.log('[Test 9] Testing Unconfigured / Disabled State Simulation & Setup Guide...');
  try {
    // Temporarily mock isExecutionDisabled
    const originalDisabledFn = executionService.isExecutionDisabled;
    executionService.isExecutionDisabled = () => true;

    const res = await executionService.executeJava({
      code: 'public class Test { public static void main(String[] args) {} }',
    });

    assert(res.status === 'service_unavailable', 'Status is service_unavailable when disabled', `Got: ${res.status}`);
    assert(res.isRealExecution === false, 'isRealExecution is false');
    assert(res.stderr.includes('Setup Guide') || res.stderr.includes('ការណែនាំដំឡើង'), 'Points user to setup guide in Khmer');

    // Restore
    executionService.isExecutionDisabled = originalDisabledFn;
    console.log(`     Unconfigured/disabled graceful handling verified.\n`);
  } catch (err) {
    assert(false, 'Disabled State Test Exception', String(err));
  }

  // Final Summary
  console.log('====================================================');
  console.log(`VERIFICATION COMPLETE: ${passedTests}/${totalTests} checks passed.`);
  if (failedTests > 0) {
    console.error(`❌ ${failedTests} tests failed.`);
    process.exit(1);
  } else {
    console.log('🎉 ALL PLAYGROUND & EXECUTION TESTS PASSED SUCCESSFULLY!');
    console.log('====================================================');
  }
}

runTests();
