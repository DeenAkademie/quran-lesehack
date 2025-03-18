'use client';

import Image from 'next/image';
import { Play, Volume2, Maximize2, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserCurrentLesson } from '@/api/api';
import { Skeleton } from '@/components/ui/skeleton';

interface CurrentLessonData {
  lesson_number: number;
  lesson_title: string;
  video_url: string;
  video_thumbnail: string;
  video_duration: string;
}

export function CurrentLesson() {
  const [lessonData, setLessonData] = useState<CurrentLessonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentTime = '0:00';

  useEffect(() => {
    async function fetchCurrentLesson() {
      try {
        setIsLoading(true);
        const response = await getUserCurrentLesson();
        setLessonData(response.data);
      } catch (err) {
        console.error('Fehler beim Laden der aktuellen Lektion:', err);
        // Fallback zu Dummy-Daten im Fehlerfall
        setLessonData({
          lesson_number: 1,
          lesson_title: 'Einführung',
          video_url: '/videos/lesson1.mp4',
          video_thumbnail: '/img/lesson-video.jpg',
          video_duration: '9:42',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrentLesson();
  }, []);

  if (isLoading) {
    return (
      <div className='mb-6'>
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Deine aktuelle Lektion wird geladen...
        </div>
        <div className='bg-black rounded-b-lg overflow-hidden'>
          <div className='relative'>
            <Skeleton className='w-full h-[360px]' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mb-6'>
      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Deine aktuelle Lektion - Lektion {lessonData?.lesson_number || 1}
      </div>
      <div className='bg-black rounded-b-lg overflow-hidden'>
        <div className='relative'>
          <Image
            src={lessonData?.video_thumbnail || '/img/lesson-video.jpg'}
            alt='Lektionsvideo'
            width={640}
            height={360}
            className='w-full'
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <button className='bg-white/20 rounded-full p-3'>
              <Play className='h-6 w-6 text-white' fill='white' />
            </button>
          </div>
          <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 flex justify-between items-center'>
            <div className='flex items-center'>
              <span>
                {currentTime} / {lessonData?.video_duration || '9:42'}
              </span>
            </div>
            <div className='flex items-center gap-4'>
              <Volume2 className='h-5 w-5' />
              <Maximize2 className='h-5 w-5' />
              <MoreVertical className='h-5 w-5' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
