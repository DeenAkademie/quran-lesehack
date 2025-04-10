'use client';

import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoId: string;
  onComplete?: () => void;
  startTime?: number;
  className?: string;
}

export function VideoPlayer({
  videoId,
  onComplete,
  startTime = 0,
  className,
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasTriggeredEnd, setHasTriggeredEnd] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Vimeo ID aus der URL extrahieren, falls nötig
  const vimeoId = videoId.includes('vimeo.com')
    ? videoId
    : `https://vimeo.com/${videoId}`;

  // Video zur Startzeit setzen, sobald es geladen ist
  useEffect(() => {
    if (startTime > 0 && playerRef.current && !isLoading) {
      try {
        playerRef.current.seekTo(startTime);
        console.log(`Zu Startzeit ${startTime}s gesprungen`);
      } catch (err) {
        console.error('Fehler beim Setzen der Startzeit:', err);
      }
    }
  }, [startTime, isLoading]);

  // Zustand zurücksetzen beim Wechsel des Videos
  useEffect(() => {
    setHasTriggeredEnd(false);
  }, [videoId]);

  const handleReady = () => {
    console.log('Video bereit');
    setIsLoading(false);
  };

  const handleError = (err: Error | string) => {
    console.error('Video player error:', err);
    setError(
      'Fehler beim Laden des Videos. Bitte versuchen Sie es später erneut.'
    );
    setIsLoading(false);
  };

  const handleEnded = () => {
    console.log('Video ended event triggered');

    // Video stoppen
    setIsPlaying(false);

    // Zusätzlich sicherstellen, dass der Player wirklich anhält
    if (playerRef.current && playerRef.current.getInternalPlayer) {
      try {
        const internalPlayer = playerRef.current.getInternalPlayer();
        if (internalPlayer && typeof internalPlayer.pause === 'function') {
          internalPlayer.pause();
        }
      } catch (err) {
        console.error('Fehler beim Pausieren des internen Players:', err);
      }
    }

    // Completion Callback aufrufen
    if (!hasTriggeredEnd && onComplete) {
      setHasTriggeredEnd(true);
      onComplete();
    }
  };

  const handleProgress = (state: {
    playedSeconds: number;
    loadedSeconds: number;
  }) => {
    // Wenn das Video fast am Ende ist (>99%), als beendet markieren
    // Dies ist ein Fallback, falls onEnded nicht zuverlässig ist
    if (state.playedSeconds > state.loadedSeconds - 1 && !hasTriggeredEnd) {
      // Video pausieren
      setIsPlaying(false);

      // Completion-Callback aufrufen
      setHasTriggeredEnd(true);
      if (onComplete) {
        onComplete();
      }
      handlePause();
    }
  };

  const handlePlay = () => {
    console.log('Video wird abgespielt');
    setIsPlaying(true);
  };

  const handlePause = () => {
    console.log('Video wurde pausiert');
    setIsPlaying(false);
  };

  return (
    <div
      className={`w-full relative aspect-video bg-gray-100 rounded-md overflow-hidden ${
        className || ''
      }`}
    >
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-50'>
          <div className='w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}

      {error && (
        <div className='absolute inset-0 flex items-center justify-center bg-red-50 text-red-500 p-4 text-center'>
          {error}
        </div>
      )}

      <div className='w-full h-full'>
        <ReactPlayer
          ref={playerRef}
          url={vimeoId}
          width='100%'
          height='100%'
          controls
          playing={isPlaying}
          onReady={handleReady}
          onError={handleError}
          onEnded={handleEnded}
          onProgress={handleProgress}
          onPlay={handlePlay}
          onPause={handlePause}
          config={{
            vimeo: {
              playerOptions: {
                responsive: true,
                autopause: true,
                dnt: true,
                playsinline: true,
                quality: 'auto',
                loop: false,
                byline: false,
                portrait: false,
                title: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
