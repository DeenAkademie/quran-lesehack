import { useQuery } from '@tanstack/react-query';
import { getExercise } from '../api';
import type { GetReadingExercise } from '../types/api_types';

/**
 * Hook für die Abfrage einer Übung mit TanStack Query
 * @param lessonNo Die Lektionsnummer
 * @param exerciseNo Die Übungsnummer
 * @param options Zusätzliche Optionen für die Abfrage
 */
export function useExerciseQuery(
  lessonNo: number,
  exerciseNo: number,
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchInterval?: number | false;
  }
) {
  return useQuery({
    queryKey: ['exercise', lessonNo, exerciseNo],
    queryFn: async (): Promise<GetReadingExercise> => {
      try {
        const response = await getExercise(lessonNo, exerciseNo);
        if (!response) {
          console.warn('Keine gültigen Übungsdaten empfangen');
          throw new Error('Keine gültigen Übungsdaten empfangen');
        }

        return response;
      } catch (error) {
        console.error('Fehler beim Abrufen der Übung:', error);
        throw error;
      }
    },
    // Anpassbare Query-Optionen
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5 Minuten Cache-Zeit
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchInterval: options?.refetchInterval ?? false,
    // Beim Fehler einmal wiederholen
    retry: 1,
  });
}
