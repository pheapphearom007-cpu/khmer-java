import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { useAuth } from './AuthContext';
import { UserProgress } from '../types';

interface ProgressContextType {
  progress: UserProgress;
  markLessonComplete: (lessonId: string, isCompleted?: boolean) => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
  saveQuizScore: (lessonId: string, score: number, total: number) => Promise<void>;
  getQuizScore: (lessonId: string) => { score: number; total: number; completedAt: string } | null;
  toggleBookmark: (slug: string) => Promise<void>;
  isBookmarked: (slug: string) => boolean;
  markProjectComplete: (projectId: string, isCompleted?: boolean) => Promise<void>;
  isProjectCompleted: (projectId: string) => boolean;
  setLastLesson: (slug: string) => void;
  resetProgress: () => void;
  triggerCelebration: () => void;
}

const STORAGE_KEY = 'khmer_java_progress_v1';

const defaultProgress: UserProgress = {
  completedLessonIds: [],
  quizScores: {},
  completedProjectIds: [],
  bookmarks: [],
  lastLessonSlug: 'intro-to-java',
  totalTimeSpentMinutes: 0,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultProgress, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to parse local progress:', e);
    }
    return defaultProgress;
  });

  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#e11d48', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
      });
    } catch {
      // Safe fallback if canvas not available
    }
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Load from Supabase when user logs in
  useEffect(() => {
    if (!user || !isSupabaseConfigured || !supabase) return;

    let isMounted = true;

    async function loadCloudProgress() {
      if (!user) return;
      try {
        const { data: progressData, error: progressErr } = await supabase!
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        const { data: bookmarkData } = await supabase!
          .from('user_bookmarks')
          .select('lesson_slug')
          .eq('user_id', user.id);

        if (!isMounted) return;

        if (progressData && !progressErr) {
          setProgress((prev) => {
            const mergedLessons = Array.from(new Set([...prev.completedLessonIds, ...(progressData.completed_lessons || [])]));
            const mergedProjects = Array.from(new Set([...prev.completedProjectIds, ...(progressData.completed_projects || [])]));
            const mergedBookmarks = bookmarkData
              ? Array.from(new Set([...prev.bookmarks, ...bookmarkData.map((b: { lesson_slug: string }) => b.lesson_slug)]))
              : prev.bookmarks;

            return {
              completedLessonIds: mergedLessons,
              completedProjectIds: mergedProjects,
              quizScores: { ...prev.quizScores, ...(progressData.quiz_scores || {}) },
              bookmarks: mergedBookmarks,
              lastLessonSlug: progressData.last_lesson_slug || prev.lastLessonSlug,
              totalTimeSpentMinutes: Math.max(prev.totalTimeSpentMinutes, progressData.total_time_spent_minutes || 0),
            };
          });
        }
      } catch (err) {
        console.warn('Could not sync with Supabase progress table:', err);
      }
    }

    loadCloudProgress();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Save progress helper to Supabase
  const syncToCloud = useCallback(
    async (updated: UserProgress) => {
      if (!user || !isSupabaseConfigured || !supabase) return;

      try {
        await supabase.from('user_progress').upsert({
          user_id: user.id,
          completed_lessons: updated.completedLessonIds,
          completed_projects: updated.completedProjectIds,
          quiz_scores: updated.quizScores,
          last_lesson_slug: updated.lastLessonSlug,
          total_time_spent_minutes: updated.totalTimeSpentMinutes,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Failed to sync progress to Supabase:', err);
      }
    },
    [user]
  );

  const markLessonComplete = useCallback(
    async (lessonId: string, isCompleted: boolean = true) => {
      setProgress((prev) => {
        const set = new Set(prev.completedLessonIds);
        if (isCompleted) {
          if (!set.has(lessonId)) {
            set.add(lessonId);
            triggerCelebration();
          }
        } else {
          set.delete(lessonId);
        }
        const updated = {
          ...prev,
          completedLessonIds: Array.from(set),
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

  const saveQuizScore = useCallback(
    async (lessonId: string, score: number, total: number) => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [lessonId]: {
              score,
              total,
              completedAt: new Date().toISOString(),
            },
          },
        };
        if (score === total && total > 0) {
          triggerCelebration();
        }
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
        const updated = {
          ...prev,
          bookmarks: Array.from(set),
        };
        return updated;
      });

      if (user && isSupabaseConfigured && supabase) {
        try {
          if (isAdded) {
            await supabase.from('user_bookmarks').upsert({
              user_id: user.id,
              lesson_slug: slug,
            });
          } else {
            await supabase.from('user_bookmarks').delete().eq('user_id', user.id).eq('lesson_slug', slug);
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

  const markProjectComplete = useCallback(
    async (projectId: string, isCompleted: boolean = true) => {
      setProgress((prev) => {
        const set = new Set(prev.completedProjectIds);
        if (isCompleted) {
          if (!set.has(projectId)) {
            set.add(projectId);
            triggerCelebration();
          }
        } else {
          set.delete(projectId);
        }
        const updated = {
          ...prev,
          completedProjectIds: Array.from(set),
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

  const resetProgress = useCallback(() => {
    const empty = { ...defaultProgress };
    setProgress(empty);
    localStorage.removeItem(STORAGE_KEY);
    if (user && isSupabaseConfigured && supabase) {
      syncToCloud(empty);
    }
  }, [user, syncToCloud]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonComplete,
        isLessonCompleted,
        saveQuizScore,
        getQuizScore,
        toggleBookmark,
        isBookmarked,
        markProjectComplete,
        isProjectCompleted,
        setLastLesson,
        resetProgress,
        triggerCelebration,
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
