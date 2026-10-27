import { DifficultyLevel } from './index';

export type AssessmentQuestionType =
  | 'multiple-choice'
  | 'predict-output'
  | 'find-the-bug'
  | 'code-completion'
  | 'short-coding';

export interface AssessmentQuestionOption {
  id: string;
  textKm: string;
  textEn: string;
}

export interface AssessmentQuestion {
  id: string;
  type: AssessmentQuestionType;
  difficulty: DifficultyLevel;
  topic: string; // e.g. 'basics', 'variables', 'operators', 'conditionals', 'loops', 'arrays', 'methods', 'oop', 'inheritance', 'exceptions', 'collections'
  topicTitleKm: string;
  topicTitleEn: string;
  learningObjectiveKm: string;
  learningObjectiveEn: string;
  titleKm: string;
  titleEn: string;
  descriptionKm?: string;
  descriptionEn?: string;
  codeSnippet?: string;
  options?: AssessmentQuestionOption[];
  expectedAnswer: string; // Answer key stored securely on backend
  acceptedAnswers?: string[]; // Flexible synonyms or alternative valid syntaxes
  blankSnippet?: string; // For code-completion: e.g. "_____ sc = new Scanner(System.in);"
  bugLineNumber?: number; // For find-the-bug questions
  explanationKm: string;
  explanationEn: string;
  hintsKm: string[];
  hintsEn: string[];
  recommendedLessonSlug: string;
  recommendedLessonTitleKm: string;
}

/**
 * Question sent to client before attempt. Expected answers are removed to prevent cheating via DevTools.
 */
export type ClientAssessmentQuestion = Omit<AssessmentQuestion, 'expectedAnswer' | 'acceptedAnswers'>;

export interface QuestionValidationRequest {
  questionId: string;
  userAnswer: string;
  userChoiceId?: string;
}

export interface QuestionValidationResponse {
  questionId: string;
  isCorrect: boolean;
  expectedAnswer: string;
  explanationKm: string;
  explanationEn: string;
  userAnswer: string;
}

export interface TopicPerformance {
  topic: string;
  topicTitleKm: string;
  topicTitleEn: string;
  total: number;
  correct: number;
  percentage: number;
  isWeak: boolean;
  recommendedLessonSlug: string;
  recommendedLessonTitleKm: string;
}

export interface AssessmentSubmissionRequest {
  assessmentId: string;
  assessmentTitle: string;
  timeSpentSeconds: number;
  answers: {
    questionId: string;
    userAnswer: string;
    userChoiceId?: string;
  }[];
}

export interface AssessmentResultSummary {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  isPassing: boolean;
  timeSpentSeconds: number;
  completedAt: string;
  status: 'completed' | 'in_progress';
  topicPerformance: TopicPerformance[];
  weakTopics: TopicPerformance[];
  questionResults: QuestionValidationResponse[];
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  completedAt: string;
  status: 'completed' | 'in_progress';
  weakTopics: {
    topic: string;
    topicTitleKm: string;
    percentage: number;
    recommendedLessonSlug: string;
    recommendedLessonTitleKm: string;
  }[];
}

export interface AssessmentPackage {
  id: string;
  slug: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  category: 'topic' | 'module' | 'diagnostic' | 'challenge';
  level: DifficultyLevel;
  moduleSlug?: string;
  topic?: string;
  timeLimitMinutes?: number;
  questionIds: string[];
}
