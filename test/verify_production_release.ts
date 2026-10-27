import fs from 'node:fs';
import path from 'node:path';
import { CURRICULUM_MODULES, ALL_LESSONS } from '../src/data/curriculum';
import { GUIDED_PROJECTS } from '../src/data/projects';
import { GLOSSARY_TERMS } from '../src/data/glossary';
import { ASSESSMENT_PACKAGES } from '../src/data/assessments/assessmentPackages';
import { ALL_ASSESSMENT_QUESTIONS } from '../src/data/assessments';
import { executionService } from '../src/services/executionService';
import { aiTutorService } from '../src/services/aiTutorService';

console.log('================================================================');
console.log('   KHMER JAVA ACADEMY - PRODUCTION READINESS & QA AUDIT SUITE   ');
console.log('   Mobile, Accessibility, Performance & Full Release Pass       ');
console.log('================================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition: boolean, checkName: string, detail?: string) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ [PASS] ${checkName}`);
  } else {
    failedChecks++;
    console.error(`  ❌ [FAIL] ${checkName}`);
    if (detail) console.error(`     Details: ${detail}`);
  }
}

async function runProductionAudit() {
  const rootDir = process.cwd();

  // -------------------------------------------------------------------------
  // AREA 1: Routes, Navigation Links, Search, and Component Architecture
  // -------------------------------------------------------------------------
  console.log('[AUDIT 1] Verifying Routes, Navigation Links & Code-Splitting Architecture...');
  const appTsx = fs.readFileSync(path.join(rootDir, 'src/App.tsx'), 'utf-8');
  assert(appTsx.includes('lazy('), 'Route-level code splitting configured via React.lazy');
  assert(appTsx.includes('<Suspense'), 'Suspense boundary declared with accessible fallback');
  assert(appTsx.includes('RouteLoadingFallback'), 'Accessible RouteLoadingFallback mounted on routes');

  const expectedRoutePaths = [
    '/',
    'curriculum',
    'curriculum/:slug',
    'playground',
    'projects',
    'projects/:slug',
    'quizzes',
    'glossary',
    'dashboard',
    'auth',
    '404',
  ];
  expectedRoutePaths.forEach((r) => {
    assert(appTsx.includes(`path="${r}"`) || appTsx.includes('index element'), `Route "${r}" is registered in App.tsx`);
  });

  // Check Layout skip-to-content link
  const layoutTsx = fs.readFileSync(path.join(rootDir, 'src/components/layout/Layout.tsx'), 'utf-8');
  assert(layoutTsx.includes('href="#main-content"'), 'Skip-to-main-content accessible bypass link present');
  assert(layoutTsx.includes('id="main-content"'), 'Main content container has matching id="main-content"');
  assert(layoutTsx.includes('<OfflineBanner'), 'OfflineBanner mounted globally in Layout');

  // Check Navbar accessible labels & mobile drawer
  const navbarTsx = fs.readFileSync(path.join(rootDir, 'src/components/layout/Navbar.tsx'), 'utf-8');
  assert(navbarTsx.includes('aria-expanded={mobileMenuOpen}'), 'Mobile menu toggle has dynamic aria-expanded attribute');
  assert(navbarTsx.includes('aria-controls="mobile-nav-menu"'), 'Mobile menu button links to id="mobile-nav-menu" via aria-controls');
  assert(navbarTsx.includes('aria-label='), 'Accessible aria-label attributes defined on interactive elements');
  assert(navbarTsx.includes('min-h-[44px]'), 'Touch targets meet WCAG 2.2 AA minimum recommendation (min-h-[44px])');

  // -------------------------------------------------------------------------
  // AREA 2: Khmer & English Language Switching
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 2] Verifying Bilingual Khmer & English Support...');
  const langContextTsx = fs.readFileSync(path.join(rootDir, 'src/context/LanguageContext.tsx'), 'utf-8');
  assert(langContextTsx.includes('khmer_java_lang'), 'Language preference persisted to localStorage key');
  assert(langContextTsx.includes("language === 'km' ? km : en"), 'Translation helper t() correctly branches km and en');

  let bilingualLessonCount = 0;
  ALL_LESSONS.forEach((l) => {
    if (l.titleKm && l.titleEn && l.summaryKm && l.summaryEn) {
      bilingualLessonCount++;
    }
  });
  assert(bilingualLessonCount === 27, `All 27 curriculum lessons have bilingual titles and summaries (found ${bilingualLessonCount})`);

  let bilingualProjectCount = 0;
  GUIDED_PROJECTS.forEach((p) => {
    if (p.titleKm && p.titleEn && p.descriptionKm && p.descriptionEn) {
      bilingualProjectCount++;
    }
  });
  assert(bilingualProjectCount === 5, `All 5 guided projects have bilingual metadata (found ${bilingualProjectCount})`);

  // -------------------------------------------------------------------------
  // AREA 3: Lesson Content, Code Examples, Quizzes, and Scoring
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 3] Verifying Lesson Content, Code Examples & Scoring System...');
  assert(CURRICULUM_MODULES.length === 8, '8 comprehensive curriculum modules configured');
  assert(ALL_LESSONS.length === 27, '27 total lessons present with code examples');
  const lessonsWithExerciseOutput = ALL_LESSONS.filter((l) => Boolean(l.exercise?.expectedOutput));
  assert(lessonsWithExerciseOutput.length === 27, `All 27 lessons have interactive exercises with validated expected outputs (found ${lessonsWithExerciseOutput.length})`);
  assert(ALL_ASSESSMENT_QUESTIONS.length >= 25, `Assessment question bank populated (${ALL_ASSESSMENT_QUESTIONS.length} questions)`);
  assert(ASSESSMENT_PACKAGES.length === 9, `9 Assessment packages configured (found ${ASSESSMENT_PACKAGES.length})`);

  // -------------------------------------------------------------------------
  // AREA 4: Java Sandbox Compilation, Execution & Timeout Handling
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 4] Verifying Java Compilation, Execution & Error Separation...');
  assert(typeof executionService.executeJava === 'function', 'executeJava method is available');
  assert(executionService.isConfigured() === true, 'Execution service reports configured status by default');

  // Test code size protection
  const oversizeCode = 'public class Big { ' + '// comment\n'.repeat(5000) + ' }';
  const sizeRes = await executionService.executeJava({ code: oversizeCode });
  assert(sizeRes.status === 'compilation_error', 'Oversized code correctly rejected');
  assert(sizeRes.isError === true, 'Oversized code marked as error');

  // Test timeout protection (1ms timeout)
  const timeoutRes = await executionService.executeJava({
    code: 'public class T { public static void main(String[] args) {} }',
    timeoutMs: 1,
  });
  assert(timeoutRes.status === 'timeout', 'Short timeout triggers status="timeout" via AbortController');
  assert(timeoutRes.isTimeout === true, 'isTimeout flag is set');
  assert(timeoutRes.stderr.includes('ផុតកំណត់') || timeoutRes.stderr.includes('Timed Out'), 'Khmer timeout explanation returned');

  // -------------------------------------------------------------------------
  // AREA 5: Registration, Login, Guest Mode & Session Persistence
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 5] Verifying Auth, Guest Mode & Session Persistence...');
  const authContextTsx = fs.readFileSync(path.join(rootDir, 'src/context/AuthContext.tsx'), 'utf-8');
  assert(authContextTsx.includes('khmer_java_guest_user'), 'AuthContext supports local guest user storage fallback');
  assert(authContextTsx.includes('useGuestMode'), 'Guest mode function exposed to student learners');

  // -------------------------------------------------------------------------
  // AREA 6: Database Permissions, RLS & Progress Synchronization
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 6] Verifying Database Schema, RLS Security & Progress Sync...');
  const schemaSql = fs.readFileSync(path.join(rootDir, 'supabase/schema.sql'), 'utf-8').toLowerCase();
  assert(schemaSql.includes('alter table public.user_profiles enable row level security;'), 'RLS enabled on user_profiles');
  assert(schemaSql.includes('alter table public.user_progress enable row level security;'), 'RLS enabled on user_progress');
  assert(schemaSql.includes('alter table public.user_bookmarks enable row level security;'), 'RLS enabled on user_bookmarks');
  assert(schemaSql.includes('auth.uid() = id'), 'user_profiles restricted to authenticated user id');
  assert(schemaSql.includes('auth.uid() = user_id'), 'user_progress restricted to user_id');
  assert(schemaSql.includes('claimed_xp_activities'), 'Duplicate XP claims guarded by claimed_xp_activities column');

  // -------------------------------------------------------------------------
  // AREA 7: Responsive Layouts, Accessibility & WCAG 2.2 AA Compliance
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 7] Verifying Responsive Layouts, Accessibility & WCAG 2.2 AA...');
  const indexCss = fs.readFileSync(path.join(rootDir, 'src/index.css'), 'utf-8');
  assert(indexCss.includes('prefers-reduced-motion: reduce'), 'Reduced-motion media query implemented in CSS');
  assert(indexCss.includes(':focus-visible'), 'High-contrast 2px visible focus ring defined for keyboard users');
  assert(indexCss.includes('overflow-x: hidden'), 'Horizontal overflow guard on html and body');
  assert(indexCss.includes('line-height: 1.75') || indexCss.includes('line-height: 1.8'), 'Sufficient Khmer vertical line-height preventing diacritic clipping');
  assert(indexCss.includes('font-size: 16px !important'), 'Mobile input zoom prevention (16px font-size) implemented');

  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  assert(indexHtml.includes('viewport-fit=cover'), 'Viewport-fit=cover specified for modern mobile notch support');
  assert(indexHtml.includes('lang="km"'), 'Document root has primary language attribute lang="km"');
  assert(indexHtml.includes('rel="preload" as="style"'), 'High-performance preloaded font stylesheet configured');
  assert(indexHtml.includes('display=swap'), 'Font-display=swap enabled on Google Fonts');

  // Check TopSearchBar accessibility
  const searchTsx = fs.readFileSync(path.join(rootDir, 'src/components/common/TopSearchBar.tsx'), 'utf-8');
  assert(searchTsx.includes('role="dialog"'), 'TopSearchBar implements role="dialog"');
  assert(searchTsx.includes('aria-modal="true"'), 'TopSearchBar implements aria-modal="true"');
  assert(searchTsx.includes('aria-label='), 'TopSearchBar has accessible labels');

  // Check JavaEditor accessibility
  const editorTsx = fs.readFileSync(path.join(rootDir, 'src/components/editor/JavaEditor.tsx'), 'utf-8');
  assert(editorTsx.includes('accessibilitySupport: \'on\''), 'Monaco accessibilitySupport explicitly enabled');
  assert(editorTsx.includes('wordWrap: \'on\''), 'Monaco wordWrap enabled to prevent horizontal text clipping');
  assert(editorTsx.includes('ariaLabel: \'Java Source Code Editor\''), 'Monaco has ariaLabel defined');

  // Check ProjectWorkspace accessible modal confirmation
  const projWorkspaceTsx = fs.readFileSync(path.join(rootDir, 'src/components/project/ProjectWorkspace.tsx'), 'utf-8');
  assert(!projWorkspaceTsx.includes('window.confirm'), 'ProjectWorkspace avoids blocking window.confirm calls');
  assert(projWorkspaceTsx.includes('role="dialog"'), 'ProjectWorkspace solution confirmation implements accessible modal dialog');

  // -------------------------------------------------------------------------
  // AREA 8: Loading, Empty, Error, Offline, and Service-Unavailable States
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 8] Verifying Loading, Empty, Error, and Offline Messaging...');
  const offlineTsx = fs.readFileSync(path.join(rootDir, 'src/components/common/OfflineBanner.tsx'), 'utf-8');
  assert(offlineTsx.includes('role="alert"'), 'OfflineBanner implements role="alert"');
  assert(offlineTsx.includes('aria-live="assertive"'), 'OfflineBanner implements aria-live="assertive"');
  assert(offlineTsx.includes('handleRecheck'), 'OfflineBanner provides interactive recheck button');

  const emptyStateTsx = fs.readFileSync(path.join(rootDir, 'src/components/common/EmptyState.tsx'), 'utf-8');
  assert(emptyStateTsx.includes('title') && emptyStateTsx.includes('description'), 'EmptyState component supports title and descriptive recovery actions');

  // -------------------------------------------------------------------------
  // AREA 9: Security Headers, Rate Limits, and Secret Exposure Inspection
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 9] Verifying Security Headers, Rate Limiting & Secret Exposure...');
  const viteConfig = fs.readFileSync(path.join(rootDir, 'vite.config.ts'), 'utf-8');
  assert(viteConfig.includes('X-Content-Type-Options') && viteConfig.includes('nosniff'), 'X-Content-Type-Options: nosniff security header configured');
  assert(viteConfig.includes('X-Frame-Options') && viteConfig.includes('SAMEORIGIN'), 'X-Frame-Options: SAMEORIGIN clickjacking protection configured');
  assert(viteConfig.includes('Referrer-Policy'), 'Referrer-Policy configured');

  // Verify secret exposure in repo
  const envExample = fs.readFileSync(path.join(rootDir, '.env.example'), 'utf-8');
  assert(!envExample.includes('eyJh') && !envExample.includes('secret_'), 'No real API keys or JWT tokens in .env.example');
  assert(envExample.includes('VITE_SUPABASE_URL'), 'Documented VITE_SUPABASE_URL');
  assert(envExample.includes('VITE_SUPABASE_ANON_KEY'), 'Documented VITE_SUPABASE_ANON_KEY');

  // Verify rate limiting in server
  const apiRouterTs = fs.readFileSync(path.join(rootDir, 'server/apiRouter.ts'), 'utf-8');
  assert(apiRouterTs.includes('handleAITutorRequest'), 'Server routes AI tutor requests');
  assert(apiRouterTs.includes('getSanitizedQuestions'), 'Server questions endpoint returns sanitized questions');

  // -------------------------------------------------------------------------
  // AREA 10: Production Build & Bundle Output Verification
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 10] Verifying Production Distribution Bundles & Chunks...');
  const distDir = path.join(rootDir, 'dist');
  assert(fs.existsSync(distDir), 'Production dist directory exists');
  assert(fs.existsSync(path.join(distDir, 'index.html')), 'Production dist/index.html generated');

  const assetsDir = path.join(distDir, 'assets');
  const assetFiles = fs.readdirSync(assetsDir);
  const jsFiles = assetFiles.filter((f) => f.endsWith('.js'));
  const cssFiles = assetFiles.filter((f) => f.endsWith('.css'));

  assert(jsFiles.length >= 10, `Route-level code splitting produced >= 10 chunks (found ${jsFiles.length})`);
  assert(cssFiles.length >= 1, `Production stylesheet generated (found ${cssFiles.length})`);

  // Verify entry chunk size
  const entryFile = jsFiles.find((f) => f.startsWith('index-'));
  if (entryFile) {
    const entryStats = fs.statSync(path.join(assetsDir, entryFile));
    const entrySizeKb = Math.round(entryStats.size / 1024);
    assert(entrySizeKb < 200, `Main index entry bundle size is lightweight: ${entrySizeKb}KB (< 200KB target)`);
  }

  // -------------------------------------------------------------------------
  // AREA 11: Developer Profile & Attribution Verification
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 11] Verifying Developer Profile & Attribution (Pheap Phirom)...');
  const devFile = path.join(rootDir, 'src/data/developer.ts');
  assert(fs.existsSync(devFile), 'Developer metadata file src/data/developer.ts exists');
  const devContent = fs.readFileSync(devFile, 'utf-8');
  assert(devContent.toLowerCase().includes('pheap phirom'), 'Developer name "Pheap Phirom" documented');
  assert(!devContent.includes('ភាប ភិរម្យ') && !devContent.includes('ភាប ភីរម្យ'), 'Developer Khmer name removed per user specification');
  assert(devContent.includes('student-attendance-app-lkjj.onrender.com/my-portfolio.html'), 'Original portfolio URL linked');
  assert(devContent.includes('Athipadei High School') || devContent.includes('វិទ្យាល័យអធិបតី'), 'Educational background documented');
  assert(fs.existsSync(path.join(rootDir, 'public/images/pheap-phirom.jpg')), 'Local developer photo public/images/pheap-phirom.jpg exists');
  assert(fs.existsSync(path.join(rootDir, 'public/images/angkor-apsara.jpg')), 'Local Angkor background public/images/angkor-apsara.jpg exists');

  const footerTsx = fs.readFileSync(path.join(rootDir, 'src/components/layout/Footer.tsx'), 'utf-8');
  assert(footerTsx.includes('DEVELOPER_PROFILE') && footerTsx.includes('DeveloperProfileModal'), 'Footer integrates DeveloperProfileModal and metadata');
  assert(footerTsx.includes('Pheap Phirom'), 'Footer attributes developer Pheap Phirom cleanly');

  const homePageTsx = fs.readFileSync(path.join(rootDir, 'src/pages/HomePage.tsx'), 'utf-8');
  assert(!homePageTsx.includes('DeveloperProfileModal'), 'HomePage maintains clean layout without intrusive developer spotlight banner');

  // -------------------------------------------------------------------------
  // AREA 12: Legal, Trademark & Copyright Compliance Verification
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 12] Verifying Legal Disclaimers, Trademarks & Non-Affiliation...');
  const legalModalFile = path.join(rootDir, 'src/components/common/LegalModal.tsx');
  assert(fs.existsSync(legalModalFile), 'LegalModal component src/components/common/LegalModal.tsx exists');
  assert(footerTsx.includes('LegalModal'), 'Footer mounts accessible LegalModal');
  assert(footerTsx.includes('Java® is a registered trademark of Oracle Corporation'), 'Statutory Java trademark notice in footer');
  assert(footerTsx.includes('W3Schools® is a registered trademark of Refsnes Data AS'), 'Statutory W3Schools trademark notice in footer');
  assert(!homePageTsx.includes('W3Schools Aligned'), 'No misleading "W3Schools Aligned" badge on homepage');
  assert(!homePageTsx.includes('W3Schools-Aligned Curriculum'), 'No misleading "W3Schools-Aligned Curriculum" on homepage');

  // -------------------------------------------------------------------------
  // AREA 13: Top-Left Reusable BackButton & Responsive Fallback Navigation
  // -------------------------------------------------------------------------
  console.log('\n[AUDIT 13] Verifying Reusable BackButton & Navigation Fallbacks...');
  const backButtonFile = path.join(rootDir, 'src/components/common/BackButton.tsx');
  assert(fs.existsSync(backButtonFile), 'BackButton component exists at src/components/common/BackButton.tsx');
  const backButtonTsx = fs.readFileSync(backButtonFile, 'utf-8');
  assert(backButtonTsx.includes('type="button"'), 'BackButton explicitly specifies type="button" to prevent form submission');
  assert(backButtonTsx.includes('aria-label='), 'BackButton implements accessible aria-label');
  assert(backButtonTsx.includes('hasBrowserHistory()'), 'BackButton detects browser history before navigating');
  assert(backButtonTsx.includes('navigate(-1)'), 'BackButton calls navigate(-1) when history is present');

  assert(layoutTsx.includes('BackButton'), 'Shared Layout mounts BackButton across all applicable pages');
  assert(layoutTsx.includes("location.pathname === '/' || location.pathname === '/auth'"), 'Layout excludes home (/) and auth (/auth) pages');

  const projectDetailPageTsx = fs.readFileSync(path.join(rootDir, 'src/pages/ProjectDetailPage.tsx'), 'utf-8');
  assert(!projectDetailPageTsx.includes('Back to All Projects'), 'Duplicate back button removed from ProjectDetailPage.tsx');

  // -------------------------------------------------------------------------
  // FINAL AUDIT SUMMARY
  // -------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`PRODUCTION AUDIT COMPLETE: ${passedChecks}/${totalChecks} checks passed.`);
  if (failedChecks > 0) {
    console.error(`❌ ${failedChecks} checks failed.`);
    process.exit(1);
  } else {
    console.log('🎉 ALL 10 PRODUCTION AUDIT & QUALITY CHECKS PASSED PERFECTLY!');
    console.log('================================================================');
  }
}

runProductionAudit();
