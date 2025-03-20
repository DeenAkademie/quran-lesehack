'use client';

import { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Volume2, VolumeX, Pause, Maximize2 } from 'lucide-react';

interface VideoPlayerProps {
  vimeoId: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | '4/3';
  autoPlay?: boolean;
}

export function VideoPlayer({
  vimeoId,
  className,
  aspectRatio = 'video',
  autoPlay = false,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Setup Vimeo URL
  const vimeoUrl = `https://vimeo.com/${vimeoId}`;

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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

  // Behandle Lautstärkeänderungen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
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
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 z-10'>
          <div className='w-12 h-12 rounded-full border-4 border-gray-600 border-t-[#4AA4DE] animate-spin'></div>
        </div>
      )}

      <ReactPlayer
        ref={playerRef}
        url={vimeoUrl}
        width='100%'
        height='100%'
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onReady={() => setLoading(false)}
        onBuffer={() => setLoading(true)}
        onBufferEnd={() => setLoading(false)}
        config={{
          vimeo: {
            playerOptions: {
              responsive: true,
              quality: 'auto',
              controls: false,
            },
          },
        }}
      />

      {/* Custom Controls Overlay */}
      <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-100 transition-opacity duration-300 hover:opacity-100'>
        <div className='flex flex-col gap-2'>
          {/* Progress Bar */}
          <div
            className='relative w-full h-1 bg-gray-600 rounded cursor-pointer'
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              playerRef.current?.seekTo(percent * duration);
            }}
          >
            <div
              className='absolute top-0 left-0 h-full bg-[#4AA4DE] rounded'
              style={{ width: `${(progress / duration) * 100}%` }}
            />
          </div>

          {/* Controls Row */}
          <div className='flex items-center justify-between text-white'>
            <div className='flex items-center gap-3'>
              <Button
                variant='ghost'
                size='icon'
                className='p-1 h-8 w-8 rounded-full text-white hover:bg-white/20'
                onClick={handlePlayPause}
              >
                {playing ? (
                  <Pause className='h-5 w-5' />
                ) : (
                  <Play className='h-5 w-5' />
                )}
              </Button>

              <Button
                variant='ghost'
                size='icon'
                className='p-1 h-8 w-8 rounded-full text-white hover:bg-white/20'
                onClick={handleToggleMute}
              >
                {muted ? (
                  <VolumeX className='h-5 w-5' />
                ) : (
                  <Volume2 className='h-5 w-5' />
                )}
              </Button>

              {/* Volume Slider (nur sichtbar, wenn nicht stummgeschaltet) */}
              {!muted && (
                <div className='hidden sm:block w-16'>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volume}
                    onChange={handleVolumeChange}
                    className='w-full h-1 bg-gray-600 rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white'
                  />
                </div>
              )}

              <span className='text-sm font-medium'>
                {formatTime(progress)} / {formatTime(duration)}
              </span>
            </div>

            <Button
              variant='ghost'
              size='icon'
              className='p-1 h-8 w-8 rounded-full text-white hover:bg-white/20'
              onClick={handleFullscreen}
            >
              <Maximize2 className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
