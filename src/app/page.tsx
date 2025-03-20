'use client';

import { UserProgressWidget } from '@/components/user-progress-widget';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { WeeklyProgress } from '@/components/weekly-progress';
import { CurrentLesson } from '@/components/current-lesson';

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
        <CurrentLesson />

        {/* Fortschritts-Widget */}
        <div className='bg-[#4AA4DE] text-white p-3 rounded-t-lg'>
          Dein Fortschritt
        </div>
        <div className='border border-gray-200 rounded-b-lg p-4 mb-6'>
          <UserProgressWidget />
        </div>

        {/* Erfolge der letzten Woche */}
        <WeeklyProgress />
      </div>

      <ProfileSidebar />
    </div>
  );
}
