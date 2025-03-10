'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    // Logout user
    logout();
    
    // Redirect to login page
    router.push('/login');
  }, [router, logout]);

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
      <p className="text-gray-500">You are being redirected to the login page.</p>
    </div>
  );
} 