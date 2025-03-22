import { createClient } from '@supabase/supabase-js';

// Typen für Video-Daten
export interface VideoModule {
  id: number;
  title: string;
  description: string;
  lessons_count: number;
  duration_minutes: number;
  image_url: string;
  display_order: number;
  unlocked: boolean;
  completed: boolean;
  completion_percent: number;
  sections: VideoSection[];
}

export interface VideoSection {
  id: number;
  module_id: number;
  title: string;
  duration_minutes: number;
  display_order: number;
  unlocked: boolean;
  completed: boolean;
  completion_percent: number;
  videos: Video[];
}

export interface Video {
  id: number;
  title: string;
  section_id: number;
  module_id: number;
  type: string;
  duration_minutes: number;
  thumbnail_url: string;
  vimeo_id: string;
  exercise_id: number | null;
  display_order: number;
  has_exercise: boolean;
  unlocked: boolean;
  completed: boolean;
  progress: VideoProgress | null;
}

export interface VideoProgress {
  id?: number;
  client_id?: string;
  video_id: number;
  progress_percent: number;
  status: 'locked' | 'available' | 'completed';
  last_position_seconds: number;
  completed_at: string | null;
}

// Supabase Client mit Public-Key initialisieren
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Service-Funktionen
export async function getAllVideos(): Promise<VideoModule[]> {
  try {
    // Session abrufen und Auth-Header hinzufügen
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (!session) {
      console.error('Error fetching videos: No active session');
      return [];
    }

    const { data, error } = await supabase.functions.invoke('videos_get', {
      headers: {
        'refresh-token': session.refresh_token,
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) {
      console.error('Error fetching videos:', error);
      return [];
    }

    // Stelle sicher, dass data.data ein Array ist
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error('Unexpected response format from videos_get:', data);
      return [];
    }
  } catch (error) {
    console.error('Error in getAllVideos:', error);
    return [];
  }
}

export async function getVideo(videoId: number): Promise<{
  video: Video | null;
  nextVideo: Video | null;
  prevVideo: Video | null;
  module: VideoModule | null;
  section: VideoSection | null;
}> {
  try {
    // Session abrufen und Auth-Header hinzufügen
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (!session) {
      console.error('Error fetching video: No active session');
      return {
        video: null,
        nextVideo: null,
        prevVideo: null,
        module: null,
        section: null,
      };
    }

    console.log('Calling video_get Edge Function with videoId:', videoId);
    const { data, error } = await supabase.functions.invoke('video_get', {
      headers: {
        'refresh-token': session.refresh_token,
        Authorization: `Bearer ${session.access_token}`,
      },
      body: { video_id: videoId },
    });

    console.log('Raw response from video_get:', data);

    if (error) {
      console.error('Error fetching video:', error);
      return {
        video: null,
        nextVideo: null,
        prevVideo: null,
        module: null,
        section: null,
      };
    }

    // Log data structure
    console.log(
      'Data structure from Edge Function:',
      JSON.stringify(data, null, 2)
    );
    console.log('Data keys:', Object.keys(data || {}));

    if (data?.data) {
      console.log('Data.data keys:', Object.keys(data.data || {}));

      if (data.data.video) {
        console.log('Constructing video object from data.data.video');

        // Map Edge Function structure to our interface
        const videoData = data.data.video;

        // Create video object
        const video: Video = {
          id: videoData.id,
          title: videoData.title,
          section_id: videoData.section_id,
          module_id: videoData.module_id,
          type: videoData.type,
          duration_minutes: videoData.duration_minutes,
          thumbnail_url: videoData.thumbnail_url,
          vimeo_id: videoData.vimeo_id,
          exercise_id: videoData.exercise_id,
          display_order: 0, // Not provided by API
          has_exercise: videoData.has_exercise,
          unlocked: true, // Default to true as we're viewing this module
          completed: false, // Default value
          progress: videoData.progress
            ? {
                video_id: videoData.id,
                progress_percent: videoData.progress.progress_percent,
                status: videoData.progress.status,
                last_position_seconds: videoData.progress.last_position_seconds,
                completed_at: null, // Not provided by API
              }
            : null,
        };

        // Create module info
        const moduleObj: VideoModule = {
          id: videoData.module_id,
          title: videoData.module_title,
          description: '', // Not provided by API
          lessons_count: 0, // Not provided by API
          duration_minutes: 0, // Not provided by API
          image_url: '', // Not provided by API
          display_order: 0, // Not provided by API
          unlocked: true, // Default to true as we're viewing this module
          completed: false, // Default value
          completion_percent: 0, // Default value
          sections: [], // Not provided by API
        };

        // Create section info
        const sectionObj: VideoSection = {
          id: videoData.section_id,
          module_id: videoData.module_id,
          title: videoData.section_title,
          duration_minutes: 0, // Not provided by API
          display_order: 0, // Not provided by API
          unlocked: true, // Default to true as we're viewing this section
          completed: false, // Default value
          completion_percent: 0, // Default value
          videos: [], // Not provided by API
        };

        // Create next video if exists
        let nextVideoObj: Video | null = null;
        if (videoData.next_video_id) {
          nextVideoObj = {
            id: videoData.next_video_id,
            title: '', // Not provided by API
            section_id: 0, // Not provided by API
            module_id: 0, // Not provided by API
            type: '', // Not provided by API
            duration_minutes: 0, // Not provided by API
            thumbnail_url: '', // Not provided by API
            vimeo_id: '', // Not provided by API
            exercise_id: null,
            display_order: 0, // Not provided by API
            has_exercise: false, // Not provided by API
            unlocked: false, // Default value
            completed: false, // Default value
            progress: null,
          };
        }

        // Create prev video if exists
        let prevVideoObj: Video | null = null;
        if (videoData.prev_video_id) {
          prevVideoObj = {
            id: videoData.prev_video_id,
            title: '', // Not provided by API
            section_id: 0, // Not provided by API
            module_id: 0, // Not provided by API
            type: '', // Not provided by API
            duration_minutes: 0, // Not provided by API
            thumbnail_url: '', // Not provided by API
            vimeo_id: '', // Not provided by API
            exercise_id: null,
            display_order: 0, // Not provided by API
            has_exercise: false, // Not provided by API
            unlocked: false, // Default value
            completed: false, // Default value
            progress: null,
          };
        }

        console.log('Constructed video object with vimeo_id:', video.vimeo_id);

        return {
          video: video,
          nextVideo: nextVideoObj,
          prevVideo: prevVideoObj,
          module: moduleObj,
          section: sectionObj,
        };
      }
    }

    console.log('No video data found in response');
    return {
      video: null,
      nextVideo: null,
      prevVideo: null,
      module: null,
      section: null,
    };
  } catch (error) {
    console.error('Error in getVideo:', error);
    return {
      video: null,
      nextVideo: null,
      prevVideo: null,
      module: null,
      section: null,
    };
  }
}

export async function updateVideoProgress(
  videoId: number,
  progressPercent: number,
  positionSeconds: number,
  status?: 'available' | 'completed'
): Promise<VideoProgress | null> {
  try {
    // Session abrufen und Auth-Header hinzufügen
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (!session) {
      console.error('Error updating video progress: No active session');
      return null;
    }

    const { data, error } = await supabase.functions.invoke(
      'video_progress_update',
      {
        headers: {
          'refresh-token': session.refresh_token,
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          video_id: videoId,
          progress_percent: progressPercent,
          current_position_seconds: positionSeconds,
          mark_completed: status === 'completed',
        },
      }
    );

    if (error) {
      console.error('Error updating video progress:', error);
      return null;
    }

    return data?.data || null;
  } catch (error) {
    console.error('Error in updateVideoProgress:', error);
    return null;
  }
}
