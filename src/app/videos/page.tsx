import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LearnToReadPage() {
  const lessons = [
    { id: 1, title: 'ا', unlocked: true },
    { id: 2, title: 'ب', unlocked: true },
    { id: 3, title: 'ت', unlocked: false },
    { id: 4, title: 'ث', unlocked: false },
    { id: 5, title: 'ج', unlocked: false },
    { id: 6, title: 'ح', unlocked: false },
    { id: 7, title: 'خ', unlocked: false },
    { id: 8, title: 'د', unlocked: false },
    { id: 9, title: 'ذ', unlocked: false },
    { id: 10, title: 'ر', unlocked: false },
    { id: 11, title: 'ز', unlocked: false },
    { id: 12, title: 'س', unlocked: false },
    { id: 13, title: 'ش', unlocked: false },
    { id: 14, title: 'ص', unlocked: false },
    { id: 15, title: 'ض', unlocked: false },
    { id: 16, title: 'ط', unlocked: false },
    { id: 17, title: 'ظ', unlocked: false },
    { id: 18, title: 'ع', unlocked: false },
  ];

  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link href='/lektionen' className='text-[#4AA4DE] hover:underline mr-2'>
          &larr; Zurück zu den Kursen
        </Link>
      </div>

      <h1 className='text-2xl font-bold mb-1'>Lesen lernen</h1>
      <p className='text-gray-500 mb-6'>
        Lerne Schritt für Schritt den Quran zu lesen.
      </p>

      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Kursfortschritt
      </div>
      <div className='border border-gray-200 rounded-b-lg p-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h3 className='font-medium'>Aktuelle Lektion</h3>
            <p>Lektion 1: Einführung in arabische Buchstaben</p>
          </div>
          <Button className='bg-[#4AA4DE] hover:bg-[#3993CD]'>
            Fortfahren
          </Button>
        </div>

        <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
          <div
            className='bg-[#4AA4DE] h-2.5 rounded-full'
            style={{ width: '10%' }}
          ></div>
        </div>

        <div className='text-sm text-gray-500'>
          10% abgeschlossen (1/10 Lektionen)
        </div>
      </div>

      <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
        Verfügbare Lektionen
      </div>
      <div className='border border-gray-200 rounded-b-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className='border border-gray-200 rounded-lg overflow-hidden'
            >
              <div className='relative'>
                <div
                  className={`aspect-video ${
                    lesson.unlocked ? '' : 'opacity-50'
                  }`}
                >
                  <Image
                    src='/img/lesson-video.jpg'
                    alt={`Lektion ${lesson.id}`}
                    width={640}
                    height={360}
                    className='w-full'
                  />
                </div>
                {!lesson.unlocked && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='bg-gray-500 rounded-full p-2'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          x='5'
                          y='10'
                          width='14'
                          height='10'
                          rx='2'
                          fill='white'
                        />
                        <path
                          d='M8 10V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V10'
                          stroke='white'
                          strokeWidth='2'
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div className='absolute top-2 left-2 bg-[#4AA4DE] text-white text-xs px-2 py-1 rounded'>
                  Lektion {lesson.id}
                </div>
              </div>
              <div className='p-4'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-lg font-medium'>
                    Lektion {lesson.id}:{' '}
                    <span className='text-xl'>{lesson.title}</span>
                  </h2>
                </div>
                {lesson.unlocked ? (
                  <Button
                    asChild
                    className='w-full mt-3 bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
                  >
                    <Link href={`/videos/${lesson.id}`}>Video ansehen</Link>
                  </Button>
                ) : (
                  <Button
                    className='w-full mt-3 bg-gray-200 text-gray-400 cursor-not-allowed'
                    disabled
                  >
                    Video ansehen
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 