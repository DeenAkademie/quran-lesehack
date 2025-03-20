'use client';

import { useRef, useEffect } from 'react';

// Definiere Vimeo Player-Typen
declare global {
  interface Window {
    Vimeo?: {
      Player: new (
        iframe: HTMLIFrameElement,
        options?: Record<string, unknown>
      ) => {
        on: (event: string, callback: (data: any) => void) => void;
        play: () => Promise<void>;
        destroy: () => void;
      };
    };
  }
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
      if (!playerRef.current) return;

      const iframe = playerRef.current.querySelector('iframe');
      if (iframe && window.Vimeo) {
        const player = new window.Vimeo.Player(iframe);

        // Event-Listener für Video-Ende
        player.on('ended', () => {
          if (onComplete) onComplete();
        });

        // Fortschritt verfolgen
        player.on('timeupdate', (data: { percent: number }) => {
          if (onProgress) onProgress(Math.floor(data.percent * 100));
        });

        // AutoPlay falls gewünscht
        if (autoPlay) player.play();
      }
    }

    return () => {
      // Cleanup, falls nötig
      if (playerRef.current) {
        const iframe = playerRef.current.querySelector('iframe');
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
