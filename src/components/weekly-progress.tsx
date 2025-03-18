'use client';

import { useEffect, useState } from 'react';
import { getUserWeeklyProgress } from '@/api/api';
import { Skeleton } from '@/components/ui/skeleton';

interface WeeklyProgress {
  completed_exercises: number;
  earned_hasanat: number;
  progress_percentage: number;
}

export function WeeklyProgress() {
  const [progress, setProgress] = useState<WeeklyProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWeeklyProgress() {
      try {
        setIsLoading(true);
        const response = await getUserWeeklyProgress();
        setProgress(response.data);
      } catch (err) {
        console.error('Fehler beim Laden der wöchentlichen Fortschritte:', err);
        // Fallback zu Dummy-Daten im Fehlerfall für bessere Benutzererfahrung
        setProgress({
          completed_exercises: 0,
          earned_hasanat: 0,
          progress_percentage: 0.4,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeeklyProgress();
  }, []);

  if (isLoading) {
    return (
      <div className='border border-gray-200 rounded-lg'>
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Deine Erfolge der letzten Woche
        </div>
        <div className='grid grid-cols-3 p-4 gap-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='text-center'>
              <Skeleton className='h-4 w-24 mx-auto mb-2' />
              <div className='flex items-center justify-center'>
                <Skeleton className='h-8 w-16 rounded-md' />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='border border-gray-200 rounded-lg'>
      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Deine Erfolge der letzten Woche
      </div>
      <div className='grid grid-cols-3 p-4'>
        <div className='text-center'>
          <div className='text-gray-500 mb-2'>Gelöste Übungen</div>
          <div className='flex items-center justify-center'>
            <div className='bg-blue-100 p-2 rounded-md'>
              <span className='text-blue-600 font-bold'>
                {progress?.completed_exercises || 0}
              </span>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <div className='text-gray-500 mb-2'>Erreichte Hasanat</div>
          <div className='flex items-center justify-center'>
            <div className='bg-blue-100 p-2 rounded-md'>
              <span className='text-blue-600 font-bold'>
                {progress?.earned_hasanat || 0}
              </span>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <div className='text-gray-500 mb-2'>Erreichter Fortschritt</div>
          <div className='flex items-center justify-center'>
            <div className='bg-blue-100 p-2 rounded-md'>
              <span className='text-blue-600 font-bold'>
                {progress?.progress_percentage?.toFixed(1) || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
