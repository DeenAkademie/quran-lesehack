'use client';

import { useUserProgress } from '@/hooks/use-user-progress';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export function UserProgressWidget() {
  const { progress, isLoading, updateProgress, completeExercise } =
    useUserProgress();

  const handleNextLesson = () => {
    updateProgress({
      lessonNo: progress.lessonNo + 1,
      lastActiveLessonNo: progress.lessonNo + 1,
      exerciseNo: 1,
      lastActiveExerciseNo: 1,
    });
  };

  const handleCompleteExercise = () => {
    completeExercise({
      id: `exercise-${progress.lessonNo}-${progress.exerciseNo}`,
      hasanat: 10,
    });
  };

  if (isLoading) {
    return <div className='p-4 text-center'>Lade Fortschritt...</div>;
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Dein Fortschritt</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex justify-between items-center'>
          <span className='text-sm font-medium'>
            Lektion {progress.lessonNo}
          </span>
          <span className='text-sm text-muted-foreground'>
            Übung {progress.exerciseNo}
          </span>
        </div>

        <Progress
          value={(progress.exercisePassedCount / 28) * 100}
          className='h-2'
        />

        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Image src='/img/coin.png' alt='Hasanat' width={20} height={20} />
            <span>{progress.hasanatCounter} Hasanat</span>
          </div>
          <span className='text-sm text-muted-foreground'>
            {progress.exercisePassedCount} von 28 Übungen abgeschlossen
          </span>
        </div>

        <div className='flex gap-2 pt-2'>
          <Button onClick={handleCompleteExercise} className='flex-1'>
            Übung abschließen
          </Button>
          <Button
            onClick={handleNextLesson}
            variant='outline'
            className='flex-1'
          >
            Nächste Lektion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
