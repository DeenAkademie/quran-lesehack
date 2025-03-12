'use client';

import { useExerciseStore } from '@/hooks/use-exercise-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ExerciseCard() {
  const { exerciseState, updateExerciseState } = useExerciseStore();

  const handleStartExercise = () => {
    // Update exercise state when starting an exercise
    updateExerciseState({
      exerciseType: 'quiz',
      // Other properties would be set here based on the selected exercise
    });
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Exercise {exerciseState.exerciseNo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            Lesson {exerciseState.lessonNo} - Exercise{' '}
            {exerciseState.exerciseNo} of {exerciseState.numExercisesOfLesson}
          </p>

          {exerciseState.questions.length > 0 ? (
            <div className='space-y-2'>
              <p>Questions: {exerciseState.questions.length}</p>
              <Button onClick={handleStartExercise} className='w-full'>
                Continue Exercise
              </Button>
            </div>
          ) : (
            <Button onClick={handleStartExercise} className='w-full'>
              Start Exercise
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
