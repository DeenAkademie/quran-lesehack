'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ExerciseStore } from '@/store/store_types';

// Default exercise state
const defaultExerciseState: ExerciseStore = {
  exerciseNo: 1,
  lessonNo: 1,
  exerciseType: '',
  numExercisesOfLesson: 3,
  answerHashes: [],
  questions: [],
};

// Local storage key
const STORAGE_KEY = 'exercise-store';

// Helper functions for localStorage
const getExerciseState = (): ExerciseStore => {
  if (typeof window === 'undefined') return defaultExerciseState;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultExerciseState;
  } catch (error) {
    console.error('Failed to parse exercise state from localStorage', error);
    return defaultExerciseState;
  }
};

const setExerciseState = (state: ExerciseStore): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// Hook for exercise state
export function useExerciseStore() {
  const queryClient = useQueryClient();

  // Query to get exercise state
  const { data: exerciseState = defaultExerciseState } = useQuery({
    queryKey: ['exerciseState'],
    queryFn: getExerciseState,
    staleTime: Infinity, // Don't refetch automatically
  });

  // Mutation to update exercise state
  const { mutate: updateExerciseState } = useMutation({
    mutationFn: (newState: Partial<ExerciseStore>) => {
      const updatedState = { ...exerciseState, ...newState };
      setExerciseState(updatedState);
      return Promise.resolve(updatedState);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['exerciseState'], data);
    },
  });

  return {
    exerciseState,
    updateExerciseState,
  };
}
