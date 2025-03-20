import { useQuery } from '@tanstack/react-query';
import type { ExerciseResult, ReadingExerciseAnswer } from '../types/api_types';

/**
 * Hook, der die Abfrage der Übungsergebnisse verwaltet
 */
export function useExerciseResults(lessonNo: number, exerciseNo: number) {
  return useQuery({
    queryKey: ['quizResults', lessonNo, exerciseNo],
    queryFn: async () => {
      try {
        // Versuche, die Ergebnisse aus dem sessionStorage zu laden
        const cachedResults = sessionStorage.getItem('lastQuizResults');
        if (cachedResults) {
          const parsedResults = JSON.parse(cachedResults) as ExerciseResult;

          // Prüfe, ob die Antworten und die Fragen-Anzahl vorhanden sind
          // Falls nicht, versuche die Antworten aus dem LocalStorage zu holen
          if (!parsedResults.answers || parsedResults.answers.length === 0) {
            const lastAnswersStr = sessionStorage.getItem(
              'lastSubmittedAnswers'
            );
            if (lastAnswersStr) {
              const lastAnswers = JSON.parse(lastAnswersStr);

              // Füge die Antworten zum Ergebnis hinzu
              parsedResults.answers = lastAnswers;
              parsedResults.totalQuestions = lastAnswers.length;
            }
          }

          return parsedResults;
        }

        // Versuche die letzten übermittelten Antworten zu bekommen
        const lastSubmittedAnswersStr = sessionStorage.getItem(
          'lastSubmittedAnswers'
        );
        if (lastSubmittedAnswersStr) {
          const lastAnswers = JSON.parse(
            lastSubmittedAnswersStr
          ) as ReadingExerciseAnswer[];
          const correctAnswers = lastAnswers.filter((a) => a.is_correct).length;

          // Erzeuge ein minimales Ergebnisobjekt
          return {
            exercise_passed_count:
              correctAnswers >= lastAnswers.length * 0.8 ? 3 : 2,
            has_passed_exercise: correctAnswers >= lastAnswers.length * 0.6,
            has_passed_lesson: false,
            has_finished_course: false,
            is_native_speaker: false,
            lesson_progress: 75,
            next_exercise_no: exerciseNo + 1,
            next_lesson_no: lessonNo,
            exercise_hasanat: correctAnswers * 2,
            num_correct_answers: correctAnswers,
            points: correctAnswers * 15,
            time_ms: lastAnswers.reduce(
              (sum: number, a: ReadingExerciseAnswer) => sum + a.time_ms,
              0
            ),
            answers: lastAnswers,
            totalQuestions: lastAnswers.length,
          } as ExerciseResult;
        }

        // Fallback: Fehlermeldung werfen
        throw new Error(
          'Keine Ergebnisse im Cache gefunden und keine Antwortdaten verfügbar'
        );
      } catch (error) {
        console.error('Fehler beim Laden der Übungsergebnisse:', error);
        throw error;
      }
    },
    staleTime: Infinity, // Ergebnisse ändern sich nicht und können ewig gecached werden
    retry: false, // Bei Fehlern nicht erneut versuchen, da die Ergebnisse entweder im Cache sind oder nicht
  });
}
