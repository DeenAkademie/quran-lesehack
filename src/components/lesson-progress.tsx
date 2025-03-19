'use client';

import { Progress } from '@/components/ui/progress';
import { useLessonQuery } from '@/api/queries/use-lesson-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function LessonProgress() {
  const { data: lessonState, isLoading } = useLessonQuery();
  const queryClient = useQueryClient();

  // Mutation für das Aktualisieren des Lektionszustands
  const updateMutation = useMutation({
    mutationFn: async (newState: {
      lessonNo: number;
      lastActiveLessonNo: number;
      exerciseNo: number;
      lastActiveExerciseNo: number;
    }) => {
      // Hier würde die API-Funktion zum Aktualisieren des Zustands aufgerufen werden
      // Für jetzt simulieren wir die erfolgreiche Aktualisierung
      return newState;
    },
    onSuccess: () => {
      // Beim Erfolg den Cache invalidieren, um neu zu laden
      queryClient.invalidateQueries({ queryKey: ['lessonState'] });
    },
  });

  // Lade-Zustand anzeigen
  if (isLoading || !lessonState) {
    return <LessonProgressSkeleton />;
  }

  const handleNextLesson = () => {
    updateMutation.mutate({
      lessonNo: lessonState.lessonNo + 1,
      lastActiveLessonNo: lessonState.lessonNo + 1,
      exerciseNo: 1,
      lastActiveExerciseNo: 1,
    });
  };

  // Konstanten für bessere Lesbarkeit
  const totalExercises = 28;

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3 className='font-medium'>Lektionsfortschritt</h3>
        <span className='text-sm text-muted-foreground'>
          Lektion {lessonState.lessonNo}
        </span>
      </div>

      <Progress
        value={(lessonState.exercisePassedCount / totalExercises) * 100}
        className='h-2'
      />

      <div className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>
          Übungen abgeschlossen: {lessonState.exercisePassedCount}
        </span>
        <button
          onClick={handleNextLesson}
          disabled={updateMutation.isPending}
          className='px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md disabled:opacity-50'
        >
          {updateMutation.isPending
            ? 'Wird aktualisiert...'
            : 'Nächste Lektion'}
        </button>
      </div>
    </div>
  );
}

// Skeleton-Komponente für den Ladezustand
function LessonProgressSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <Skeleton className='h-5 w-36' />
        <Skeleton className='h-4 w-24' />
      </div>
      <Skeleton className='h-2 w-full' />
      <div className='flex justify-between items-center'>
        <Skeleton className='h-4 w-48' />
        <Skeleton className='h-8 w-32 rounded-md' />
      </div>
    </div>
  );
}
