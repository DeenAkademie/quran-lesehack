'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, FileText, CheckCircle, Video, LockIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  getAllVideos,
  VideoModule,
  VideoSection,
} from '@/services/video-service';

export default function QSKModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = parseInt(params.id as string, 10);
  const [isLoading, setIsLoading] = useState(true);
  const [moduleInfo, setModuleInfo] = useState<VideoModule | null>(null);
  const [sections, setSections] = useState<VideoSection[]>([]);

  // Lade die Daten vom API
  useEffect(() => {
    const fetchModuleData = async () => {
      setIsLoading(true);
      try {
        const allModules = await getAllVideos();
        if (!Array.isArray(allModules)) {
          console.error('Unexpected modules format:', allModules);
          setIsLoading(false);
          return;
        }

        const currentModule = allModules.find((m) => m.id === moduleId);

        if (currentModule) {
          setModuleInfo(currentModule);
          if (currentModule.sections && Array.isArray(currentModule.sections)) {
            setSections(currentModule.sections);
          } else {
            console.error(
              'Unexpected sections format:',
              currentModule.sections
            );
            setSections([]);
          }
        }
      } catch (error) {
        console.error('Error loading module data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModuleData();
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
                <span className='mr-4'>
                  {moduleInfo.lessons_count} Lektionen
                </span>
                <span>{moduleInfo.duration_minutes} Minuten</span>
              </div>
            </div>

            {Array.isArray(sections) &&
              sections
                .sort((a, b) => a.display_order - b.display_order)
                .map((section) => {
                  return (
                    <div key={section.id} className='mb-8'>
                      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
                        <div className='flex items-center'>
                          <span className='mr-2'>{section.title}</span>
                          <Clock className='h-4 w-4 inline mr-1' />
                          <span className='text-sm'>
                            {section.duration_minutes} Min.
                          </span>
                        </div>
                      </div>
                      <div className='border border-gray-200 rounded-b-lg'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                          {section.videos &&
                            Array.isArray(section.videos) &&
                            section.videos
                              .sort((a, b) => a.display_order - b.display_order)
                              .map((video, videoIndex) => {
                                console.log(
                                  `Video ${video.id} Status:`,
                                  video.progress?.status
                                );

                                // Setze isAvailable auf true für das erste Video jeder Sektion
                                let isAvailable =
                                  video.progress?.status === 'available' ||
                                  video.progress?.status === 'completed';

                                // Erzwinge isAvailable=true für das erste Video in jeder Sektion
                                if (videoIndex === 0) {
                                  isAvailable = true;
                                }

                                const isCompleted =
                                  video.progress?.status === 'completed';

                                return (
                                  <div
                                    key={video.id}
                                    className={`border border-gray-200 rounded-lg overflow-hidden ${
                                      !isAvailable ? 'opacity-70' : ''
                                    }`}
                                  >
                                    <div className='relative'>
                                      <div className='aspect-video'>
                                        <Image
                                          src={
                                            video.thumbnail_url ||
                                            (video.type === 'video'
                                              ? '/img/lesson-video.jpg'
                                              : '/img/lesson-exercise.jpg')
                                          }
                                          alt={video.title}
                                          width={640}
                                          height={360}
                                          className='w-full'
                                        />
                                        {isCompleted && (
                                          <div className='absolute top-2 right-2'>
                                            <CheckCircle className='h-6 w-6 text-green-500 bg-white rounded-full' />
                                          </div>
                                        )}
                                        {!isAvailable && (
                                          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                            <LockIcon className='h-12 w-12 text-white' />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className='p-4'>
                                      <div className='flex items-center mb-1'>
                                        {video.type === 'video' ? (
                                          <Video className='h-4 w-4 text-[#4AA4DE] mr-2' />
                                        ) : (
                                          <FileText className='h-4 w-4 text-[#4AA4DE] mr-2' />
                                        )}
                                        <h3 className='font-medium'>
                                          {video.title}
                                        </h3>
                                      </div>
                                      <div className='flex items-center text-sm text-gray-500 mb-3'>
                                        <Clock className='h-3 w-3 inline mr-1' />
                                        <span>
                                          {video.duration_minutes} Min.
                                        </span>
                                      </div>
                                      <Button
                                        onClick={() => {
                                          if (isAvailable) {
                                            router.push(
                                              `/qsk-light/${moduleId}/lesson/${video.id}`
                                            );
                                          }
                                        }}
                                        disabled={!isAvailable}
                                        className='w-full bg-[#4AA4DE] hover:bg-[#3993CD] text-white disabled:bg-gray-300'
                                      >
                                        {isCompleted
                                          ? 'Video ansehen'
                                          : isAvailable
                                          ? 'Starten'
                                          : 'Gesperrt'}
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
