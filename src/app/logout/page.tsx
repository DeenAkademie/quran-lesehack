'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      if (isRedirecting) return;

      setIsRedirecting(true);

      // Logout user
      logout();

      // Kurze Verzögerung, um sicherzustellen, dass der Store aktualisiert wurde
      setTimeout(() => {
        // Redirect to login page
        router.push('/login');
      }, 100);
    };

    performLogout();
  }, [router, logout, isRedirecting]);

  return (
    <div className='p-6 max-w-md mx-auto text-center'>
      <h1 className='text-2xl font-bold mb-4'>Abmeldung...</h1>
      <p className='text-gray-500'>Du wirst zur Login-Seite weitergeleitet.</p>
    </div>
  );
} 