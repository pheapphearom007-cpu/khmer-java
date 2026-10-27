import {
  ALL_ASSESSMENT_QUESTIONS,
  ASSESSMENT_PACKAGES,
  getAssessmentQuestionById,
  sanitizeQuestionForClient,
  getRandomizedQuestions,
  validateQuestionAnswer,
  evaluateAssessmentSubmission,
} from '../src/data/assessments';
import {
  ClientAssessmentQuestion,
  QuestionValidationRequest,
  QuestionValidationResponse,
  AssessmentSubmissionRequest,
  AssessmentResultSummary,
} from '../src/types/assessment';

/**
 * Retrieves sanitized assessment questions for a package, topic, or randomized test
 * Answer keys are NEVER exposed to the client in the returned payload!
 */
export function getSanitizedQuestions(params: {
  packageSlug?: string;
  topic?: string;
  moduleSlug?: string;
  count?: number;
  randomize?: boolean;
}): {
  packageInfo?: {
    id: string;
    slug: string;
    titleKm: string;
    titleEn: string;
    descriptionKm: string;
    descriptionEn: string;
    timeLimitMinutes?: number;
  };
  questions: ClientAssessmentQuestion[];
  totalQuestions: number;
} {
  let pool = ALL_ASSESSMENT_QUESTIONS;
  let packageInfo: any = undefined;

  if (params.packageSlug) {
    const pkg = ASSESSMENT_PACKAGES.find((p) => p.slug === params.packageSlug || p.id === params.packageSlug);
    if (pkg) {
      packageInfo = {
        id: pkg.id,
        slug: pkg.slug,
        titleKm: pkg.titleKm,
        titleEn: pkg.titleEn,
        descriptionKm: pkg.descriptionKm,
        descriptionEn: pkg.descriptionEn,
        timeLimitMinutes: pkg.timeLimitMinutes,
      };
      pool = ALL_ASSESSMENT_QUESTIONS.filter((q) => pkg.questionIds.includes(q.id));
    }
  } else if (params.topic) {
    pool = ALL_ASSESSMENT_QUESTIONS.filter((q) => q.topic === params.topic);
  }

  const randomized = params.randomize !== false
    ? getRandomizedQuestions(pool, params.count)
    : (params.count ? pool.slice(0, params.count) : pool);

  const sanitized = randomized.map(sanitizeQuestionForClient);

  return {
    packageInfo,
    questions: sanitized,
    totalQuestions: sanitized.length,
  };
}

/**
 * Validates a single question submission securely on backend
 */
export function validateSubmission(request: QuestionValidationRequest): QuestionValidationResponse {
  const question = getAssessmentQuestionById(request.questionId);
  if (!question) {
    return {
      questionId: request.questionId,
      isCorrect: false,
      expectedAnswer: 'Unknown Question',
      explanationKm: 'រកមិនឃើញសំណួរនេះក្នុងប្រព័ន្ធឡើយ។',
      explanationEn: 'Question not found in the question bank.',
      userAnswer: request.userAnswer || request.userChoiceId || '',
    };
  }

  return validateQuestionAnswer(question, request.userAnswer, request.userChoiceId);
}

/**
 * Validates and finalizes an entire assessment submission
 */
export function processAssessmentSubmission(
  submission: AssessmentSubmissionRequest
): AssessmentResultSummary {
  return evaluateAssessmentSubmission(
    submission.assessmentId,
    submission.assessmentTitle,
    submission.timeSpentSeconds,
    submission.answers
  );
}
