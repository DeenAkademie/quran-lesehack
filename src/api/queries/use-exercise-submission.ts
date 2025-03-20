import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitExercise } from '../api';
import type { ApiReadingExerciseAnswer } from '@/models/api_responses';
import type { ExerciseResult } from '../types/api_types';

interface SubmitExerciseParams {
  lessonNo: number;
  exerciseNo: number;
  answerHashes: string[];
  answers: ApiReadingExerciseAnswer[];
}

/**
 * Hook für die Einreichung von Übungsergebnissen mit TanStack Mutation
 */
export function useExerciseSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lessonNo,
      exerciseNo,
      answerHashes,
      answers,
    }: SubmitExerciseParams): Promise<ExerciseResult> => {
      try {
        const result = await submitExercise(
          lessonNo,
          exerciseNo,
          answerHashes,
          answers
        );

        if (!result) {
          throw new Error('Keine gültigen Ergebnisdaten empfangen');
        }

        // Speichere die Ergebnisse im sessionStorage für spätere Verwendung
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('lastQuizResults', JSON.stringify(result));

          // Speichere die Antworten separat für den Fall, dass sie im Result nicht enthalten sind
          sessionStorage.setItem(
            'lastSubmittedAnswers',
            JSON.stringify(answers)
          );
        }

        return result;
      } catch (error) {
        console.error('Fehler beim Einreichen der Übung:', error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      // Nach erfolgreicher Einreichung relevante Queries invalidieren
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({
        queryKey: ['exercise', variables.lessonNo, variables.exerciseNo],
      });

      // Setze die Ergebnisdaten in den QuizResults-Cache
      // Stelle sicher, dass die Antworten enthalten sind
      queryClient.setQueryData(
        ['quizResults', variables.lessonNo, variables.exerciseNo],
        {
          ...data,
          // Wenn die Answers nicht im Server-Response enthalten sind, füge sie hinzu
          answers: data.answers || variables.answers,
          // Stelle sicher, dass die Gesamtanzahl der Fragen gesetzt ist
          totalQuestions: data.totalQuestions || variables.answers.length,
        }
      );

      // Optional: Bei Abschluss der Lektion auch die Lektionsdaten neu laden
      if (data.has_passed_lesson) {
        queryClient.invalidateQueries({ queryKey: ['lessonState'] });
      }
    },
  });
}
