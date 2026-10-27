import { AchievementBadge, UserProgress } from '../types';

export const ALL_ACHIEVEMENTS: AchievementBadge[] = [
  // Lessons
  {
    id: 'first_lesson',
    titleKm: 'ជំហានដំបូង (First Step)',
    titleEn: 'First Step',
    descriptionKm: 'បញ្ចប់មេរៀន Java ដំបូងគេបង្អស់ដោយជោគជ័យ។',
    descriptionEn: 'Successfully complete your very first Java lesson.',
    icon: 'BookOpen',
    category: 'lessons',
    xpReward: 50,
  },
  {
    id: 'five_lessons',
    titleKm: 'សិស្សឧស្សាហ៍ (Diligent Learner)',
    titleEn: 'Diligent Learner',
    descriptionKm: 'បញ្ចប់មេរៀនចំនួន ៥ ក្នុងកម្មវិធីសិក្សា។',
    descriptionEn: 'Complete 5 lessons across the curriculum.',
    icon: 'Sparkles',
    category: 'lessons',
    xpReward: 100,
  },
  {
    id: 'ten_lessons',
    titleKm: 'អ្នកប្រាជ្ញ Java (Java Scholar)',
    titleEn: 'Java Scholar',
    descriptionKm: 'បញ្ចប់មេរៀនចំនួន ១០ ក្នុងកម្មវិធីសិក្សា។',
    descriptionEn: 'Complete 10 lessons in the curriculum.',
    icon: 'GraduationCap',
    category: 'lessons',
    xpReward: 150,
  },
  {
    id: 'curriculum_finisher',
    titleKm: 'បញ្ចប់កម្មវិធីសិក្សា (Java Graduate)',
    titleEn: 'Java Graduate',
    descriptionKm: 'បញ្ចប់គ្រប់មេរៀនទាំង ២៧ នៃ Khmer Java Academy!',
    descriptionEn: 'Complete all 27 curriculum lessons in Khmer Java Academy!',
    icon: 'Crown',
    category: 'lessons',
    xpReward: 500,
  },

  // Quizzes & Assessments
  {
    id: 'first_perfect_quiz',
    titleKm: 'ពិន្ទុ ១០០% (Quiz Ace)',
    titleEn: 'Quiz Ace',
    descriptionKm: 'ឆ្លើយត្រូវ ១០០% លើកម្រងសំណួរ Quiz ឬការតេស្តសមត្ថភាព។',
    descriptionEn: 'Score a perfect 100% on any lesson quiz or assessment.',
    icon: 'Trophy',
    category: 'quizzes',
    xpReward: 60,
  },
  {
    id: 'five_quizzes',
    titleKm: 'អ្នកជំនាញតេស្ត (Test Master)',
    titleEn: 'Test Master',
    descriptionKm: 'ឆ្លងកាត់ការធ្វើតេស្ត Quiz ចំនួន ៥ មេរៀន។',
    descriptionEn: 'Pass quizzes for at least 5 different lessons.',
    icon: 'CheckCircle2',
    category: 'quizzes',
    xpReward: 100,
  },
  {
    id: 'first_assessment',
    titleKm: 'ការវាយតម្លៃដំបូង (Diagnostic Pioneer)',
    titleEn: 'Diagnostic Pioneer',
    descriptionKm: 'បញ្ចប់ការធ្វើតេស្តវាស់ស្ទង់សមត្ថភាពធំ (Assessment Exam) លើកដំបូង។',
    descriptionEn: 'Complete your first comprehensive assessment exam.',
    icon: 'HelpCircle',
    category: 'quizzes',
    xpReward: 80,
  },

  // Guided Projects
  {
    id: 'first_project',
    titleKm: 'ស្ថាបត្យករគម្រោង (Project Builder)',
    titleEn: 'Project Builder',
    descriptionKm: 'កសាងគម្រោងអនុវត្តជាក់ស្តែងដំបូងបង្អស់ដោយជោគជ័យ។',
    descriptionEn: 'Successfully complete your first portfolio guided project.',
    icon: 'FolderGit2',
    category: 'projects',
    xpReward: 150,
  },
  {
    id: 'three_projects',
    titleKm: 'វិស្វករគម្រោង (Project Engineer)',
    titleEn: 'Project Engineer',
    descriptionKm: 'បញ្ចប់គម្រោងអនុវត្តជាក់ស្តែងចំនួន ៣ ដោយជោគជ័យ។',
    descriptionEn: 'Successfully finish 3 guided portfolio projects.',
    icon: 'Layers',
    category: 'projects',
    xpReward: 250,
  },
  {
    id: 'all_projects',
    titleKm: 'មេគម្រោង Java (Full Project Master)',
    titleEn: 'Full Project Master',
    descriptionKm: 'កសាងគម្រោងជាក់ស្តែងទាំង ៥ ដោយជោគជ័យពេញលេញ!',
    descriptionEn: 'Build and complete all 5 guided portfolio projects!',
    icon: 'Award',
    category: 'projects',
    xpReward: 500,
  },

  // Streaks
  {
    id: 'streak_3',
    titleKm: 'ការតស៊ូ ៣ ថ្ងៃ (3-Day Consistency)',
    titleEn: '3-Day Consistency',
    descriptionKm: 'រៀន និងអនុវត្តជាប់ៗគ្នា ៣ ថ្ងៃ។',
    descriptionEn: 'Maintain a 3-day active learning streak.',
    icon: 'Flame',
    category: 'streaks',
    xpReward: 100,
  },
  {
    id: 'streak_7',
    titleKm: 'វីរជន ៧ ថ្ងៃ (7-Day Champion)',
    titleEn: '7-Day Champion',
    descriptionKm: 'រៀន និងអនុវត្តជាប់ៗគ្នា ៧ ថ្ងៃពេញមួយសប្តាហ៍។',
    descriptionEn: 'Maintain a 7-day continuous learning streak.',
    icon: 'Zap',
    category: 'streaks',
    xpReward: 200,
  },

  // Mastery & XP Milestones
  {
    id: 'xp_500',
    titleKm: 'សិស្សឆ្នើម Java (Level 2)',
    titleEn: 'Level 2: Rising Developer',
    descriptionKm: 'ប្រមូលបានពិន្ទុបទពិសោធន៍ 500 XP តាមរយៈការរៀនពិតប្រាកដ។',
    descriptionEn: 'Earn 500 XP through genuine lesson and quiz completions.',
    icon: 'Shield',
    category: 'mastery',
    xpReward: 50,
  },
  {
    id: 'xp_1500',
    titleKm: 'វិស្វករ Java ជាន់ខ្ពស់ (Level 3)',
    titleEn: 'Level 3: Senior Java Explorer',
    descriptionKm: 'ប្រមូលបានពិន្ទុបទពិសោធន៍ 1,500 XP តាមរយៈការតស៊ូរៀនសូត្រ។',
    descriptionEn: 'Reach 1,500 XP milestone in your Java mastery journey.',
    icon: 'Star',
    category: 'mastery',
    xpReward: 150,
  },
];

export interface LevelInfo {
  level: number;
  titleKm: string;
  titleEn: string;
  currentLevelMinXp: number;
  nextLevelXp: number;
  progressPercent: number;
  currentXpInLevel: number;
  neededXpForNext: number;
}

/**
 * Calculates current learner level from real XP points
 */
export function getLevelFromXp(xp: number): LevelInfo {
  const levels = [
    { level: 1, minXp: 0, maxXp: 300, titleKm: 'អ្នកចាប់ផ្តើម Java', titleEn: 'Java Beginner' },
    { level: 2, minXp: 300, maxXp: 800, titleKm: 'សិស្សឆ្នើម Java', titleEn: 'Java Apprentice' },
    { level: 3, minXp: 800, maxXp: 1600, titleKm: 'អ្នកអនុវត្តកូដ Java', titleEn: 'Java Practitioner' },
    { level: 4, minXp: 1600, maxXp: 2800, titleKm: 'អ្នកជំនាញ OOP', titleEn: 'OOP Specialist' },
    { level: 5, minXp: 2800, maxXp: 5000, titleKm: 'វិស្វករ Java កម្រិតខ្ពស់', titleEn: 'Advanced Java Engineer' },
  ];

  let current = levels[0];
  for (const lvl of levels) {
    if (xp >= lvl.minXp) {
      current = lvl;
    }
  }

  const currentXpInLevel = Math.max(0, xp - current.minXp);
  const neededXpForNext = current.maxXp - current.minXp;
  const progressPercent = Math.min(100, Math.round((currentXpInLevel / neededXpForNext) * 100));

  return {
    level: current.level,
    titleKm: current.titleKm,
    titleEn: current.titleEn,
    currentLevelMinXp: current.minXp,
    nextLevelXp: current.maxXp,
    progressPercent,
    currentXpInLevel,
    neededXpForNext,
  };
}

/**
 * Inspects progress and returns newly unlocked achievement badges
 */
export function checkNewlyUnlockedAchievements(progress: UserProgress): AchievementBadge[] {
  const unlockedNow: AchievementBadge[] = [];
  const alreadyUnlocked = new Set(progress.unlockedAchievementIds || []);

  const totalLessons = progress.completedLessonIds.length;
  const totalProjects = progress.completedProjectIds.length;
  const quizScores = Object.values(progress.quizScores || {});
  const totalQuizzesPassed = quizScores.filter((q) => (q.score / (q.total || 1)) >= 0.7).length;
  const hasPerfectQuiz = quizScores.some((q) => q.score === q.total && q.total > 0);
  const totalAssessments = progress.assessmentAttempts?.length || 0;
  const streak = progress.streak?.currentStreak || 0;
  const xp = progress.xp || 0;

  // Rule 1: first_lesson
  if (!alreadyUnlocked.has('first_lesson') && totalLessons >= 1) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'first_lesson')!);
  }
  // Rule 2: five_lessons
  if (!alreadyUnlocked.has('five_lessons') && totalLessons >= 5) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'five_lessons')!);
  }
  // Rule 3: ten_lessons
  if (!alreadyUnlocked.has('ten_lessons') && totalLessons >= 10) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'ten_lessons')!);
  }
  // Rule 4: curriculum_finisher
  if (!alreadyUnlocked.has('curriculum_finisher') && totalLessons >= 27) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'curriculum_finisher')!);
  }
  // Rule 5: first_perfect_quiz
  if (!alreadyUnlocked.has('first_perfect_quiz') && hasPerfectQuiz) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'first_perfect_quiz')!);
  }
  // Rule 6: five_quizzes
  if (!alreadyUnlocked.has('five_quizzes') && totalQuizzesPassed >= 5) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'five_quizzes')!);
  }
  // Rule 7: first_assessment
  if (!alreadyUnlocked.has('first_assessment') && totalAssessments >= 1) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'first_assessment')!);
  }
  // Rule 8: first_project
  if (!alreadyUnlocked.has('first_project') && totalProjects >= 1) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'first_project')!);
  }
  // Rule 9: three_projects
  if (!alreadyUnlocked.has('three_projects') && totalProjects >= 3) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'three_projects')!);
  }
  // Rule 10: all_projects
  if (!alreadyUnlocked.has('all_projects') && totalProjects >= 5) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'all_projects')!);
  }
  // Rule 11: streak_3
  if (!alreadyUnlocked.has('streak_3') && streak >= 3) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'streak_3')!);
  }
  // Rule 12: streak_7
  if (!alreadyUnlocked.has('streak_7') && streak >= 7) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'streak_7')!);
  }
  // Rule 13: xp_500
  if (!alreadyUnlocked.has('xp_500') && xp >= 500) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'xp_500')!);
  }
  // Rule 14: xp_1500
  if (!alreadyUnlocked.has('xp_1500') && xp >= 1500) {
    unlockedNow.push(ALL_ACHIEVEMENTS.find((a) => a.id === 'xp_1500')!);
  }

  return unlockedNow.filter(Boolean);
}

/**
 * Calculates real-calendar streaks safely without shame or pressure
 */
export function calculateNextStreak(
  currentStreakData: UserProgress['streak'],
  todayDateStr: string = new Date().toISOString().slice(0, 10)
): UserProgress['streak'] {
  const currentStreak = currentStreakData?.currentStreak || 0;
  const longestStreak = currentStreakData?.longestStreak || 0;
  const lastDate = currentStreakData?.lastActivityDate;
  const activityDates = Array.from(new Set([...(currentStreakData?.activityDates || []), todayDateStr]));

  if (!lastDate) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(1, longestStreak),
      lastActivityDate: todayDateStr,
      activityDates,
    };
  }

  if (lastDate === todayDateStr) {
    // Already logged today
    return {
      currentStreak,
      longestStreak,
      lastActivityDate: todayDateStr,
      activityDates,
    };
  }

  const last = new Date(lastDate);
  const today = new Date(todayDateStr);
  const diffDays = Math.round((today.getTime() - last.getTime()) / (1000 * 3600 * 24));

  if (diffDays === 1) {
    // Consecutive day
    const nextStreak = currentStreak + 1;
    return {
      currentStreak: nextStreak,
      longestStreak: Math.max(nextStreak, longestStreak),
      lastActivityDate: todayDateStr,
      activityDates,
    };
  } else {
    // Gap day: gracefully reset to 1 without shame
    return {
      currentStreak: 1,
      longestStreak,
      lastActivityDate: todayDateStr,
      activityDates,
    };
  }
}
