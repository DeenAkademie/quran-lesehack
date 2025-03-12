import { Badge } from '@/api/types/api_types';

export type ExerciseResult = {
  exercisePassedCount: number;
  hasPassedAllLessons: boolean;
  hasPassedExercise: boolean;
  hasPassedLesson: boolean;
  isNativeSpeaker: boolean;
  lessonProgress: number;
  nextExerciseNo: number;
  nextLessonNo: number;
  hasanat: number;
  points: number;
  timeMs: number;
  numCorrectAnswers: number;
  achievedBadge: Badge;
};

export type ExerciseQuestion = {
  text: string;
  mp3Url: string;
  translation: string;
  wrongAnswers: string[];
  correctAnswers: string[];
};

export type ExerciseStore = {
  exerciseNo: number;
  exerciseType: string;
  lessonNo: number;
  numExercisesOfLesson: number;
  answerHashes: string[];
  questions: ExerciseQuestion[];
};

export type LessonStore = {
  exerciseNo: number;
  exercisePassedCount: number;
  hasanatCounter: number;
  lastActiveExerciseNo: number;
  lastActiveLessonNo: number;
  lessonNo: number;
};
