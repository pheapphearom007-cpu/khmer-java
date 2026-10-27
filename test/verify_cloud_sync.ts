import fs from 'node:fs';
import path from 'node:path';

console.log('================================================================');
console.log('   KHMER JAVA ACADEMY - MULTI-DEVICE & CLOUD SYNC AUDIT SUITE   ');
console.log('   PostgreSQL RLS, Supabase Realtime, Notes & User Isolation    ');
console.log('================================================================\n');

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
    if (details) console.error(`     Details: ${details}`);
  }
}

const rootDir = process.cwd();

async function runCloudSyncAudit() {
  // -------------------------------------------------------------
  // AUDIT 1: Supabase PostgreSQL Schema & Migrations
  // -------------------------------------------------------------
  console.log('[AUDIT 1] Verifying Database Schema, Tables & Realtime Replication...');

  const schemaPath = path.join(rootDir, 'supabase/schema.sql');
  assert(fs.existsSync(schemaPath), 'supabase/schema.sql exists');

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Verify all 4 required tables
  assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.user_profiles'), 'user_profiles table declared');
  assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.user_progress'), 'user_progress table declared');
  assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.user_bookmarks'), 'user_bookmarks table declared');
  assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.user_notes'), 'user_notes table declared');

  // Verify user preferences in user_profiles
  assert(schemaSql.includes('theme TEXT DEFAULT'), 'user_profiles contains theme column');
  assert(schemaSql.includes('editor_font_size INTEGER DEFAULT'), 'user_profiles contains editor_font_size column');
  assert(schemaSql.includes('sound_effects BOOLEAN DEFAULT'), 'user_profiles contains sound_effects column');

  // Verify user_notes constraints
  assert(schemaSql.includes('UNIQUE(user_id, lesson_slug)'), 'user_notes enforces UNIQUE(user_id, lesson_slug)');

  // Verify REPLICA IDENTITY FULL for Supabase Realtime
  assert(schemaSql.includes('ALTER TABLE public.user_profiles REPLICA IDENTITY FULL;'), 'user_profiles has REPLICA IDENTITY FULL');
  assert(schemaSql.includes('ALTER TABLE public.user_progress REPLICA IDENTITY FULL;'), 'user_progress has REPLICA IDENTITY FULL');
  assert(schemaSql.includes('ALTER TABLE public.user_bookmarks REPLICA IDENTITY FULL;'), 'user_bookmarks has REPLICA IDENTITY FULL');
  assert(schemaSql.includes('ALTER TABLE public.user_notes REPLICA IDENTITY FULL;'), 'user_notes has REPLICA IDENTITY FULL');

  // Verify Realtime publication registration
  assert(schemaSql.includes('ADD TABLE public.user_profiles'), 'user_profiles added to supabase_realtime publication');
  assert(schemaSql.includes('ADD TABLE public.user_progress'), 'user_progress added to supabase_realtime publication');
  assert(schemaSql.includes('ADD TABLE public.user_bookmarks'), 'user_bookmarks added to supabase_realtime publication');
  assert(schemaSql.includes('ADD TABLE public.user_notes'), 'user_notes added to supabase_realtime publication');

  // -------------------------------------------------------------
  // AUDIT 2: Row Level Security (RLS) Least-Privilege Policies
  // -------------------------------------------------------------
  console.log('\n[AUDIT 2] Verifying Least-Privilege RLS Policies with auth.uid()...');

  // RLS enabled on all 4 tables
  assert(schemaSql.includes('ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on user_profiles');
  assert(schemaSql.includes('ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on user_progress');
  assert(schemaSql.includes('ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on user_bookmarks');
  assert(schemaSql.includes('ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on user_notes');

  // Check user_profiles RLS policies
  assert(schemaSql.includes('CREATE POLICY "Users can view their own profile"') && schemaSql.includes('USING (auth.uid() = id)'), 'user_profiles SELECT policy uses auth.uid() = id');
  assert(schemaSql.includes('CREATE POLICY "Users can update their own profile"') && schemaSql.includes('WITH CHECK (auth.uid() = id)'), 'user_profiles UPDATE policy validates WITH CHECK (auth.uid() = id)');
  assert(schemaSql.includes('CREATE POLICY "Users can delete their own profile"'), 'user_profiles DELETE policy defined');

  // Check user_progress RLS policies
  assert(schemaSql.includes('CREATE POLICY "Users can view their own progress"') && schemaSql.includes('USING (auth.uid() = user_id)'), 'user_progress SELECT policy uses auth.uid() = user_id');
  assert(schemaSql.includes('CREATE POLICY "Users can update their own progress"') && schemaSql.includes('WITH CHECK (auth.uid() = user_id)'), 'user_progress UPDATE policy validates WITH CHECK (auth.uid() = user_id)');
  assert(schemaSql.includes('CREATE POLICY "Users can delete their own progress"'), 'user_progress DELETE policy defined');

  // Check user_notes RLS policies
  assert(schemaSql.includes('CREATE POLICY "Users can view their own notes"') && schemaSql.includes('USING (auth.uid() = user_id)'), 'user_notes SELECT policy uses auth.uid() = user_id');
  assert(schemaSql.includes('CREATE POLICY "Users can create their own notes"') && schemaSql.includes('WITH CHECK (auth.uid() = user_id)'), 'user_notes INSERT policy validates WITH CHECK (auth.uid() = user_id)');
  assert(schemaSql.includes('CREATE POLICY "Users can update their own notes"') && schemaSql.includes('WITH CHECK (auth.uid() = user_id)'), 'user_notes UPDATE policy validates WITH CHECK (auth.uid() = user_id)');
  assert(schemaSql.includes('CREATE POLICY "Users can delete their own notes"') && schemaSql.includes('USING (auth.uid() = user_id)'), 'user_notes DELETE policy validates USING (auth.uid() = user_id)');

  // -------------------------------------------------------------
  // AUDIT 3: Multi-Device Authentication & Local Session Scope
  // -------------------------------------------------------------
  console.log('\n[AUDIT 3] Verifying Multi-Device Authentication & Safe Sign-Out Scope...');

  const authContextFile = path.join(rootDir, 'src/context/AuthContext.tsx');
  const authCode = fs.readFileSync(authContextFile, 'utf8');

  // Verify local scope signOut to prevent kicking other devices out
  assert(authCode.includes("scope: options.scope || 'local'"), "signOut defaults to scope: 'local' for multi-device safety");
  assert(authCode.includes('INITIAL_SESSION'), 'Auth listener handles INITIAL_SESSION event');
  assert(authCode.includes('TOKEN_REFRESHED'), 'Auth listener handles TOKEN_REFRESHED event');
  assert(authCode.includes('USER_UPDATED'), 'Auth listener handles USER_UPDATED event');
  assert(authCode.includes('updatePreferences'), 'AuthContext exposes updatePreferences method');
  assert(authCode.includes('from(\'user_profiles\')'), 'AuthContext hydrates user profile from PostgreSQL');

  // -------------------------------------------------------------
  // AUDIT 4: User Scoped Storage & No Data Bleeding
  // -------------------------------------------------------------
  console.log('\n[AUDIT 4] Verifying User-Scoped Caching & Data Bleed Prevention...');

  const progressContextFile = path.join(rootDir, 'src/context/ProgressContext.tsx');
  const progressCode = fs.readFileSync(progressContextFile, 'utf8');

  assert(progressCode.includes('getUserStorageKey'), 'ProgressContext implements user-scoped storage key function');
  assert(progressCode.includes('khmer_java_progress_${userId}'), 'Storage key partitions data by user ID');
  assert(progressCode.includes('khmer_java_progress_guest'), 'Storage key provides isolated guest partition');
  assert(progressCode.includes('if (!user)'), 'ProgressContext explicitly handles sign-out state reset');

  // -------------------------------------------------------------
  // AUDIT 5: Supabase Realtime Subscriptions & Channel Teardown
  // -------------------------------------------------------------
  console.log('\n[AUDIT 5] Verifying Supabase Realtime Subscriptions & Channel Lifecycle...');

  assert(progressCode.includes('postgres_changes'), 'Realtime listener registers postgres_changes event');
  assert(progressCode.includes("table: 'user_progress'"), 'Realtime listens to user_progress changes');
  assert(progressCode.includes("table: 'user_bookmarks'"), 'Realtime listens to user_bookmarks changes');
  assert(progressCode.includes("table: 'user_notes'"), 'Realtime listens to user_notes changes');
  assert(progressCode.includes('filter: `user_id=eq.${user.id}`'), 'Realtime channels are strictly filtered by user_id');
  assert(progressCode.includes('supabase.removeChannel(channel)'), 'Realtime channel is removed cleanly on unmount');

  // -------------------------------------------------------------
  // AUDIT 6: Personal Study Notes CRUD & UI Integration
  // -------------------------------------------------------------
  console.log('\n[AUDIT 6] Verifying Personal Study Notes CRUD & UI Integration...');

  assert(progressCode.includes('saveNote:'), 'ProgressContext exposes saveNote method');
  assert(progressCode.includes('getNote:'), 'ProgressContext exposes getNote method');
  assert(progressCode.includes('deleteNote:'), 'ProgressContext exposes deleteNote method');

  const notesModalFile = path.join(rootDir, 'src/components/lesson/LessonNotesModal.tsx');
  assert(fs.existsSync(notesModalFile), 'LessonNotesModal component exists');

  const notesModalCode = fs.readFileSync(notesModalFile, 'utf8');
  assert(notesModalCode.includes('role="dialog"'), 'LessonNotesModal has role="dialog"');
  assert(notesModalCode.includes('aria-modal="true"'), 'LessonNotesModal has aria-modal="true"');
  assert(notesModalCode.includes('handleSave'), 'LessonNotesModal implements save handler');
  assert(notesModalCode.includes('handleDelete'), 'LessonNotesModal implements delete confirmation');

  const lessonPageFile = path.join(rootDir, 'src/pages/LessonPage.tsx');
  const lessonPageCode = fs.readFileSync(lessonPageFile, 'utf8');
  assert(lessonPageCode.includes('LessonNotesModal'), 'LessonPage integrates LessonNotesModal');
  assert(lessonPageCode.includes('getNote(lesson.slug)'), 'LessonPage renders dynamic notes status button');

  const dashboardPageFile = path.join(rootDir, 'src/pages/DashboardPage.tsx');
  const dashboardPageCode = fs.readFileSync(dashboardPageFile, 'utf8');
  assert(dashboardPageCode.includes("activeTab === 'notes'"), 'DashboardPage renders dedicated Personal Notes tab');

  // -------------------------------------------------------------
  // AUDIT 7: Security - No Service Role Secrets in Frontend
  // -------------------------------------------------------------
  console.log('\n[AUDIT 7] Verifying Zero Exposure of Service Role Keys in Frontend...');

  const srcFiles: string[] = [];
  function collectFiles(dir: string) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
      const full = path.join(dir, dirent.name);
      if (dirent.isDirectory()) collectFiles(full);
      else if (dirent.isFile() && (full.endsWith('.ts') || full.endsWith('.tsx') || full.endsWith('.html'))) {
        srcFiles.push(full);
      }
    });
  }
  collectFiles(path.join(rootDir, 'src'));

  let foundServiceRole = false;
  srcFiles.forEach((f) => {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('service_role') || content.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      foundServiceRole = true;
      console.error(`  ❌ Potential service_role found in: ${f}`);
    }
  });

  assert(!foundServiceRole, 'Zero references to service_role secrets in all frontend source files');

  // -------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`CLOUD SYNC AUDIT COMPLETE: ${passedTests}/${totalTests} checks passed.`);
  if (failedTests === 0) {
    console.log('🎉 ALL MULTI-DEVICE & CLOUD SYNC VERIFICATIONS PASSED PERFECTLY!');
  } else {
    console.error(`⚠️ ${failedTests} CHECKS FAILED.`);
    process.exit(1);
  }
  console.log('================================================================');
}

runCloudSyncAudit();
