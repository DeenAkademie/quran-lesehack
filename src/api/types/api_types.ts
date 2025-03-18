export interface ChildData {
  first_name: string;
  last_name: string;
  email?: string;
  gender: string;
}

export interface SignUpDto {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_name: string;
  gender: string;
  plan: string;
  lang_code?: string;
  role: string; // "admin" | "student" | "teacher" | "parent" | "child"
  children?: ChildData[];
  age?: number;
}

export interface UserProfileData {
  id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  current_course?: string;
  member_since?: string;
  hasanat_count: number;
  hasanat_today: number;
}

export interface UserProgress {
  lessonNo: number;
  exerciseNo: number;
  exercisePassedCount: number;
  hasanatCounter: number;
  totalExercises: number;
}

export interface WeeklyProgress {
  completed_exercises: number;
  earned_hasanat: number;
  progress_percentage: number;
}

export interface CurrentLessonData {
  lesson_number: number;
  lesson_title: string;
  video_url: string;
  video_thumbnail: string;
  video_duration: string;
}

export type UserLessonState = {
  exercise_no: number;
  exercise_passed_count: number;
  hasanat_counter: number;
  last_active_exercise_no: number;
  last_active_lesson_no: number;
  lesson_no: number;
};

export type Exercise = {
  exercise_no: number;
  exercise_type: string | null;
  id: string;
  lesson_no: number;
};

export interface ReadingExerciseAnswer {
  answer_no: number;
  answer: string;
  text: string;
  is_correct: boolean;
  time_ms: number;
}

export type ExerciseQuestion = {
  text: string;
  mp3_url: string;
  translation: string;
  correct_answers: string[];
  wrong_answers: string[];
};

export type GetReadingExercise = {
  lesson_no: number;
  exercise_no: number;
  num_exercises_of_lesson: number;
  exercise_type: string;
  answer_hashes: string[];
  questions: ExerciseQuestion[];
};

export type GetRankings = {
  avatar?: string;
  lesson_no: number;
  points: number;
  client_id: string;
  user_name: string;
};

export type Badge = { id: number; svg: string; title: string };

export type ExerciseResult = {
  exercise_passed_count: number;
  has_finished_course: boolean;
  has_passed_exercise: boolean;
  has_passed_lesson: boolean;
  is_native_speaker: boolean;
  lesson_progress: number;
  next_exercise_no: number;
  next_lesson_no: number;
  exercise_hasanat: number;
  num_correct_answers: number;
  points: number;
  time_ms: number;
  achievedBadge?: Badge;
};
