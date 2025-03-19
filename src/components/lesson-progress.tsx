'use client';

import { useLessonStore } from '@/hooks/use-lesson-store';
import { Progress } from '@/components/ui/progress';

export function LessonProgress() {
  const { lessonState, updateLessonState } = useLessonStore();

  // Sicherstellen, dass lessonState und seine Eigenschaften gültig sind
  const exercisePassedCount = lessonState?.exercisePassedCount ?? 0;
  const lessonNo = lessonState?.lessonNo ?? 1;
  const totalExercises = 28;

  const handleNextLesson = () => {
    updateLessonState({
      lessonNo: lessonNo + 1,
      lastActiveLessonNo: lessonNo + 1,
      exerciseNo: 1,
      lastActiveExerciseNo: 1,
    });
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3 className='font-medium'>Lektionsfortschritt</h3>
        <span className='text-sm text-muted-foreground'>
          Lektion {lessonNo}
        </span>
      </div>

      <Progress
        value={(exercisePassedCount / totalExercises) * 100}
        className='h-2'
      />

      <div className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>
          Übungen abgeschlossen: {exercisePassedCount}
        </span>
        <button
          onClick={handleNextLesson}
          className='px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md'
        >
          Nächste Lektion
        </button>
      </div>
    </div>
  );
}
