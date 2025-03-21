'use client';

import { useRef, useEffect } from 'react';

// Define Vimeo Player types with more specific types
declare global {
  interface Window {
    Vimeo?: {
      Player: new (
        iframe: HTMLIFrameElement,
        options?: Record<string, unknown>
      ) => {
        on: (event: string, callback: (data: VimeoEventData) => void) => void;
        play: () => Promise<void>;
        destroy: () => void;
      };
    };
  }
}

// Type for Vimeo event data
interface VimeoEventData {
  percent?: number;
  [key: string]: unknown;
}

interface EmbedVideoPlayerProps {
  embedCode: string;
  title: string;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  autoPlay?: boolean;
  className?: string;
}

export function EmbedVideoPlayer({
  embedCode,
  title,
  onComplete,
  onProgress,
  autoPlay = false,
  className,
}: EmbedVideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store a reference to the current ref value for cleanup
    const currentPlayerRef = playerRef.current;

    // Vimeo Player API für Events nutzen
    if (playerRef.current) {
      // Vimeo Script laden, falls nicht vorhanden
      const script = document.querySelector(
        'script[src="https://player.vimeo.com/api/player.js"]'
      );
      if (!script) {
        const vimeoScript = document.createElement('script');
        vimeoScript.src = 'https://player.vimeo.com/api/player.js';
        document.body.appendChild(vimeoScript);
        vimeoScript.onload = initializePlayer;
      } else {
        initializePlayer();
      }
    }

    function initializePlayer() {
      if (!currentPlayerRef) return;

      const iframe = currentPlayerRef.querySelector('iframe');
      if (iframe && window.Vimeo) {
        const player = new window.Vimeo.Player(iframe);

        // Event-Listener für Video-Ende
        player.on('ended', () => {
          if (onComplete) onComplete();
        });

        // Fortschritt verfolgen
        player.on('timeupdate', (data: VimeoEventData) => {
          if (onProgress && data.percent)
            onProgress(Math.floor(data.percent * 100));
        });

        // AutoPlay falls gewünscht
        if (autoPlay) player.play();
      }
    }

    return () => {
      // Cleanup, falls nötig
      if (currentPlayerRef) {
        const iframe = currentPlayerRef.querySelector('iframe');
        if (iframe && window.Vimeo) {
          const player = new window.Vimeo.Player(iframe);
          player.destroy();
        }
      }
    };
  }, [embedCode, onComplete, onProgress, autoPlay]);

  return (
    <div
      ref={playerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: embedCode }}
      aria-label={title}
    />
  );
}
