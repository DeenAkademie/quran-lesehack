export interface VideoModule {
  id: number;
  title: string;
  description: string;
  lessons_count: number;
  duration_minutes: number;
  image_url: string;
  display_order?: number;
  unlocked: boolean;
  completed: boolean;
  completion_percent: number;
  sections: VideoSection[];
}

export interface VideoSection {
  id: number;
  title: string;
  duration_minutes: number;
  display_order?: number;
  unlocked: boolean;
  completed: boolean;
  completion_percent: number;
  videos: Video[];
}

export interface Video {
  id: number;
  title: string;
  type: string;
  duration_minutes: number;
  thumbnail_url: string;
  vimeo_id: string;
  has_exercise: boolean;
  display_order?: number;
  exercise_id?: number;
  unlocked: boolean;
  completed: boolean;
  progress: {
    progress_percent: number;
    status: 'locked' | 'available' | 'completed';
    last_position_seconds: number;
  };
}
