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
        console.log('Original API response:', response);

        if (!response || !response.data) {
          console.warn('Keine gültigen Fortschrittsdaten empfangen');
          return defaultProgressData;
        }

        const data = response.data;
        console.log('Response data fields:', Object.keys(data));

        // Überprüfe den Status
        if (response.status === 'success') {
          // Validiere und normalisiere die Antwort mit Unterstützung für beide Namenskonventionen
          const normalizedData: UserProgressData = {
            lessonNo:
              data.lessonNo ?? data.lesson_no ?? defaultProgressData.lessonNo,
            exerciseNo:
              data.exerciseNo ??
              data.exercise_no ??
              defaultProgressData.exerciseNo,
            exercisePassedCount:
              data.exercisePassedCount ??
              data.exercise_passed_count ??
              defaultProgressData.exercisePassedCount,
            hasanatCounter:
              data.hasanatCounter ??
              data.hasanat_counter ??
              defaultProgressData.hasanatCounter,
            totalExercises:
              data.totalExercises ??
              data.total_exercises ??
              defaultProgressData.totalExercises,
          };

          console.log('Normalized success data:', normalizedData);
          return normalizedData;
        } else {
          console.warn('API response status is not success:', response.status);
          return defaultProgressData;
        }
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
