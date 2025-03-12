'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LessonStore } from '@/store/store_types';

// Default lesson state
const defaultLessonState: LessonStore = {
  exerciseNo: 1,
  lessonNo: 1,
  lastActiveLessonNo: 1,
  lastActiveExerciseNo: 1,
  exercisePassedCount: 0,
  hasanatCounter: 0,
};

// Local storage key
const STORAGE_KEY = 'lesson-store';

// Helper functions for localStorage
const getLessonState = (): LessonStore => {
  if (typeof window === 'undefined') return defaultLessonState;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultLessonState;
  } catch (error) {
    console.error('Failed to parse lesson state from localStorage', error);
    return defaultLessonState;
  }
};

const setLessonState = (state: LessonStore): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// Hook for lesson state
export function useLessonStore() {
  const queryClient = useQueryClient();

  // Query to get lesson state
  const { data: lessonState = defaultLessonState } = useQuery({
    queryKey: ['lessonState'],
    queryFn: getLessonState,
    staleTime: Infinity, // Don't refetch automatically
  });

  // Mutation to update lesson state
  const { mutate: updateLessonState } = useMutation({
    mutationFn: (newState: Partial<LessonStore>) => {
      const updatedState = { ...lessonState, ...newState };
      setLessonState(updatedState);
      return Promise.resolve(updatedState);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['lessonState'], data);
    },
  });

  return {
    lessonState,
    updateLessonState,
  };
}
