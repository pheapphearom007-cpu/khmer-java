import { CURRICULUM_MODULES, ALL_LESSONS, findLessonBySlug } from './curriculum';
import { GUIDED_PROJECTS } from './projects';
import { UserProgress, CurriculumStage, LearningRecommendation } from '../types';

/**
 * Prerequisite dependencies between modules:
 * Module N requires Module N-1 to be mostly completed (at least 60% of lessons).
 */
export function getCurriculumStages(progress: UserProgress): CurriculumStage[] {
  const completedSet = new Set(progress.completedLessonIds || []);

  return CURRICULUM_MODULES.map((mod, idx) => {
    const totalLessons = mod.lessons.length;
    const completedLessons = mod.lessons.filter((l) => completedSet.has(l.id)).length;
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    let prerequisitesMet = true;
    let requiredModuleTitleKm: string | undefined = undefined;

    if (idx > 0) {
      const prevMod = CURRICULUM_MODULES[idx - 1];
      const prevCompleted = prevMod.lessons.filter((l) => completedSet.has(l.id)).length;
      const prevPct = prevMod.lessons.length > 0 ? prevCompleted / prevMod.lessons.length : 0;

      // Requires at least 60% completion of previous module to unlock next stage
      prerequisitesMet = prevPct >= 0.6;
      if (!prerequisitesMet) {
        requiredModuleTitleKm = prevMod.titleKm;
      }
    }

    let status: 'completed' | 'in_progress' | 'locked' = 'in_progress';
    if (completedLessons === totalLessons && totalLessons > 0) {
      status = 'completed';
    } else if (!prerequisitesMet) {
      status = 'locked';
    }

    return {
      moduleNumber: idx + 1,
      moduleSlug: mod.slug,
      titleKm: mod.titleKm,
      titleEn: mod.titleEn,
      status,
      completedLessons,
      totalLessons,
      percentage,
      prerequisitesMet,
      requiredModuleTitleKm,
    };
  });
}

/**
 * Generate transparent, explainable recommendations based on real progress and prerequisites
 */
export function generatePersonalizedRecommendations(
  progress: UserProgress,
  _language: 'km' | 'en' = 'km'
): LearningRecommendation[] {
  const recommendations: LearningRecommendation[] = [];
  const completedLessonIds = new Set(progress.completedLessonIds || []);
  const quizScores = progress.quizScores || {};

  // -------------------------------------------------------------
  // 1. RECOMMENDATION: Low Quiz Accuracy / Struggle Revision
  // -------------------------------------------------------------
  for (const [lessonId, record] of Object.entries(quizScores)) {
    const accuracy = record.total > 0 ? record.score / record.total : 1;
    if (accuracy < 0.7) {
      const lesson = ALL_LESSONS.find((l) => l.id === lessonId || l.slug === lessonId);
      if (lesson) {
        const scorePercent = Math.round(accuracy * 100);
        recommendations.push({
          id: `rev_${lesson.id}`,
          type: 'revision',
          titleKm: `រំលឹកឡើងវិញ៖ ${lesson.titleKm}`,
          titleEn: `Review: ${lesson.titleEn}`,
          slug: lesson.slug,
          url: `/curriculum/${lesson.slug}#sec-quiz`,
          reasonKm: `ពិន្ទុ Quiz របស់អ្នកលើមេរៀននេះគឺ ${scorePercent}% (ក្រោម ៧០%)។ ការរំលឹកឡើងវិញនឹងជួយឱ្យអ្នកយល់ច្បាស់ពីចំណុចខ្សោយ មុននឹងបន្តទៅមេរៀនស្មុគស្មាញ។`,
          reasonEn: `Your quiz score on this lesson is ${scorePercent}% (<70%). Reviewing this concept will strengthen foundational understanding.`,
          priority: 'high',
          badgeTextKm: 'ត្រូវរំលឹកឡើងវិញ',
          badgeTextEn: 'Needs Review',
        });
        break; // Show at most 1 primary revision recommendation at top
      }
    }
  }

  // -------------------------------------------------------------
  // 2. RECOMMENDATION: Continue Last Visited Lesson or Next in Flow
  // -------------------------------------------------------------
  if (progress.lastLessonSlug) {
    const lastLesson = findLessonBySlug(progress.lastLessonSlug);
    if (lastLesson && !completedLessonIds.has(lastLesson.id)) {
      recommendations.push({
        id: `continue_${lastLesson.id}`,
        type: 'next_lesson',
        titleKm: `បន្តការរៀន៖ ${lastLesson.titleKm}`,
        titleEn: `Continue: ${lastLesson.titleEn}`,
        slug: lastLesson.slug,
        url: `/curriculum/${lastLesson.slug}`,
        reasonKm: `នេះជាមេរៀនដែលអ្នកបានចូលមើលចុងក្រោយគេបង្អស់។ បន្តរៀនឱ្យចប់ដើម្បីទទួលបានពិន្ទុ XP និងវឌ្ឍនភាព។`,
        reasonEn: `This is the lesson you last visited. Finish reading and running examples to earn XP.`,
        priority: 'high',
        badgeTextKm: 'កំពុងរៀន',
        badgeTextEn: 'In Progress',
      });
    }
  }

  // -------------------------------------------------------------
  // 3. RECOMMENDATION: First Unfinished Lesson in Valid Stage
  // -------------------------------------------------------------
  const nextUnfinishedLesson = ALL_LESSONS.find((l) => !completedLessonIds.has(l.id));
  if (nextUnfinishedLesson) {
    // Only recommend if not already recommended above
    const isAlreadyRecommended = recommendations.some((r) => r.slug === nextUnfinishedLesson.slug);
    if (!isAlreadyRecommended) {
      recommendations.push({
        id: `next_${nextUnfinishedLesson.id}`,
        type: 'next_lesson',
        titleKm: `មេរៀនបន្ទាប់៖ ${nextUnfinishedLesson.titleKm}`,
        titleEn: `Next Lesson: ${nextUnfinishedLesson.titleEn}`,
        slug: nextUnfinishedLesson.slug,
        url: `/curriculum/${nextUnfinishedLesson.slug}`,
        reasonKm: `មេរៀននេះជាជំហានបន្ទាប់តាមលំដាប់លំដោយនៃកម្មវិធីសិក្សា ស្របតាមកម្រិតសមត្ថភាពបច្ចុប្បន្នរបស់អ្នក។`,
        reasonEn: `This lesson represents the sequential next step aligned with your curriculum stage.`,
        priority: 'medium',
        badgeTextKm: 'ជំហានបន្ទាប់',
        badgeTextEn: 'Up Next',
      });
    }
  }

  // -------------------------------------------------------------
  // 4. RECOMMENDATION: Unlocked Guided Projects
  // -------------------------------------------------------------
  const completedCount = completedLessonIds.size;
  const completedProjects = new Set(progress.completedProjectIds || []);

  if (completedCount >= 5 && !completedProjects.has(GUIDED_PROJECTS[0].id)) {
    recommendations.push({
      id: `proj_${GUIDED_PROJECTS[0].id}`,
      type: 'project',
      titleKm: `គម្រោងទី ១៖ ${GUIDED_PROJECTS[0].titleKm}`,
      titleEn: `Project 1: ${GUIDED_PROJECTS[0].titleEn}`,
      slug: GUIDED_PROJECTS[0].slug,
      url: `/projects/${GUIDED_PROJECTS[0].slug}`,
      reasonKm: `អ្នកបានបញ្ចប់មេរៀនគ្រឹះលើសពី ៥ មេរៀនហើយ! ឥឡូវនេះជាពេលដ៏ល្អក្នុងការអនុវត្តបង្កើត Console Calculator ដើម្បីពង្រឹងចំណេះដឹង។`,
      reasonEn: `You completed over 5 foundational lessons! Apply what you learned by building the Console Calculator.`,
      priority: 'medium',
      badgeTextKm: 'គម្រោងអនុវត្ត',
      badgeTextEn: 'Project',
    });
  }

  return recommendations.slice(0, 3);
}
