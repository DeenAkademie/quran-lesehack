'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { EmbedVideoPlayer } from '@/components/embed-video-player';
import { useToast } from '@/components/ui/use-toast';
import {
  getModuleById,
  getLessonById,
  getLessonProgress,
  updateLessonProgress,
} from '@/store/qsk-light-data';

export default function QSKLessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = parseInt(params.id as string, 10);
  const lessonId = parseInt(params.lessonId as string, 10);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Lade Lektionsdaten
  const lesson = useMemo(() => {
    return getLessonById(lessonId);
  }, [lessonId]);

  // Lade Moduldaten
  const moduleInfo = useMemo(() => {
    return getModuleById(moduleId);
  }, [moduleId]);

  // Fortschritt für diese Lektion
  const progress = useMemo(() => {
    return getLessonProgress(lessonId);
  }, [lessonId]);

  // Aktuelle Fortschrittsanzeige aktualisieren
  useEffect(() => {
    if (progress) {
      setCurrentProgress(progress.progress);
    }
  }, [progress]);

  // Simuliere das Laden
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [lessonId, moduleId]);

  // Funktion zum Aktualisieren des Fortschritts
  const handleProgressUpdate = (newProgress: number) => {
    if (newProgress > currentProgress) {
      setCurrentProgress(newProgress);

      // Aktualisiere den Fortschritt im Store
      updateLessonProgress(lessonId, newProgress);
    }
  };

  // Funktion bei Abschluss des Videos
  const handleLessonComplete = () => {
    setCurrentProgress(100);

    // Aktualisiere den Fortschritt im Store
    updateLessonProgress(lessonId, 100);

    toast({
      title: 'Lektion abgeschlossen!',
      description: 'Du kannst jetzt zur nächsten Lektion übergehen.',
    });
  };

  // Funktion zum Navigieren zur nächsten Lektion oder zurück zum Modul
  const goToNextLesson = () => {
    // Für die Implementierung ohne echtes Backend,
    // navigiere einfach zur Modulseite zurück, wenn die aktuelle Lektion abgeschlossen ist
    router.push(`/qsk-light/${moduleId}`);
  };

  // Funktion zum Navigieren zur Übung, falls vorhanden
  const goToExercise = () => {
    if (lesson?.exerciseId) {
      router.push(`/quizzes/${lesson.exerciseId}`);
    }
  };

  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link
          href={`/qsk-light/${moduleId}`}
          className='text-[#4AA4DE] hover:underline mr-2'
        >
          &larr; Zurück zu Modul {moduleId}
        </Link>
      </div>

      {isLoading ? (
        // Lade-Skeletons
        <>
          <Skeleton className='h-12 w-1/2 mb-3' />
          <Skeleton className='h-6 w-3/4 mb-6' />
          <Skeleton className='aspect-video w-full mb-6' />
          <div className='flex justify-center'>
            <Skeleton className='h-10 w-32' />
          </div>
        </>
      ) : (
        lesson &&
        moduleInfo && (
          <>
            <h1 className='text-2xl font-bold mb-1'>{lesson.title}</h1>
            <p className='text-gray-500 mb-6'>
              Modul {moduleId}: {moduleInfo.title}
            </p>

            {/* Fortschrittsanzeige */}
            <div className='w-full bg-gray-200 rounded-full h-2.5 mb-6'>
              <div
                className='bg-[#4AA4DE] h-2.5 rounded-full transition-all duration-300'
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>

            {/* Video Player mit Embed Code */}
            {lesson.type === 'video' && lesson.embedCode ? (
              <div className='mb-6'>
                <EmbedVideoPlayer
                  embedCode={lesson.embedCode}
                  title={lesson.title}
                  onProgress={handleProgressUpdate}
                  onComplete={handleLessonComplete}
                  className='w-full rounded-lg overflow-hidden'
                />
              </div>
            ) : (
              <div className='bg-black mb-6 rounded-lg overflow-hidden aspect-video flex items-center justify-center'>
                <p className='text-white'>Inhalt nicht verfügbar</p>
              </div>
            )}

            {/* Navigation und Aktionsbuttons */}
            <div className='flex justify-center space-x-4'>
              {lesson.exerciseId && (
                <Button
                  onClick={goToExercise}
                  className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-6'
                >
                  <Check className='mr-2 h-4 w-4' />
                  Zu den Übungen
                </Button>
              )}

              <Button
                onClick={() => router.push(`/qsk-light/${moduleId}`)}
                variant='outline'
                className='px-6'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Zurück zum Modul
              </Button>

              <Button
                onClick={goToNextLesson}
                className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-6'
                disabled={currentProgress < 90}
              >
                Nächste Lektion
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>

            {currentProgress < 90 && (
              <p className='text-center text-sm text-gray-500 mt-4'>
                Schaue mindestens 90% des Videos, um zur nächsten Lektion zu
                gelangen.
              </p>
            )}
          </>
        )
      )}
    </div>
  );
}
