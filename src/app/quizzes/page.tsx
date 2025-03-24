'use client';

import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import { useProgressQuery } from '@/api/queries/use-progress-query';
import { useLessonQuery } from '@/api/queries/use-lesson-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { getExercise } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export default function QuizzesPage() {
  // Verwende die TanStack Query Hooks
  const { isLoading: isProgressLoading, error: progressError } =
    useProgressQuery();
  const {
    data: lessonState,
    isLoading: isLessonLoading,
    error: lessonError,
  } = useLessonQuery();

  // Check for session errors
  const isSessionError =
    (progressError &&
      typeof progressError === 'object' &&
      'message' in progressError &&
      (progressError as any).message?.includes('No active session')) ||
    (lessonError &&
      typeof lessonError === 'object' &&
      'message' in lessonError &&
      (lessonError as any).message?.includes('No active session'));

  // If not logged in, show a login message
  if (isSessionError) {
    return (
      <div className='p-6'>
        <h1 className='text-2xl font-bold mb-1'>Deine Übungen</h1>
        <p className='text-gray-500 mb-6'>Trainiere dein Wissen.</p>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6'>
          <div className='text-center space-y-4'>
            <h2 className='text-xl font-semibold'>Anmeldung erforderlich</h2>
            <p className='text-gray-600 max-w-md mx-auto'>
              Bitte melde dich an, um auf deine Übungen zugreifen zu können.
            </p>
            <Button
              asChild
              className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-8 mt-4'
            >
              <Link href='/login'>Zur Anmeldung</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Abfrage der Übungsanzahl über die API
  const { data: exerciseData, isLoading: isExerciseDataLoading } = useQuery({
    queryKey: ['exerciseCount', lessonState?.lessonNo || 1, 1],
    queryFn: async () => {
      // Erste Übung der aktuellen Lektion laden, um num_exercises_of_lesson zu erhalten
      const data = await getExercise(lessonState?.lessonNo || 1, 1);
      return data;
    },
    enabled: !!lessonState,
  });

  const isLoading =
    isProgressLoading || isLessonLoading || isExerciseDataLoading;

  // Anzahl der Übungen aus den API-Daten oder Standardwert 3
  const totalExercisesPerLesson = exerciseData?.num_exercises_of_lesson || 3;

  // Verwende die gespeicherten Lektions- und Übungsdaten oder Standardwerte
  const currentLessonNo = lessonState?.lessonNo || 1;
  const currentExerciseNo = lessonState?.exerciseNo || 1;
  const exercisePassedCount = lessonState?.exercisePassedCount || 0;

  // Setze die aktuelle Lektion aus dem Backend als Standardwert für das Dropdown
  const [selectedLessonNo, setSelectedLessonNo] = useState<number | null>(null);

  // Aktualisiere den selectedLessonNo, wenn lessonState geladen wird
  useEffect(() => {
    if (lessonState && !selectedLessonNo) {
      setSelectedLessonNo(lessonState.lessonNo);
    }
  }, [lessonState, selectedLessonNo]);

  // Handler für die Änderung der ausgewählten Lektion
  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLessonNo(parseInt(e.target.value));
  };

  // Die tatsächlich zu verwendende Lektion (entweder vom Benutzer ausgewählt oder vom Backend)
  const effectiveLessonNo = selectedLessonNo || currentLessonNo;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-1'>Deine Übungen</h1>
      <p className='text-gray-500 mb-6'>Trainiere dein Wissen.</p>

      <div className='flex items-center mb-6'>
        <div className='relative w-full max-w-xs'>
          {isLoading ? (
            <Skeleton className='h-10 w-full rounded-md' />
          ) : (
            <select
              className='w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#4AA4DE] focus:border-transparent'
              value={effectiveLessonNo}
              onChange={handleLessonChange}
            >
              {Array.from({ length: currentLessonNo }, (_, i) => i + 1).map(
                (lessonNo) => (
                  <option key={lessonNo} value={lessonNo}>
                    Lektion {lessonNo}: {getLessonCharacter(lessonNo)}{' '}
                    {lessonNo < currentLessonNo ? '(Training)' : ''}
                  </option>
                )
              )}
            </select>
          )}
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6'>
        <div className='grid grid-cols-3 mb-8'>
          <div className='text-center'>
            <div className='text-gray-500 mb-2'>Lektion</div>
            <div className='flex items-center justify-center'>
              {isLoading ? (
                <Skeleton className='h-10 w-16 rounded-md' />
              ) : (
                <div className='bg-blue-100 p-2 rounded-md'>
                  <span className='text-blue-600 font-bold'>
                    {currentLessonNo}
                  </span>
                  <span className='text-gray-400 text-xs'>/28</span>
                </div>
              )}
            </div>
          </div>
          <div className='text-center'>
            <div className='text-gray-500 mb-2'>Übung</div>
            <div className='flex items-center justify-center'>
              {isLoading ? (
                <Skeleton className='h-10 w-16 rounded-md' />
              ) : (
                <div className='bg-blue-100 p-2 rounded-md'>
                  <span className='text-blue-600 font-bold'>
                    {currentExerciseNo}
                  </span>
                  <span className='text-gray-400 text-xs'>
                    /{totalExercisesPerLesson}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='text-center'>
            <div className='text-gray-500 mb-2'>Erfolg</div>
            <div className='flex items-center justify-center'>
              {isLoading ? (
                <Skeleton className='h-10 w-16 rounded-md' />
              ) : (
                <div className='bg-blue-100 p-2 rounded-md'>
                  <span className='text-blue-600 font-bold'>
                    {exercisePassedCount}/3
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='text-center mb-4'>
          <h2 className='text-2xl font-bold inline-flex items-center'>
            {effectiveLessonNo < currentLessonNo ? 'Trainingsmodus: ' : ''}
            Wortmuster
            <span className='ml-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center'>
              <InfoIcon size={14} />
            </span>
          </h2>
        </div>

        <div className='text-center mb-8'>
          <p className='max-w-2xl mx-auto'>
            Du trainierst die häufigsten Wortmuster im Koran. Dies sind keine
            echten Wörter, sie klingen nur ähnlich wie häufig vorkommende
            Wörter.
          </p>
        </div>

        <div className='flex justify-center'>
          <Button
            asChild
            className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-8'
          >
            <Link
              href={`/quizzes/${effectiveLessonNo}?exercise=${
                effectiveLessonNo === currentLessonNo ? currentExerciseNo : 1
              }`}
            >
              {effectiveLessonNo < currentLessonNo
                ? 'Training starten'
                : 'Los gehts'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hilfsfunktion zur Darstellung des arabischen Buchstabens für jede Lektion
function getLessonCharacter(lessonNo: number): string {
  // Arabische Buchstaben für die 28 Lektionen
  const arabicLetters = [
    'ا',
    'ب',
    'ت',
    'ث',
    'ج',
    'ح',
    'خ',
    'د',
    'ذ',
    'ر',
    'ز',
    'س',
    'ش',
    'ص',
    'ض',
    'ط',
    'ظ',
    'ع',
    'غ',
    'ف',
    'ق',
    'ك',
    'ل',
    'م',
    'ن',
    'ه',
    'و',
    'ي',
  ];

  return arabicLetters[lessonNo - 1] || '';
}
