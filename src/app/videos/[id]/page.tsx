import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Volume2, Maximize2, MoreVertical } from 'lucide-react';

// Next.js 15 Page Component
export default function Page(props) {
  const lessonId = parseInt(props.params.id);

  const lessons = [
    {
      id: 1,
      title: 'ا',
      arabic: 'Alif',
      description: 'The first letter of the Arabic alphabet',
    },
    {
      id: 2,
      title: 'ب',
      arabic: 'Ba',
      description: 'The second letter of the Arabic alphabet',
    },
    // Add more lessons as needed
  ];

  const lesson = lessons.find((l) => l.id === lessonId) || lessons[0];

  return (
    <div className='p-6'>
      <div className='flex items-center mb-6'>
        <Link href='/videos' className='text-[#4AA4DE] hover:underline mr-2'>
          &larr; Back to lessons
        </Link>
      </div>

      <h1 className='text-2xl font-bold mb-1'>
        Lesson {lesson.id}: {lesson.title} ({lesson.arabic})
      </h1>
      <p className='text-gray-500 mb-6'>{lesson.description}</p>

      <div className='bg-black mb-6 rounded-lg overflow-hidden'>
        <div className='relative'>
          <Image
            src='/img/lesson-video.jpg'
            alt={`Lesson ${lesson.id} Video`}
            width={640}
            height={360}
            className='w-full'
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <button className='bg-white/20 rounded-full p-3'>
              <Play className='h-6 w-6 text-white' fill='white' />
            </button>
          </div>
          <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 flex justify-between items-center'>
            <div className='flex items-center'>
              <span>0:00 / 9:42</span>
            </div>
            <div className='flex items-center gap-4'>
              <Volume2 className='h-5 w-5' />
              <Maximize2 className='h-5 w-5' />
              <MoreVertical className='h-5 w-5' />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div className='border border-gray-200 rounded-lg p-4'>
          <h2 className='text-lg font-medium mb-4'>Letter Information</h2>
          <div className='space-y-4'>
            <div>
              <h3 className='font-medium text-gray-500'>Arabic Form</h3>
              <p className='text-4xl'>{lesson.title}</p>
            </div>
            <div>
              <h3 className='font-medium text-gray-500'>Transliteration</h3>
              <p>{lesson.arabic}</p>
            </div>
            <div>
              <h3 className='font-medium text-gray-500'>Pronunciation</h3>
              <div className='flex items-center'>
                <p>Listen to the pronunciation</p>
                <button className='ml-2 bg-[#4AA4DE] text-white p-1 rounded-full'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M11 5L6 9H2V15H6L11 19V5Z' fill='currentColor' />
                    <path
                      d='M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M19.07 5.93C20.9447 7.80528 21.9979 10.3447 21.9979 13C21.9979 15.6553 20.9447 18.1947 19.07 20.07'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='border border-gray-200 rounded-lg p-4'>
          <h2 className='text-lg font-medium mb-4'>Practice</h2>
          <div className='space-y-4'>
            <Button className='w-full bg-[#4AA4DE] hover:bg-[#3993CD]'>
              Recognition Exercise
            </Button>
            <Button className='w-full bg-[#4AA4DE] hover:bg-[#3993CD]'>
              Writing Exercise
            </Button>
            <Button className='w-full bg-[#4AA4DE] hover:bg-[#3993CD]'>
              Quiz
            </Button>
          </div>
        </div>
      </div>

      <div className='flex justify-between'>
        {lessonId > 1 && (
          <Button asChild variant='outline' className='flex items-center'>
            <Link href={`/videos/${lessonId - 1}`}>&larr; Previous Lesson</Link>
          </Button>
        )}
        <div className='flex-1'></div>
        {lessonId < lessons.length && (
          <Button asChild className='bg-[#4AA4DE] hover:bg-[#3993CD]'>
            <Link href={`/videos/${lessonId + 1}`}>Next Lesson &rarr;</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
