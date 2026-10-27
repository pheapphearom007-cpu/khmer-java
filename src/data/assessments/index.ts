import { AssessmentQuestion, ClientAssessmentQuestion, QuestionValidationResponse, AssessmentResultSummary, TopicPerformance } from '../../types/assessment';
import { MODULE_1_QUESTIONS } from './questions/module1_questions';
import { MODULE_2_QUESTIONS } from './questions/module2_questions';
import { MODULE_3_QUESTIONS } from './questions/module3_questions';
import { MODULE_4_QUESTIONS } from './questions/module4_questions';
import { MODULE_5_QUESTIONS } from './questions/module5_questions';
import { MODULE_6_QUESTIONS } from './questions/module6_questions';
import { MODULE_7_8_QUESTIONS } from './questions/module7_8_questions';
import { ASSESSMENT_PACKAGES } from './assessmentPackages';

export const ALL_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  ...MODULE_1_QUESTIONS,
  ...MODULE_2_QUESTIONS,
  ...MODULE_3_QUESTIONS,
  ...MODULE_4_QUESTIONS,
  ...MODULE_5_QUESTIONS,
  ...MODULE_6_QUESTIONS,
  ...MODULE_7_8_QUESTIONS,
];

export { ASSESSMENT_PACKAGES };

/**
 * Find question by unique ID
 */
export function getAssessmentQuestionById(id: string): AssessmentQuestion | undefined {
  return ALL_ASSESSMENT_QUESTIONS.find((q) => q.id === id);
}

/**
 * Sanitizes question by stripping secret answer keys so client cannot cheat via DevTools
 */
export function sanitizeQuestionForClient(question: AssessmentQuestion): ClientAssessmentQuestion {
  const { expectedAnswer, acceptedAnswers, ...sanitized } = question;
  return sanitized;
}

/**
 * Fisher-Yates shuffle that returns a new randomized array without duplicates
 */
export function shuffleArray<T>(array: T[]): T[] {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

/**
 * Randomize questions with optional count limit and shuffled multiple-choice options
 * Guaranteed no duplicate questions in the resulting session!
 */
export function getRandomizedQuestions(
  pool: AssessmentQuestion[],
  count?: number,
  shuffleOptions: boolean = true
): AssessmentQuestion[] {
  // Deduplicate questions by ID first to guarantee integrity
  const uniqueMap = new Map<string, AssessmentQuestion>();
  pool.forEach((q) => uniqueMap.set(q.id, q));
  const uniqueQuestions = Array.from(uniqueMap.values());

  const shuffledQuestions = shuffleArray(uniqueQuestions);
  const selected = count && count > 0 ? shuffledQuestions.slice(0, count) : shuffledQuestions;

  if (!shuffleOptions) {
    return selected;
  }

  return selected.map((q) => {
    if (q.options && q.options.length > 0) {
      return {
        ...q,
        options: shuffleArray(q.options),
      };
    }
    return q;
  });
}

/**
 * String normalizer for predict-the-output and code-completion:
 * Removes carriage returns, trims trailing whitespace from lines, lowercases if appropriate
 */
export function normalizeAnswerText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter((line, idx, arr) => line.length > 0 || idx < arr.length - 1)
    .join('\n')
    .trim();
}

/**
 * Validates a single answer submission against the question definition
 */
export function validateQuestionAnswer(
  question: AssessmentQuestion,
  userAnswer: string,
  userChoiceId?: string
): QuestionValidationResponse {
  const trimmedAnswer = userAnswer ? userAnswer.trim() : '';
  let isCorrect = false;

  switch (question.type) {
    case 'multiple-choice':
    case 'find-the-bug': {
      // Choice questions validate against selected option ID
      const chosen = userChoiceId || trimmedAnswer;
      isCorrect = chosen === question.expectedAnswer;
      break;
    }

    case 'predict-output': {
      const normalizedUser = normalizeAnswerText(trimmedAnswer);
      const normalizedExpected = normalizeAnswerText(question.expectedAnswer);
      const normalizedAccepted = (question.acceptedAnswers || []).map(normalizeAnswerText);

      isCorrect =
        normalizedUser === normalizedExpected ||
        normalizedAccepted.includes(normalizedUser);
      break;
    }

    case 'code-completion': {
      const cleanUser = trimmedAnswer.replace(/\s+/g, ' ').toLowerCase();
      const cleanExpected = question.expectedAnswer.replace(/\s+/g, ' ').toLowerCase();
      const cleanAccepted = (question.acceptedAnswers || []).map((a) =>
        a.replace(/\s+/g, ' ').toLowerCase()
      );

      isCorrect = cleanUser === cleanExpected || cleanAccepted.includes(cleanUser);
      break;
    }

    case 'short-coding': {
      // Normalize whitespace and compare against expected or accepted variations
      const normUser = trimmedAnswer.replace(/\s*([;=()+*/{}-])\s*/g, '$1').trim();
      const normExpected = question.expectedAnswer.replace(/\s*([;=()+*/{}-])\s*/g, '$1').trim();
      const normAccepted = (question.acceptedAnswers || []).map((a) =>
        a.replace(/\s*([;=()+*/{}-])\s*/g, '$1').trim()
      );

      isCorrect = normUser === normExpected || normAccepted.includes(normUser);
      break;
    }

    default:
      isCorrect = trimmedAnswer === question.expectedAnswer;
  }

  return {
    questionId: question.id,
    isCorrect,
    expectedAnswer: question.expectedAnswer,
    explanationKm: question.explanationKm,
    explanationEn: question.explanationEn,
    userAnswer: userChoiceId || trimmedAnswer,
  };
}

/**
 * Evaluates an entire assessment submission, computes topic breakdown and identifies weak topics (< 70%)
 */
export function evaluateAssessmentSubmission(
  assessmentId: string,
  assessmentTitle: string,
  timeSpentSeconds: number,
  answers: { questionId: string; userAnswer: string; userChoiceId?: string }[]
): AssessmentResultSummary {
  const questionResults: QuestionValidationResponse[] = [];
  let score = 0;

  // Topic tracking
  const topicStats = new Map<
    string,
    {
      topic: string;
      topicTitleKm: string;
      topicTitleEn: string;
      total: number;
      correct: number;
      recommendedLessonSlug: string;
      recommendedLessonTitleKm: string;
    }
  >();

  answers.forEach((ans) => {
    const q = getAssessmentQuestionById(ans.questionId);
    if (!q) return;

    const validation = validateQuestionAnswer(q, ans.userAnswer, ans.userChoiceId);
    questionResults.push(validation);

    if (validation.isCorrect) {
      score++;
    }

    // Accumulate topic stats
    const existing = topicStats.get(q.topic) || {
      topic: q.topic,
      topicTitleKm: q.topicTitleKm,
      topicTitleEn: q.topicTitleEn,
      total: 0,
      correct: 0,
      recommendedLessonSlug: q.recommendedLessonSlug,
      recommendedLessonTitleKm: q.recommendedLessonTitleKm,
    };

    existing.total += 1;
    if (validation.isCorrect) {
      existing.correct += 1;
    }
    topicStats.set(q.topic, existing);
  });

  const totalQuestions = answers.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const isPassing = percentage >= 70;

  const topicPerformance: TopicPerformance[] = Array.from(topicStats.values()).map((ts) => {
    const topicPct = ts.total > 0 ? Math.round((ts.correct / ts.total) * 100) : 0;
    return {
      topic: ts.topic,
      topicTitleKm: ts.topicTitleKm,
      topicTitleEn: ts.topicTitleEn,
      total: ts.total,
      correct: ts.correct,
      percentage: topicPct,
      isWeak: topicPct < 70,
      recommendedLessonSlug: ts.recommendedLessonSlug,
      recommendedLessonTitleKm: ts.recommendedLessonTitleKm,
    };
  });

  const weakTopics = topicPerformance.filter((tp) => tp.isWeak);

  return {
    id: `eval_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    assessmentId,
    assessmentTitle,
    score,
    totalQuestions,
    percentage,
    isPassing,
    timeSpentSeconds,
    completedAt: new Date().toISOString(),
    status: 'completed',
    topicPerformance,
    weakTopics,
    questionResults,
  };
}
