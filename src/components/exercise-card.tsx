'use client';

import { useExerciseStore } from '@/hooks/use-exercise-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ExerciseCard() {
  const { exerciseState, updateExerciseState } = useExerciseStore();

  const handleStartExercise = () => {
    // Aktualisiere den Übungszustand beim Starten einer Übung
    updateExerciseState({
      exerciseType: 'quiz',
      // Andere Eigenschaften würden hier basierend auf der ausgewählten Übung gesetzt werden
    });
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Übung {exerciseState.exerciseNo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            Lektion {exerciseState.lessonNo} - Übung {exerciseState.exerciseNo}{' '}
            von {exerciseState.numExercisesOfLesson}
          </p>

          {exerciseState.questions.length > 0 ? (
            <div className='space-y-2'>
              <p>Fragen: {exerciseState.questions.length}</p>
              <Button onClick={handleStartExercise} className='w-full'>
                Übung fortsetzen
              </Button>
            </div>
          ) : (
            <Button onClick={handleStartExercise} className='w-full'>
              Übung starten
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
