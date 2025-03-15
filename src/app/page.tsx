import Image from 'next/image';
import { Play, Volume2, Maximize2, MoreVertical } from 'lucide-react';
import { UserProgressWidget } from '@/components/user-progress-widget';
import { ProfileSidebar } from '@/components/profile-sidebar';

export default function Home() {
  return (
    <div className='flex flex-col md:flex-row'>
      {/* Hauptinhalt */}
      <div className='flex-1 p-6'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold mb-1'>Dashboard</h1>
            <p className='text-gray-500'>
              Ein Überblick über die vergangene Woche.
            </p>
          </div>
        </div>

        {/* Aktuelle Lektion */}
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Deine aktuelle Lektion - Lektion 1
        </div>
        <div className='bg-black mb-6 rounded-b-lg overflow-hidden'>
          <div className='relative'>
            <Image
              src='/img/lesson-video.jpg'
              alt='Lektionsvideo'
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

        {/* Fortschritts-Widget */}
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Dein Fortschritt
        </div>
        <div className='border border-gray-200 rounded-b-lg p-4 mb-6'>
          <UserProgressWidget />
        </div>

        {/* Erfolge der letzten Woche */}
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Deine Erfolge der letzten Woche
        </div>
        <div className='border border-gray-200 rounded-b-lg'>
          <div className='grid grid-cols-3 p-4'>
            <div className='text-center'>
              <div className='text-gray-500 mb-2'>Gelöste Übungen</div>
              <div className='flex items-center justify-center'>
                <div className='bg-blue-100 p-2 rounded-md'>
                  <span className='text-blue-600 font-bold'>0</span>
                </div>
              </div>
            </div>
            <div className='text-center'>
              <div className='text-gray-500 mb-2'>Erreichte Hasanat</div>
              <div className='flex items-center justify-center'>
                <div className='bg-blue-100 p-2 rounded-md'>
                  <span className='text-blue-600 font-bold'>0</span>
                </div>
              </div>
            </div>
            <div className='text-center'>
              <div className='text-gray-500 mb-2'>Erreichter Fortschritt</div>
              <div className='flex items-center justify-center'>
                <div className='bg-blue-100 p-2 rounded-md'>
                  <span className='text-blue-600 font-bold'>0.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileSidebar />
    </div>
  );
}
