'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, Volume2, VolumeX, Pause, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  onComplete?: () => void;
  onProgress?: (progressPercent: number, currentTime: number) => void;
  autoPlay?: boolean;
  startTime?: number;
  className?: string;
  aspectRatio?: 'square' | 'video' | '4/3';
}

interface VimeoEventData {
  seconds: number;
  duration: number;
  percent: number;
  muted: boolean;
  volume: number;
}

interface VimeoPlayer {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  setMuted: (muted: boolean) => Promise<void>;
  getMuted: () => Promise<boolean>;
  getCurrentTime: () => Promise<number>;
  getDuration: () => Promise<number>;
  seekTo: (seconds: number) => Promise<void>;
  on: (event: string, callback: (data: VimeoEventData) => void) => void;
  off: (event: string, callback: (data: VimeoEventData) => void) => void;
}

declare global {
  interface Window {
    Vimeo: {
      Player: new (
        iframe: HTMLIFrameElement,
        options?: Record<string, unknown>
      ) => VimeoPlayer;
    };
  }
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
  const playerRef = useRef<HTMLIFrameElement>(null);
  const vimeoPlayerRef = useRef<VimeoPlayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(false);
  const [isControlsEnabled, setIsControlsEnabled] = useState(true);

  // Clean video ID from URL if needed
  const cleanVideoId = videoId.split('/').pop()?.split('?')[0];

  // Construct Vimeo URL
  const vimeoUrl = `https://player.vimeo.com/video/${cleanVideoId}?h=YOUR_HASH&app_id=58479&player_id=0&api=1`;

  // Initialize Vimeo Player
  useEffect(() => {
    if (!cleanVideoId) {
      setError('Ungültige Video ID');
      setIsLoading(false);
      return;
    }

    // Load Vimeo Player API script
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (playerRef.current && window.Vimeo) {
        try {
          vimeoPlayerRef.current = new window.Vimeo.Player(playerRef.current, {
            id: cleanVideoId,
            width: '100%',
            height: '100%',
            autoplay: autoPlay,
            muted: muted,
            controls: false,
            playsinline: true,
            title: false,
            byline: false,
            portrait: false,
            dnt: true,
            transparent: true,
            background: true,
            speed: true,
            pip: true,
            autopause: false,
            loop: false,
            player_id: 0,
            app_id: 58479,
          });

          // Set up event listeners
          const handlePlay = () => {
            setPlaying(true);
            setIsControlsEnabled(true);
          };

          const handlePause = () => {
            setPlaying(false);
            setIsControlsEnabled(true);
          };

          const handleEnded = () => {
            if (onComplete) onComplete();
            setIsControlsEnabled(true);
          };

          const handleTimeUpdate = async (data: VimeoEventData) => {
            if (onProgress) {
              const duration =
                (await vimeoPlayerRef.current?.getDuration()) || 0;
              onProgress((data.seconds / duration) * 100, data.seconds);
            }
          };

          const handleVolumeChange = async () => {
            const isMuted = (await vimeoPlayerRef.current?.getMuted()) || false;
            setMuted(isMuted);
            setIsControlsEnabled(true);
          };

          const handleLoaded = async () => {
            setIsLoading(false);
            setError(null);
            setIsControlsEnabled(true);

            // Set initial time if provided
            if (startTime > 0 && vimeoPlayerRef.current) {
              try {
                await vimeoPlayerRef.current.seekTo(startTime);
              } catch (error) {
                console.error('Error seeking to start time:', error);
              }
            }
          };

          const handleError = (data: VimeoEventData) => {
            setIsLoading(false);
            setError(
              'Fehler beim Laden des Videos. Bitte versuche es später noch einmal.'
            );
            console.error('Player error:', data);
            setIsControlsEnabled(false);
          };

          if (vimeoPlayerRef.current) {
            vimeoPlayerRef.current.on('play', handlePlay);
            vimeoPlayerRef.current.on('pause', handlePause);
            vimeoPlayerRef.current.on('ended', handleEnded);
            vimeoPlayerRef.current.on('timeupdate', handleTimeUpdate);
            vimeoPlayerRef.current.on('volumechange', handleVolumeChange);
            vimeoPlayerRef.current.on('loaded', handleLoaded);
            vimeoPlayerRef.current.on('error', handleError);
          }

          return () => {
            if (vimeoPlayerRef.current) {
              vimeoPlayerRef.current.off('play', handlePlay);
              vimeoPlayerRef.current.off('pause', handlePause);
              vimeoPlayerRef.current.off('ended', handleEnded);
              vimeoPlayerRef.current.off('timeupdate', handleTimeUpdate);
              vimeoPlayerRef.current.off('volumechange', handleVolumeChange);
              vimeoPlayerRef.current.off('loaded', handleLoaded);
              vimeoPlayerRef.current.off('error', handleError);
            }
          };
        } catch (error) {
          console.error('Player initialization error:', error);
          setError('Fehler beim Initialisieren des Players');
          setIsLoading(false);
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [cleanVideoId, autoPlay, muted, onComplete, onProgress, startTime]);

  return (
    <div
      className={cn(
        'relative w-full bg-black rounded-lg overflow-hidden',
        {
          'aspect-square': aspectRatio === 'square',
          'aspect-video': aspectRatio === 'video',
          'aspect-[4/3]': aspectRatio === '4/3',
        },
        className
      )}
    >
      {error ? (
        <div className='absolute inset-0 flex items-center justify-center bg-black/80 z-50'>
          <div className='text-center p-4'>
            <p className='text-white mb-4'>{error}</p>
            <Button onClick={() => window.location.reload()}>
              Erneut versuchen
            </Button>
          </div>
        </div>
      ) : (
        <>
          <iframe
            ref={playerRef}
            src={vimeoUrl}
            className='absolute inset-0 w-full h-full'
            allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'
            allowFullScreen
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/50 z-40'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
