import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSensibleFallbackPath } from '../src/components/common/BackButton';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('================================================================');
console.log('   VERIFY BACK BUTTON COMPONENT & NAVIGATION FALLBACKS          ');
console.log('================================================================');

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✓ [PASS] ${msg}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${msg}`);
    failed++;
  }
}

// 1. Verify file exists
const backButtonFile = path.join(rootDir, 'src/components/common/BackButton.tsx');
assert(fs.existsSync(backButtonFile), 'BackButton.tsx exists in src/components/common');

const backButtonContent = fs.readFileSync(backButtonFile, 'utf-8');

// 2. Component properties & security
assert(backButtonContent.includes('type="button"'), 'BackButton explicitly specifies type="button" to prevent accidental form submission');
assert(backButtonContent.includes('aria-label='), 'BackButton implements accessible aria-label');
assert(backButtonContent.includes('aria-hidden="true"'), 'Icon implements aria-hidden="true" for screen reader compliance');
assert(backButtonContent.includes("t('ត្រឡប់ក្រោយ', 'Back')"), 'BackButton provides bilingual Khmer & English labels');
assert(backButtonContent.includes('navigate(-1)'), 'BackButton navigates back when browser history exists');
assert(backButtonContent.includes('hasBrowserHistory()'), 'BackButton checks history state before navigating');
assert(backButtonContent.includes('focus-visible:ring-rose-500'), 'BackButton includes high-contrast keyboard focus indicators');

// 3. Fallback path algorithm tests
console.log('\n[TEST] Testing Route-Aware Fallback Navigation...');
assert(getSensibleFallbackPath('/curriculum/java-file-handling') === '/curriculum', 'File Handling lesson falls back to /curriculum');
assert(getSensibleFallbackPath('/curriculum/java-exceptions-handling') === '/curriculum', 'Exception Handling lesson falls back to /curriculum');
assert(getSensibleFallbackPath('/curriculum/classes-oop') === '/curriculum', 'OOP lesson falls back to /curriculum');
assert(getSensibleFallbackPath('/curriculum/intro-to-java') === '/curriculum', 'Intro lesson falls back to /curriculum');
assert(getSensibleFallbackPath('/projects/student-management-system') === '/projects', 'Project detail page falls back to /projects');
assert(getSensibleFallbackPath('/projects/atm-banking-system') === '/projects', 'Project detail page falls back to /projects');
assert(getSensibleFallbackPath('/quizzes') === '/curriculum', 'Quizzes hub falls back to /curriculum');
assert(getSensibleFallbackPath('/playground') === '/curriculum', 'Playground page falls back to /curriculum');
assert(getSensibleFallbackPath('/glossary') === '/curriculum', 'Glossary page falls back to /curriculum');
assert(getSensibleFallbackPath('/dashboard') === '/curriculum', 'Dashboard page falls back to /curriculum');
assert(getSensibleFallbackPath('/projects') === '/curriculum', 'Projects catalog falls back to /curriculum');
assert(getSensibleFallbackPath('/curriculum') === '/', 'Curriculum catalog falls back to / (Home)');
assert(getSensibleFallbackPath('/404') === '/', '404 error page falls back to / (Home)');

// 4. Shared Layout integration
console.log('\n[TEST] Testing Shared Layout.tsx Integration...');
const layoutFile = path.join(rootDir, 'src/components/layout/Layout.tsx');
assert(fs.existsSync(layoutFile), 'Layout.tsx exists');
const layoutContent = fs.readFileSync(layoutFile, 'utf-8');

assert(layoutContent.includes('import { BackButton } from \'../common/BackButton\''), 'Layout.tsx imports BackButton');
assert(layoutContent.includes('<BackButton />') || layoutContent.includes('<BackButton'), 'Layout.tsx renders BackButton');
assert(layoutContent.includes("location.pathname === '/' || location.pathname === '/auth'"), 'Layout excludes home (/) and auth (/auth) pages');
assert(layoutContent.includes("location.pathname.startsWith('/curriculum/')"), 'Layout supports responsive full-width container for lessons');

// 5. Duplicate back button check
console.log('\n[TEST] Verifying No Duplicate Back Buttons...');
const projectDetailContent = fs.readFileSync(path.join(rootDir, 'src/pages/ProjectDetailPage.tsx'), 'utf-8');
assert(!projectDetailContent.includes('Back to All Projects'), 'Removed duplicate "Back to All Projects" button from ProjectDetailPage.tsx');

console.log('\n================================================================');
console.log(`VERIFICATION COMPLETE: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
}
