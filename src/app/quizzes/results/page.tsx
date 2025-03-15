'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { ProfileSidebar } from '@/components/profile-sidebar';

export default function ResultsPage() {
  const [selectedLesson, setSelectedLesson] = useState('1');

  // Mock data for the results page
  const lessonResults = {
    lessonId: 1,
    title: 'Wortmuster erkennen',
    completedCount: 2, // How many times the lesson has been completed (max 3)
    totalQuestions: 6,
    correctAnswers: 5,
    timeSpent: '5:23', // minutes:seconds
    score: 83, // percentage
    tasks: [
      {
        id: 1,
        name: 'Aufgabe 1',
        description: 'Wortmuster identifizieren',
        userAnswer: 'بَعْلَ',
        correctAnswer: 'بَعْلَ',
        audioUrl: '/audio/task1.mp3',
        correct: true,
        time: '0:45',
      },
      {
        id: 2,
        name: 'Aufgabe 2',
        description: 'Buchstaben zuordnen',
        userAnswer: 'فَعَلَ',
        correctAnswer: 'فَعَلَ',
        audioUrl: '/audio/task2.mp3',
        correct: true,
        time: '0:52',
      },
      {
        id: 3,
        name: 'Aufgabe 3',
        description: 'Wörter vervollständigen',
        userAnswer: 'كَتَبَ',
        correctAnswer: 'كَتَبَ',
        audioUrl: '/audio/task3.mp3',
        correct: true,
        time: '1:05',
      },
      {
        id: 4,
        name: 'Aufgabe 4',
        description: 'Aussprache üben',
        userAnswer: 'ذَهَبَ',
        correctAnswer: 'ذَهَبَ',
        audioUrl: '/audio/task4.mp3',
        correct: true,
        time: '1:12',
      },
      {
        id: 5,
        name: 'Aufgabe 5',
        description: 'Wortpaare finden',
        userAnswer: 'سَمَعَ',
        correctAnswer: 'سَمَعَ',
        audioUrl: '/audio/task5.mp3',
        correct: true,
        time: '0:59',
      },
      {
        id: 6,
        name: 'Aufgabe 6',
        description: 'Abschlusstest',
        userAnswer: 'قَرَأَ',
        correctAnswer: 'نَظَرَ',
        audioUrl: '/audio/task6.mp3',
        correct: false,
        time: '0:30',
      },
    ],
  };

  // Mock data for the leaderboard
  const leaderboard = [
    { rank: 1, name: 'Fatima', score: 83, hasanat: 520, time: '4:15' },
    { rank: 2, name: 'Mohammed', score: 100, hasanat: 490, time: '4:32' },
    { rank: 3, name: 'Aisha', score: 67, hasanat: 475, time: '4:58' },
    { rank: 4, name: 'Omar', score: 83, hasanat: 460, time: '5:10' },
    { rank: 5, name: 'Ahmed', score: 83, hasanat: 240, time: '5:23' },
  ];

  // Calculate the percentage of completed stars
  const starsCompleted = lessonResults.completedCount;

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main content - Left and Center */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Lesson title and stars */}
          <div className='flex flex-col md:flex-row md:items-center justify-between'>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-bold mb-2 md:mb-0'>Ergebnis</h1>
              <h2 className='  mb-2 md:mb-0'>Schau dir dein Ergebnis an.</h2>
            </div>
            {/* Lesson selection dropdown */}
            <div className='w-full max-w-xs'>
              <Select value={selectedLesson} onValueChange={setSelectedLesson}>
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
                {lessonResults.correctAnswers}/{lessonResults.totalQuestions}
              </div>
            </div>

            <div className='bg-blue-50 rounded-lg p-4 text-center'>
              <div className='text-gray-600 mb-1 text-sm'>Benötigte Zeit</div>
              <div className='text-xl font-bold text-[#4AA4DE]'>
                {lessonResults.timeSpent}
              </div>
            </div>

            <div className='bg-blue-50 rounded-lg p-4 text-center'>
              <div className='text-gray-600 mb-1 text-sm'>Ergebnis</div>
              <div className='text-xl font-bold text-[#4AA4DE]'>
                {lessonResults.score}%
              </div>
            </div>
          </div>

          {/* Exercise completion status */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 text-center'>
            <h3 className='text-lg font-semibold mb-2'>
              Lektion {lessonResults.lessonId} • Übung {lessonResults.lessonId}
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
              Du hast {lessonResults.correctAnswers}/
              {lessonResults.totalQuestions} richtig!
            </p>
            <p className='text-gray-600'>
              {starsCompleted < 3
                ? `Schaffe diese Übung noch ${3 - starsCompleted} ${
                    3 - starsCompleted === 1 ? 'weiteres Mal' : 'weitere Male'
                  }.`
                : 'Du hast diese Übung vollständig gemeistert!'}
            </p>
          </div>

          {/* Repeat exercise button */}
          <div className='flex justify-center mb-6'>
            <Button
              className='bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-8'
              asChild
            >
              <Link href={`/quizzes/${lessonResults.lessonId}`}>
                Übung wiederholen
              </Link>
            </Button>
          </div>

          {/* Task results table */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
            <h2 className='text-xl font-bold mb-4'>Aufgabenübersicht</h2>
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
                {lessonResults.tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className='font-medium'>{task.id}</TableCell>
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
                    <TableCell>{task.description}</TableCell>
                    <TableCell className='font-arabic text-lg'>
                      {task.userAnswer}
                    </TableCell>
                    <TableCell className='font-arabic text-lg'>
                      {task.correctAnswer}
                    </TableCell>
                    <TableCell>
                      {task.correct ? (
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
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.rank === 5
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
                        <p className='font-medium'>{user.name}</p>
                        <div className='flex items-center text-xs text-gray-500'>
                          <span>{user.hasanat} Hasanat</span>
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
