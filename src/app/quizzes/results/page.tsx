'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { ProfileSidebar } from '@/components/profile-sidebar';
import Link from 'next/link';
import { useExerciseResults } from '@/api/queries/use-exercise-results';
import { useLessonQuery } from '@/api/queries/use-lesson-query';
import type { RankingEntry } from '@/api/types/api_types';

export default function QuizResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedLesson, setSelectedLesson] = useState('1');

  // Parameter aus der URL holen
  const lessonNo = parseInt(searchParams.get('lesson') || '1');
  const exerciseNo = parseInt(searchParams.get('exercise') || '1');

  // Hole die Übungsergebnisse mit unserem neuen Hook
  const {
    isLoading: isLoadingResults,
    error: resultsError,
    data: results,
  } = useExerciseResults(lessonNo, exerciseNo);

  // Hole den Lektionszustand für Informationen über die nächste Übung
  const {
    isLoading: isLoadingLessonState,
    error: lessonStateError,
    data: lessonState,
  } = useLessonQuery();

  const isLoading = isLoadingResults || isLoadingLessonState;
  const error = resultsError || lessonStateError;

  if (isLoading) {
    return (
      <div className='p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 space-y-6'>
            <Skeleton className='h-12 w-1/3 mb-4' />
            <div className='grid grid-cols-3 gap-4 mb-6'>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className='h-24 w-full' />
              ))}
            </div>
            <Skeleton className='h-40 w-full mb-4' />
            <Skeleton className='h-10 w-40 mx-auto mb-4' />
            <Skeleton className='h-96 w-full' />
          </div>
          <div className='space-y-6'>
            <Skeleton className='h-64 w-full' />
            <Skeleton className='h-96 w-full' />
          </div>
        </div>
      </div>
    );
  }

  if (error || !results || !lessonState) {
    // Falls keine Ergebnisse verfügbar - Fallback-Optionen
    return (
      <div className='p-6'>
        <Card className='max-w-4xl mx-auto my-8'>
          <CardHeader>
            <CardTitle className='text-xl text-center text-red-600'>
              Fehler beim Laden der Ergebnisse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center mb-6'>
              Die Ergebnisse konnten nicht geladen werden. Entweder ist die
              Übung noch nicht abgeschlossen oder es gab ein Problem beim Laden
              der Daten.
            </p>
            <div className='flex justify-center'>
              <Button onClick={() => router.push('/quizzes')}>
                Zurück zu den Übungen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Berechnungen für die Anzeige
  const correctPercentage =
    (results.num_correct_answers / (results.totalQuestions || 10)) * 100;
  const formattedTime = formatTime(results.time_ms);
  const starsCompleted = results.exercise_passed_count;

  // Bestimme die nächste Übung und Lektion aus dem Lektionszustand
  const nextExerciseNo = lessonState.exerciseNo;
  const nextLessonNo = lessonState.lessonNo;

  // Bestimme die korrekten lateinischen Antworten für jede Frage
  const correctLatinAnswers: { [key: string]: string } = {
    دَدَدَ: 'dadada',
    دَدِدَ: 'dadida',
    دُدِدَ: 'dudida',
  };

  // Platzhalter für Rangliste, falls keine vom Server geliefert wird
  const mockRankings: RankingEntry[] = [
    {
      rank: 1,
      user_name: 'Du',
      points: results.points || 45,
      score: Math.round(correctPercentage),
      time: formattedTime,
    },
    {
      rank: 2,
      user_name: 'Ahmad',
      points: 42,
      score: 90,
      time: '0:45',
    },
    {
      rank: 3,
      user_name: 'Sarah',
      points: 36,
      score: 80,
      time: '0:55',
    },
    {
      rank: 4,
      user_name: 'Mustafa',
      points: 30,
      score: 70,
      time: '1:10',
    },
  ];

  // Verwende entweder echte Rankings oder Mocktaten
  const displayRankings = results.rankings || mockRankings;

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main content - Left and Center */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Lesson title and stars */}
          <div className='flex flex-col md:flex-row md:items-center justify-between'>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-bold mb-2 md:mb-0'>Ergebnis</h1>
              <h2 className='mb-2 md:mb-0'>Schau dir dein Ergebnis an.</h2>
            </div>
            {/* Lesson selection dropdown */}
            <div className='w-full max-w-xs'>
              <Select
                value={selectedLesson}
                onValueChange={(value) => {
                  setSelectedLesson(value);
                  router.push(
                    `/quizzes/results?lesson=${value}&exercise=${exerciseNo}`
                  );
                }}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Lektion auswählen' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>
                    Lektion 1: Wortmuster erkennen
                  </SelectItem>
                  <SelectItem value='2'>
                    Lektion 2: Buchstaben lernen
                  </SelectItem>
                  <SelectItem value='3'>Lektion 3: Einfache Wörter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary statistics */}
          <div className='grid grid-cols-3 gap-4 mb-6'>
            <div className='bg-blue-50 rounded-lg p-4 text-center'>
              <div className='text-gray-600 mb-1 text-sm'>
                Korrekte Antworten
              </div>
              <div className='text-xl font-bold text-[#4AA4DE]'>
                {results.num_correct_answers}/{results.totalQuestions}
              </div>
            </div>

            <div className='bg-blue-50 rounded-lg p-4 text-center'>
              <div className='text-gray-600 mb-1 text-sm'>Benötigte Zeit</div>
              <div className='text-xl font-bold text-[#4AA4DE]'>
                {formattedTime}
              </div>
            </div>

            <div className='bg-blue-50 rounded-lg p-4 text-center'>
              <div className='text-gray-600 mb-1 text-sm'>Ergebnis</div>
              <div className='text-xl font-bold text-[#4AA4DE]'>
                {Math.round(correctPercentage)}%
              </div>
            </div>
          </div>

          {/* Exercise completion status */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 text-center'>
            <h3 className='text-lg font-semibold mb-2'>
              Lektion {lessonNo} • Übung {exerciseNo}
            </h3>
            <div className='flex justify-center items-center space-x-3 mb-4'>
              {[1, 2, 3].map((star) => (
                <div key={star} className='relative w-8 h-8'>
                  {star <= starsCompleted ? (
                    <svg
                      width='32'
                      height='32'
                      viewBox='0 0 24 24'
                      fill='#FFD700'
                    >
                      <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                    </svg>
                  ) : (
                    <svg
                      width='32'
                      height='32'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#D1D5DB'
                      strokeWidth='1'
                    >
                      <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <p className='text-lg font-medium mb-1'>
              Du hast {results.num_correct_answers}/{results.totalQuestions}{' '}
              richtig!
            </p>
            <p className='text-gray-600'>
              {starsCompleted < 3
                ? `Schaffe diese Übung noch ${3 - starsCompleted} ${
                    3 - starsCompleted === 1 ? 'weiteres Mal' : 'weitere Male'
                  }.`
                : 'Du hast diese Übung vollständig gemeistert!'}
            </p>
          </div>

          {/* Action buttons */}
          <div className='flex justify-center gap-4 mb-6'>
            <Button
              variant='outline'
              className='border-[#4AA4DE] text-[#4AA4DE] hover:bg-blue-50'
              asChild
            >
              <Link href={`/quizzes/${lessonNo}?exercise=${exerciseNo}`}>
                Übung wiederholen
              </Link>
            </Button>

            <Button
              className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
              asChild
            >
              <Link
                href={`/quizzes/${nextLessonNo}?exercise=${nextExerciseNo}`}
              >
                {nextLessonNo !== lessonNo
                  ? 'Nächste Lektion'
                  : nextExerciseNo !== exerciseNo
                  ? 'Nächste Übung'
                  : 'Fortfahren'}
              </Link>
            </Button>
          </div>

          {/* Task results table */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
            <h2 className='text-xl font-bold mb-4'>Aufgabenübersicht</h2>
            {results.answers && results.answers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-12'>Nr.</TableHead>
                    <TableHead className='w-20'>Anhören</TableHead>
                    <TableHead>Übung</TableHead>
                    <TableHead>Deine Antwort</TableHead>
                    <TableHead>Richtige Antwort</TableHead>
                    <TableHead className='w-20'>Gelöst</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.answers.map((answer) => (
                    <TableRow key={answer.answer_no}>
                      <TableCell className='font-medium'>
                        {answer.answer_no}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='rounded-full bg-blue-50 hover:bg-blue-100 h-8 w-8'
                        >
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M8 5V19L19 12L8 5Z' fill='#4AA4DE' />
                          </svg>
                          <span className='sr-only'>Anhören</span>
                        </Button>
                      </TableCell>
                      <TableCell className='font-arabic text-lg'>
                        {answer.text}
                      </TableCell>
                      <TableCell>{answer.answer}</TableCell>
                      <TableCell>
                        {correctLatinAnswers[answer.text] || ''}
                      </TableCell>
                      <TableCell>
                        {answer.is_correct ? (
                          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                            Ja
                          </span>
                        ) : (
                          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                            Nein
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className='text-center text-gray-500'>
                Keine Aufgabendaten verfügbar
              </p>
            )}
          </div>
        </div>

        {/* Sidebar - Right */}
        <div className='space-y-6'>
          {/* Profil-Seitenleiste als Komponente ohne Props */}
          <ProfileSidebar />

          {/* Leaderboard */}
          <Card className='w-full shadow-md border-0'>
            <CardHeader className='pb-2 border-b'>
              <CardTitle className='text-xl font-semibold'>
                Bestenliste
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                {displayRankings.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.user_name === 'Du'
                        ? 'bg-blue-50 border border-blue-100'
                        : 'bg-slate-50'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          user.rank === 1
                            ? 'bg-yellow-400'
                            : user.rank === 2
                            ? 'bg-gray-300'
                            : user.rank === 3
                            ? 'bg-amber-600'
                            : 'bg-gray-200'
                        } text-white font-bold`}
                      >
                        {user.rank}
                      </div>
                      <div>
                        <p className='font-medium'>{user.user_name}</p>
                        <div className='flex items-center text-xs text-gray-500'>
                          <span>{user.points} Hasanat</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-end'>
                      <div className='text-lg font-bold text-[#4AA4DE]'>
                        {user.time}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {user.score}% richtig
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function formatTime(timeMs: number): string {
  const totalSeconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}