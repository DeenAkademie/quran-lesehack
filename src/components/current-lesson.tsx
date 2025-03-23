'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { VideoPlayer } from '@/components/video-player';
import {
  getAllVideos,
  updateVideoProgress,
  Video,
} from '@/services/video-service';

export function CurrentLesson() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch videos and find the latest available one
  useEffect(() => {
    const fetchLatestVideo = async () => {
      setIsLoading(true);
      try {
        const modules = await getAllVideos();

        // Flatten all videos from all modules and sections
        const allVideos: Video[] = modules.flatMap((module) =>
          module.sections.flatMap((section) => section.videos)
        );

        // Filter available videos (not locked, not completed)
        const availableVideos = allVideos.filter(
          (video) => video.unlocked && video.progress?.status === 'available'
        );

        // If no available videos, get the last completed one
        if (availableVideos.length === 0) {
          const completedVideos = allVideos.filter(
            (video) => video.unlocked && video.progress?.status === 'completed'
          );

          // Sort by ID (assuming higher ID is newer)
          const sortedCompletedVideos = completedVideos.sort(
            (a, b) => b.id - a.id
          );

          if (sortedCompletedVideos.length > 0) {
            setCurrentVideo(sortedCompletedVideos[0]);
            setCurrentProgress(100);
          } else {
            // No available or completed videos found
            setError('Keine freigeschalteten Videos gefunden');
          }
        } else {
          // Use the available video with highest ID (newest)
          const latestAvailableVideo = availableVideos.sort(
            (a, b) => b.id - a.id
          )[0];
          setCurrentVideo(latestAvailableVideo);
          setCurrentProgress(
            latestAvailableVideo.progress?.progress_percent || 0
          );
        }
      } catch (e) {
        console.error('Error fetching videos:', e);
        setError('Fehler beim Laden der Videos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  // Funktion zum Aktualisieren des Fortschritts
  const handleProgressUpdate = async (
    progressPercent: number,
    currentTime: number
  ) => {
    if (!currentVideo) return;

    if (progressPercent > currentProgress) {
      setCurrentProgress(progressPercent);

      // Aktualisiere den Fortschritt in der Datenbank
      try {
        await updateVideoProgress(
          currentVideo.id,
          progressPercent,
          currentTime,
          progressPercent >= 90 ? 'completed' : 'available'
        );
      } catch (e) {
        console.error('Error updating video progress:', e);
      }
    }
  };

  // Funktion bei Abschluss des Videos
  const handleLessonComplete = async () => {
    if (!currentVideo) return;

    setCurrentProgress(100);

    // Markiere das Video als abgeschlossen
    try {
      await updateVideoProgress(
        currentVideo.id,
        100,
        currentVideo.progress?.last_position_seconds || 0,
        'completed'
      );

      toast({
        title: 'Lektion abgeschlossen!',
        description: 'Du kannst jetzt zur nächsten Lektion übergehen.',
      });
    } catch (e) {
      console.error('Error completing video:', e);
    }
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

  if (error || !currentVideo) {
    return (
      <div className='mb-6'>
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Keine aktuelle Lektion verfügbar
        </div>
        <div className='bg-gray-100 rounded-b-lg p-4 text-center'>
          <p>{error || 'Es wurden noch keine Lektionen freigeschaltet.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mb-6'>
      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg flex justify-between items-center'>
        <div>
          Deine aktuelle Lektion
          {currentVideo.module_id ? ` - Modul ${currentVideo.module_id}` : ''}
        </div>
        <Link
          href={`/qsk-light/${currentVideo.module_id || 1}/lesson/${
            currentVideo.id
          }`}
          className='text-white text-sm hover:underline'
        >
          Lektion fortsetzen &rarr;
        </Link>
      </div>
      <div className='bg-black rounded-b-lg overflow-hidden'>
        <div className='relative'>
          {currentVideo.vimeo_id ? (
            <VideoPlayer
              videoId={currentVideo.vimeo_id}
              title={currentVideo.title}
              onProgress={handleProgressUpdate}
              onComplete={handleLessonComplete}
              startTime={currentVideo.progress?.last_position_seconds || 0}
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
