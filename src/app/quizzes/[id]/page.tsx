import { QuizExercise } from './components/quiz-exercise';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <QuizExercise lessonId={parseInt(params.id)} />;
}
