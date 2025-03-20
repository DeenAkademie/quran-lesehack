'use client';

import { useEffect, useState, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import {
  lessonData,
  moduleData,
  lessonProgress,
  updateLessonProgress,
} from '@/store/qsk-light-data';
import { EmbedVideoPlayer } from '@/components/embed-video-player';
import { useToast } from '@/components/ui/use-toast';

export function CurrentLesson() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { toast } = useToast();

  // Bestimme die aktuelle Lektion (die letzte freigeschaltete)
  const currentLesson = useMemo(() => {
    // Filtere alle Lektionen, die nicht gesperrt sind
    const unlockedLessons = lessonData.filter(
      (lesson) => lesson.status !== 'locked'
    );

    // Falls keine Lektionen freigeschaltet sind, gib die erste Lektion zurück
    if (unlockedLessons.length === 0) {
      return lessonData[0];
    }

    // Sortiere nach der ID (höchste zuerst), um die zuletzt freigeschaltete Lektion zu erhalten
    return unlockedLessons.sort((a, b) => b.id - a.id)[0];
  }, []);

  // Bestimme das zugehörige Modul
  const lessonModule = useMemo(() => {
    if (!currentLesson) return null;
    return moduleData.find((module) => module.id === currentLesson.moduleId);
  }, [currentLesson]);

  // Simuliere das Laden
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Fortschritt aktualisieren, wenn Lektion geladen wird
  useEffect(() => {
    if (currentLesson) {
      const progress =
        lessonProgress[currentLesson.id as keyof typeof lessonProgress]
          ?.progress || 0;
      setCurrentProgress(progress);
    }
  }, [currentLesson]);

  // Funktion zum Aktualisieren des Fortschritts
  const handleProgressUpdate = (newProgress: number) => {
    if (newProgress > currentProgress) {
      setCurrentProgress(newProgress);

      // Aktualisiere den Fortschritt im Store
      if (currentLesson) {
        updateLessonProgress(currentLesson.id, newProgress);
      }
    }
  };

  // Funktion bei Abschluss des Videos
  const handleLessonComplete = () => {
    setCurrentProgress(100);

    // Aktualisiere den Fortschritt im Store
    if (currentLesson) {
      updateLessonProgress(currentLesson.id, 100);
    }

    toast({
      title: 'Lektion abgeschlossen!',
      description: 'Du kannst jetzt zur nächsten Lektion übergehen.',
    });
  };

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

  if (!currentLesson || !lessonModule) {
    return (
      <div className='mb-6'>
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Keine aktuelle Lektion verfügbar
        </div>
        <div className='bg-gray-100 rounded-b-lg p-4 text-center'>
          <p>Es wurden noch keine Lektionen freigeschaltet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mb-6'>
      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg flex justify-between items-center'>
        <div>Deine aktuelle Lektion - Modul {currentLesson.moduleId}</div>
        <Link
          href={`/qsk-light/${currentLesson.moduleId}/lesson/${currentLesson.id}`}
          className='text-white text-sm hover:underline'
        >
          Lektion fortsetzen &rarr;
        </Link>
      </div>
      <div className='bg-black rounded-b-lg overflow-hidden'>
        <div className='relative'>
          {currentLesson.embedCode ? (
            <EmbedVideoPlayer
              embedCode={currentLesson.embedCode}
              title={currentLesson.title}
              onProgress={handleProgressUpdate}
              onComplete={handleLessonComplete}
              className='w-full rounded-lg overflow-hidden'
            />
          ) : (
            <div className='flex items-center justify-center bg-gray-100 w-full h-[360px] text-gray-500'>
              Kein Video verfügbar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
