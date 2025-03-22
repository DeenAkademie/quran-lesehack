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
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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

  // Video-Daten laden
  useEffect(() => {
    const fetchVideoData = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching video data for videoId:', videoId);
        const result = await getVideo(videoId);

        console.log('Video API Raw Response:', JSON.stringify(result, null, 2));

        // Check API response structure to see what we're actually getting
        console.log('Response keys:', Object.keys(result));

        // Analyze the video data structure from the response
        const videoDataFromAPI = result.video;
        console.log(
          'Video data structure:',
          videoDataFromAPI ? Object.keys(videoDataFromAPI) : 'No video data'
        );

        if (videoDataFromAPI) {
          console.log('Vimeo ID from API:', videoDataFromAPI.vimeo_id);
        }

        // Extract data based on API structure
        const currentVideo = videoDataFromAPI || null;
        const next = result.nextVideo || null;
        const prev = result.prevVideo || null;
        const moduleData = result.module || null;
        const section = result.section || null;

        console.log('Extracted currentVideo:', currentVideo);
        console.log('Extracted next:', next);
        console.log('Extracted prev:', prev);
        console.log('Extracted moduleData:', moduleData);
        console.log('Extracted section:', section);

        if (currentVideo) {
          setVideo(currentVideo);
          setNextVideo(next);
          setPrevVideo(prev);
          setModuleInfo(
            moduleData ? { id: moduleData.id, title: moduleData.title } : null
          );
          setSectionInfo(
            section ? { id: section.id, title: section.title } : null
          );

          // Setze den initialen Fortschritt
          if (currentVideo.progress) {
            console.log('Setting progress from:', currentVideo.progress);
            setCurrentProgress(currentVideo.progress.progress_percent || 0);
            setCurrentTime(currentVideo.progress.last_position_seconds || 0);
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

    fetchVideoData();
  }, [videoId, toast]);

  // Funktion zum Aktualisieren des Fortschritts
  const handleProgressUpdate = async (
    progressPercent: number,
    seconds: number
  ) => {
    if (!video) return;

    // Aktualisiere den lokalen State
    setCurrentProgress(progressPercent);
    setCurrentTime(seconds);

    // Speichere nur alle 5 Sekunden, um zu viele API-Aufrufe zu vermeiden
    if (Math.floor(seconds) % 5 === 0) {
      try {
        await updateVideoProgress(
          video.id,
          progressPercent,
          seconds,
          progressPercent >= 90 ? 'completed' : 'available'
        );
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  // Funktion bei Abschluss des Videos
  const handleLessonComplete = async () => {
    if (!video) return;

    // Setze lokalen Fortschritt auf 100%
    setCurrentProgress(100);

    try {
      // Aktualisiere den Fortschritt in der Datenbank
      await updateVideoProgress(video.id, 100, currentTime, 'completed');

      toast({
        title: 'Video abgeschlossen!',
        description: nextVideo
          ? 'Du kannst jetzt zur nächsten Lektion übergehen.'
          : 'Super! Modul erfolgreich abgeschlossen.',
      });
    } catch (error) {
      console.error('Error completing video:', error);
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

  // Log current state for debugging after render
  useEffect(() => {
    console.log('Current state:');
    console.log('Video:', video);
    console.log('NextVideo:', nextVideo);
    console.log('PrevVideo:', prevVideo);
    console.log('ModuleInfo:', moduleInfo);
    console.log('SectionInfo:', sectionInfo);
    console.log('isLoading:', isLoading);
  }, [video, nextVideo, prevVideo, moduleInfo, sectionInfo, isLoading]);

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

          {/* Fortschrittsanzeige */}
          <div className='w-full bg-gray-200 rounded-full h-2.5 mb-6'>
            <div
              className='bg-[#4AA4DE] h-2.5 rounded-full transition-all duration-300'
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>

          {/* Video Player */}
          <div className='mb-6'>
            <p className='mb-2'>Debug: Using Vimeo ID: {video.vimeo_id}</p>
            {video.vimeo_id ? (
              <VideoPlayer
                videoId={video.vimeo_id}
                title={video.title}
                onProgress={handleProgressUpdate}
                onComplete={handleLessonComplete}
                startTime={currentTime}
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
                disabled={currentProgress < 90}
              >
                Nächstes Video
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>

          {currentProgress < 90 && nextVideo && (
            <p className='text-center text-sm text-gray-500 mt-4'>
              Schaue mindestens 90% des Videos, um zur nächsten Lektion zu
              gelangen.
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
