import { useQuery } from '@tanstack/react-query';
import { getUserProgress } from '../api';

export interface UserProgressData {
  lessonNo: number;
  exerciseNo: number;
  exercisePassedCount: number;
  hasanatCounter: number;
  totalExercises: number;
}

const defaultProgressData: UserProgressData = {
  lessonNo: 1,
  exerciseNo: 1,
  exercisePassedCount: 0,
  hasanatCounter: 0,
  totalExercises: 28,
};

/**
 * Hook für die Abfrage des Benutzerfortschritts mit TanStack Query
 */
export function useProgressQuery() {
  return useQuery({
    queryKey: ['userProgress'],
    queryFn: async (): Promise<UserProgressData> => {
      try {
        const response = await getUserProgress();

        if (!response || !response.data) {
          console.warn('Keine gültigen Fortschrittsdaten empfangen');
          return defaultProgressData;
        }

        // Validiere und normalisiere die Antwort
        return {
          lessonNo: response.data.lessonNo ?? defaultProgressData.lessonNo,
          exerciseNo:
            response.data.exerciseNo ?? defaultProgressData.exerciseNo,
          exercisePassedCount:
            response.data.exercisePassedCount ??
            defaultProgressData.exercisePassedCount,
          hasanatCounter:
            response.data.hasanatCounter ?? defaultProgressData.hasanatCounter,
          totalExercises:
            response.data.totalExercises ?? defaultProgressData.totalExercises,
        };
      } catch (error) {
        console.error('Fehler beim Abrufen des Benutzerfortschritts:', error);
        return defaultProgressData;
      }
    },
    // Halten wir die Daten für 5 Minuten aktuell
    staleTime: 5 * 60 * 1000,
    // Automatisch neu laden, wenn der Benutzer zum Tab zurückkehrt
    refetchOnWindowFocus: true,
    // Fehlerbehandlung
    retry: 2,
  });
}
