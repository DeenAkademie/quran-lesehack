export type ApiExercise = {
  exercise_no: number;
  exercise_type: string | null;
  id: string;
  lesson_no: number;
};

export interface ApiReadingExerciseAnswer {
  answer_no: number;
  answer: string;
  text: string;
  is_correct: boolean;
  time_ms: number;
}

export type ApiExerciseQuestion = {
  text: string;
  mp3_url: string;
  translation: string;
  correct_answers: string[];
  wrong_answers: string[];
};

export type ApiGetReadingExercise = {
  lesson_no: number;
  exercise_no: number;
  num_exercises_of_lesson: number;
  exercise_type: string;
  questions: ApiExerciseQuestion[];
};

export type ApiBadge = { id: string; svg: string; title: string };

export type ApiExerciseResult = {
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
  achievedBadge?: ApiBadge;
};
