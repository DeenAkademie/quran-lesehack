'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useExerciseQuery } from '@/api/queries/use-exercise-query';
import { useExerciseSubmission } from '@/api/queries/use-exercise-submission';
import { useLessonQuery } from '@/api/queries/use-lesson-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import type { ApiReadingExerciseAnswer } from '@/models/api_responses';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useQueryClient } from '@tanstack/react-query';
import { getExercise } from '@/api/api';

interface QuizExerciseProps {
  lessonId: number;
}

export function QuizExercise({ lessonId }: QuizExerciseProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const exerciseNo = parseInt(searchParams?.get('exercise') || '1');
  const queryClient = useQueryClient();

  // Prüfen, ob wir im Trainingsmodus sind (aktuelle Lektion ist kleiner als die vom Benutzer erreichte Lektion)
  const {
    data: lessonState,
    isLoading: isLessonStateLoading,
    error: lessonStateError,
  } = useLessonQuery();
  const isTrainingMode = lessonId < (lessonState?.lessonNo || 1);

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ApiReadingExerciseAnswer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<{
    [key: number]: string[];
  }>({});
  // Flag das anzeigt, ob alle Fragen beantwortet wurden
  const [isCompleted, setIsCompleted] = useState(false);

  // Überwache Änderungen im lessonState (DB-Updates) und navigiere zur nächsten Übung wenn nötig
  useEffect(() => {
    // Nur reagieren, wenn nicht im Training, lessonState geladen ist und wir nicht gerade laden
    if (!isTrainingMode && lessonState && !isLoading && !isLessonStateLoading) {
      const dbLessonNo = lessonState.lessonNo;
      const dbExerciseNo = lessonState.exerciseNo;

      // Überprüfen, ob die aktuelle Übung im Browser nicht mit der in der DB übereinstimmt
      if (dbLessonNo !== lessonId || dbExerciseNo !== exerciseNo) {
        // Aktuelle Übung sofort invalidieren und Daten für neue Übung vorladen
        queryClient.invalidateQueries({
          queryKey: ['exercise', dbLessonNo, dbExerciseNo],
        });

        // Prefetch der neuen Übungsdaten vor der Navigation
        queryClient.prefetchQuery({
          queryKey: ['exercise', dbLessonNo, dbExerciseNo],
          queryFn: async () => {
            try {
              const response = await getExercise(dbLessonNo, dbExerciseNo);
              return response;
            } catch (error) {
              console.error('Fehler beim Prefetching der neuen Übung:', error);
              throw error;
            }
          },
        });

        // Zur neuen Übung navigieren
        router.push(`/quizzes/${dbLessonNo}?exercise=${dbExerciseNo}`);
      }
    }
  }, [
    lessonState,
    isTrainingMode,
    isLoading,
    isLessonStateLoading,
    lessonId,
    exerciseNo,
    router,
    queryClient,
  ]);

  // Überwache Änderungen im exercise-Parameter und lade neu
  useEffect(() => {
    // Zurücksetzen des States bei Übungswechsel
    setCurrentQuestion(0);
    setAnswers([]);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setShuffledAnswers({});
    setIsCompleted(false);
    isSubmittingRef.current = false;

    // Aktive Abfrage der aktuellen Übung mit refetch, um immer aktuelle Daten zu haben
    queryClient.invalidateQueries({
      queryKey: ['exercise', lessonId, exerciseNo],
    });
  }, [exerciseNo, lessonId, queryClient]);

  // Use a ref for the start time to avoid re-renders
  const startTimeRef = useRef<number>(Date.now());

  // Track whether submission has been initiated to prevent double submissions
  const isSubmittingRef = useRef(false);

  // Data fetching mit häufigerer Aktualisierung
  const {
    data: exercise,
    isLoading: isLoadingExercise,
    isError: isExerciseError,
    error: exerciseError,
  } = useExerciseQuery(lessonId, exerciseNo, {
    refetchOnWindowFocus: true,
    refetchInterval: 5000, // Alle 5 Sekunden Daten neu laden
  });

  const submission = useExerciseSubmission();

  // Check for session errors
  const isSessionError =
    (lessonStateError &&
      lessonStateError.message?.includes('No active session')) ||
    (exerciseError && exerciseError.message?.includes('No active session'));

  // If there's a session error, show login message instead of the quiz
  if (isSessionError) {
    return (
      <div className='flex flex-col items-center justify-center p-8 space-y-6 min-h-[50vh] text-center'>
        <h2 className='text-2xl font-bold'>Anmeldung erforderlich</h2>
        <p className='text-gray-600 max-w-md'>
          Bitte melde dich an, um auf die Übungen zugreifen zu können.
        </p>
        <Button
          onClick={() => router.push('/login')}
          className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
        >
          Zur Anmeldung
        </Button>
      </div>
    );
  }

  // Einmalig die Antworten für jede Frage mischen
  useEffect(() => {
    if (exercise && !isLoadingExercise) {
      const newShuffledAnswers: { [key: number]: string[] } = {};

      exercise.questions.forEach((question, index) => {
        // Nehme die korrekte Antwort
        const correctAnswer = question.correct_answers[0];

        // Wähle 3 zufällige falsche Antworten aus
        const shuffledWrongAnswers = [...question.wrong_answers]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        // Kombiniere korrekte und falsche Antworten
        const fourOptions = [correctAnswer, ...shuffledWrongAnswers];

        // Mische die 4 Optionen
        const shuffledOptions = fourOptions.sort(() => Math.random() - 0.5);

        // Die gemischten Antworten für diese Frage speichern
        newShuffledAnswers[index] = shuffledOptions;
      });

      setShuffledAnswers(newShuffledAnswers);
    }
  }, [exercise, isLoadingExercise]);

  // Reset start time when question changes
  useEffect(() => {
    if (exercise && !isLoadingExercise) {
      startTimeRef.current = Date.now();
    }
  }, [currentQuestion, exercise, isLoadingExercise]);

  // Submit all answers
  const submitExercise = useCallback(
    async (finalAnswers: ApiReadingExerciseAnswer[]) => {
      if (!exercise || isLoading) return;

      setIsLoading(true);

      try {
        // Sort the answers by answer_no to ensure correct order
        const sortedAnswers = [...finalAnswers].sort(
          (a, b) => a.answer_no - b.answer_no
        );

        // Get answer hashes from the exercise in the exact order
        const answerHashes = exercise.answer_hashes || [];

        // Ensure we have all answers before submitting
        if (sortedAnswers.length !== exercise.questions.length) {
          console.error(
            'Answer count mismatch',
            sortedAnswers.length,
            exercise.questions.length
          );

          // Complete any missing answers
          for (let i = 0; i < exercise.questions.length; i++) {
            const hasAnswer = sortedAnswers.some((a) => a.answer_no === i + 1);
            if (!hasAnswer) {
              const q = exercise.questions[i];
              sortedAnswers.push({
                answer_no: i + 1,
                text: q.text,
                answer: '',
                is_correct: false,
                time_ms: 0,
              });
            }
          }
        }

        // Submit the answers
        await submission.mutateAsync({
          lessonNo: lessonId,
          exerciseNo,
          answerHashes,
          answers: sortedAnswers,
        });

        // Navigate to the results page
        router.push('/quizzes/results');
      } catch (error) {
        console.error('Error submitting exercise:', error);
        setIsLoading(false);
        isSubmittingRef.current = false;
      }
    },
    [exercise, isLoading, submission, lessonId, exerciseNo, router]
  );

  // Memoize the answer selection handler to prevent recreations
  const handleAnswerSelect = useCallback(
    (answer: string) => {
      if (showFeedback || !exercise) return;

      setSelectedAnswer(answer);
      setShowFeedback(true);

      const question = exercise.questions[currentQuestion];
      const isCorrect = question.correct_answers.includes(answer);
      const timeMs = Date.now() - startTimeRef.current;

      // Create new answer
      const newAnswer: ApiReadingExerciseAnswer = {
        answer_no: currentQuestion + 1,
        text: question.text,
        answer,
        is_correct: isCorrect,
        time_ms: timeMs,
      };

      // Update answers state
      setAnswers((prev) => {
        // Wenn diese Frage bereits beantwortet wurde, ersetze die Antwort
        const existingIndex = prev.findIndex(
          (a) => a.answer_no === currentQuestion + 1
        );
        if (existingIndex >= 0) {
          const updatedAnswers = [...prev];
          updatedAnswers[existingIndex] = newAnswer;
          return updatedAnswers;
        }
        // Ansonsten füge die neue Antwort hinzu
        return [...prev, newAnswer];
      });

      // Move to next question after delay or submit if last question
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestion < exercise.questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          // Wenn alle Fragen beantwortet wurden, setze isCompleted auf true
          setIsCompleted(true);

          // Nur im regulären Modus (nicht im Training) einreichen
          const updatedAnswers = [
            ...answers.filter((a) => a.answer_no !== currentQuestion + 1),
            newAnswer,
          ];
          if (!isTrainingMode && !isSubmittingRef.current) {
            isSubmittingRef.current = true;
            submitExercise(updatedAnswers);
          }
        }
      }, 750);
    },
    [
      currentQuestion,
      exercise,
      showFeedback,
      answers,
      isTrainingMode,
      submitExercise,
    ]
  );

  // Pfeilfunktionen für die Navigation durch die Fragen im Trainingsmodus
  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
    }
  }, [currentQuestion]);

  const goToNextQuestion = useCallback(() => {
    if (exercise && currentQuestion < exercise.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
    }
  }, [currentQuestion, exercise]);

  // Loading state
  if (isLoadingExercise) {
    return (
      <div className='p-6'>
        <div className='flex items-center mb-6'>
          <Link href='/quizzes' className='text-[#4AA4DE] hover:underline mr-2'>
            &larr; Zurück zu den Übungen
          </Link>
        </div>
        <Skeleton className='h-8 w-1/3 mb-1' />
        <Skeleton className='h-5 w-1/4 mb-6' />
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6'>
          <div className='grid grid-cols-3 mb-8'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='text-center'>
                <Skeleton className='h-5 w-20 mx-auto mb-2' />
                <Skeleton className='h-10 w-16 mx-auto' />
              </div>
            ))}
          </div>
          <Skeleton className='h-20 w-full mb-8' />
          <div className='mb-8'>
            <Skeleton className='h-32 w-full mb-4' />
            <div className='grid grid-cols-2 gap-4'>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className='h-12 w-full' />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isExerciseError || !exercise) {
    return (
      <div className='p-6'>
        <div className='flex items-center mb-6'>
          <Link href='/quizzes' className='text-[#4AA4DE] hover:underline mr-2'>
            &larr; Zurück zu den Übungen
          </Link>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6'>
          <h1 className='text-2xl font-bold mb-4 text-red-600'>
            Fehler beim Laden der Übung
          </h1>
          <p className='mb-4'>
            {exerciseError instanceof Error
              ? exerciseError.message
              : 'Die Übungsdaten konnten nicht geladen werden.'}
          </p>
          <Button onClick={() => router.push('/quizzes')} className='mr-2'>
            Zurück zu den Übungen
          </Button>
        </div>
      </div>
    );
  }

  // Calculate UI values
  const questions = exercise?.questions || [];
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const totalQuestions = questions.length;

  // Verwende die vorgemischten Antworten für die aktuelle Frage
  const allAnswers = shuffledAnswers[currentQuestion] || [];

  // Determine quiz type and description
  const quizTitle =
    exercise?.exercise_type === 'pattern'
      ? 'Wortmuster'
      : exercise?.exercise_type === 'letter_recognition'
      ? 'Buchstabenerkennung'
      : 'Schreibübung';

  // Trainingsmodus im Titel anzeigen, wenn aktiv
  const titlePrefix = isTrainingMode ? 'Training: ' : '';

  // const quizDescription =
  //   exercise?.exercise_type === 'pattern'
  //     ? 'Du trainierst die häufigsten Wortmuster im Koran. Dies sind keine echten Wörter, sie klingen nur ähnlich wie häufig vorkommende Wörter.'
  //     : exercise?.exercise_type === 'letter_recognition'
  //     ? 'Identifiziere den richtigen arabischen Buchstaben aus mehreren Optionen.'
  //     : 'Übe das Schreiben des arabischen Buchstabens in verschiedenen Positionen.';

  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link href='/quizzes' className='text-[#4AA4DE] hover:underline mr-2'>
          &larr; Zurück zu den Übungen
        </Link>
      </div>

      <h1 className='text-2xl font-bold mb-1'>
        {titlePrefix}
        {quizTitle}
      </h1>
      <p className='text-gray-500 mb-6'>Lektion {lessonId}</p>

      {/* Progress indicator */}
      <div className='flex items-center gap-3 mb-4'>
        <Progress value={progress} className='w-full' />
        <span className='text-sm text-gray-500 whitespace-nowrap'>
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6'>
        <div className='grid grid-cols-3 mb-6'>
          <div className='text-center'>
            <div className='text-gray-500 mb-2'>Lektion</div>
            <div className='flex items-center justify-center'>
              <div className='bg-blue-100 p-2 rounded-md'>
                <span className='text-blue-600 font-bold'>{lessonId}</span>
                <span className='text-gray-400 text-xs'>/28</span>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <div className='text-gray-500 mb-2'>Übung</div>
            <div className='flex items-center justify-center'>
              <div className='bg-blue-100 p-2 rounded-md'>
                <span className='text-blue-600 font-bold'>{exerciseNo}</span>
                <span className='text-gray-400 text-xs'>
                  /{exercise.num_exercises_of_lesson}
                </span>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <div className='text-gray-500 mb-2'>Erfolg</div>
            <div className='flex items-center justify-center'>
              <div className='bg-blue-100 p-2 rounded-md'>
                <span className='text-blue-600 font-bold'>
                  {lessonState?.exercisePassedCount || 0}/3
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center mb-6'>
          {/* <p className='max-w-2xl mx-auto'>{quizDescription}</p> */}
        </div>

        {exercise.exercise_type === 'pattern' && question && (
          <div className='mb-8'>
            <div className='text-center pb-30 pt-20'>
              <div className='text-7xl font-arabic mb-4'>{question.text}</div>
              {/* {question.mp3_url && (
                <audio
                  controls
                  className='mx-auto mb-4'
                  src={question.mp3_url}
                  autoPlay
                ></audio>
              )} */}
            </div>

            <div className='grid grid-cols-2 gap-4 max-w-3xl mx-auto'>
              {allAnswers.map((answer, index) => {
                const isSelected = selectedAnswer === answer;
                const isCorrect = question.correct_answers.includes(answer);

                // Wenn wir im Training sind und die Frage bereits beantwortet wurde, zeige das Feedback
                const existingAnswer = answers.find(
                  (a) => a.answer_no === currentQuestion + 1
                );
                const showAnswerFeedback =
                  isTrainingMode && isCompleted && existingAnswer;

                let buttonStyle = 'border-gray-200 hover:border-[#4AA4DE]';
                let icon = null as React.ReactNode;

                // Zeige Feedback wenn:
                // 1. showFeedback aktiv ist und diese Antwort ausgewählt wurde
                // 2. Wir im Training sind, alle Fragen beantwortet wurden und diese Antwort wurde für diese Frage gewählt
                if (
                  (showFeedback && isSelected) ||
                  (showAnswerFeedback && existingAnswer?.answer === answer)
                ) {
                  if (isCorrect) {
                    buttonStyle = 'border-green-500 bg-green-50 text-green-800';
                    icon = (
                      <CheckCircle2
                        className='inline text-green-600 ml-2'
                        size={20}
                      />
                    );
                  } else {
                    buttonStyle = 'border-red-500 bg-red-50 text-red-800';
                    icon = (
                      <XCircle className='inline text-red-600 ml-2' size={20} />
                    );
                  }
                } else if (isSelected) {
                  buttonStyle = 'border-[#4AA4DE] bg-blue-50 text-blue-800';
                }

                return (
                  <Button
                    key={index}
                    variant='outline'
                    className={`p-4 h-auto text-lg font-medium ${buttonStyle}`}
                    onClick={() => handleAnswerSelect(answer)}
                    disabled={showFeedback || isLoading}
                  >
                    {answer}
                    {icon}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {isLoading && (
          <div className='text-center py-4'>
            <div className='animate-pulse text-[#4AA4DE] font-medium'>
              Übung wird eingereicht...
            </div>
          </div>
        )}

        {/* Navigation im Trainingsmodus */}
        {isTrainingMode && isCompleted && (
          <div className='flex justify-center gap-4 mt-6'>
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              variant='outline'
              className='flex items-center'
            >
              &larr; Vorherige Frage
            </Button>
            <Button
              onClick={goToNextQuestion}
              disabled={
                !exercise || currentQuestion >= exercise.questions.length - 1
              }
              variant='outline'
              className='flex items-center'
            >
              Nächste Frage &rarr;
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
