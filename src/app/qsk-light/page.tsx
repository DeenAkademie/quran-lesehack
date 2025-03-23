'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { getAllVideos, VideoModule } from '@/services/video-service';

export default function QSKLightPage() {
  // State für Module und Ladezustand
  const [modules, setModules] = useState<VideoModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lade die Module aus dem API
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const modulesData = await getAllVideos();
        // Stelle sicher, dass wir ein Array haben
        if (Array.isArray(modulesData)) {
          setModules(modulesData);
        } else {
          console.error('Unexpected data format:', modulesData);
          setModules([]);
        }
      } catch (error) {
        console.error('Error loading modules:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Bestimme das aktuelle Modul basierend auf verfügbaren/abgeschlossenen Videos
  const currentModule =
    Array.isArray(modules) && modules.length > 0
      ? modules.reduce((current, module) => {
          const hasAvailableVideos =
            module.sections &&
            Array.isArray(module.sections) &&
            module.sections.some(
              (section) =>
                section.videos &&
                Array.isArray(section.videos) &&
                section.videos.some(
                  (video) =>
                    video.progress?.status === 'available' ||
                    video.progress?.status === 'completed'
                )
            );

          return hasAvailableVideos ? Math.max(current, module.id) : current;
        }, 1)
      : 1;

  // Berechne den Fortschritt
  // const totalModules = Array.isArray(modules) ? modules.length : 0 || 3;
  // const progress = Math.round((currentModule / totalModules) * 100);
  // const progressWidth = `${progress}%`;

  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link href='/' className='text-[#4AA4DE] hover:underline mr-2'>
          &larr; Zurück zum Dashboard
        </Link>
      </div>

      <h1 className='text-2xl font-bold mb-1'>QSK-Light Kurs</h1>
      <p className='text-gray-500 mb-6'>
        Dein persönlicher Lernpfad zum erfolgreichen Quran Lesen
      </p>

      {/* <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Kursfortschritt
      </div>
      <div className='border border-gray-200 rounded-b-lg p-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h3 className='font-medium'>Aktuelles Modul</h3>
            <p>
              Modul {currentModule}:{' '}
              {(Array.isArray(modules) &&
                modules.find((m) => m.id === currentModule)?.title) ||
                'Einführung'}
            </p>
          </div>
          <Button asChild className='bg-[#4AA4DE] hover:bg-[#3993CD]'>
            <Link href={`/qsk-light/${currentModule}`}>Fortfahren</Link>
          </Button>
        </div>

        <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
          <div
            className='bg-[#4AA4DE] h-2.5 rounded-full'
            style={{ width: progressWidth }}
          ></div>
        </div>

        <div className='text-sm text-gray-500'>
          {progress}% des Kurses abgeschlossen
        </div>
      </div> */}

      <div>
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Deine Module
        </div>
        <div className='border border-gray-200 rounded-b-lg p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {isLoading
              ? // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='border border-gray-200 rounded-lg'
                  >
                    <Skeleton className='h-[180px] w-full rounded-t-lg' />
                    <div className='p-4'>
                      <Skeleton className='h-6 w-3/4 mb-2' />
                      <Skeleton className='h-4 w-1/2 mb-4' />
                      <Skeleton className='h-10 w-full' />
                    </div>
                  </div>
                ))
              : // Alle Module anzeigen, aber gesperrte entsprechend kennzeichnen
                modules.map((module) => {
                  const isUnlocked = module.id <= currentModule;

                  return (
                    <div
                      key={module.id}
                      className='border border-gray-200 rounded-lg overflow-hidden'
                    >
                      <div className='relative'>
                        <div className='aspect-video'>
                          <Image
                            src={
                              module.image_url || `/img/modul-${module.id}.png`
                            }
                            alt={module.title}
                            width={640}
                            height={360}
                            priority={module.id === 1}
                            className={`w-full ${
                              isUnlocked ? '' : 'opacity-50'
                            }`}
                          />
                        </div>
                        {!isUnlocked && (
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
                            Modul {module.id}:{' '}
                            <span className='text-xl'>{module.title}</span>
                          </h2>
                        </div>
                        {isUnlocked ? (
                          <Button
                            asChild
                            className='w-full mt-3 bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
                          >
                            <Link href={`/qsk-light/${module.id}`}>
                              Modul ansehen
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            className='w-full mt-3 bg-gray-200 text-gray-400 cursor-not-allowed'
                            disabled
                          >
                            Modul gesperrt
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
