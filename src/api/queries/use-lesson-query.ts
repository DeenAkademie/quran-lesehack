import { useQuery } from '@tanstack/react-query';
import { getUserLessonState } from '../api';

export interface LessonState {
  lessonNo: number;
  lastActiveLessonNo: number;
  exerciseNo: number;
  lastActiveExerciseNo: number;
  exercisePassedCount: number;
}

const defaultLessonState: LessonState = {
  lessonNo: 1,
  lastActiveLessonNo: 1,
  exerciseNo: 1,
  lastActiveExerciseNo: 1,
  exercisePassedCount: 0,
};

/**
 * Hook für die Abfrage des Lektionszustands mit TanStack Query
 */
export function useLessonQuery() {
  return useQuery({
    queryKey: ['lessonState'],
    queryFn: async (): Promise<LessonState> => {
      try {
        const response = await getUserLessonState();

        // Check if the response indicates no session
        if (
          response?.status === 'error' &&
          response?.message === 'No active session'
        ) {
          console.warn('Keine aktive Sitzung für Lektionsabfrage');
          return defaultLessonState;
        }

        if (!response) {
          console.warn('Keine gültigen Lektionsdaten empfangen');
          return defaultLessonState;
        }

        // Konvertiere snake_case der API in camelCase für die Anwendung
        return {
          lessonNo: response.lesson_no ?? defaultLessonState.lessonNo,
          lastActiveLessonNo:
            response.last_active_lesson_no ??
            defaultLessonState.lastActiveLessonNo,
          exerciseNo: response.exercise_no ?? defaultLessonState.exerciseNo,
          lastActiveExerciseNo:
            response.last_active_exercise_no ??
            defaultLessonState.lastActiveExerciseNo,
          exercisePassedCount:
            response.exercise_passed_count ??
            defaultLessonState.exercisePassedCount,
        };
      } catch (error: any) {
        // Handle "No active session" errors gracefully
        if (error.message && error.message.includes('No active session')) {
          console.warn('Keine aktive Benutzersitzung für Lektionsabfrage');
        } else {
          console.error('Fehler beim Abrufen des Lektionszustands:', error);
        }
        return defaultLessonState;
      }
    },
    // Aktualisierungseinstellungen
    staleTime: 2 * 60 * 1000, // 2 Minuten
    refetchOnWindowFocus: true,
    // Fehlerbehandlung anpassen
    retry: (failureCount, error: any) => {
      // Don't retry "No active session" errors
      if (error.message && error.message.includes('No active session')) {
        return false;
      }
      // Only retry other errors once
      return failureCount < 1;
    },
  });
}
