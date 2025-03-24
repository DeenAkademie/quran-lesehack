'use client';

import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { cn } from '@/lib/utils';
import {
  Play,
  Volume2,
  VolumeX,
  Pause,
  Maximize2,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent =
        navigator.userAgent || navigator.vendor || window.navigator.userAgent;
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase()
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Konvertiere Vimeo ID in URL - mehrere Formate testen
  // Zusätzliche Sicherheit: Prüfe, ob videoId überhaupt gesetzt ist
  const isValidVideoId = videoId && videoId.trim().length > 0;
  const videoUrl = isValidVideoId
    ? videoId.includes('/')
      ? videoId // Falls bereits eine vollständige URL übergeben wurde
      : `https://vimeo.com/${videoId}` // Direkte Link-URL
    : ''; // Leere URL, wenn keine ID vorhanden ist

  // Setze Start-Position nach Ready-Event
  useEffect(() => {
    if (isReady && startTime > 0 && playerRef.current) {
      playerRef.current.seekTo(startTime, 'seconds');
    }
  }, [isReady, startTime]);

  // Controls Auto-Hide Effekt
  useEffect(() => {
    const showControls = () => {
      setIsControlsVisible(true);

      // Clear any existing timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      // Set a new timeout to hide controls after 3 seconds of inactivity
      controlsTimeoutRef.current = setTimeout(() => {
        if (!playing) return; // Don't hide controls if video is paused
        setIsControlsVisible(false);
      }, 3000);
    };

    // Add event listeners to the container
    const container = playerContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', showControls);
      container.addEventListener('touchstart', showControls);

      // Show controls initially
      showControls();
    }

    // Cleanup
    return () => {
      if (container) {
        container.removeEventListener('mousemove', showControls);
        container.removeEventListener('touchstart', showControls);
      }

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [playing]);

  // Handle player ready
  const handleReady = () => {
    setIsReady(true);
    setIsLoading(false);
    setError(null); // Clear any previous errors
    console.log(`Video player ready - Video ID: ${videoId}`);
  };

  // Handle player progress
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    // Aktualisiere nur lokalen UI-Progress, keine häufigen Server-Updates
    setProgress(state.playedSeconds);

    // Prüfe nur, ob 99% erreicht wurden - ohne ständige Updates zu senden
    if (isReady && onProgress && state.played >= 0.99) {
      // Nur einmal melden, wenn 99% erreicht sind
      if (!hasReachedNinetyPercent.current) {
        console.log('99% des Videos erreicht!');
        onProgress(99, state.playedSeconds);
        hasReachedNinetyPercent.current = true;
      }
    }
  };

  // Referenz für den 90%-Status
  const hasReachedNinetyPercent = useRef(false);

  // Handle player error with retry
  const handleError = (error: unknown) => {
    console.error('Video player error:', error);

    // Try to reload the player if we haven't reached max retries
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
      setIsLoading(true);
      setError(
        `Fehler beim Laden des Videos. Automatischer Wiederverbindungsversuch (${
          retryCount + 1
        }/${maxRetries})...`
      );

      // Wait a moment and try again
      setTimeout(() => {
        // Force a re-render by updating state
        setIsLoading(false);
        setIsLoading(true);
      }, 2000);
    } else {
      setError(
        'Fehler beim Laden des Videos. Bitte versuche es später noch einmal oder überprüfe deine Internetverbindung.'
      );
      setIsLoading(false);
    }
  };

  // Handle player ended
  const handleEnded = () => {
    hasReachedNinetyPercent.current = true;
    if (onProgress) {
      onProgress(100, duration);
    }
    if (onComplete) {
      onComplete();
    }
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    setIsControlsVisible(true);

    // If we're resuming playback, set a timeout to hide controls
    if (!playing) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 3000);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only handle clicks directly on the container, not on its controls
    if (controlsRef.current && controlsRef.current.contains(e.target as Node)) {
      return;
    }

    // If we clicked on the progress bar, don't toggle play/pause
    if (
      progressBarRef.current &&
      progressBarRef.current.contains(e.target as Node)
    ) {
      return;
    }

    // Wenn wir auf den Play/Pause-Button in der Mitte geklickt haben, nicht hier behandeln
    const target = e.target as HTMLElement;
    if (target.closest('.center-play-button')) {
      return;
    }

    handlePlayPause();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
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

  // Handle timeline interaction to jump to a specific time point
  const handleTimelineInteraction = (clientX: number) => {
    if (!progressBarRef.current || !playerRef.current || !isReady) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const clickPositionRatio = offsetX / rect.width;
    const seekToTime = duration * clickPositionRatio;

    // Seek to the clicked position
    playerRef.current.seekTo(seekToTime, 'seconds');
    setProgress(seekToTime);
  };

  // Mouse click handler for timeline
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleTimelineInteraction(e.clientX);
  };

  // Touch handler for timeline
  const handleTimelineTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleTimelineInteraction(e.touches[0].clientX);
    }
  };

  // Handle playback rate change
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  // Handle retry button click
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setRetryCount(0);

    // Force a re-render
    setTimeout(() => {
      setIsLoading(false);
      setIsLoading(true);
    }, 100);
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
      onClick={handleContainerClick}
    >
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 z-10'>
          <div className='w-12 h-12 rounded-full border-4 border-gray-600 border-t-[#4AA4DE] animate-spin'></div>
        </div>
      )}

      {error && (
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10 p-4'>
          <p className='text-red-500 p-4 bg-gray-800 rounded-md text-center mb-4'>
            {error}
          </p>
          <Button
            variant='default'
            className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
            onClick={handleRetry}
          >
            Video neu laden
          </Button>
        </div>
      )}

      {!isValidVideoId ? (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 z-10'>
          <p className='text-yellow-500 p-4 bg-gray-800 rounded-md'>
            Keine gültige Video-ID gefunden.
          </p>
        </div>
      ) : (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width='100%'
          height='100%'
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onDuration={setDuration}
          onReady={handleReady}
          onError={handleError}
          onEnded={handleEnded}
          playsinline={true}
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
                playsinline: true,
                muted: isMobile, // Start muted on mobile (helps with autoplay)
                transparent: false,
                background: false,
                speed: true,
                // Mobile-specific optimizations
                autoplay: isMobile ? false : autoPlay,
                loop: false,
                byline: false,
              },
            },
          }}
        />
      )}

      {/* Barrierefreiheit */}
      <div className='sr-only' aria-live='polite'>
        {isReady
          ? `Video ${title} ist bereit zur Wiedergabe`
          : 'Video wird geladen'}
      </div>

      {/* Play/Pause Indikator in der Mitte - Erscheint bei Hover als Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 ${
          playing ? 'opacity-0 hover:opacity-100' : 'opacity-100'
        } transition-opacity duration-300 pointer-events-none`}
      >
        <div
          className='bg-black bg-opacity-50 rounded-full p-4 cursor-pointer hover:bg-opacity-70 transition-all center-play-button pointer-events-auto'
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
        >
          {playing ? (
            <Pause size={32} className='text-white' />
          ) : (
            <Play size={32} className='text-white' />
          )}
        </div>
      </div>

      {/* Custom Controls Overlay */}
      <div
        ref={controlsRef}
        className={`absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${
          isControlsVisible ? 'opacity-100' : 'opacity-0'
        } z-20`}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to container
      >
        <div className='flex items-center justify-between'>
          <Button
            variant='ghost'
            size='icon'
            className='text-white touch-manipulation'
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
            {/* Playback Rate Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-white text-xs touch-manipulation'
                >
                  {playbackRate}x <ChevronDown size={12} className='ml-1' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(0.5)}>
                  0.5x
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handlePlaybackRateChange(0.75)}
                >
                  0.75x
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(1)}>
                  1x (Normal)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handlePlaybackRateChange(1.25)}
                >
                  1.25x
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(1.5)}>
                  1.5x
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(2)}>
                  2x
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant='ghost'
              size='icon'
              className='text-white touch-manipulation'
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
              className='w-20 touch-manipulation'
            />

            <Button
              variant='ghost'
              size='icon'
              className='text-white touch-manipulation'
              onClick={handleFullscreen}
            >
              <Maximize2 size={20} />
            </Button>
          </div>
        </div>

        {/* Progress Bar (Clickable Timeline) */}
        <div
          ref={progressBarRef}
          className='w-full bg-gray-600 h-3 mt-2 rounded-full overflow-hidden cursor-pointer touch-manipulation'
          onClick={handleTimelineClick}
          onTouchStart={handleTimelineTouch}
        >
          <div
            className='bg-[#4AA4DE] h-full'
            style={{ width: `${(progress / duration) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

