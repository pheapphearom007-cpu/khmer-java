import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { useAuth } from './AuthContext';
import {
  UserProgress,
  AssessmentResultSummary,
  AssessmentAttempt,
  AchievementBadge,
  DailyGoal,
  SyncStatus,
} from '../types';
import {
  checkNewlyUnlockedAchievements,
  calculateNextStreak,
} from '../data/achievements';

interface AwardXpResult {
  awarded: boolean;
  xpAdded: number;
  newTotalXp: number;
  unlockedBadges: AchievementBadge[];
}

interface ProgressContextType {
  progress: UserProgress;
  syncStatus: SyncStatus;
  markLessonComplete: (lessonId: string, isCompleted?: boolean) => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
  saveQuizScore: (lessonId: string, score: number, total: number) => Promise<void>;
  getQuizScore: (lessonId: string) => { score: number; total: number; completedAt: string } | null;
  saveAssessmentResult: (result: AssessmentResultSummary) => Promise<void>;
  getAssessmentAttempts: () => AssessmentAttempt[];
  getWeakTopics: () => AssessmentAttempt['weakTopics'];
  awardXp: (amount: number, activityId: string, reason?: string) => Promise<AwardXpResult>;
  logLearningActivity: (activityType?: string) => Promise<void>;
  updateDailyGoalTarget: (target: number) => void;
  updateWeeklyGoalTarget: (target: number) => void;
  toggleBookmark: (slug: string) => Promise<void>;
  isBookmarked: (slug: string) => boolean;
  saveNote: (slug: string, noteText: string) => Promise<void>;
  getNote: (slug: string) => string;
  deleteNote: (slug: string) => Promise<void>;
  markProjectComplete: (projectId: string, isCompleted?: boolean) => Promise<void>;
  isProjectCompleted: (projectId: string) => boolean;
  setLastLesson: (slug: string) => void;
  resetProgress: () => void;
  triggerCelebration: (force?: boolean) => void;
  manualSync: () => Promise<void>;
}

const todayDateStr = new Date().toISOString().slice(0, 10);

function getUserStorageKey(userId?: string): string {
  return userId ? `khmer_java_progress_${userId}` : 'khmer_java_progress_guest';
}

const defaultProgress: UserProgress = {
  completedLessonIds: [],
  quizScores: {},
  completedProjectIds: [],
  bookmarks: [],
  notes: {},
  lastLessonSlug: 'intro-to-java',
  totalTimeSpentMinutes: 0,
  assessmentAttempts: [],
  xp: 0,
  claimedXpActivityIds: [],
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    activityDates: [],
  },
  unlockedAchievementIds: [],
  achievementHistory: [],
  dailyGoal: {
    enabled: true,
    targetActivities: 2,
    completedActivities: 0,
    date: todayDateStr,
    isCompleted: false,
  },
  weeklyGoal: {
    enabled: true,
    targetLessons: 3,
    completedLessons: 0,
    weekStartDate: todayDateStr,
    isCompleted: false,
  },
};

function parseStoredProgress(storageKey: string): UserProgress {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultProgress,
        ...parsed,
        notes: parsed.notes || {},
        streak: { ...defaultProgress.streak, ...(parsed.streak || {}) },
        dailyGoal: {
          ...defaultProgress.dailyGoal,
          ...(parsed.dailyGoal || {}),
          completedActivities:
            parsed.dailyGoal?.date === todayDateStr
              ? parsed.dailyGoal?.completedActivities || 0
              : 0,
          date: todayDateStr,
          isCompleted:
            parsed.dailyGoal?.date === todayDateStr
              ? Boolean(parsed.dailyGoal?.isCompleted)
              : false,
        },
        weeklyGoal: { ...defaultProgress.weeklyGoal, ...(parsed.weeklyGoal || {}) },
        claimedXpActivityIds: parsed.claimedXpActivityIds || [],
        unlockedAchievementIds: parsed.unlockedAchievementIds || [],
        achievementHistory: parsed.achievementHistory || [],
      };
    }
  } catch (e) {
    console.error('Failed to parse local progress for key', storageKey, e);
  }
  return defaultProgress;
}

function computeUpdatedDailyGoal(
  currentDaily: DailyGoal | undefined,
  todayStr: string,
  incrementBy: number = 1
): DailyGoal {
  const daily = currentDaily || defaultProgress.dailyGoal;
  const isSameDay = daily.date === todayStr;
  const newCompleted = (isSameDay ? daily.completedActivities : 0) + incrementBy;
  return {
    ...daily,
    date: todayStr,
    completedActivities: newCompleted,
    isCompleted: newCompleted >= daily.targetActivities,
  };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(() => {
    return parseStoredProgress(getUserStorageKey(user?.id));
  });

  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSyncingRef = useRef(false);

  // Network online/offline monitoring
  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus('idle');
    };
    const handleOffline = () => {
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setSyncStatus('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /**
   * Safe Celebration animation with reduced-motion support
   */
  const triggerCelebration = useCallback((force: boolean = false) => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && !force) {
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#e11d48', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
      });
    } catch {
      // Safe fallback
    }
  }, []);

  // Persist to user-scoped localStorage whenever progress or user changes
  useEffect(() => {
    const storageKey = getUserStorageKey(user?.id);
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, user?.id]);

  /**
   * Sync helper: pushes latest state to Supabase PostgreSQL user_progress
   */
  const syncToCloud = useCallback(
    async (updated: UserProgress) => {
      if (!user || !isSupabaseConfigured || !supabase) return;
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setSyncStatus('offline');
        return;
      }

      setSyncStatus('syncing');
      isSyncingRef.current = true;

      try {
        const { error } = await supabase.from('user_progress').upsert({
          user_id: user.id,
          completed_lessons: updated.completedLessonIds,
          completed_projects: updated.completedProjectIds,
          quiz_scores: updated.quizScores,
          assessment_attempts: updated.assessmentAttempts,
          xp_points: updated.xp,
          streak_count: updated.streak.currentStreak,
          longest_streak: updated.streak.longestStreak,
          last_activity_date: updated.streak.lastActivityDate,
          unlocked_achievements: updated.unlockedAchievementIds,
          claimed_xp_activities: updated.claimedXpActivityIds,
          daily_goals: updated.dailyGoal,
          weekly_goals: updated.weeklyGoal,
          last_lesson_slug: updated.lastLessonSlug,
          total_time_spent_minutes: updated.totalTimeSpentMinutes,
          updated_at: new Date().toISOString(),
        });

        if (error) {
          console.warn('Failed to sync progress to Supabase:', error.message);
          setSyncStatus('error');
        } else {
          setSyncStatus('synced');
          if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
          syncTimeoutRef.current = setTimeout(() => {
            setSyncStatus('idle');
          }, 2500);
        }
      } catch (err) {
        console.warn('Error during cloud sync:', err);
        setSyncStatus('error');
      } finally {
        isSyncingRef.current = false;
      }
    },
    [user]
  );

  /**
   * Cloud Data Hydration & Reconciliation
   * Fetches user_progress, user_bookmarks, and user_notes from Supabase.
   * Runs when user logs in or switches accounts.
   */
  useEffect(() => {
    const currentKey = getUserStorageKey(user?.id);

    // If user signed out, reset state to guest storage to prevent data leakage!
    if (!user) {
      setProgress(parseStoredProgress(currentKey));
      setSyncStatus('idle');
      return;
    }

    // Initialize with local cache for this user immediately
    setProgress(parseStoredProgress(currentKey));

    if (!isSupabaseConfigured || !supabase) return;

    let isMounted = true;

    async function loadCloudData() {
      if (!user) return;
      setSyncStatus('syncing');

      try {
        // Fetch progress, bookmarks, and notes in parallel
        const [progressRes, bookmarksRes, notesRes] = await Promise.all([
          supabase!.from('user_progress').select('*').eq('user_id', user.id).maybeSingle(),
          supabase!.from('user_bookmarks').select('lesson_slug').eq('user_id', user.id),
          supabase!.from('user_notes').select('lesson_slug, note_text').eq('user_id', user.id),
        ]);

        if (!isMounted) return;

        const progressData = progressRes.data;
        const bookmarkData = bookmarksRes.data;
        const notesData = notesRes.data;

        setProgress((prev) => {
          // Merge completed lessons safely
          const mergedLessons = Array.from(
            new Set([...prev.completedLessonIds, ...(progressData?.completed_lessons || [])])
          );
          const mergedProjects = Array.from(
            new Set([...prev.completedProjectIds, ...(progressData?.completed_projects || [])])
          );
          const mergedBookmarks = bookmarkData
            ? Array.from(new Set([...prev.bookmarks, ...bookmarkData.map((b: { lesson_slug: string }) => b.lesson_slug)]))
            : prev.bookmarks;

          // Merge notes: remote notes take precedence if present
          const mergedNotes = { ...(prev.notes || {}) };
          if (notesData) {
            notesData.forEach((row: { lesson_slug: string; note_text: string }) => {
              mergedNotes[row.lesson_slug] = row.note_text;
            });
          }

          const cloudXp = progressData?.xp_points || 0;
          const mergedXp = Math.max(prev.xp, cloudXp);

          const mergedClaimedActivities = Array.from(
            new Set([...prev.claimedXpActivityIds, ...(progressData?.claimed_xp_activities || [])])
          );

          const mergedUnlockedAchievements = Array.from(
            new Set([...prev.unlockedAchievementIds, ...(progressData?.unlocked_achievements || [])])
          );

          const cloudStreak = progressData?.streak_count || 0;
          const cloudLongest = progressData?.longest_streak || 0;

          return {
            ...prev,
            completedLessonIds: mergedLessons,
            completedProjectIds: mergedProjects,
            quizScores: { ...prev.quizScores, ...(progressData?.quiz_scores || {}) },
            assessmentAttempts: progressData?.assessment_attempts || prev.assessmentAttempts,
            bookmarks: mergedBookmarks,
            notes: mergedNotes,
            lastLessonSlug: progressData?.last_lesson_slug || prev.lastLessonSlug,
            totalTimeSpentMinutes: Math.max(prev.totalTimeSpentMinutes, progressData?.total_time_spent_minutes || 0),
            xp: mergedXp,
            claimedXpActivityIds: mergedClaimedActivities,
            unlockedAchievementIds: mergedUnlockedAchievements,
            streak: {
              currentStreak: Math.max(prev.streak.currentStreak, cloudStreak),
              longestStreak: Math.max(prev.streak.longestStreak, cloudLongest),
              lastActivityDate: progressData?.last_activity_date || prev.streak.lastActivityDate,
              activityDates: prev.streak.activityDates,
            },
            lastSyncedAt: new Date().toISOString(),
          };
        });

        setSyncStatus('synced');
        if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = setTimeout(() => {
          setSyncStatus('idle');
        }, 2000);
      } catch (err) {
        console.warn('Error fetching cloud data from Supabase:', err);
        setSyncStatus('error');
      }
    }

    loadCloudData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  /**
   * Supabase Realtime Multi-Device Sync Subscriptions
   * Listens for changes committed from other devices/browsers in real time
   */
  useEffect(() => {
    if (!user || !isSupabaseConfigured || !supabase) return;

    const channelName = `realtime-user-sync-${user.id}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (!payload.new || isSyncingRef.current) return;
          const remoteRow = payload.new as Record<string, unknown>;

          setProgress((prev) => {
            const remoteLessons = (remoteRow.completed_lessons as string[]) || [];
            const remoteProjects = (remoteRow.completed_projects as string[]) || [];
            const remoteXp = (remoteRow.xp_points as number) || 0;
            const remoteStreak = (remoteRow.streak_count as number) || 0;
            const remoteLongest = (remoteRow.longest_streak as number) || 0;

            return {
              ...prev,
              completedLessonIds: Array.from(new Set([...prev.completedLessonIds, ...remoteLessons])),
              completedProjectIds: Array.from(new Set([...prev.completedProjectIds, ...remoteProjects])),
              quizScores: { ...prev.quizScores, ...((remoteRow.quiz_scores as UserProgress['quizScores']) || {}) },
              xp: Math.max(prev.xp, remoteXp),
              streak: {
                ...prev.streak,
                currentStreak: Math.max(prev.streak.currentStreak, remoteStreak),
                longestStreak: Math.max(prev.streak.longestStreak, remoteLongest),
              },
              lastLessonSlug: (remoteRow.last_lesson_slug as string) || prev.lastLessonSlug,
              lastSyncedAt: new Date().toISOString(),
            };
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newSlug = (payload.new as { lesson_slug?: string })?.lesson_slug;
            if (newSlug) {
              setProgress((prev) => ({
                ...prev,
                bookmarks: Array.from(new Set([...prev.bookmarks, newSlug])),
              }));
            }
          } else if (payload.eventType === 'DELETE') {
            const oldSlug = (payload.old as { lesson_slug?: string })?.lesson_slug;
            if (oldSlug) {
              setProgress((prev) => ({
                ...prev,
                bookmarks: prev.bookmarks.filter((b) => b !== oldSlug),
              }));
            }
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_notes',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const row = payload.new as { lesson_slug?: string; note_text?: string };
            if (row?.lesson_slug) {
              setProgress((prev) => ({
                ...prev,
                notes: {
                  ...(prev.notes || {}),
                  [row.lesson_slug!]: row.note_text || '',
                },
              }));
            }
          } else if (payload.eventType === 'DELETE') {
            const oldSlug = (payload.old as { lesson_slug?: string })?.lesson_slug;
            if (oldSlug) {
              setProgress((prev) => {
                const nextNotes = { ...(prev.notes || {}) };
                delete nextNotes[oldSlug];
                return { ...prev, notes: nextNotes };
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, [user]);

  /**
   * Manual Sync trigger for user
   */
  const manualSync = useCallback(async () => {
    if (!user || !isSupabaseConfigured || !supabase) return;
    await syncToCloud(progress);
  }, [user, progress, syncToCloud]);

  /**
   * Award XP with anti-farming protection
   */
  const awardXp = useCallback(
    async (amount: number, activityId: string, _reason?: string): Promise<AwardXpResult> => {
      let result: AwardXpResult = {
        awarded: false,
        xpAdded: 0,
        newTotalXp: progress.xp,
        unlockedBadges: [],
      };

      setProgress((prev) => {
        if (prev.claimedXpActivityIds.includes(activityId)) {
          result = {
            awarded: false,
            xpAdded: 0,
            newTotalXp: prev.xp,
            unlockedBadges: [],
          };
          return prev;
        }

        const newXp = prev.xp + amount;
        const updatedClaimed = [...prev.claimedXpActivityIds, activityId];

        const todayStr = new Date().toISOString().slice(0, 10);
        const updatedDaily = computeUpdatedDailyGoal(prev.dailyGoal, todayStr, 1);
        const updatedStreak = calculateNextStreak(prev.streak, todayStr);

        const candidateState: UserProgress = {
          ...prev,
          xp: newXp,
          claimedXpActivityIds: updatedClaimed,
          dailyGoal: updatedDaily,
          streak: updatedStreak,
        };

        const newBadges = checkNewlyUnlockedAchievements(candidateState);
        let bonusXp = 0;
        const newlyUnlockedIds: string[] = [];
        const newHistory = [...prev.achievementHistory];

        newBadges.forEach((b) => {
          bonusXp += b.xpReward;
          newlyUnlockedIds.push(b.id);
          newHistory.push({ id: b.id, unlockedAt: new Date().toISOString() });
        });

        const finalTotalXp = newXp + bonusXp;
        const finalUnlockedIds = Array.from(new Set([...prev.unlockedAchievementIds, ...newlyUnlockedIds]));

        const updated: UserProgress = {
          ...candidateState,
          xp: finalTotalXp,
          unlockedAchievementIds: finalUnlockedIds,
          achievementHistory: newHistory,
        };

        result = {
          awarded: true,
          xpAdded: amount + bonusXp,
          newTotalXp: finalTotalXp,
          unlockedBadges: newBadges,
        };

        if (newBadges.length > 0) {
          triggerCelebration();
        }

        syncToCloud(updated);
        return updated;
      });

      return result;
    },
    [progress.xp, syncToCloud, triggerCelebration]
  );

  /**
   * Log real learning activity
   */
  const logLearningActivity = useCallback(
    async (_activityType?: string) => {
      setProgress((prev) => {
        const todayStr = new Date().toISOString().slice(0, 10);
        const updatedStreak = calculateNextStreak(prev.streak, todayStr);
        const updatedDaily = computeUpdatedDailyGoal(prev.dailyGoal, todayStr, 1);
        const updated: UserProgress = {
          ...prev,
          streak: updatedStreak,
          dailyGoal: updatedDaily,
        };
        syncToCloud(updated);
        return updated;
      });
    },
    [syncToCloud]
  );

  /**
   * Lesson completion toggle
   */
  const markLessonComplete = useCallback(
    async (lessonId: string, isCompleted: boolean = true) => {
      setProgress((prev) => {
        const set = new Set(prev.completedLessonIds);
        let xpGained = 0;
        const claimed = new Set(prev.claimedXpActivityIds);

        if (isCompleted) {
          if (!set.has(lessonId)) {
            set.add(lessonId);
            triggerCelebration();
          }
          const activityId = `lesson_${lessonId}`;
          if (!claimed.has(activityId)) {
            claimed.add(activityId);
            xpGained += 50;
          }
        } else {
          set.delete(lessonId);
        }

        const todayStr = new Date().toISOString().slice(0, 10);
        const updatedStreak = calculateNextStreak(prev.streak, todayStr);
        const updatedDaily = isCompleted
          ? computeUpdatedDailyGoal(prev.dailyGoal, todayStr, 1)
          : (prev.dailyGoal || defaultProgress.dailyGoal);

        const weekly = prev.weeklyGoal || defaultProgress.weeklyGoal;
        const newCompletedWeekly = isCompleted ? weekly.completedLessons + 1 : Math.max(0, weekly.completedLessons - 1);
        const updatedWeekly = {
          ...weekly,
          completedLessons: newCompletedWeekly,
          isCompleted: newCompletedWeekly >= weekly.targetLessons,
        };

        const candidateState: UserProgress = {
          ...prev,
          completedLessonIds: Array.from(set),
          xp: prev.xp + xpGained,
          claimedXpActivityIds: Array.from(claimed),
          streak: updatedStreak,
          dailyGoal: updatedDaily,
          weeklyGoal: updatedWeekly,
        };

        const newBadges = checkNewlyUnlockedAchievements(candidateState);
        let bonusXp = 0;
        const newlyUnlockedIds: string[] = [];
        const newHistory = [...prev.achievementHistory];

        newBadges.forEach((b) => {
          bonusXp += b.xpReward;
          newlyUnlockedIds.push(b.id);
          newHistory.push({ id: b.id, unlockedAt: new Date().toISOString() });
        });

        const updated: UserProgress = {
          ...candidateState,
          xp: candidateState.xp + bonusXp,
          unlockedAchievementIds: Array.from(new Set([...prev.unlockedAchievementIds, ...newlyUnlockedIds])),
          achievementHistory: newHistory,
        };

        syncToCloud(updated);
        return updated;
      });
    },
    [syncToCloud, triggerCelebration]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => {
      return progress.completedLessonIds.includes(lessonId);
    },
    [progress.completedLessonIds]
  );

  /**
   * Save quiz score
   */
  const saveQuizScore = useCallback(
    async (lessonId: string, score: number, total: number) => {
      setProgress((prev) => {
        let xpGained = 0;
        const claimed = new Set(prev.claimedXpActivityIds);
        const isPassing = total > 0 && score / total >= 0.7;
        const isPerfect = total > 0 && score === total;

        const activityId = `quiz_${lessonId}`;
        if (isPassing && !claimed.has(activityId)) {
          claimed.add(activityId);
          xpGained += isPerfect ? 50 : 30;
        }

        const todayStr = new Date().toISOString().slice(0, 10);
        const updatedStreak = calculateNextStreak(prev.streak, todayStr);
        const updatedDaily = computeUpdatedDailyGoal(prev.dailyGoal, todayStr, 1);

        const candidateState: UserProgress = {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [lessonId]: {
              score,
              total,
              completedAt: new Date().toISOString(),
            },
          },
          xp: prev.xp + xpGained,
          claimedXpActivityIds: Array.from(claimed),
          streak: updatedStreak,
          dailyGoal: updatedDaily,
        };

        if (isPerfect) {
          triggerCelebration();
        }

        const newBadges = checkNewlyUnlockedAchievements(candidateState);
        let bonusXp = 0;
        const newlyUnlockedIds: string[] = [];
        const newHistory = [...prev.achievementHistory];

        newBadges.forEach((b) => {
          bonusXp += b.xpReward;
          newlyUnlockedIds.push(b.id);
          newHistory.push({ id: b.id, unlockedAt: new Date().toISOString() });
        });

        const updated: UserProgress = {
          ...candidateState,
          xp: candidateState.xp + bonusXp,
          unlockedAchievementIds: Array.from(new Set([...prev.unlockedAchievementIds, ...newlyUnlockedIds])),
          achievementHistory: newHistory,
        };

        syncToCloud(updated);
        return updated;
      });
    },
    [syncToCloud, triggerCelebration]
  );

  const getQuizScore = useCallback(
    (lessonId: string) => {
      return progress.quizScores[lessonId] || null;
    },
    [progress.quizScores]
  );

  /**
   * Save assessment results
   */
  const saveAssessmentResult = useCallback(
    async (result: AssessmentResultSummary) => {
      setProgress((prev) => {
        const attempt: AssessmentAttempt = {
          id: `attempt_${Date.now()}`,
          assessmentId: result.assessmentId,
          assessmentTitle: result.assessmentTitle || 'Assessment',
          completedAt: new Date().toISOString(),
          score: result.score,
          totalQuestions: result.totalQuestions,
          percentage: result.percentage,
          timeSpentSeconds: result.timeSpentSeconds,
          status: 'completed',
          weakTopics: result.weakTopics || [],
        };

        const updatedAttempts = [attempt, ...(prev.assessmentAttempts || [])].slice(0, 50);
        const addedMinutes = Math.max(1, Math.round(result.timeSpentSeconds / 60));

        let xpGained = 0;
        const claimed = new Set(prev.claimedXpActivityIds);
        const activityId = `assessment_${result.assessmentId}`;
        if (result.percentage >= 70 && !claimed.has(activityId)) {
          claimed.add(activityId);
          xpGained += 80;
        }

        const todayStr = new Date().toISOString().slice(0, 10);
        const updatedStreak = calculateNextStreak(prev.streak, todayStr);
        const updatedDaily = computeUpdatedDailyGoal(prev.dailyGoal, todayStr, 1);

        const candidateState: UserProgress = {
          ...prev,
          assessmentAttempts: updatedAttempts,
          totalTimeSpentMinutes: prev.totalTimeSpentMinutes + addedMinutes,
          xp: prev.xp + xpGained,
          claimedXpActivityIds: Array.from(claimed),
          streak: updatedStreak,
          dailyGoal: updatedDaily,
        };

        if (result.percentage >= 70) {
          triggerCelebration();
        }

        const newBadges = checkNewlyUnlockedAchievements(candidateState);
        let bonusXp = 0;
        const newlyUnlockedIds: string[] = [];
        const newHistory = [...prev.achievementHistory];

        newBadges.forEach((b) => {
          bonusXp += b.xpReward;
          newlyUnlockedIds.push(b.id);
          newHistory.push({ id: b.id, unlockedAt: new Date().toISOString() });
        });

        const updated: UserProgress = {
          ...candidateState,
          xp: candidateState.xp + bonusXp,
          unlockedAchievementIds: Array.from(new Set([...prev.unlockedAchievementIds, ...newlyUnlockedIds])),
          achievementHistory: newHistory,
        };

        syncToCloud(updated);
        return updated;
      });
    },
    [syncToCloud, triggerCelebration]
  );

  const getAssessmentAttempts = useCallback(() => {
    return progress.assessmentAttempts || [];
  }, [progress.assessmentAttempts]);

  const getWeakTopics = useCallback(() => {
    const attempts = progress.assessmentAttempts || [];
    const weakMap = new Map<string, AssessmentAttempt['weakTopics'][0]>();
    attempts.forEach((att) => {
      att.weakTopics.forEach((wt) => {
        if (!weakMap.has(wt.topic)) {
          weakMap.set(wt.topic, wt);
        }
      });
    });
    return Array.from(weakMap.values());
  }, [progress.assessmentAttempts]);

  /**
   * Bookmark toggling with Supabase persistence
   */
  const toggleBookmark = useCallback(
    async (slug: string) => {
      let isAdded = false;
      setProgress((prev) => {
        const set = new Set(prev.bookmarks);
        if (set.has(slug)) {
          set.delete(slug);
          isAdded = false;
        } else {
          set.add(slug);
          isAdded = true;
        }
        return {
          ...prev,
          bookmarks: Array.from(set),
        };
      });

      if (user && isSupabaseConfigured && supabase) {
        try {
          if (isAdded) {
            await supabase.from('user_bookmarks').upsert(
              {
                user_id: user.id,
                lesson_slug: slug,
              },
              { onConflict: 'user_id,lesson_slug' }
            );
          } else {
            await supabase
              .from('user_bookmarks')
              .delete()
              .eq('user_id', user.id)
              .eq('lesson_slug', slug);
          }
        } catch (err) {
          console.warn('Failed to update bookmark in Supabase:', err);
        }
      }
    },
    [user]
  );

  const isBookmarked = useCallback(
    (slug: string) => {
      return progress.bookmarks.includes(slug);
    },
    [progress.bookmarks]
  );

  /**
   * Personal Notes CRUD with Supabase user_notes persistence
   */
  const saveNote = useCallback(
    async (slug: string, noteText: string) => {
      setProgress((prev) => ({
        ...prev,
        notes: {
          ...(prev.notes || {}),
          [slug]: noteText,
        },
      }));

      if (user && isSupabaseConfigured && supabase) {
        try {
          setSyncStatus('syncing');
          const { error } = await supabase.from('user_notes').upsert(
            {
              user_id: user.id,
              lesson_slug: slug,
              note_text: noteText,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,lesson_slug' }
          );

          if (error) {
            console.warn('Failed to save note to Supabase:', error.message);
            setSyncStatus('error');
          } else {
            setSyncStatus('synced');
            if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
            syncTimeoutRef.current = setTimeout(() => setSyncStatus('idle'), 2000);
          }
        } catch (err) {
          console.warn('Note save exception:', err);
          setSyncStatus('error');
        }
      }
    },
    [user]
  );

  const getNote = useCallback(
    (slug: string) => {
      return progress.notes?.[slug] || '';
    },
    [progress.notes]
  );

  const deleteNote = useCallback(
    async (slug: string) => {
      setProgress((prev) => {
        const nextNotes = { ...(prev.notes || {}) };
        delete nextNotes[slug];
        return {
          ...prev,
          notes: nextNotes,
        };
      });

      if (user && isSupabaseConfigured && supabase) {
        try {
          await supabase
            .from('user_notes')
            .delete()
            .eq('user_id', user.id)
            .eq('lesson_slug', slug);
        } catch (err) {
          console.warn('Failed to delete note from Supabase:', err);
        }
      }
    },
    [user]
  );

  /**
   * Project completion toggle
   */
  const markProjectComplete = useCallback(
    async (projectId: string, isCompleted: boolean = true) => {
      setProgress((prev) => {
        const set = new Set(prev.completedProjectIds);
        let xpGained = 0;
        const claimed = new Set(prev.claimedXpActivityIds);

        if (isCompleted) {
          if (!set.has(projectId)) {
            set.add(projectId);
            triggerCelebration();
          }
          const activityId = `project_${projectId}`;
          if (!claimed.has(activityId)) {
            claimed.add(activityId);
            xpGained += 150;
          }
        } else {
          set.delete(projectId);
        }

        const todayStr = new Date().toISOString().slice(0, 10);
        const updatedStreak = calculateNextStreak(prev.streak, todayStr);
        const updatedDaily = isCompleted
          ? computeUpdatedDailyGoal(prev.dailyGoal, todayStr, 1)
          : (prev.dailyGoal || defaultProgress.dailyGoal);

        const candidateState: UserProgress = {
          ...prev,
          completedProjectIds: Array.from(set),
          xp: prev.xp + xpGained,
          claimedXpActivityIds: Array.from(claimed),
          streak: updatedStreak,
          dailyGoal: updatedDaily,
        };

        const newBadges = checkNewlyUnlockedAchievements(candidateState);
        let bonusXp = 0;
        const newlyUnlockedIds: string[] = [];
        const newHistory = [...prev.achievementHistory];

        newBadges.forEach((b) => {
          bonusXp += b.xpReward;
          newlyUnlockedIds.push(b.id);
          newHistory.push({ id: b.id, unlockedAt: new Date().toISOString() });
        });

        const updated: UserProgress = {
          ...candidateState,
          xp: candidateState.xp + bonusXp,
          unlockedAchievementIds: Array.from(new Set([...prev.unlockedAchievementIds, ...newlyUnlockedIds])),
          achievementHistory: newHistory,
        };

        syncToCloud(updated);
        return updated;
      });
    },
    [syncToCloud, triggerCelebration]
  );

  const isProjectCompleted = useCallback(
    (projectId: string) => {
      return progress.completedProjectIds.includes(projectId);
    },
    [progress.completedProjectIds]
  );

  const setLastLesson = useCallback((slug: string) => {
    setProgress((prev) => ({
      ...prev,
      lastLessonSlug: slug,
    }));
  }, []);

  const updateDailyGoalTarget = useCallback(
    (target: number) => {
      setProgress((prev) => {
        const updated: UserProgress = {
          ...prev,
          dailyGoal: {
            ...prev.dailyGoal,
            targetActivities: target,
            isCompleted: prev.dailyGoal.completedActivities >= target,
          },
        };
        syncToCloud(updated);
        return updated;
      });
    },
    [syncToCloud]
  );

  const updateWeeklyGoalTarget = useCallback(
    (target: number) => {
      setProgress((prev) => {
        const updated: UserProgress = {
          ...prev,
          weeklyGoal: {
            ...prev.weeklyGoal,
            targetLessons: target,
            isCompleted: prev.weeklyGoal.completedLessons >= target,
          },
        };
        syncToCloud(updated);
        return updated;
      });
    },
    [syncToCloud]
  );

  const resetProgress = useCallback(() => {
    const empty = { ...defaultProgress };
    setProgress(empty);
    localStorage.removeItem(getUserStorageKey(user?.id));
    if (user && isSupabaseConfigured && supabase) {
      syncToCloud(empty);
    }
  }, [user, syncToCloud]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        syncStatus,
        markLessonComplete,
        isLessonCompleted,
        saveQuizScore,
        getQuizScore,
        saveAssessmentResult,
        getAssessmentAttempts,
        getWeakTopics,
        awardXp,
        logLearningActivity,
        updateDailyGoalTarget,
        updateWeeklyGoalTarget,
        toggleBookmark,
        isBookmarked,
        saveNote,
        getNote,
        deleteNote,
        markProjectComplete,
        isProjectCompleted,
        setLastLesson,
        resetProgress,
        triggerCelebration,
        manualSync,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
