import {
  ALL_ASSESSMENT_QUESTIONS,
  ASSESSMENT_PACKAGES,
  getAssessmentQuestionById,
  sanitizeQuestionForClient,
  getRandomizedQuestions,
  validateQuestionAnswer,
  evaluateAssessmentSubmission,
} from '../src/data/assessments';
import { handleAITutorRequest, checkRateLimit, getAITutorStatus } from '../server/aiService';
import { getSanitizedQuestions, validateSubmission, processAssessmentSubmission } from '../server/assessmentEngine';

console.log('====================================================');
console.log('   KHMER JAVA ACADEMY - ASSESSMENT & AI VERIFICATION ');
console.log('   Full Specification & Integration Test Suite      ');
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

async function runVerification() {
  // -------------------------------------------------------------
  // PART 1: INSTRUCTOR QUESTION BANK & DATA STRUCTURE
  // -------------------------------------------------------------
  console.log('[SECTION 1] Verifying Assessment Question Bank & Types...');

  assert(ALL_ASSESSMENT_QUESTIONS.length >= 15, `Question bank has rich question count (found ${ALL_ASSESSMENT_QUESTIONS.length})`);

  const questionTypes = new Set(ALL_ASSESSMENT_QUESTIONS.map((q) => q.type));
  assert(questionTypes.has('multiple-choice'), 'Includes multiple-choice questions');
  assert(questionTypes.has('predict-output'), 'Includes predict-the-output questions');
  assert(questionTypes.has('find-the-bug'), 'Includes find-the-bug challenges');
  assert(questionTypes.has('code-completion'), 'Includes code completion exercises');
  assert(questionTypes.has('short-coding'), 'Includes short coding tasks');

  ALL_ASSESSMENT_QUESTIONS.forEach((q) => {
    assert(Boolean(q.id && q.titleKm && q.topic && q.difficulty), `Question ${q.id} has id, titleKm, topic, difficulty`);
    assert(Boolean(q.learningObjectiveKm && q.learningObjectiveEn), `Question ${q.id} has bilingual learning objectives`);
    assert(Boolean(q.explanationKm && q.explanationKm.length > 20), `Question ${q.id} has substantive Khmer explanation`);
    assert(Boolean(q.expectedAnswer), `Question ${q.id} has expectedAnswer key`);
    assert(Boolean(q.recommendedLessonSlug), `Question ${q.id} has targeted recommendedLessonSlug`);
  });

  // Verify Assessment Packages
  console.log('\n[SECTION 2] Verifying Assessment Packages (Module, Topic, Diagnostic)...');
  assert(ASSESSMENT_PACKAGES.length >= 5, `Configured packages count: ${ASSESSMENT_PACKAGES.length}`);

  const hasDiagnostic = ASSESSMENT_PACKAGES.some((p) => p.category === 'diagnostic');
  const hasModule = ASSESSMENT_PACKAGES.some((p) => p.category === 'module');
  const hasTopic = ASSESSMENT_PACKAGES.some((p) => p.category === 'topic');

  assert(hasDiagnostic, 'Includes comprehensive diagnostic assessment');
  assert(hasModule, 'Includes end-of-module assessments');
  assert(hasTopic, 'Includes topic-specific assessments');

  // -------------------------------------------------------------
  // PART 2: QUESTION SANITIZATION (PREVENT LEAKING ANSWERS)
  // -------------------------------------------------------------
  console.log('\n[SECTION 3] Verifying Security: Answer Keys Hidden Before Attempt...');
  const sampleQ = ALL_ASSESSMENT_QUESTIONS[0];
  const sanitized = sanitizeQuestionForClient(sampleQ);

  assert((sanitized as any).expectedAnswer === undefined, 'Sanitized question does NOT leak expectedAnswer');
  assert((sanitized as any).acceptedAnswers === undefined, 'Sanitized question does NOT leak acceptedAnswers');
  assert(sanitized.id === sampleQ.id, 'Sanitized question preserves ID and question metadata');

  const backendSanitizedResponse = getSanitizedQuestions({ packageSlug: 'module-1-exam' });
  const hasLeakedKey = backendSanitizedResponse.questions.some((q: any) => q.expectedAnswer !== undefined);
  assert(!hasLeakedKey, 'Backend /api/assessment/questions never leaks answer keys to client');

  // -------------------------------------------------------------
  // PART 3: QUESTION RANDOMIZATION WITHOUT DUPLICATES
  // -------------------------------------------------------------
  console.log('\n[SECTION 4] Verifying Question Randomization & Deduplication...');
  const randomizedSubset = getRandomizedQuestions(ALL_ASSESSMENT_QUESTIONS, 10, true);
  assert(randomizedSubset.length === 10, `Requested 10 questions, got ${randomizedSubset.length}`);

  const seenIds = new Set<string>();
  let hasDuplicate = false;
  randomizedSubset.forEach((q) => {
    if (seenIds.has(q.id)) {
      hasDuplicate = true;
    }
    seenIds.add(q.id);
  });
  assert(!hasDuplicate, 'Zero duplicate questions in randomized quiz session');

  // -------------------------------------------------------------
  // PART 4: ANSWER VALIDATION ACROSS QUESTION TYPES
  // -------------------------------------------------------------
  console.log('\n[SECTION 5] Verifying Immediate Answer Validation Across All Types...');

  // 4a. Multiple Choice (JVM role)
  const qJvm = getAssessmentQuestionById('m1-q1-jvm-role')!;
  const resJvmCorrect = validateQuestionAnswer(qJvm, '', 'opt-a');
  const resJvmWrong = validateQuestionAnswer(qJvm, '', 'opt-b');
  assert(resJvmCorrect.isCorrect === true, 'Multiple Choice: Correct option verified');
  assert(resJvmWrong.isCorrect === false, 'Multiple Choice: Incorrect option caught');
  assert(resJvmCorrect.explanationKm.includes('JVM'), 'Explanation provided in natural Khmer');

  // 4b. Predict the Output (Integer Division 7 / 2)
  const qDiv = getAssessmentQuestionById('m2-q1-predict-int-div')!;
  const resDivCorrect = validateQuestionAnswer(qDiv, '3');
  const resDivWrong = validateQuestionAnswer(qDiv, '3.5');
  assert(resDivCorrect.isCorrect === true, 'Predict Output: 7 / 2 = 3 integer division correct');
  assert(resDivWrong.isCorrect === false, 'Predict Output: 3.5 rejected with integer truncation explanation');
  assert(resDivWrong.explanationKm.includes('int'), 'Explains why 3.5 is incorrect without discouraging');

  // 4c. Find the Bug (Missing static)
  const qBug = getAssessmentQuestionById('m1-q3-bug-main-signature')!;
  const resBugCorrect = validateQuestionAnswer(qBug, '', 'opt-a');
  assert(resBugCorrect.isCorrect === true, 'Find Bug: Missing static identified');

  // 4d. Code Completion (Scanner new keyword)
  const qCloze = getAssessmentQuestionById('m2-q4-code-completion-scanner')!;
  const resClozeCorrect = validateQuestionAnswer(qCloze, 'new');
  const resClozeCase = validateQuestionAnswer(qCloze, '  NEW  ');
  const resClozeWrong = validateQuestionAnswer(qCloze, 'create');
  assert(resClozeCorrect.isCorrect === true, 'Code Completion: "new" keyword matched');
  assert(resClozeCase.isCorrect === true, 'Code Completion: whitespace/case normalized');
  assert(resClozeWrong.isCorrect === false, 'Code Completion: invalid token caught');

  // 4e. Short Coding (int age = 20;)
  const qShort = getAssessmentQuestionById('m2-q5-short-code-variable')!;
  const resShortCorrect = validateQuestionAnswer(qShort, 'int age = 20;');
  const resShortNoSpace = validateQuestionAnswer(qShort, 'int age=20;');
  const resShortWrong = validateQuestionAnswer(qShort, 'age = 20');
  assert(resShortCorrect.isCorrect === true, 'Short Coding: "int age = 20;" valid');
  assert(resShortNoSpace.isCorrect === true, 'Short Coding: "int age=20;" whitespace-tolerant');
  assert(resShortWrong.isCorrect === false, 'Short Coding: missing type caught');

  // -------------------------------------------------------------
  // PART 5: SCORING, INCOMPLETE SUBMISSIONS, & WEAK TOPIC DETECTION
  // -------------------------------------------------------------
  console.log('\n[SECTION 6] Verifying Assessment Evaluation, Weak Topics & Incomplete Guard...');

  // Mock submission where student got variables right but loops & arrays wrong
  const mockAnswers = [
    { questionId: 'm2-q1-predict-int-div', userAnswer: '3' }, // variables/operators: correct
    { questionId: 'm3-q1-predict-loop-break', userAnswer: '99' }, // loops: wrong
    { questionId: 'm3-q2-find-bug-array-bounds', userAnswer: '', userChoiceId: 'opt-d' }, // arrays: wrong
  ];

  const evaluation = evaluateAssessmentSubmission(
    'test-eval-1',
    'Custom Test Session',
    180, // 3 minutes
    mockAnswers
  );

  assert(evaluation.score === 1, `Score calculated: ${evaluation.score} / 3`);
  assert(evaluation.percentage === 33, `Percentage calculated: ${evaluation.percentage}%`);
  assert(!evaluation.isPassing, '33% marks status as not passing (< 70%)');
  assert(evaluation.status === 'completed', 'Finalized submission marked status completed');

  // Check weak topics identification (< 70% threshold)
  const weakTopicSlugs = evaluation.weakTopics.map((w) => w.topic);
  assert(weakTopicSlugs.includes('loops'), 'Loops identified as weak topic');
  assert(weakTopicSlugs.includes('arrays'), 'Arrays identified as weak topic');

  const recommendedLessons = evaluation.weakTopics.map((w) => w.recommendedLessonSlug);
  assert(recommendedLessons.includes('loops-while-for'), 'Recommends loops-while-for lesson for targeted revision');
  assert(recommendedLessons.includes('arrays-and-matrices'), 'Recommends arrays-and-matrices lesson for targeted revision');

  // -------------------------------------------------------------
  // PART 6: AI JAVA TUTOR - 5 CONTEXTUAL ACTIONS & RATE LIMITING
  // -------------------------------------------------------------
  console.log('\n[SECTION 7] Verifying AI Java Tutor Contextual Actions...');

  // 6a. Explain Code Line by Line
  const codeToExplain = `public class Test {\n    public static void main(String[] args) {\n        int x = 10;\n        System.out.println(x);\n    }\n}`;
  const explainRes = await handleAITutorRequest({
    actionType: 'explain_code',
    prompt: 'សូមពន្យល់កូដមួយជួរៗ',
    codeContext: codeToExplain,
    lessonTitle: 'Syntax & Variables',
  });
  assert(explainRes.actionType === 'explain_code', 'ActionType preserved as explain_code');
  assert(explainRes.message.includes('ជួរទី'), 'Explanation contains line-by-line breakdown in Khmer');
  assert(explainRes.message.includes('Java'), 'Grounding in Java behavior');

  // 6b. Find the Bug (Compiler Error Diagnosis)
  const bugRes = await handleAITutorRequest({
    actionType: 'find_bug',
    prompt: 'កូដខ្ញុំមាន error',
    errorContext: 'Main.java:5: error: cannot find symbol\n  symbol:   variable totalScore',
    lessonTitle: 'Variables',
  });
  assert(bugRes.actionType === 'find_bug', 'ActionType preserved as find_bug');
  assert(bugRes.message.includes('Cannot Find Symbol') || bugRes.message.includes('អថេរ'), 'Diagnoses cannot find symbol in Khmer');
  assert(bugRes.message.includes('មូលហេតុ') && bugRes.message.includes('វិធីកែប្រែ'), 'Provides root cause and fix guide');

  // 6c. Give Me a Hint (Socratic Pedagogical Hint)
  const hintRes = await handleAITutorRequest({
    actionType: 'give_hint',
    prompt: 'ជួយផ្តល់តម្រុយខ្ញុំផង',
    lessonTitle: 'For Loops',
  });
  assert(hintRes.actionType === 'give_hint', 'ActionType preserved as give_hint');
  assert(hintRes.message.includes('តម្រុយ'), 'Provides hints without immediately giving away full answer');

  // 6d. Simplify Explanation (Everyday Analogy)
  const simplifyRes = await handleAITutorRequest({
    actionType: 'simplify',
    prompt: 'សូមពន្យល់ពី Class និង Object',
    lessonTitle: 'Classes & Objects',
  });
  assert(simplifyRes.actionType === 'simplify', 'ActionType preserved as simplify');
  assert(simplifyRes.message.includes('កាហ្វេ') || simplifyRes.message.includes('Class'), 'Uses relatable real-world analogy');

  // 6e. Generate Practice Exercise
  const practiceRes = await handleAITutorRequest({
    actionType: 'generate_practice',
    prompt: 'បង្កើតលំហាត់កម្រិត beginner',
    level: 'beginner',
  });
  assert(practiceRes.actionType === 'generate_practice', 'ActionType preserved as generate_practice');
  assert(practiceRes.message.includes('លំហាត់អនុវត្ត') && practiceRes.message.includes('Starter Code'), 'Generates practice challenge with starter code');

  // 6f. Verification Honesty (Never claim executed unless tested)
  assert(explainRes.isVerifiedExecution === false, 'Transparently marks that code was not sandboxed unless tested');

  // -------------------------------------------------------------
  // PART 7: AI TUTOR RATE LIMITING & GRACEFUL DEGRADATION
  // -------------------------------------------------------------
  console.log('\n[SECTION 8] Verifying AI Tutor Rate Limiting & Graceful Fallback...');

  const testClientId = `test_client_${Date.now()}`;
  let allowedCount = 0;
  let blockedOnLimit = false;

  // Fire requests until rate limit threshold (20/min) is hit
  for (let i = 0; i < 25; i++) {
    const check = checkRateLimit(testClientId);
    if (check.allowed) {
      allowedCount++;
    } else {
      blockedOnLimit = true;
      break;
    }
  }

  assert(allowedCount === 20, `Allowed exactly 20 requests per minute (got ${allowedCount})`);
  assert(blockedOnLimit, 'Excess requests properly blocked by rate limiter');

  // Test rate limited response
  const rateLimitedRes = await handleAITutorRequest(
    { prompt: 'Testing rate limit', actionType: 'chat' },
    testClientId
  );
  assert(rateLimitedRes.error === 'rate_limited', 'Returns rate_limited error status code');
  assert(rateLimitedRes.message.includes('លើសពីកម្រិតកំណត់'), 'Returns polite informative Khmer notice when rate limited');

  // -------------------------------------------------------------
  // VERIFICATION SUMMARY
  // -------------------------------------------------------------
  console.log('\n====================================================');
  console.log(`TOTAL TESTS RUN : ${totalTests}`);
  console.log(`PASSED          : ${passedTests}`);
  console.log(`FAILED          : ${failedTests}`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    console.error('❌ Some verification checks failed!');
    process.exit(1);
  } else {
    console.log('✅ ALL AI TUTOR & ASSESSMENT SYSTEM CHECKS PASSED PERFECTLY!\n');
    process.exit(0);
  }
}

runVerification().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
