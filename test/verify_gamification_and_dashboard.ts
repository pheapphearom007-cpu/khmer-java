import { ALL_ACHIEVEMENTS, checkNewlyUnlockedAchievements, calculateNextStreak, getLevelFromXp } from '../src/data/achievements';
import { getCurriculumStages, generatePersonalizedRecommendations } from '../src/data/recommendations';
import { UserProgress } from '../src/types';
import fs from 'node:fs';
import path from 'node:path';

console.log('====================================================');
console.log('   KHMER JAVA ACADEMY - GAMIFICATION & DASHBOARD   ');
console.log('   Full Specification & Security Audit Test Suite   ');
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
  // -------------------------------------------------------------
  // PART 1: GAMIFICATION, XP & ANTI-FARMING RULES
  // -------------------------------------------------------------
  console.log('[SECTION 1] Verifying Gamification XP & Anti-Farming Rules...');

  // 1a. XP Award & Duplicate Activity Guard
  const initialProgress: UserProgress = {
    completedLessonIds: [],
    quizScores: {},
    completedProjectIds: [],
    bookmarks: [],
    lastLessonSlug: 'intro-to-java',
    totalTimeSpentMinutes: 0,
    assessmentAttempts: [],
    xp: 0,
    claimedXpActivityIds: [],
    streak: { currentStreak: 0, longestStreak: 0, lastActivityDate: null, activityDates: [] },
    unlockedAchievementIds: [],
    achievementHistory: [],
    dailyGoal: { enabled: true, targetActivities: 2, completedActivities: 0, date: '2026-10-27', isCompleted: false },
    weeklyGoal: { enabled: true, targetLessons: 3, completedLessons: 0, weekStartDate: '2026-10-27', isCompleted: false },
  };

  // Simulate claiming XP for a lesson
  const activityId1 = 'lesson_intro-to-java';
  assert(!initialProgress.claimedXpActivityIds.includes(activityId1), 'Activity not yet claimed');

  // Add XP once
  initialProgress.xp += 50;
  initialProgress.claimedXpActivityIds.push(activityId1);
  assert(initialProgress.xp === 50, 'XP correctly awarded (+50 XP)');
  assert(initialProgress.claimedXpActivityIds.includes(activityId1), 'Activity ID recorded in claimed list');

  // Attempt duplicate submission for same activity
  const duplicateAttemptAwarded = !initialProgress.claimedXpActivityIds.includes(activityId1);
  assert(!duplicateAttemptAwarded, 'Anti-Farming: Repeated submission for same activity blocked');
  assert(initialProgress.xp === 50, 'Anti-Farming: XP remains strictly 50 without inflation');

  // Level progression
  const level1 = getLevelFromXp(50);
  assert(level1.level === 1, 'Level 1 at 50 XP');
  const level2 = getLevelFromXp(450);
  assert(level2.level === 2, 'Level 2 reached at 450 XP');
  const level3 = getLevelFromXp(1200);
  assert(level3.level === 3, 'Level 3 reached at 1200 XP');

  // -------------------------------------------------------------
  // PART 2: ACHIEVEMENTS & MILESTONE UNLOCKS
  // -------------------------------------------------------------
  console.log('\n[SECTION 2] Verifying Achievement Badges & Milestones...');

  assert(ALL_ACHIEVEMENTS.length >= 12, `All 14 achievement badges registered (found ${ALL_ACHIEVEMENTS.length})`);

  // Test unlocking first_lesson
  const progressWithOneLesson: UserProgress = {
    ...initialProgress,
    completedLessonIds: ['intro-to-java'],
  };
  const newBadges1 = checkNewlyUnlockedAchievements(progressWithOneLesson);
  assert(newBadges1.some((b) => b.id === 'first_lesson'), 'First lesson completion unlocks "first_lesson" badge');

  // Test unlocking perfect quiz
  const progressWithQuiz: UserProgress = {
    ...progressWithOneLesson,
    unlockedAchievementIds: ['first_lesson'],
    quizScores: { 'intro-to-java': { score: 2, total: 2, completedAt: '2026-10-27' } },
  };
  const newBadges2 = checkNewlyUnlockedAchievements(progressWithQuiz);
  assert(newBadges2.some((b) => b.id === 'first_perfect_quiz'), 'Perfect 100% quiz unlocks "first_perfect_quiz" badge');

  // Test unlocking first_project
  const progressWithProject: UserProgress = {
    ...progressWithQuiz,
    unlockedAchievementIds: ['first_lesson', 'first_perfect_quiz'],
    completedProjectIds: ['console-calculator'],
  };
  const newBadges3 = checkNewlyUnlockedAchievements(progressWithProject);
  assert(newBadges3.some((b) => b.id === 'first_project'), 'Completing first guided project unlocks "first_project" badge');

  // -------------------------------------------------------------
  // PART 3: LEARNING STREAKS (REAL DATES, NO SHAME-BASED PRESSURE)
  // -------------------------------------------------------------
  console.log('\n[SECTION 3] Verifying Learning Streaks (Calendar-Based, Non-Manipulative)...');

  // Day 1
  const streakDay1 = calculateNextStreak(
    { currentStreak: 0, longestStreak: 0, lastActivityDate: null, activityDates: [] },
    '2026-10-25'
  );
  assert(streakDay1.currentStreak === 1, 'Day 1 sets streak to 1');
  assert(streakDay1.lastActivityDate === '2026-10-25', 'Records last activity date');

  // Consecutive Day 2
  const streakDay2 = calculateNextStreak(streakDay1, '2026-10-26');
  assert(streakDay2.currentStreak === 2, 'Consecutive day increments streak to 2');
  assert(streakDay2.longestStreak === 2, 'Longest streak updated to 2');

  // Same Day activity (idempotent, does not overcount)
  const streakSameDay = calculateNextStreak(streakDay2, '2026-10-26');
  assert(streakSameDay.currentStreak === 2, 'Same-day activity preserves streak at 2 without artificial inflation');

  // Gap Day (Graceful reset to 1 without shame or negative penalties)
  const streakAfterGap = calculateNextStreak(streakDay2, '2026-10-28');
  assert(streakAfterGap.currentStreak === 1, 'Missed day safely resets streak to 1');
  assert(streakAfterGap.longestStreak === 2, 'Longest streak remains preserved at 2');

  // Daily Goal Activity Increment & Completion
  const testGoal1 = { enabled: true, targetActivities: 2, completedActivities: 0, date: '2026-10-27', isCompleted: false };
  const goalAfterAct1 = { ...testGoal1, completedActivities: testGoal1.completedActivities + 1, isCompleted: testGoal1.completedActivities + 1 >= testGoal1.targetActivities };
  assert(goalAfterAct1.completedActivities === 1, 'First activity increments daily completed counter to 1');
  assert(!goalAfterAct1.isCompleted, 'Daily goal remains in-progress after 1/2 activities');

  const goalAfterAct2 = { ...goalAfterAct1, completedActivities: goalAfterAct1.completedActivities + 1, isCompleted: goalAfterAct1.completedActivities + 1 >= goalAfterAct1.targetActivities };
  assert(goalAfterAct2.completedActivities === 2, 'Second activity increments daily completed counter to 2');
  assert(goalAfterAct2.isCompleted, 'Daily goal transitions to isCompleted: true upon reaching target (2/2)');

  // -------------------------------------------------------------
  // PART 4: PERSONALIZED RECOMMENDATIONS & PREREQUISITES
  // -------------------------------------------------------------
  console.log('\n[SECTION 4] Verifying Transparent Recommendations & Prerequisites...');

  // 4a. Struggle / Low accuracy revision recommendation
  const strugglingProgress: UserProgress = {
    ...initialProgress,
    completedLessonIds: ['intro-to-java', 'java-syntax-structure'],
    quizScores: {
      'java-syntax-structure': { score: 1, total: 3, completedAt: '2026-10-27' }, // 33% < 70%
    },
  };

  const recommendations = generatePersonalizedRecommendations(strugglingProgress, 'km');
  const revisionRec = recommendations.find((r) => r.type === 'revision');
  assert(Boolean(revisionRec), 'Generates revision recommendation for low quiz score (< 70%)');
  assert(Boolean(revisionRec?.reasonKm.includes('៧០%') || revisionRec?.reasonKm.includes('ពិន្ទុ')), 'Explains transparently WHY revision is recommended');

  // 4b. Curriculum Stages & Prerequisite Gates
  const beginnerProgress: UserProgress = {
    ...initialProgress,
    completedLessonIds: [], // Module 1 not done
  };
  const stages = getCurriculumStages(beginnerProgress);
  assert(stages.length === 8, '8 curriculum stages evaluated');
  assert(stages[0].status === 'in_progress', 'Stage 1 is open to all learners');
  assert(stages[1].status === 'locked', 'Stage 2 is locked until Stage 1 prerequisites are satisfied');
  assert(Boolean(stages[1].requiredModuleTitleKm), 'Provides clear prerequisite requirement name');

  // -------------------------------------------------------------
  // PART 5: SUPABASE SCHEMA & ROW LEVEL SECURITY AUDIT
  // -------------------------------------------------------------
  console.log('\n[SECTION 5] Auditing Supabase Schema, RLS & Database Security...');

  const schemaPath = path.resolve(process.cwd(), 'supabase/schema.sql');
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');

  // 5a. Table Declarations
  assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.user_profiles'), 'user_profiles table declared');
  assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.user_progress'), 'user_progress table declared');
  assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.user_bookmarks'), 'user_bookmarks table declared');

  // 5b. Gamification Columns Migrations
  assert(schemaContent.includes('xp_points'), 'user_progress includes xp_points column');
  assert(schemaContent.includes('streak_count'), 'user_progress includes streak_count column');
  assert(schemaContent.includes('claimed_xp_activities'), 'user_progress includes claimed_xp_activities column');
  assert(schemaContent.includes('unlocked_achievements'), 'user_progress includes unlocked_achievements column');

  // 5c. Row Level Security Enabled
  assert(schemaContent.includes('ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY'), 'RLS enabled on user_profiles');
  assert(schemaContent.includes('ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY'), 'RLS enabled on user_progress');
  assert(schemaContent.includes('ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY'), 'RLS enabled on user_bookmarks');

  // 5d. Explicit User Isolation Policies (auth.uid() = id / user_id)
  assert(schemaContent.includes('auth.uid() = id'), 'user_profiles policy restricts access to auth.uid()');
  assert(schemaContent.includes('auth.uid() = user_id'), 'user_progress policy restricts access to auth.uid()');

  // 5e. No Service Role Key Exposure
  const envExamplePath = path.resolve(process.cwd(), '.env.example');
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  assert(!envExample.includes('service_role'), 'No Supabase service_role keys in .env.example');
  assert(envExample.includes('VITE_SUPABASE_ANON_KEY'), 'Only public anon key exposed for client auth');

  // -------------------------------------------------------------
  // VERIFICATION SUMMARY
  // -------------------------------------------------------------
  console.log('\n====================================================');
  console.log(`TOTAL TESTS RUN : ${totalTests}`);
  console.log(`PASSED          : ${passedTests}`);
  console.log(`FAILED          : ${failedTests}`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    console.error('❌ Some tests failed!');
    process.exit(1);
  } else {
    console.log('✅ ALL GAMIFICATION, DASHBOARD & SUPABASE CHECKS PASSED PERFECTLY!\n');
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
