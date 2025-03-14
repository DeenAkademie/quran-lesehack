'use client';

import { useLessonStore } from '@/hooks/use-lesson-store';
import { Progress } from '@/components/ui/progress';

export function LessonProgress() {
  const { lessonState, updateLessonState } = useLessonStore();

  const handleNextLesson = () => {
    updateLessonState({
      lessonNo: lessonState.lessonNo + 1,
      lastActiveLessonNo: lessonState.lessonNo + 1,
      exerciseNo: 1,
      lastActiveExerciseNo: 1,
    });
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3 className='font-medium'>Lektionsfortschritt</h3>
        <span className='text-sm text-muted-foreground'>
          Lektion {lessonState.lessonNo}
        </span>
      </div>

      <Progress
        value={(lessonState.exercisePassedCount / 28) * 100}
        className='h-2'
      />

      <div className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>
          Übungen abgeschlossen: {lessonState.exercisePassedCount}
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
