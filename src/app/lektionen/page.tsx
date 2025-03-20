import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CoursesPage() {
  const courses = [
    {
      id: 'learn-to-read',
      title: 'Lerne zu lesen',
      image: '/img/course-book.svg',
      active: false,
      locked: true,
    },
    {
      id: 'read-the-quran',
      title: 'Lies den Quran',
      image: '/img/course-book.svg',
      active: false,
      locked: true,
    },
    {
      id: 'read-with-tajweed',
      title: 'Lies mit Tajweed',
      image: '/img/course-book.svg',
      active: false,
      locked: true,
    },
  ];

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-1'>Deine Kurse</h1>
      <p className='text-gray-500 mb-6'>Ein Überblick über deine Kurse.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courses.map((course) => (
          <div key={course.id} className='flex flex-col'>
            <div
              className={`rounded-lg overflow-hidden mb-3 ${
                course.active ? 'bg-[#4AA4DE]' : 'bg-gray-200'
              }`}
            >
              <div className='p-8 flex justify-center'>
                <div className='relative w-32 h-32'>
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={128}
                    height={128}
                    className='object-contain'
                  />
                  {course.locked && (
                    <div className='absolute bottom-0 right-0'>
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
                          fill='#6B7280'
                        />
                        <path
                          d='M8 10V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V10'
                          stroke='#6B7280'
                          strokeWidth='2'
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h2 className='text-lg font-medium mb-3 text-center'>
              {course.title}
            </h2>
            <Button
              asChild
              className={`${
                course.active
                  ? 'bg-[#4AA4DE] hover:bg-[#3993CD] text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-500'
              }`}
            >
              <Link href={course.active ? `/quizzes` : '#'}>
                Kurs auswählen
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
