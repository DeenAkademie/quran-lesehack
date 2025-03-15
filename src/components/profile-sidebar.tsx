import Image from 'next/image';

export function ProfileSidebar() {
  // Interne Daten für das Benutzerprofil
  const userProfile = {
    username: 'Bilgekaan',
    handle: 'bilgekaan',
    course: 'Quran LeseHack',
    memberSince: 'März 2023',
    hasanatCount: 240,
    hasanatToday: 25,
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
      <div className='flex flex-col items-center'>
        <div className='relative mb-4'>
          <div className='w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden'>
            <Image
              src='/img/avatar-placeholder.svg'
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
        <h2 className='text-xl font-bold mb-1'>{userProfile.username}</h2>
        <p className='text-gray-500 text-sm mb-6'>@{userProfile.handle}</p>
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
              <p className='font-medium'>{userProfile.course}</p>
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
              <p className='font-medium'>{userProfile.memberSince}</p>
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
                {userProfile.hasanatCount}
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
                +{userProfile.hasanatToday}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
