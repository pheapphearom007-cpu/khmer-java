export type Language = 'km' | 'en';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CodeExample {
  title: string;
  code: string;
  explanationKm: string;
  explanationEn: string;
  lineByLineExplanation?: {
    line: string;
    explanationKm: string;
    explanationEn: string;
  }[];
  expectedOutput: string;
}

export interface QuizQuestion {
  id: string;
  questionKm: string;
  questionEn: string;
  optionsKm: string[];
  optionsEn: string[];
  correctOptionIndex: number;
  explanationKm: string;
  explanationEn: string;
  hintKm?: string;
  hintEn?: string;
}

export interface Exercise {
  id: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  starterCode: string;
  solutionCode: string;
  hintsKm: string[];
  hintsEn: string[];
  expectedOutput?: string;
}

export interface CommonMistake {
  titleKm: string;
  titleEn: string;
  badCode: string;
  goodCode: string;
  explanationKm: string;
  explanationEn: string;
}

export interface Lesson {
  id: string;
  slug: string;
  moduleSlug: string;
  order: number;
  titleKm: string;
  titleEn: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  objectivesKm: string[];
  objectivesEn: string[];
  summaryKm: string;
  summaryEn: string;
  contentKm: string; // Markdown or rich HTML-like formatted content
  contentEn: string;
  syntax?: string;
  examples: CodeExample[];
  commonMistakes: CommonMistake[];
  exercise?: Exercise;
  quizzes: QuizQuestion[];
  w3schoolsUrl: string;
}

export interface CurriculumModule {
  id: string;
  slug: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  icon: string;
  level: DifficultyLevel;
  lessons: Lesson[];
}

export interface ProjectRequirement {
  id: string;
  textKm: string;
  textEn: string;
  completed?: boolean;
}

export interface ProjectTestCase {
  name: string;
  stdin?: string;
  expectedOutputSubstring: string;
  descriptionKm: string;
  descriptionEn: string;
}

export interface GuidedProject {
  id: string;
  slug: string;
  titleKm: string;
  titleEn: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  descriptionKm: string;
  descriptionEn: string;
  coverImage?: string;
  objectivesKm: string[];
  objectivesEn: string[];
  requirements: ProjectRequirement[];
  starterCode: string;
  solutionCode: string;
  hintsKm: string[];
  hintsEn: string[];
  testCases: ProjectTestCase[];
  w3schoolsReferences: { title: string; url: string }[];
}

export interface GlossaryTerm {
  term: string;
  pronunciationKm: string;
  khmerTranslation: string;
  definitionKm: string;
  definitionEn: string;
  category: 'syntax' | 'oop' | 'data-structure' | 'jvm' | 'general';
  exampleSnippet?: string;
}

export interface UserProgress {
  completedLessonIds: string[];
  quizScores: Record<string, { score: number; total: number; completedAt: string }>;
  completedProjectIds: string[];
  bookmarks: string[]; // lesson slugs
  lastLessonSlug?: string;
  totalTimeSpentMinutes: number;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  isError: boolean;
  executionTimeMs?: number;
  provider: 'wandbox-openjdk' | 'local' | 'mock-sandbox';
  isRealExecution: boolean;
  limitationNotice?: string;
}
