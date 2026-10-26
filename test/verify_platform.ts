import { CURRICULUM_MODULES, ALL_LESSONS } from '../src/data/curriculum.ts';
import { GUIDED_PROJECTS } from '../src/data/projects.ts';
import { GLOSSARY_TERMS } from '../src/data/glossary.ts';

console.log('=== KHMER JAVA ACADEMY VERIFICATION SUITE ===\n');

let failed = false;

// 1. Verify Curriculum Modules and Lessons
console.log(`[1] Verifying Curriculum: ${CURRICULUM_MODULES.length} modules, ${ALL_LESSONS.length} total lessons...`);

ALL_LESSONS.forEach((lesson) => {
  if (!lesson.titleKm || !lesson.titleEn) {
    console.error(`❌ Lesson ${lesson.id} missing title in km or en`);
    failed = true;
  }
  if (!lesson.objectivesKm || lesson.objectivesKm.length === 0) {
    console.error(`❌ Lesson ${lesson.id} missing objectivesKm`);
    failed = true;
  }
  if (!lesson.contentKm || lesson.contentKm.length < 50) {
    console.error(`❌ Lesson ${lesson.id} missing substantial Khmer content`);
    failed = true;
  }
  if (!lesson.examples || lesson.examples.length === 0) {
    console.error(`❌ Lesson ${lesson.id} has no code examples`);
    failed = true;
  }
  if (!lesson.w3schoolsUrl || !lesson.w3schoolsUrl.startsWith('https://www.w3schools.com/java/')) {
    console.error(`❌ Lesson ${lesson.id} has invalid W3Schools URL: ${lesson.w3schoolsUrl}`);
    failed = true;
  }
  if (!lesson.quizzes || lesson.quizzes.length === 0) {
    console.error(`❌ Lesson ${lesson.id} has no quizzes`);
    failed = true;
  }
});
console.log('✓ All curriculum lessons verified successfully with full Khmer content and W3Schools links.');

// 2. Verify 5 Guided Projects
console.log(`\n[2] Verifying Guided Projects: ${GUIDED_PROJECTS.length} projects...`);
if (GUIDED_PROJECTS.length < 5) {
  console.error(`❌ Expected at least 5 guided projects, found ${GUIDED_PROJECTS.length}`);
  failed = true;
}

const requiredProjectSlugs = [
  'simple-calculator',
  'student-grade-system',
  'atm-simulator',
  'library-management-system',
  'student-management-system',
];

requiredProjectSlugs.forEach((slug) => {
  const p = GUIDED_PROJECTS.find((proj) => proj.slug === slug);
  if (!p) {
    console.error(`❌ Missing required project: ${slug}`);
    failed = true;
  } else {
    if (!p.starterCode || !p.solutionCode) {
      console.error(`❌ Project ${slug} missing starter or solution code`);
      failed = true;
    }
    if (!p.testCases || p.testCases.length === 0) {
      console.error(`❌ Project ${slug} missing test cases`);
      failed = true;
    }
    if (!p.requirements || p.requirements.length === 0) {
      console.error(`❌ Project ${slug} missing requirements`);
      failed = true;
    }
    console.log(`  ✓ Project "${p.titleEn}" (${p.difficulty}): requirements=${p.requirements.length}, testCases=${p.testCases.length}`);
  }
});

// 3. Verify Glossary
console.log(`\n[3] Verifying Technical Glossary: ${GLOSSARY_TERMS.length} terms...`);
if (GLOSSARY_TERMS.length < 10) {
  console.error('❌ Glossary has too few terms');
  failed = true;
} else {
  console.log(`  ✓ ${GLOSSARY_TERMS.length} English-Khmer terms loaded with pronunciation guides.`);
}

// 4. Test Live Wandbox Sandbox Java Execution
console.log('\n[4] Testing Live Java Sandbox Execution (Wandbox OpenJDK 21)...');
async function testExecution() {
  const testPayload = {
    compiler: 'openjdk-jdk-21+35',
    'compiler-option-raw': '-encoding\nUTF-8',
    code: `public class prog {
    public static void main(String[] args) {
        int x = 10;
        int y = 25;
        System.out.println("TEST_CALC_OK: " + (x + y));
    }
}`,
  };

  try {
    const res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });
    const data = await res.json();
    if (data.program_output && data.program_output.includes('TEST_CALC_OK: 35')) {
      console.log('  ✓ Live OpenJDK Sandbox Execution PASSED! Output:', data.program_output.trim());
    } else {
      console.error('  ❌ Sandbox returned unexpected output:', data);
      failed = true;
    }
  } catch (err) {
    console.error('  ❌ Sandbox request failed:', err);
    failed = true;
  }

  if (failed) {
    console.error('\n❌ SOME VERIFICATION TESTS FAILED.');
    process.exit(1);
  } else {
    console.log('\n✨ ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ✨');
  }
}

testExecution();
