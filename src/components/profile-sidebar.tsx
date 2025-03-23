import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUserProfileData, getUserLessonState } from '@/api/api';
import { UserProfileData } from '@/api/types/api_types';
import { Skeleton } from '@/components/ui/skeleton';

// Define the badge and plan types to avoid using 'any'
interface Badge {
  id: string | number;
  title: string;
  svg?: string;
}

interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  duration_days: number | null;
  features: string[] | null;
}

// Extended profile with hasanat data
interface ExtendedUserProfile extends Partial<UserProfileData> {
  client_id?: string;
  badges?: Badge[];
  avatar?: string | null;
  user_name: string;
  did_set_password?: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  plan?: Plan;
  hasanat_count?: number;
  hasanat_today?: number;
}

export function ProfileSidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<ExtendedUserProfile | null>(
    null
  );
  const [hasanatData, setHasanatData] = useState({
    hasanat_count: 0,
    hasanat_today: 0,
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Fetch profile data
        const profileData = await getUserProfileData();
        console.log('userProfile', profileData);

        // Fetch hasanat data from lesson state
        try {
          const lessonState = await getUserLessonState();
          console.log('lessonState', lessonState);

          if (lessonState && lessonState.hasanat_counter !== undefined) {
            // Calculate today's hasanat (this is an example - adjust as needed)
            const todayHasanat = Math.floor(Math.random() * 30); // Random for demonstration

            setHasanatData({
              hasanat_count: lessonState.hasanat_counter,
              hasanat_today: todayHasanat,
            });
          }
        } catch (hasanatError) {
          console.error('Error fetching hasanat data:', hasanatError);
          // Continue with default hasanat data
        }

        setUserProfile(profileData);
      } catch (e) {
        console.error('Error fetching user profile:', e);
        setError('Fehler beim Laden des Profils');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Show loading skeleton while fetching data
  if (isLoading) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
        <div className='flex flex-col items-center'>
          <div className='relative mb-4'>
            <Skeleton className='w-20 h-20 rounded-full' />
          </div>
          <Skeleton className='h-6 w-32 mb-1' />
          <Skeleton className='h-4 w-24 mb-6' />
        </div>
        <div className='space-y-4'>
          <Skeleton className='h-16 w-full rounded-lg' />
          <Skeleton className='h-16 w-full rounded-lg' />
          <Skeleton className='h-32 w-full rounded-lg' />
        </div>
      </div>
    );
  }

  // Show error message if fetching failed
  if (error || !userProfile) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
        <div className='text-center'>
          <p className='text-red-500'>
            {error || 'Profil konnte nicht geladen werden'}
          </p>
        </div>
      </div>
    );
  }

  // Get the correct avatar URL or fallback to placeholder
  const avatarSrc =
    userProfile.avatar_url || userProfile.avatar
      ? userProfile.avatar_url ||
        userProfile.avatar ||
        '/img/avatar-placeholder.svg'
      : '/img/avatar-placeholder.svg';

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
      <div className='flex flex-col items-center'>
        <div className='relative mb-4'>
          <div className='w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden'>
            <Image
              src={avatarSrc}
              alt='Profil'
              width={60}
              height={60}
              className='rounded-full'
            />
          </div>
          <div className='absolute -bottom-2 -right-2 bg-[#4AA4DE] rounded-full p-1.5'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
                fill='white'
              />
            </svg>
          </div>
        </div>
        <h2 className='text-xl font-bold mb-1'>
          {userProfile.first_name || userProfile.user_name}
        </h2>
        <p className='text-gray-500 text-sm mb-6'>@{userProfile.user_name}</p>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M12 2L1 21h22L12 2z' fill='#4AA4DE' />
              </svg>
            </div>
            <div>
              <p className='font-medium'>
                {userProfile.current_course ||
                  userProfile.plan?.title ||
                  'Quran LeseHack'}
              </p>
              <p className='text-xs text-gray-500'>Aktueller Kurs</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z'
                  fill='#4AA4DE'
                />
              </svg>
            </div>
            <div>
              <p className='font-medium'>
                {userProfile.member_since ||
                  new Date().toLocaleDateString('de-DE', {
                    month: 'long',
                    year: 'numeric',
                  })}
              </p>
              <p className='text-xs text-gray-500'>Mitglied seit</p>
            </div>
          </div>
        </div>

        {/* Hasanat Counter Box */}
        <div
          className='rounded-lg p-4 relative overflow-hidden'
          style={{
            backgroundImage: 'url("/hasanat-counter.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='flex items-center justify-between relative z-10'>
            <div>
              <p className='text-white text-sm font-medium mb-1'>
                Deine Hasanat
              </p>
              <p className='text-white text-2xl font-bold'>
                {userProfile.hasanat_count || hasanatData.hasanat_count || 0}
              </p>
            </div>
            <div className='relative w-16 h-16'>
              <Image
                src='/img/coins-stack.svg'
                alt='Hasanat Münzen'
                width={64}
                height={64}
                className='object-contain'
              />
            </div>
          </div>
          <div className='mt-3 pt-3 border-t border-blue-300/30 relative z-10'>
            <div className='flex justify-between items-center'>
              <p className='text-white text-xs'>Heute gesammelt</p>
              <p className='text-white text-sm font-bold'>
                +{userProfile.hasanat_today || hasanatData.hasanat_today || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
