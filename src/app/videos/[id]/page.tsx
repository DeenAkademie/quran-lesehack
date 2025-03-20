'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VideoPlayer } from '@/components/video-player';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/api/supabase_client';

// Typ-Definitionen für die API-Antwort
interface VideoResponse {
  lesson_no: number;
  week_no: number;
  part: number;
  vimeo_id: string;
  vimeo_hash: string;
  title: string;
  description: string;
  is_children: boolean;
  lang_code: string;
  video_urls: {
    id: number;
    created_at: string;
    video_id: number;
    urls: {
      [key: string]: string;
    };
  };
}

// Funktion zum Abrufen von Videodaten
async function getLessonVideoData(
  lessonNo: number = 1
): Promise<VideoResponse | null> {
  try {
    const { data, error } = await supabase.functions.invoke(
      'lesson_get_videos',
      {
        body: {
          lesson_no: lessonNo,
          is_children: false,
          lang_code: 'de',
        },
      }
    );

    if (error) {
      console.error('Fehler beim Abrufen der Videos:', error);
      return null;
    }

    // Da wir nach einer bestimmten Lektion suchen, nehmen wir das erste Ergebnis
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    return null;
  } catch (e) {
    console.error('Exception beim Abrufen der Videos:', e);
    return null;
  }
}

export default function VideoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const lessonId = parseInt(params.id);

  // Lade die Videodaten für die aktuelle Lektion
  const { data: video } = useQuery({
    queryKey: ['lessonVideo', lessonId],
    queryFn: async () => {
      try {
        return await getLessonVideoData(lessonId);
      } catch (error) {
        console.error('Fehler beim Laden des Videos:', error);
        return null;
      }
    },
  });

  // Fallback-Daten, falls keine Videodaten geladen wurden
  const fallbackLesson = {
    id: lessonId,
    title: getLessonCharacter(lessonId),
    arabic: getArabicName(lessonId),
    description: `Lektion ${lessonId}`,
    vimeoId: '',
  };

  // Die Lektion, die angezeigt wird (entweder die geladenen Daten oder der Fallback)
  const lesson = video
    ? {
        id: video.lesson_no,
        title: video.title || getLessonCharacter(video.lesson_no),
        arabic: getArabicName(video.lesson_no),
        description: video.description || `Lektion ${video.lesson_no}`,
        vimeoId: video.vimeo_id,
      }
    : fallbackLesson;

  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link href='/videos' className='text-[#4AA4DE] hover:underline mr-2'>
          &larr; Zurück zu den Lektionen
        </Link>
      </div>

      <h1 className='text-2xl font-bold mb-1'>
        Lektion {lesson.id}: {lesson.title} ({lesson.arabic})
      </h1>
      <p className='text-gray-500 mb-6'>{lesson.description}</p>

      {/* Video-Player */}
      {lesson.vimeoId ? (
        <VideoPlayer vimeoId={lesson.vimeoId} className='mb-6' />
      ) : (
        <div className='bg-black mb-6 rounded-lg overflow-hidden aspect-video flex items-center justify-center'>
          <p className='text-white'>Video nicht verfügbar</p>
        </div>
      )}

      <div className='flex justify-center mb-6'>
        <Button
          asChild
          className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-6'
        >
          <Link href={`/quizzes/${lessonId}`}>Zu den Übungen</Link>
        </Button>
      </div>
    </div>
  );
}

// Hilfsfunktion, um den Buchstaben für eine Lektion zu ermitteln
function getLessonCharacter(lessonNo: number): string {
  const characters = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح'];
  return lessonNo > 0 && lessonNo <= characters.length
    ? characters[lessonNo - 1]
    : '';
}

// Hilfsfunktion, um den arabischen Namen für eine Lektion zu ermitteln
function getArabicName(lessonNo: number): string {
  const names = ['Alif', 'Ba', 'Ta', 'Tha', 'Jim', 'Ha'];
  return lessonNo > 0 && lessonNo <= names.length ? names[lessonNo - 1] : '';
}
