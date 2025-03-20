'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, FileText, CheckCircle, Video } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  getModuleById,
  getSectionsForModule,
  getSectionLessons,
} from '@/store/qsk-light-data';

export default function QSKModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = parseInt(params.id as string, 10);
  const [isLoading, setIsLoading] = useState(true);

  // Lade das Modul
  const moduleInfo = useMemo(() => {
    return getModuleById(moduleId);
  }, [moduleId]);

  // Lade die Abschnitte des Moduls
  const sections = useMemo(() => {
    return getSectionsForModule(moduleId);
  }, [moduleId]);

  // Simuliere das Laden
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [moduleId]);

  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link href='/qsk-light' className='text-[#4AA4DE] hover:underline mr-2'>
          &larr; Zurück zum QSK-Light Kurs
        </Link>
      </div>

      {isLoading ? (
        // Lade-Skeletons
        <>
          <Skeleton className='h-12 w-1/2 mb-3' />
          <Skeleton className='h-6 w-3/4 mb-10' />
          <div className='space-y-8'>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className='h-10 w-1/3 mb-4' />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className='aspect-video w-full' />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        moduleInfo && (
          <>
            <div className='mb-8'>
              <h1 className='text-2xl font-bold mb-1'>
                Modul {moduleInfo.id}: {moduleInfo.title}
              </h1>
              <p className='text-gray-500 mb-4'>{moduleInfo.description}</p>
              <div className='flex items-center text-sm text-gray-500'>
                <span className='mr-4'>{moduleInfo.lessons} Lektionen</span>
                <span>{moduleInfo.duration} Minuten</span>
              </div>
            </div>

            {sections?.map((section) => {
              // Hole die vollständigen Lektionsdaten für diese Sektion
              const sectionLessons = getSectionLessons(section).filter(
                (lesson): lesson is NonNullable<typeof lesson> =>
                  lesson !== undefined
              );

              return (
                <div key={section.id} className='mb-8'>
                  <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
                    <div className='flex items-center'>
                      <span className='mr-2'>{section.title}</span>
                      <Clock className='h-4 w-4 inline mr-1' />
                      <span className='text-sm'>{section.duration} Min.</span>
                    </div>
                  </div>
                  <div className='border border-gray-200 rounded-b-lg'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                      {sectionLessons.map((lesson) => {
                        return (
                          <div
                            key={lesson.id}
                            className='border border-gray-200 rounded-lg overflow-hidden'
                          >
                            <div className='relative'>
                              <div className='aspect-video'>
                                <Image
                                  src={
                                    lesson.thumbnail ||
                                    (lesson.type === 'video'
                                      ? '/img/lesson-video.jpg'
                                      : '/img/lesson-exercise.jpg')
                                  }
                                  alt={lesson.title}
                                  width={640}
                                  height={360}
                                  className='w-full'
                                />
                                {lesson.status === 'completed' && (
                                  <div className='absolute top-2 right-2'>
                                    <CheckCircle className='h-6 w-6 text-green-500 bg-white rounded-full' />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className='p-4'>
                              <div className='flex items-center mb-1'>
                                {lesson.type === 'video' ? (
                                  <Video className='h-4 w-4 text-[#4AA4DE] mr-2' />
                                ) : (
                                  <FileText className='h-4 w-4 text-[#4AA4DE] mr-2' />
                                )}
                                <h3 className='font-medium'>{lesson.title}</h3>
                              </div>
                              <div className='flex items-center text-sm text-gray-500 mb-3'>
                                <Clock className='h-3 w-3 inline mr-1' />
                                <span>{lesson.duration} Min.</span>
                              </div>
                              <Button
                                onClick={() =>
                                  router.push(
                                    `/qsk-light/${moduleId}/lesson/${lesson.id}`
                                  )
                                }
                                className='w-full bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
                              >
                                {lesson.status === 'completed'
                                  ? 'Video ansehen'
                                  : 'Starten'}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )
      )}
    </div>
  );
}
