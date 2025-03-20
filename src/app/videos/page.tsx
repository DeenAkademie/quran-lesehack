'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/api/supabase_client';
import { useLessonQuery } from '@/api/queries/use-lesson-query';

// Typ-Definitionen für die API-Antwort
interface VideoResponse {
  lesson_no: number;
  week_no: number;
  part: number;
  vimeo_id: string;
  vimeo_hash: string;
  title: string;
  description: string;
  is_children: boolean;
  lang_code: string;
  video_urls: {
    id: number;
    created_at: string;
    video_id: number;
    urls: {
      [key: string]: string;
    };
  };
}

// Funktion zum Abrufen von Videodaten
async function getLessonVideoData(
  lessonNo: number = 1
): Promise<VideoResponse[]> {
  try {
    const { data, error } = await supabase.functions.invoke(
      'lesson_get_videos',
      {
        body: {
          lesson_no: lessonNo,
          is_children: false,
          lang_code: 'de',
        },
      }
    );
    console.log('videos : ', data);
    if (error) {
      console.error('Fehler beim Abrufen der Videos:', error);
      return [];
    }

    return data || [];
  } catch (e) {
    console.error('Exception beim Abrufen der Videos:', e);
    return [];
  }
}

export default function LearnToReadPage() {
  // Lade den Lektionszustand des Benutzers
  const { data: lessonState, isLoading: isLessonStateLoading } =
    useLessonQuery();

  // State für die maximal freigeschaltete Lektion
  const [maxUnlockedLesson, setMaxUnlockedLesson] = useState(1);

  // Lade alle verfügbaren Videolektionen (mit lessonNo=0 bekommen wir alle)
  const { data: videos, isLoading } = useQuery({
    queryKey: ['lessonVideos'],
    queryFn: async () => {
      try {
        return await getLessonVideoData(0);
      } catch (error) {
        console.error('Fehler beim Laden der Videos:', error);
        return [];
      }
    },
  });

  // Aktualisiere die maximal freigeschaltete Lektion basierend auf dem Lektionszustand
  useEffect(() => {
    if (lessonState) {
      // Die freigeschaltete Lektion ist die aktuelle Lektion aus dem Lektionszustand
      setMaxUnlockedLesson(lessonState.lessonNo);
    }
  }, [lessonState]);

  // Sortierte und aufbereitete Videodaten, begrenzt auf die ersten 6 Lektionen
  const sortedLessons = videos
    ? videos
        .sort((a, b) => a.lesson_no - b.lesson_no)
        .filter((video) => video.lesson_no <= 6) // Begrenze auf die ersten 6 Lektionen
        .map((video) => ({
          id: video.lesson_no,
          title: video.title || getLessonCharacter(video.lesson_no),
          description: video.description || `Lektion ${video.lesson_no}`,
          unlocked: video.lesson_no <= maxUnlockedLesson,
          vimeoId: video.vimeo_id,
        }))
    : [];

  // Fallback für den Fall, dass keine Daten geladen wurden
  const lessons =
    sortedLessons.length > 0
      ? sortedLessons
      : Array.from({ length: 6 }, (_, i) => ({
          // Begrenze auf 6 Lektionen
          id: i + 1,
          title: getLessonCharacter(i + 1),
          description: `Lektion ${i + 1}`,
          unlocked: i < maxUnlockedLesson,
          vimeoId: '',
        }));

  // Der aktuelle Fortschritt wird durch die maximal freigeschaltete Lektion bestimmt
  const progress = Math.round((maxUnlockedLesson / 6) * 100); // Bezogen auf die 6 angezeigten Lektionen
  const progressWidth = `${progress}%`;

  const isLoadingData = isLoading || isLessonStateLoading;

  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link href='/lektionen' className='text-[#4AA4DE] hover:underline mr-2'>
          &larr; Zurück zu den Kursen
        </Link>
      </div>

      <h1 className='text-2xl font-bold mb-1'>Lesen lernen</h1>
      <p className='text-gray-500 mb-6'>
        Lerne Schritt für Schritt den Quran zu lesen.
      </p>

      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Kursfortschritt
      </div>
      <div className='border border-gray-200 rounded-b-lg p-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h3 className='font-medium'>Aktuelle Lektion</h3>
            <p>
              Lektion {maxUnlockedLesson}:{' '}
              {lessons.find((l) => l.id === maxUnlockedLesson)?.title ||
                'Einführung in arabische Buchstaben'}
            </p>
          </div>
          <Button asChild className='bg-[#4AA4DE] hover:bg-[#3993CD]'>
            <Link href={`/videos/${maxUnlockedLesson}`}>Fortfahren</Link>
          </Button>
        </div>

        <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
          <div
            className='bg-[#4AA4DE] h-2.5 rounded-full'
            style={{ width: progressWidth }}
          ></div>
        </div>

        <div className='text-sm text-gray-500'>
          {progress}% abgeschlossen ({maxUnlockedLesson}/6 Lektionen)
        </div>
      </div>

      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Verfügbare Lektionen
      </div>
      <div className='border border-gray-200 rounded-b-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
          {isLoadingData
            ? // Lade-Skeletons anzeigen
              Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className='border border-gray-200 rounded-lg overflow-hidden'
                >
                  <Skeleton className='aspect-video w-full' />
                  <div className='p-4'>
                    <Skeleton className='h-6 w-2/3 mb-3' />
                    <Skeleton className='h-10 w-full' />
                  </div>
                </div>
              ))
            : // Tatsächliche Videokarten anzeigen
              lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className='border border-gray-200 rounded-lg overflow-hidden'
                >
                  <div className='relative'>
                    <div
                      className={`aspect-video ${
                        lesson.unlocked ? '' : 'opacity-50'
                      }`}
                    >
                      <Image
                        src='/img/lesson-video.jpg'
                        alt={`Lektion ${lesson.id}`}
                        width={640}
                        height={360}
                        className='w-full'
                      />
                    </div>
                    {!lesson.unlocked && (
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='bg-gray-500 rounded-full p-2'>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              x='5'
                              y='10'
                              width='14'
                              height='10'
                              rx='2'
                              fill='white'
                            />
                            <path
                              d='M8 10V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V10'
                              stroke='white'
                              strokeWidth='2'
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='p-4'>
                    <div className='flex justify-between items-center'>
                      <h2 className='text-lg font-medium'>
                        Lektion {lesson.id}:{' '}
                        <span className='text-xl'>{lesson.title}</span>
                      </h2>
                    </div>
                    {lesson.unlocked ? (
                      <Button
                        asChild
                        className='w-full mt-3 bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
                      >
                        <Link href={`/videos/${lesson.id}`}>Video ansehen</Link>
                      </Button>
                    ) : (
                      <Button
                        className='w-full mt-3 bg-gray-200 text-gray-400 cursor-not-allowed'
                        disabled
                      >
                        Video ansehen
                      </Button>
                    )}
                  </div>
                </div>
              ))}
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
