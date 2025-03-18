'use client';

import { useEffect, useState } from 'react';
import { getUserProgress } from '@/api/api';

interface UserProgress {
  lessonNo: number;
  exerciseNo: number;
  exercisePassedCount: number;
  hasanatCounter: number;
  totalExercises: number;
}

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    lessonNo: 1,
    exerciseNo: 1,
    exercisePassedCount: 0,
    hasanatCounter: 0,
    totalExercises: 28,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      try {
        setIsLoading(true);
        const response = await getUserProgress();
        setProgress(response.data);
      } catch (err) {
        console.error('Fehler beim Laden des Fortschritts:', err);
        setError(err instanceof Error ? err : new Error('Unbekannter Fehler'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgress();
  }, []);

  return { progress, isLoading, error };
}
