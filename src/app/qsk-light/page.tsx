'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { moduleData } from '@/store/qsk-light-data';

export default function QSKLightPage() {
  // Aktuelles Modul (simuliert den Fortschritt)
  const [currentModule] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [modules, setModules] = useState<typeof moduleData>([]);

  // Simuliere das Laden
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setModules(moduleData);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Berechne den Fortschritt
  const totalModules = modules?.length || 3;
  const progress = Math.round((currentModule / totalModules) * 100);
  const progressWidth = `${progress}%`;

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

      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Kursfortschritt
      </div>
      <div className='border border-gray-200 rounded-b-lg p-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h3 className='font-medium'>Aktuelles Modul</h3>
            <p>
              Modul {currentModule}:{' '}
              {modules?.find((m) => m.id === currentModule)?.title ||
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
          {progress}% abgeschlossen ({currentModule}/{totalModules} Module)
        </div>
      </div>

      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Verfügbare Module
      </div>
      <div className='border border-gray-200 rounded-b-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
          {isLoading
            ? // Lade-Skeleton für Module
              Array.from({ length: 3 }, (_, i) => (
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
            : // Zeige die Module an
              modules?.map((module) => (
                <div
                  key={module.id}
                  className='border border-gray-200 rounded-lg overflow-hidden'
                >
                  <div className='relative'>
                    <div className='aspect-video'>
                      <Image
                        src={`/img/modul-${module.id}.png`}
                        alt={module.title}
                        width={640}
                        height={360}
                        priority={module.id === 1}
                        className='w-full'
                      />
                    </div>
                  </div>
                  <div className='p-4'>
                    <div className='flex justify-between items-center'>
                      <h2 className='text-lg font-medium'>
                        Modul {module.id}:{' '}
                        <span className='text-xl'>{module.title}</span>
                      </h2>
                    </div>
                    {module.id <= currentModule ? (
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
                        asChild
                        className='w-full mt-3 bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
                      >
                        <Link href={`/qsk-light/${module.id}`}>
                          Modul ansehen
                        </Link>
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
