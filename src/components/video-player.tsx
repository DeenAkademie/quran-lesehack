'use client';

import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { cn } from '@/lib/utils';
import { Play, Volume2, VolumeX, Pause, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoId: string; // Vimeo ID
  title: string;
  onComplete?: () => void;
  onProgress?: (progressPercent: number, currentTime: number) => void;
  autoPlay?: boolean;
  startTime?: number;
  className?: string;
  aspectRatio?: 'square' | 'video' | '4/3';
}

export function VideoPlayer({
  videoId,
  title,
  onComplete,
  onProgress,
  autoPlay = false,
  startTime = 0,
  className,
  aspectRatio = 'video',
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // Konvertiere Vimeo ID in URL - mehrere Formate testen
  const videoUrl = videoId.includes('/')
    ? videoId // Falls bereits eine vollständige URL übergeben wurde
    : `https://vimeo.com/${videoId}`; // Direkte Link-URL, die von React-Player interpretiert wird

  // Setze Start-Position nach Ready-Event
  useEffect(() => {
    if (isReady && startTime > 0 && playerRef.current) {
      playerRef.current.seekTo(startTime, 'seconds');
    }
  }, [isReady, startTime]);

  // Handle player ready
  const handleReady = () => {
    setIsReady(true);
    setIsLoading(false);
  };

  // Handle player progress
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    // Aktualisiere UI-Progress
    setProgress(state.playedSeconds);

    // Aktualisiere externen Fortschritt für Statusverfolgung
    if (onProgress) {
      // Konvertiere played (0-1) in Prozent (0-100)
      const progressPercent = Math.floor(state.played * 100);
      onProgress(progressPercent, state.playedSeconds);
    }
  };

  // Handle player error
  const handleError = (error: unknown) => {
    console.error('Video player error:', error);
    setError(
      'Fehler beim Laden des Videos. Bitte versuche es später noch einmal.'
    );
    setIsLoading(false);
  };

  // Handle player ended
  const handleEnded = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={playerContainerRef}
      className={cn(
        'overflow-hidden rounded-lg bg-black relative',
        {
          'aspect-square': aspectRatio === 'square',
          'aspect-video': aspectRatio === 'video',
          'aspect-[4/3]': aspectRatio === '4/3',
        },
        className
      )}
    >
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 z-10'>
          <div className='w-12 h-12 rounded-full border-4 border-gray-600 border-t-[#4AA4DE] animate-spin'></div>
        </div>
      )}

      {error && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 z-10'>
          <p className='text-red-500 p-4 bg-gray-800 rounded-md'>{error}</p>
        </div>
      )}

      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width='100%'
        height='100%'
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={setDuration}
        onReady={handleReady}
        onError={handleError}
        onEnded={handleEnded}
        config={{
          vimeo: {
            playerOptions: {
              responsive: true,
              quality: 'auto',
              controls: false,
              autopause: false,
              dnt: true,
              pip: true,
              portrait: false,
              title: false,
            },
          },
        }}
      />

      {/* Barrierefreiheit */}
      <div className='sr-only' aria-live='polite'>
        {isReady
          ? `Video ${title} ist bereit zur Wiedergabe`
          : 'Video wird geladen'}
      </div>

      {/* Custom Controls Overlay */}
      <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity'>
        <div className='flex items-center justify-between'>
          <Button
            variant='ghost'
            size='icon'
            className='text-white'
            onClick={handlePlayPause}
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </Button>

          <div className='flex items-center space-x-2 text-white text-sm'>
            <span>{formatTime(progress)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              className='text-white'
              onClick={handleToggleMute}
            >
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>

            <input
              type='range'
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
              className='w-20'
            />

            <Button
              variant='ghost'
              size='icon'
              className='text-white'
              onClick={handleFullscreen}
            >
              <Maximize2 size={20} />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='w-full bg-gray-600 h-1 mt-2 rounded-full overflow-hidden'>
          <div
            className='bg-[#4AA4DE] h-full'
            style={{ width: `${(progress / duration) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
