'use client';

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import * as api from '@/api/api';

// Typdefinition für den Fortschritt
interface UserProgress {
  completedExercises: string[];
  hasanatCounter: number;
  lessonNo: number;
  exerciseNo: number;
  lastActiveLessonNo: number;
  lastActiveExerciseNo: number;
  exercisePassedCount: number;
  // Zusätzliche optionale Eigenschaften mit spezifischen Typen
  points?: number;
  badges?: string[];
  settings?: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    [key: string]: boolean | string;
  };
}

// Standardwerte für den lokalen Fortschritt
const defaultProgress: UserProgress = {
  completedExercises: [],
  hasanatCounter: 0,
  lessonNo: 1,
  exerciseNo: 1,
  lastActiveLessonNo: 1,
  lastActiveExerciseNo: 1,
  exercisePassedCount: 0,
};

// Lokalen Fortschritt aus dem localStorage abrufen
const getLocalProgress = (): UserProgress => {
  if (typeof window === 'undefined') return defaultProgress;

  try {
    const stored = localStorage.getItem('user-progress');
    return stored ? JSON.parse(stored) : defaultProgress;
  } catch (error) {
    console.error('Failed to parse user progress from localStorage', error);
    return defaultProgress;
  }
};

// Lokalen Fortschritt im localStorage speichern
const setLocalProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user-progress', JSON.stringify(progress));
};

export function useUserProgress() {
  const queryClient = useQueryClient();

  // Lokaler Zustand mit TanStack Query
  const { data: localProgress = defaultProgress } = useQuery({
    queryKey: ['localProgress'],
    queryFn: getLocalProgress,
    staleTime: Infinity,
  });

  // Server-Zustand
  const { data: serverProgress, isLoading } = useQuery({
    queryKey: ['serverProgress'],
    queryFn: () => api.getUserLessonState(),
    // Beim Start und alle 5 Minuten aktualisieren
    refetchInterval: 5 * 60 * 1000,
  });

  // Mutation für Server-Updates
  const { mutate: updateServerProgress } = useMutation({
    mutationFn: (progress: UserProgress) =>
      api.adminSetUserLessonState(
        'current', // Aktueller Benutzer
        progress.lessonNo,
        progress.exerciseNo
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serverProgress'] });
    },
  });

  // Debounced Update-Funktion
  const debouncedServerUpdate = useCallback(
    debounce((progress: UserProgress) => {
      updateServerProgress(progress);
    }, 2000),
    []
  );

  // Funktion zum Aktualisieren des Fortschritts
  const updateProgress = useCallback(
    (newProgress: Partial<UserProgress>) => {
      // Lokalen Zustand sofort aktualisieren
      const updatedProgress = { ...localProgress, ...newProgress };

      queryClient.setQueryData(['localProgress'], updatedProgress);

      // Lokalen Speicher aktualisieren
      setLocalProgress(updatedProgress);

      // Server verzögert aktualisieren
      debouncedServerUpdate(updatedProgress);
    },
    [localProgress, debouncedServerUpdate]
  );

  // Wichtige Fortschritte sofort synchronisieren
  const completeExercise = useCallback(
    (exerciseData: { id: string; hasanat: number }) => {
      // Lokalen Zustand aktualisieren
      const updatedProgress = {
        ...localProgress,
        completedExercises: [
          ...localProgress.completedExercises,
          exerciseData.id,
        ],
        hasanatCounter: localProgress.hasanatCounter + exerciseData.hasanat,
        exercisePassedCount: localProgress.exercisePassedCount + 1,
      };

      // Lokalen Zustand aktualisieren
      queryClient.setQueryData(['localProgress'], updatedProgress);
      setLocalProgress(updatedProgress);

      // Sofort mit Server synchronisieren (ohne Debounce)
      updateServerProgress(updatedProgress);
    },
    [localProgress, updateServerProgress]
  );

  return {
    progress: localProgress || serverProgress,
    isLoading,
    updateProgress,
    completeExercise,
  };
}
