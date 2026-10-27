import {
  AssessmentPackage,
  ClientAssessmentQuestion,
  QuestionValidationRequest,
  QuestionValidationResponse,
  AssessmentSubmissionRequest,
  AssessmentResultSummary,
} from '../types/assessment';
import {
  getSanitizedQuestions,
  validateSubmission,
  processAssessmentSubmission,
} from '../../server/assessmentEngine';
import { ASSESSMENT_PACKAGES } from '../data/assessments/assessmentPackages';

export const assessmentService = {
  /**
   * Get all assessment packages
   */
  async getPackages(): Promise<AssessmentPackage[]> {
    try {
      const res = await fetch('/api/assessment/packages');
      if (res.ok) {
        const data = await res.json();
        return data.packages || ASSESSMENT_PACKAGES;
      }
    } catch {
      // Fallback
    }
    return ASSESSMENT_PACKAGES;
  },

  /**
   * Fetch sanitized questions for a test (answer keys stripped)
   */
  async getQuestions(params: {
    packageSlug?: string;
    topic?: string;
    count?: number;
    randomize?: boolean;
  }): Promise<{
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
  }> {
    try {
      const query = new URLSearchParams();
      if (params.packageSlug) query.set('package', params.packageSlug);
      if (params.topic) query.set('topic', params.topic);
      if (params.count) query.set('count', String(params.count));
      if (params.randomize !== undefined) query.set('randomize', String(params.randomize));

      const res = await fetch(`/api/assessment/questions?${query.toString()}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }

    return getSanitizedQuestions(params);
  },

  /**
   * Validate a single answer on backend
   */
  async validateAnswer(request: QuestionValidationRequest): Promise<QuestionValidationResponse> {
    try {
      const res = await fetch('/api/assessment/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }

    return validateSubmission(request);
  },

  /**
   * Submit and finalize an entire assessment
   */
  async submitAssessment(submission: AssessmentSubmissionRequest): Promise<AssessmentResultSummary> {
    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline fallback
    }

    return processAssessmentSubmission(submission);
  },
};
