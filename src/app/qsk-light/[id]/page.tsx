'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LockIcon, CheckIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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

  // Render Module und Sections
  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link href='/qsk-light' className='text-[#4AA4DE] hover:underline mr-2'>
          &larr; Zurück zur Modulübersicht
        </Link>
      </div>

      {isLoading ? (
        <div className='space-y-4'>
          <Skeleton className='h-12 w-1/2' />
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-64 w-full' />
        </div>
      ) : moduleInfo ? (
        <>
          <h1 className='text-2xl font-bold mb-1'>{moduleInfo.title}</h1>
          <p className='mb-6 text-gray-600'>{moduleInfo.description}</p>

          {/* Gesamtfortschritt für das Modul */}
          <div className='mb-6'>
            <div className='flex justify-between mb-1'>
              <span className='text-sm font-semibold'>Gesamtfortschritt</span>
              <span className='text-sm font-medium'>
                {moduleInfo.completion_percent}%
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <div
                className='bg-[#4AA4DE] h-2.5 rounded-full'
                style={{ width: `${moduleInfo.completion_percent}%` }}
              ></div>
            </div>
          </div>

          {!moduleInfo.unlocked && (
            <div className='mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md'>
              <p className='text-yellow-800 font-medium'>
                <LockIcon className='inline-block mr-2 h-5 w-5' />
                Dieses Modul ist aktuell gesperrt. Schließe das vorherige Modul
                ab, um es freizuschalten.
              </p>
            </div>
          )}

          {sections.map((section) => (
            <div key={section.id} className='mb-8'>
              <h2 className='text-xl font-semibold mb-4 flex items-center'>
                {section.title}
                {section.completed && (
                  <CheckIcon className='ml-2 h-5 w-5 text-green-500' />
                )}
              </h2>

              {/* Sektions-Fortschritt */}
              <div className='mb-4'>
                <div className='flex justify-between mb-1 opacity-0'>
                  <span className='text-sm font-medium'>Fortschritt</span>
                  <span className='text-sm font-medium'>
                    {section.completion_percent}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2 opacity-0'>
                  <div
                    className='bg-[#4AA4DE] h-2 rounded-full'
                    style={{ width: `${section.completion_percent}%` }}
                  ></div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {section.videos.map((video) => (
                  <div
                    key={video.id}
                    className={`border ${
                      video.unlocked
                        ? video.completed
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200'
                        : 'border-gray-200 bg-gray-50 opacity-75'
                    } rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md`}
                  >
                    <div className='relative'>
                      <div
                        className='aspect-video bg-center bg-cover'
                        style={{
                          backgroundImage: `url(${
                            video.thumbnail_url ||
                            '/img/thumbnail-placeholder.jpg'
                          })`,
                        }}
                      ></div>

                      {/* Status Badge */}
                      {video.completed ? (
                        <div className='absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full'>
                          Abgeschlossen
                        </div>
                      ) : video.unlocked ? (
                        <div className='absolute top-2 right-2 bg-[#4AA4DE] text-white text-xs px-2 py-1 rounded-full'>
                          Verfügbar
                        </div>
                      ) : (
                        <div className='absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full'>
                          Gesperrt
                        </div>
                      )}

                      {/* Play Button oder Lock Icon */}
                      <div className='absolute inset-0 flex items-center justify-center'>
                        {video.unlocked ? (
                          <div className='rounded-full bg-white/80 p-3 shadow-md hover:bg-white transition-colors'>
                            <PlayIcon className='h-8 w-8 text-[#4AA4DE]' />
                          </div>
                        ) : (
                          <div className='rounded-full bg-gray-200/80 p-3'>
                            <LockIcon className='h-8 w-8 text-gray-500' />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='p-4'>
                      <h3 className='font-medium mb-1 truncate'>
                        {video.title}
                      </h3>
                      <div className='flex justify-between text-sm text-gray-500'>
                        <span>{video.duration_minutes} min</span>

                        {video.progress &&
                          video.progress.progress_percent > 0 &&
                          video.progress.progress_percent < 100 && (
                            <span>
                              {video.progress.progress_percent}% gesehen
                            </span>
                          )}
                      </div>

                      {/* Progress Bar */}
                      {video.progress &&
                        video.progress.progress_percent > 0 && (
                          <div className='mt-2 w-full bg-gray-200 rounded-full h-1.5'>
                            <div
                              className='bg-[#4AA4DE] h-1.5 rounded-full'
                              style={{
                                width: `${video.progress.progress_percent}%`,
                              }}
                            ></div>
                          </div>
                        )}

                      <div className='mt-4'>
                        {video.unlocked ? (
                          <Button
                            onClick={() =>
                              router.push(
                                `/qsk-light/${moduleId}/lesson/${video.id}`
                              )
                            }
                            className='w-full'
                            variant={video.completed ? 'outline' : 'default'}
                          >
                            {video.completed ? 'Wiederholen' : 'Ansehen'}
                          </Button>
                        ) : (
                          <Button className='w-full' variant='outline' disabled>
                            <LockIcon className='mr-2 h-4 w-4' />
                            Gesperrt
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {moduleInfo.completed && (
            <div className='mt-8 p-4 bg-green-50 border border-green-200 rounded-md text-center'>
              <CheckIcon className='mx-auto h-12 w-12 text-green-500 mb-2' />
              <h3 className='text-xl font-bold text-green-700 mb-2'>
                Glückwunsch!
              </h3>
              <p className='text-green-700'>
                Du hast dieses Modul vollständig abgeschlossen.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className='p-6 bg-red-50 border border-red-200 rounded-md'>
          <h2 className='text-xl font-bold text-red-700'>
            Modul nicht gefunden
          </h2>
          <p className='mt-2'>
            Das gesuchte Modul konnte nicht geladen werden. Bitte versuche es
            später erneut.
          </p>
          <Button onClick={() => router.push('/qsk-light')} className='mt-4'>
            Zurück zur Modulübersicht
          </Button>
        </div>
      )}
    </div>
  );
}
