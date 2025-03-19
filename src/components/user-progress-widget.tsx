'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useProgressQuery } from '@/api/queries/use-progress-query';
import { Skeleton } from '@/components/ui/skeleton';

export function UserProgressWidget() {
  const { data: progress, isLoading } = useProgressQuery();

  // Lade-Zustand anzeigen
  if (isLoading || !progress) {
    return <ProgressWidgetSkeleton />;
  }

  // Berechne den Fortschritt in Prozent
  const progressPercent =
    (progress.exercisePassedCount / progress.totalExercises) * 100;

  return (
    <Card className='w-full shadow-md border-0'>
      <CardHeader className='pb-2 border-b'>
        <CardTitle className='text-xl font-semibold'>
          Deine letzte Übung
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='grid grid-cols-3 gap-6 mb-6'>
          <div className='bg-slate-50 rounded-xl p-4 text-center shadow-sm'>
            <p className='text-3xl font-bold text-primary'>
              {progress.lessonNo}
            </p>
            <p className='text-sm text-slate-600 mt-1'>Aktuelle Lektion</p>
          </div>
          <div className='bg-slate-50 rounded-xl p-4 text-center shadow-sm'>
            <p className='text-3xl font-bold text-primary'>
              {progress.exerciseNo}
            </p>
            <p className='text-sm text-slate-600 mt-1'>Aktuelle Übung</p>
          </div>
          <div className='bg-slate-50 rounded-xl p-4 text-center shadow-sm'>
            <p className='text-3xl font-bold text-primary'>
              {progress.exercisePassedCount}
            </p>
            <p className='text-sm text-slate-600 mt-1'>Abgeschlossen</p>
          </div>
        </div>

        <div className='space-y-2 mb-6'>
          <div className='flex justify-between text-sm'>
            <span className='font-medium'>Gesamtfortschritt</span>
            <span className='font-medium text-primary'>
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress
            value={progressPercent}
            className='h-3 rounded-full bg-slate-100'
          />
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='bg-amber-100 p-1.5 rounded-full'>
              <Image
                src='/img/coin.png'
                alt='Hasanat'
                width={24}
                height={24}
                className='h-6 w-6'
              />
            </div>
            <span className='font-medium text-slate-800'>
              {progress.hasanatCounter} Hasanat
            </span>
          </div>
          <Button
            className='bg-primary hover:bg-primary/90 text-white px-6 rounded-full'
            asChild
          >
            <Link href='/lektionen'>Weiter lernen</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton-Komponente für den Ladezustand
function ProgressWidgetSkeleton() {
  return (
    <Card className='w-full shadow-md border-0'>
      <CardHeader className='pb-2 border-b'>
        <Skeleton className='h-6 w-48' />
      </CardHeader>
      <CardContent className='p-6'>
        <div className='grid grid-cols-3 gap-6 mb-6'>
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className='bg-slate-50 rounded-xl p-4 text-center shadow-sm'
            >
              <Skeleton className='h-8 w-16 mx-auto mb-2' />
              <Skeleton className='h-4 w-24 mx-auto' />
            </div>
          ))}
        </div>
        <div className='space-y-2 mb-6'>
          <div className='flex justify-between'>
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-4 w-12' />
          </div>
          <Skeleton className='h-3 w-full' />
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-9 w-9 rounded-full' />
            <Skeleton className='h-5 w-32' />
          </div>
          <Skeleton className='h-9 w-32 rounded-full' />
        </div>
      </CardContent>
    </Card>
  );
}
