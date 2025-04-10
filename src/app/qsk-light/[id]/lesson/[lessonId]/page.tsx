'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { VideoPlayer } from '@/components/video-player';
import { getVideo, updateVideoProgress, Video } from '@/services/video-service';

export default function QSKLessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = parseInt(params.id as string, 10);
  const videoId = parseInt(params.lessonId as string, 10);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState<Video | null>(null);
  const [nextVideo, setNextVideo] = useState<Video | null>(null);
  const [prevVideo, setPrevVideo] = useState<Video | null>(null);
  const [moduleInfo, setModuleInfo] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [sectionInfo, setSectionInfo] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [nextVideoUnlocked, setNextVideoUnlocked] = useState(false);

  // Video-Daten laden
  useEffect(() => {
    const fetchVideoData = async () => {
      setIsLoading(true);
      try {
        const result = await getVideo(videoId);

        if (result.video) {
          setVideo(result.video);
          setNextVideo(result.nextVideo);
          setPrevVideo(result.prevVideo);
          setModuleInfo(
            result.module
              ? { id: result.module.id, title: result.module.title }
              : null
          );
          setSectionInfo(
            result.section
              ? { id: result.section.id, title: result.section.title }
              : null
          );

          // Prüfen, ob das nächste Video bereits freigeschaltet ist
          if (
            result.video.progress &&
            result.video.progress.status === 'completed'
          ) {
            setNextVideoUnlocked(true);
          }
        } else {
          console.error('No video data found in API response');
        }
      } catch (error) {
        console.error('Error loading video data:', error);
        toast({
          title: 'Fehler beim Laden',
          description: 'Das Video konnte nicht geladen werden.',
          variant: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId) {
      fetchVideoData();
    }
  }, [videoId, toast]);

  // Funktion, die aufgerufen wird, wenn das Video zu Ende angesehen wurde
  const handleVideoComplete = async () => {
    if (!video) return;

    try {
      console.log('Video wurde vollständig angesehen!');

      // Video als abgeschlossen markieren und nächstes Video freischalten
      await updateVideoProgress(video.id, 100, 0, 'completed');

      // UI aktualisieren
      setNextVideoUnlocked(true);

      toast({
        title: 'Video abgeschlossen!',
        description: nextVideo
          ? 'Du kannst jetzt zur nächsten Lektion übergehen.'
          : 'Super! Modul erfolgreich abgeschlossen.',
      });
    } catch (error) {
      console.error('Fehler beim Abschließen des Videos:', error);
    }
  };

  // Funktion zum Navigieren zur nächsten Lektion
  const goToNextLesson = () => {
    if (nextVideo) {
      router.push(`/qsk-light/${moduleId}/lesson/${nextVideo.id}`);
    } else {
      // Zurück zur Modulübersicht, wenn kein nächstes Video vorhanden
      router.push(`/qsk-light/${moduleId}`);
    }
  };

  // Funktion zum Navigieren zur Übung, falls vorhanden
  const goToExercise = () => {
    if (video?.exercise_id) {
      router.push(`/quizzes/${video.exercise_id}`);
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
      ) : video && moduleInfo ? (
        <>
          <h1 className='text-2xl font-bold mb-1'>{video.title}</h1>
          <p className='text-gray-500 mb-6'>
            Modul {moduleInfo.id}: {moduleInfo.title}
            {sectionInfo && ` • ${sectionInfo.title}`}
          </p>

          {/* Video Player */}
          <div className='mb-6'>
            {video.vimeo_id ? (
              <VideoPlayer
                videoId={video.vimeo_id}
                onComplete={handleVideoComplete}
                startTime={video.progress?.last_position_seconds || 0}
                className='w-full rounded-lg overflow-hidden'
              />
            ) : (
              <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded'>
                Kein Vimeo-ID gefunden für dieses Video.
              </div>
            )}
          </div>

          {/* Navigation und Aktionsbuttons */}
          <div className='flex justify-center space-x-4 flex-wrap gap-y-2'>
            {prevVideo && (
              <Button
                onClick={() =>
                  router.push(`/qsk-light/${moduleId}/lesson/${prevVideo.id}`)
                }
                variant='outline'
                className='px-6'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Vorheriges Video
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

            {video.has_exercise && (
              <Button
                onClick={goToExercise}
                className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-6'
              >
                <Check className='mr-2 h-4 w-4' />
                Zu den Übungen
              </Button>
            )}

            {nextVideo && (
              <Button
                onClick={goToNextLesson}
                className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-6'
                disabled={!nextVideoUnlocked}
              >
                Nächstes Video
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>

          {!nextVideoUnlocked && nextVideo && (
            <p className='text-center text-sm text-gray-500 mt-4'>
              Schaue das Video zu Ende, um zur nächsten Lektion zu gelangen.
            </p>
          )}
        </>
      ) : (
        <div className='p-6 bg-red-50 border border-red-200 rounded-md'>
          <h2 className='text-xl font-bold text-red-700'>
            Keine Video-Daten geladen
          </h2>
          <p className='mt-2'>
            Das Video konnte nicht angezeigt werden. Bitte überprüfe die Konsole
            für weitere Details.
          </p>
          <Button
            onClick={() => router.push(`/qsk-light/${moduleId}`)}
            className='mt-4'
          >
            Zurück zum Modul
          </Button>
        </div>
      )}
    </div>
  );
}
