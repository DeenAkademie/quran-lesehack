'use client';

import { useRef, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

declare global {
  interface Window {
    Vimeo?: {
      Player: new (
        elementOrId: HTMLIFrameElement | string,
        options?: {
          id?: number | string;
          width?: number;
          height?: number;
          autopause?: boolean;
          autoplay?: boolean;
          background?: boolean;
          controls?: boolean;
          dnt?: boolean;
          loop?: boolean;
          muted?: boolean;
          playsinline?: boolean;
          portrait?: boolean;
          responsive?: boolean;
          speed?: boolean;
          title?: boolean;
          transparent?: boolean;
          url?: string;
        }
      ) => VimeoPlayerInstance;
    };
  }
}

// Definiere Vimeo Player Instance Typ
interface VimeoPlayerInstance {
  on: (event: string, callback: (data: VimeoEventData) => void) => void;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  setCurrentTime: (seconds: number) => Promise<void>;
  destroy: () => void;
  getVideoId: () => Promise<string>;
  getDuration: () => Promise<number>;
  getPaused: () => Promise<boolean>;
  getCurrentTime: () => Promise<number>;
}

// Type für Vimeo Event-Daten
interface VimeoEventData {
  percent?: number;
  seconds?: number;
  duration?: number;
  [key: string]: unknown;
}

// Error Typ für Vimeo Fehler
interface VimeoError {
  name?: string;
  message?: string;
  method?: string;
  [key: string]: unknown;
}

interface VimeoPlayerProps {
  vimeoId: string;
  title: string;
  onComplete?: () => void;
  onProgress?: (progressPercent: number, currentTime: number) => void;
  autoPlay?: boolean;
  startTime?: number;
  className?: string;
}

export function VimeoPlayer({
  vimeoId,
  title,
  onComplete,
  onProgress,
  autoPlay = false,
  startTime = 0,
  className,
}: VimeoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<VimeoPlayerInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cleanup function to destroy player
  const cleanupPlayer = () => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.destroy();
      playerInstanceRef.current = null;
    }
  };

  useEffect(() => {
    // Clean up previous player if it exists
    cleanupPlayer();
    setIsLoading(true);
    setError(null);

    // Create an ID for the player container
    const playerId = `vimeo-player-${vimeoId}`;

    // Create container for the player if it doesn't exist
    if (containerRef.current) {
      containerRef.current.id = playerId;
    }

    // Load Vimeo API if not already loaded
    const loadVimeoApi = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.Vimeo) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Vimeo API'));
        document.body.appendChild(script);
      });
    };

    // Initialize player
    const initPlayer = async () => {
      try {
        await loadVimeoApi();

        if (!containerRef.current || !window.Vimeo) {
          throw new Error('Player container or Vimeo API not available');
        }

        // Create the player
        playerInstanceRef.current = new window.Vimeo.Player(playerId, {
          id: vimeoId,
          width: '100%',
          responsive: true,
          controls: true,
          title: false,
          portrait: false,
          byline: false,
        });

        // Set initial position if provided
        if (startTime > 0) {
          await playerInstanceRef.current.setCurrentTime(startTime);
        }

        // Set up event listeners
        playerInstanceRef.current.on('loaded', () => {
          setIsLoading(false);
          if (autoPlay) {
            playerInstanceRef.current.play();
          }
        });

        playerInstanceRef.current.on('ended', () => {
          if (onComplete) onComplete();
        });

        playerInstanceRef.current.on('timeupdate', (data: VimeoEventData) => {
          if (
            onProgress &&
            data.percent !== undefined &&
            data.seconds !== undefined
          ) {
            onProgress(Math.floor(data.percent * 100), data.seconds);
          }
        });

        playerInstanceRef.current.on('error', (err: VimeoError) => {
          setError(`Video error: ${err.message || 'Unknown error'}`);
          setIsLoading(false);
        });
      } catch (err) {
        console.error('Error initializing Vimeo player:', err);
        setError('Failed to load video player');
        setIsLoading(false);
      }
    };

    initPlayer();

    // Cleanup on unmount
    return cleanupPlayer;
  }, [vimeoId, autoPlay, onComplete, onProgress, startTime]);

  return (
    <div className={`vimeo-player-container ${className || ''}`}>
      {isLoading && <Skeleton className='aspect-video w-full rounded-md' />}

      {error && (
        <div className='aspect-video w-full flex items-center justify-center bg-gray-100 rounded-md'>
          <p className='text-red-500'>{error}</p>
        </div>
      )}

      <div
        ref={containerRef}
        className={`${isLoading ? 'hidden' : ''} aspect-video w-full`}
        aria-label={title}
      />
    </div>
  );
}
