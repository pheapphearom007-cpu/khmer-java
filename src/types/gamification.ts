export type AchievementCategory = 'lessons' | 'quizzes' | 'streaks' | 'projects' | 'mastery';

export interface AchievementBadge {
  id: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  icon: string; // lucide icon identifier
  category: AchievementCategory;
  xpReward: number;
  unlockedAt?: string;
  progressCurrent?: number;
  progressTarget?: number;
}

export interface DailyGoal {
  enabled: boolean;
  targetActivities: number;
  completedActivities: number;
  date: string; // YYYY-MM-DD
  isCompleted: boolean;
}

export interface WeeklyGoal {
  enabled: boolean;
  targetLessons: number;
  completedLessons: number;
  weekStartDate: string; // YYYY-MM-DD
  isCompleted: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null; // YYYY-MM-DD
  activityDates: string[]; // Set of active YYYY-MM-DD dates
}

export interface CurriculumStage {
  moduleNumber: number;
  moduleSlug: string;
  titleKm: string;
  titleEn: string;
  status: 'completed' | 'in_progress' | 'locked';
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  prerequisitesMet: boolean;
  requiredModuleTitleKm?: string;
}

export interface LearningRecommendation {
  id: string;
  type: 'next_lesson' | 'prerequisite' | 'revision' | 'project';
  titleKm: string;
  titleEn: string;
  slug: string;
  url: string;
  reasonKm: string;
  reasonEn: string;
  priority: 'high' | 'medium' | 'low';
  badgeTextKm: string;
  badgeTextEn: string;
}
