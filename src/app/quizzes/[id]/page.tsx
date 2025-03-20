import { QuizExercise } from './components/quiz-exercise';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz Exercise',
};

export default function Page({ params }: any) {
  return (
    <main>
      <QuizExercise lessonId={parseInt(params.id)} />
    </main>
  );
}
